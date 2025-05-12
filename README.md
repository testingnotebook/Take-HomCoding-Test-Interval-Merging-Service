# Local Install and Test

- To install the development dependencies run: `npm i`
- To execute the tests run: `npm t`

# Design & Reasoning

## Your approach to interval merging

The logic in `addInterval()` follows these steps:

## Interval Merging Logic

The `addInterval()` method follows this process:

1. **Validate input**  
   Ensure the input interval is valid: the start value must be less than or equal to the end value.

2. **Extract variables**  
   Assign `newStart` and `newEnd` from the input interval.

3. **Initialize result array**  
   Create a `result` array to build the final merged list of intervals.

4. **Track insertion**  
   Use a boolean `intervalInserted` to track whether the new interval has been inserted into `result`.

5. **Loop through existing intervals**

   - **If** the new interval ends _before_ the current interval:

     - If not already inserted, insert `[newStart, newEnd]` into `result`
     - Set `intervalInserted = true`
     - Insert the current interval

   - **Else if** the new interval starts _after_ the current interval:

     - Insert the current interval into `result`

   - **Else** (the intervals overlap or touch):
     - Merge by updating `newStart` and `newEnd` to the min and max of both intervals

6. **Insert if not already inserted**  
   After looping, insert `[newStart, newEnd]` if it hasn't been added yet.

7. **Update state**  
   Set `this.intervals = result`, sorted by start time if necessary.

## Considerations around edge cases (e.g., overlapping, adjacent, nested intervals)

### nested intervals & overlapping

```typescript
it("should get min and max from both as they overlap", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([100, 200]);
  intervalManager.addInterval([150, 190]);

  // THEN
  expect(intervalManager.getIntervals()).toEqual([[100, 200]]);
});
```

```typescript
it("should merge into one when new interval fully overlaps existing", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([100, 200]); // existing
  intervalManager.addInterval([50, 300]); // new fully overlaps it

  // THEN
  expect(intervalManager.getIntervals()).toEqual([[50, 300]]);
});
```

### adjacent

```typescript
it("should merge adjacent intervals", () => {
  const intervalManager = new IntervalManager();

  intervalManager.addInterval([1, 2]);
  intervalManager.addInterval([2, 3]);

  expect(intervalManager.getIntervals()).toEqual([[1, 3]]);
});
```

## Any assumptions made

### TypeScript Safe:

- Input is always two numbers: `[number, number]`
- Intervals must be wellformed (E.G not null etc)

### Logic assumptions:

- If `start > end`, it is considered invalid input and throws an error
- Duplicate intervals are removed through the merge logic

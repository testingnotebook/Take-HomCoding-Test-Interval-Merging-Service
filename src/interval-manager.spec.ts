import IntervalManager from "./interval-manager";

it("should return example result from exercise PDF guide", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([1, 3]);
  intervalManager.addInterval([5, 7]);
  intervalManager.addInterval([2, 6]);

  // THEN
  expect(intervalManager.getIntervals()).toEqual([[1, 7]]);
});

it("should error if start is greater than end", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // THEN
  expect(() => intervalManager.addInterval([10, 2])).toThrow(
    "Start interval should be less than end."
  );
});

it("should insert interval range BEFORE previous", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([8, 9]);
  intervalManager.addInterval([1, 2]);

  // THEN
  expect(intervalManager.getIntervals()).toEqual([
    [1, 2],
    [8, 9],
  ]);
});

it("should insert interval range AFTER previous", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([800, 900]);
  intervalManager.addInterval([20000, 90000]);

  // THEN
  expect(intervalManager.getIntervals()).toEqual([
    [800, 900],
    [20000, 90000],
  ]);
});

it("should merge into one when new interval fully overlaps existing", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([100, 200]); // existing
  intervalManager.addInterval([50, 300]); // new fully overlaps it

  // THEN
  expect(intervalManager.getIntervals()).toEqual([[50, 300]]);
});

it("should get min and max from both as they overlap", () => {
  // GIVEN
  const intervalManager = new IntervalManager();

  // WHEN
  intervalManager.addInterval([100, 200]);
  intervalManager.addInterval([150, 190]);

  // THEN
  expect(intervalManager.getIntervals()).toEqual([[100, 200]]);
});

it("should merge adjacent intervals", () => {
  const intervalManager = new IntervalManager();

  intervalManager.addInterval([1, 2]);
  intervalManager.addInterval([2, 3]);

  expect(intervalManager.getIntervals()).toEqual([[1, 3]]);
});

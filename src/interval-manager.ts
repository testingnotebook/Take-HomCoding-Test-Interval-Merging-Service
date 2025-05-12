class IntervalManager {
  private existingIntervals: [number, number][] = [];

  addInterval(newIntervals: [number, number]) {
    this._errorIfInvalidFormat(newIntervals);

    let [newStart, newEnd] = newIntervals;
    const result: [number, number][] = [];
    let intervalInserted = false;

    this.existingIntervals.forEach(([existingStart, existingEnd]) => {
      // Is it before?
      if (newEnd < existingStart) {
        if (!intervalInserted) {
          result.push([newStart, newEnd]);
          intervalInserted = true;
        }
        result.push([existingStart, existingEnd]);
      }

      // Is it after?
      else if (newStart > existingEnd) {
        result.push([existingStart, existingEnd]);

        // Or does it overlap?
      } else {
        newStart = Math.min(newStart, existingStart);
        newEnd = Math.max(newEnd, existingEnd);
      }
    });

    if (!intervalInserted) {
      result.push([newStart, newEnd]);
      intervalInserted = true;
    }

    this.existingIntervals = result;
  }

  _errorIfInvalidFormat(intervals: [number, number]) {
    if (intervals[0] > intervals[1]) {
      throw new Error("Start interval should be less than end.");
    }
  }

  getIntervals() {
    return this.existingIntervals;
  }
}

export default IntervalManager;

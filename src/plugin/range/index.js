
//  https://github.com/iamkun/dayjs/blob/88ef288ed5f4168deea9fbe2f97e2689711f4e1a/src/plugin/range/index.js

class DayjsRange {
  constructor(startDate, endDate) {
    const { s, e } = startDate > endDate
      ? { s: endDate, e: startDate }
      : { s: startDate, e: endDate }

    this.startDate = s
    this.endDate = e
  }

  isValidRange() {
    return this.startDate.isValid() && this.endDate.isValid()
  }

  clone() {
    return new DayjsRange(this.startDate, this.endDate)
  }

  isOverlap(other) {
    if (!(other instanceof DayjsRange) || !(other.isValidRange())) {
      return false
    }

    return this.startDate < other.endDate && this.endDate > other.startDate
  }

  isEqual(other) {
    return this.startDate.isSame(other.startDate) && this.endDate.isSame(other.endDate)
  }

  addStartRange(number, unit) {
    return new DayjsRange(this.startDate.add(number, unit), this.endDate)
  }

  addEndRange(number, unit) {
    return new DayjsRange(this.startDate, this.endDate.add(number, unit))
  }

  subtractStartRange(number, unit) {
    return new DayjsRange(this.startDate.subtract(number, unit), this.endDate)
  }

  subtractEndRange(number, unit) {
    return new DayjsRange(this.startDate, this.endDate.subtract(number, unit))
  }

  //  https://github.com/rotaready/moment-range/blob/master/lib/moment-range.js
  by(interval, options = { excludeEnd: false, step: 1 }) {
    const range = this

    return {
      [Symbol.iterator]() {
        const step = options.step || 1
        const diff = Math.abs(range.startDate.diff(range.endDate, interval)) / step
        let excludeEnd = options.excludeEnd || false
        let iteration = 0

        // eslint-disable-next-line no-prototype-builtins
        if (options.hasOwnProperty('exclusive')) {
          excludeEnd = options.exclusive
        }

        return {
          next() {
            const current = range.startDate.add((iteration * step), interval)
            const done = excludeEnd
              ? !(iteration < diff)
              : !(iteration <= diff)

            iteration += 1

            return {
              done,
              value: (done ? undefined : current)
            }
          }
        }
      }
    }
  }
}

export default (o, c, d) => {
  d.range = function (start, end) {
    return new DayjsRange(d(start), d(end))
  }
}

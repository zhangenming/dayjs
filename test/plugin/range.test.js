import MockDate from 'mockdate'
import dayjs from '../../src'
import Range from '../../src/plugin/range'

dayjs.extend(Range)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('range isValidRange', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  expect(dayjs.range(today, tomorrow).isValidRange()).toBeTruthy()
  expect(dayjs.range(tomorrow, today).isValidRange()).toBeTruthy()
  expect(dayjs.range(tomorrow, 'today').isValidRange()).toBeFalsy()
})

it('range clone', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  expect(range1 !== range1.clone()).toBeTruthy()
})

it('range isOverlap', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today.add(12, 'hour'), tomorrow.add(12, 'hour'))
  const range3 = dayjs.range(today.add(2, 'day'), tomorrow.add(2, 'day'))

  expect(range1.isOverlap(range2)).toBeTruthy()
  expect(range1.isOverlap(range3)).toBeFalsy()
})

it('range isEqual', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today, tomorrow)
  const range3 = dayjs.range(today.add(2, 'day'), tomorrow.add(2, 'day'))

  expect(range1.isEqual(range2)).toBeTruthy()
  expect(range1.isEqual(range3)).toBeFalsy()
})

it('range addStartRange', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today.add(1, 'hour'), tomorrow)

  expect(range1.addStartRange(1, 'hour').isEqual(range2)).toBeTruthy()
  expect(range1.addStartRange(2, 'hour').isEqual(range2)).toBeFalsy()
})


it('range addEndRange', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today, tomorrow.add(1, 'hour'))

  expect(range1.addEndRange(1, 'hour').isEqual(range2)).toBeTruthy()
  expect(range1.addEndRange(2, 'hour').isEqual(range2)).toBeFalsy()
})

it('range subtractStartRange', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today.subtract(1, 'hour'), tomorrow)

  expect(range1.subtractStartRange(1, 'hour').isEqual(range2)).toBeTruthy()
  expect(range1.subtractStartRange(2, 'hour').isEqual(range2)).toBeFalsy()
})

it('range subtractEndRange', () => {
  const today = dayjs().startOf('day')
  const tomorrow = dayjs().add(1, 'day').endOf('day')
  const range1 = dayjs.range(today, tomorrow)
  const range2 = dayjs.range(today, tomorrow.subtract(1, 'hour'))

  expect(range1.subtractEndRange(1, 'hour').isEqual(range2)).toBeTruthy()
  expect(range1.subtractEndRange(2, 'hour').isEqual(range2)).toBeFalsy()
})


describe('DayjsRange', () => {
  let range

  beforeEach(() => {
    range = dayjs.range(dayjs('2023-05-01'), dayjs('2023-05-10'))
  })

  describe('by', () => {
    it('should iterate over the range with the specified interval', () => {
      const result = Array.from(range.by('day'))

      expect(result).toEqual([
        dayjs('2023-05-01'),
        dayjs('2023-05-02'),
        dayjs('2023-05-03'),
        dayjs('2023-05-04'),
        dayjs('2023-05-05'),
        dayjs('2023-05-06'),
        dayjs('2023-05-07'),
        dayjs('2023-05-08'),
        dayjs('2023-05-09'),
        dayjs('2023-05-10')
      ])
    })

    it('should exclude the end date if options.excludeEnd is true', () => {
      const result = Array.from(range.by('day', { excludeEnd: true }))

      expect(result).not.toContain(dayjs('2023-05-10'))
    })

    it('should iterate with the specified step', () => {
      const result = Array.from(range.by('day', { step: 2 }))

      expect(result).toEqual([
        dayjs('2023-05-01'),
        dayjs('2023-05-03'),
        dayjs('2023-05-05'),
        dayjs('2023-05-07'),
        dayjs('2023-05-09')
      ])
    })

    it('should iterate exclusively if options.exclusive is true', () => {
      const result = Array.from(range.by('day', { exclusive: true }))

      expect(result).toEqual([
        dayjs('2023-05-01'),
        dayjs('2023-05-02'),
        dayjs('2023-05-03'),
        dayjs('2023-05-04'),
        dayjs('2023-05-05'),
        dayjs('2023-05-06'),
        dayjs('2023-05-07'),
        dayjs('2023-05-08'),
        dayjs('2023-05-09')
      ])
    })
  })
})


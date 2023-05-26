import { PluginFunc } from 'dayjs'

declare const plugin: PluginFunc
export = plugin

interface DayjsRange {
  startDate: Dayjs;
  endDate: Dayjs;
  constructor(startDate: Dayjs, endDate: Dayjs);
  isValidRange(): Boolean
  clone(): DayjsRange
  isOverlap(other:DayjsRange): Boolean
  isEqual(other:DayjsRange): Boolean
  addStartRange(number: Number, unit: String): DayjsRange
  addEndRange(number: Number, unit: String): DayjsRange
  subtractStartRange(number: Number, unit: String): DayjsRange
  subtractEndRange(number: Number, unit: String): DayjsRange
  by(
    interval: string,
    options?: { excludeEnd?: boolean; step?: number }
  ): IterableIterator<Dayjs | undefined>;

}


declare module 'dayjs' {
  interface Dayjs {
    range(startDate:Dayjs, endDate:Dayjs): DayjsRange
  }
}

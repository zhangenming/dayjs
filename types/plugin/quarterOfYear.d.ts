import type { PluginFunc } from '..'

declare const plugin: PluginFunc
export default plugin

declare module '..' {
  interface Dayjs {
    quarter(): number

    quarter(quarter: number): Dayjs

    add(value: number, unit: QUnitType): Dayjs

    subtract(value: number, unit: QUnitType): Dayjs

    startOf(unit: QUnitType | OpUnitType): Dayjs

    endOf(unit: QUnitType | OpUnitType): Dayjs

    isSame(date: ConfigType, unit?: QUnitType): boolean

    isBefore(date: ConfigType, unit?: QUnitType): boolean

    isAfter(date: ConfigType, unit?: QUnitType): boolean
  }
}
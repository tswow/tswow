import { Cell } from "../../../data/cell/cells/Cell"
import { Transient } from "../../../data/cell/serialization/Transient"
import { CellSystem } from "../../../data/cell/systems/CellSystem"

export const DaysOfTheWeek = [
      'SUNDAY'
    , 'MONDAY'
    , 'TUESDAY'
    , 'WEDNESDAY'
    , 'THURSDAY'
    , 'FRIDAY'
    , 'SATURDAY'
] as const

export type DayOfTheWeek = typeof DaysOfTheWeek[number] | number

export function resolveDayOfTheWeek(day: DayOfTheWeek) {
  switch(day) {
    case 'SUNDAY': return 0
    case 'MONDAY': return 1
    case 'TUESDAY': return 2
    case 'WEDNESDAY': return 3
    case 'THURSDAY': return 4
    case 'FRIDAY': return 5
    case 'SATURDAY': return 6
    default: return day;
  }
}

export class DayOfTheWeekCell<T> extends CellSystem<T> {
  @Transient
  protected cell: Cell<number,any>

  constructor(owner: T, cell: Cell<number,any>) {
    super(owner);
    this.cell = cell;
  }

  getRaw() {
    return this.cell.get();
  }

  get(): DayOfTheWeek {
    let v = this.cell.get();
    return (v>=0&&v<DaysOfTheWeek.length) ? DaysOfTheWeek[v] : v;
  }

  set(value: DayOfTheWeek) {
    this.cell.set(resolveDayOfTheWeek(value));
    return this.owner;
  }

  objectify() {
    return this.get();
  }

}
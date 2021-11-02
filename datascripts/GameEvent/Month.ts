import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell"
import { Transient } from "wotlkdata/wotlkdata/cell/serialization/Transient"
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem"

export const Months = [
      'JANUARY'
    , 'FEBRUARY'
    , 'MARS'
    , 'APRIL'
    , 'MAY'
    , 'JUNE'
    , 'JULY'
    , 'AUGUST'
    , 'SEPTEMBER'
    , 'OCTOBER'
    , 'NOVEMBER'
    , 'DECEMBER'
] as const

export type Month = typeof Months[number] | number

export function resolveMonth(month: Month) {
switch(month) {
        case 'JANUARY':   return 1;
        case 'FEBRUARY':  return 2;
        case 'MARS':      return 3;
        case 'APRIL':     return 4;
        case 'MAY':       return 5;
        case 'JUNE':      return 6;
        case 'JULY':      return 7;
        case 'AUGUST':    return 8;
        case 'SEPTEMBER': return 9;
        case 'OCTOBER':   return 10;
        case 'NOVEMBER':  return 11;
        case 'DECEMBER':  return 12;
        default: return month;
    }
}

export class MonthCell<T> extends CellSystem<T> {
    @Transient
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
    super(owner);
    this.cell = cell;
    }

    getRaw() {
        return this.cell.get();
    }

    get(): Month {
        let v = this.cell.get();
        return (v>=1&&v<Months.length+1) ? Months[v-1] : v;
    }

    set(value: Month) {
    this.cell.set(resolveMonth(value));
    return this.owner;
    }

    objectify() {
    return this.get();
    }
}
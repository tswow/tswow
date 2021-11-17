import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";

export const TimeUnits = [
    'milliseconds',
    'seconds',
    'minutes',
    'hours',
    'days',
    'weeks',
    'years', // <-- counted as 365 days
    /** Automatically uses the source (getters) or target (setters) type */
    'AUTO'
] as const

const conversionTable = [1,1000,60,60,24,7]
export type TimeUnit = typeof TimeUnits[number]
export function convertTime(num: number, from: TimeUnit, to: TimeUnit): number {
    if(from === to || from === 'AUTO' || to === 'AUTO') return num;
    if(from === 'years') {
        return (to === 'weeks')
            ? num * 52.14285714285714
            : convertTime(num*365,'days',to)
    }
    if(to === 'years') {
        return (from === 'weeks')
            ? num / 52.14285714285714
            : convertTime(num/365,from,'days')
    }
    let fromIndex = TimeUnits.indexOf(from);
    let toIndex = TimeUnits.indexOf(to);
    if(fromIndex < toIndex) {
        for(let i=fromIndex+1;i<=toIndex;++i) num/=conversionTable[i]
    } else {
        for(let i=fromIndex;i>toIndex;--i) num*=conversionTable[i]
    }
    return num;
}

export class DurationCell<T> extends CellSystem<T> {
    readonly unit: TimeUnit;
    protected cell: Cell<number,any>
    readonly isRounded: boolean

    constructor(
          owner: T
        , unit: TimeUnit
        , isRounded: boolean
        , cell: Cell<number,any>
    ) {
        super(owner);
        this.unit = unit;
        this.cell = cell;
        this.isRounded = isRounded;
    }

    get(): number {
        return this.cell.get();
    }

    set(value: number, type = this.unit): T {
        value = convertTime(value,type,this.unit);
        this.cell.set(this.isRounded ? Math.round(value) : value);
        return this.owner;
    }

    setMilliseconds(ms: number) {
        return this.set(convertTime(ms,'milliseconds',this.unit))
    }

    setSeconds(s: number) {
        return this.set(convertTime(s,'seconds',this.unit))
    }

    setMinutes(m: number) {
        return this.set(convertTime(m,'minutes',this.unit))
    }

    setHours(h: number) {
        return this.set(convertTime(h,'hours',this.unit))
    }

    setDays(h: number) {
        return this.set(convertTime(h,'days',this.unit))
    }

    setWeeks(h: number) {
        return this.set(convertTime(h,'weeks',this.unit))
    }

    setYears(h: number) {
        return this.set(convertTime(h,'years',this.unit))
    }

    getMilliseconds() {
        return convertTime(this.get(),this.unit,'milliseconds');
    }

    getSeconds() {
        return convertTime(this.get(),this.unit,'seconds');
    }

    getMinutes() {
        return convertTime(this.get(),this.unit,'minutes');
    }

    getHours() {
        return convertTime(this.get(),this.unit,'hours');
    }

    getWeeks() {
        return convertTime(this.get(),this.unit,'weeks');
    }

    getYears() {
        return convertTime(this.get(),this.unit,'years');
    }

    objectify() {
        return `${this.get()} ${this.unit}`
    }
}
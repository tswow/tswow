import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export const TimeUnits = [
    'MILLISECONDS',
    'SECONDS',
    'MINUTES',
    'HOURS',
    'DAYS',
    'WEEKS',
    'YEARS', // <-- counted as 365 days
    /** Automatically uses the source (getters) or target (setters) type */
    'AUTO'
] as const

const conversionTable = [1,1000,60,60,24,7]
export type TimeUnit = typeof TimeUnits[number]
export function convertTime(num: number, from: TimeUnit, to: TimeUnit): number {
    if(from === to || from === 'AUTO' || to === 'AUTO') return num;
    if(from === 'YEARS') {
        return (to === 'WEEKS')
            ? num * 52.14285714285714
            : convertTime(num*365,'DAYS',to)
    }
    if(to === 'YEARS') {
        return (from === 'WEEKS')
            ? num / 52.14285714285714
            : convertTime(num/365,from,'DAYS')
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

export type TimeUnitConstructor = {
    [Property in typeof TimeUnits[number]]?: number
}

export function applyTimeConstructor(targetType: TimeUnit, con: TimeUnitConstructor) {
    return Object.entries(con)
        .filter(([_,value])=>value!==undefined)
        .reduce((p,[unit,value])=>{
            return p+convertTime(value as number,unit as TimeUnit,targetType)
        },0)
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

    set(value: number, type: TimeUnit|TimeUnitConstructor = this.unit): T {
        value = typeof(type) === 'object'
            ? applyTimeConstructor(this.unit,type)
            : convertTime(value,type,this.unit)
        this.cell.set(this.isRounded ? Math.round(value) : value)
        return this.owner;
    }

    addMilliseconds(ms: number) {
        return this.set(this.get() + convertTime(ms,'MILLISECONDS',this.unit))
    }

    addSeconds(ms: number) {
        return this.set(this.get() + convertTime(ms,'SECONDS',this.unit))
    }

    addMinutes(ms: number) {
        return this.set(this.get() + convertTime(ms,'MINUTES',this.unit))
    }

    addHours(ms: number) {
        return this.set(this.get() + convertTime(ms,'HOURS',this.unit))
    }

    addDays(ms: number) {
        return this.set(this.get() + convertTime(ms,'DAYS',this.unit))
    }

    addWeeks(ms: number) {
        return this.set(this.get() + convertTime(ms,'WEEKS',this.unit))
    }

    addYears(ms: number) {
        return this.set(this.get() + convertTime(ms,'YEARS',this.unit))
    }

    setAsMilliseconds(ms: number) {
        return this.set(convertTime(ms,'MILLISECONDS',this.unit))
    }

    setAsSeconds(s: number) {
        return this.set(convertTime(s,'SECONDS',this.unit))
    }

    setAsMinutes(m: number) {
        return this.set(convertTime(m,'MINUTES',this.unit))
    }

    setAsHours(h: number) {
        return this.set(convertTime(h,'HOURS',this.unit))
    }

    setAsDays(h: number) {
        return this.set(convertTime(h,'DAYS',this.unit))
    }

    setAsWeeks(h: number) {
        return this.set(convertTime(h,'WEEKS',this.unit))
    }

    setAsYears(h: number) {
        return this.set(convertTime(h,'YEARS',this.unit))
    }

    getAsMilliseconds() {
        return convertTime(this.get(),this.unit,'MILLISECONDS');
    }

    getAsSeconds() {
        return convertTime(this.get(),this.unit,'SECONDS');
    }

    getAsMinutes() {
        return convertTime(this.get(),this.unit,'MINUTES');
    }

    getAsHours() {
        return convertTime(this.get(),this.unit,'HOURS');
    }

    getAsDays() {
        return convertTime(this.get(),this.unit,'DAYS');
    }

    getAsWeeks() {
        return convertTime(this.get(),this.unit,'WEEKS');
    }

    getAsYears() {
        return convertTime(this.get(),this.unit,'YEARS');
    }

    objectify() {
        return `${this.get()} ${this.unit}`
    }
}
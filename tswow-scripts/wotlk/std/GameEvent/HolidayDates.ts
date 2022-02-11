import { Cell } from "../../../data/cell/cells/Cell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { OffsetCell } from "../Misc/OffsetCell";
import { DayOfTheWeekCell } from "./DayOfTheWeek";
import { MonthCell } from "./Month";

export class HolidayPackedCell<T> extends Cell<number,T> {
    private readonly raw: Cell<number,any>
    private readonly offset: number;
    private readonly mask: number;
    private readonly name: string;

    constructor(
          owner: T
        , raw: Cell<number,any>
        , offset: number
        , length: number
        , name: string
    ) {
        super(owner);
        this.raw = raw;
        this.offset = offset;
        this.mask = (1 << length) - 1;
        this.name = name;
    }

    get(): number {
        return (this.raw.get() >> this.offset) & this.mask
    }

    set(value: number): T {
        if(value < 0) {
            throw new Error(`Error in ${this.name} date field, writing value < 0`);
        }
        if(value !== (value & this.mask)) {
            throw new Error(
                  `Error in ${this.name}`
                + ` date field, writing too large value: ${value} (highest value is ${this.mask})`
            );
        }
        this.raw.set((this.raw.get()&(~(this.mask << this.offset))) | (value << this.offset))
        return this.owner;
    }
}

export function HolidayMinutes<T>(owner:T,cell:Cell<number,any>) {
    return new HolidayPackedCell(owner,cell,0,6,'minutes')
}

export function HolidayHours<T>(owner:T,cell:Cell<number,any>) {
    return new HolidayPackedCell(owner,cell,6,5,'hours')
}

export function HolidayDayOfTheWeek<T>(owner:T,cell:Cell<number,any>) {
    return new HolidayPackedCell(owner,cell,11,3,'dayoftheweek')
}

export function HolidayMonthday<T>(owner:T,cell:Cell<number,any>) {
    return new OffsetCell(owner,new HolidayPackedCell(owner,cell,14,6,'monthday'),-1)
}

export function HolidayMonth<T>(owner:T,cell:Cell<number,any>) {
    return new MonthCell(owner,
            new OffsetCell(owner, new HolidayPackedCell(owner,cell,20,4,'month'),-1)
        )
}

export function HolidayYear<T>(owner:T,cell:Cell<number,any>) {
    return new HolidayPackedCell(owner,cell,24,5,'year')
}

export function HolidayTimezone<T>(owner:T,cell:Cell<number,any>) {
    return new HolidayPackedCell(owner,cell,29,2,'timezone')
}

export class HolidayFullDate<T> extends CellSystem<T> {
    @Transient
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    get Year() { return HolidayYear(this.owner, this.cell); }
    get Timezone() { return HolidayTimezone(this.owner, this.cell); }
    get Month() { return HolidayMonth(this.owner, this.cell); }
    get DayOfMonth() { return HolidayMonthday(this.owner, this.cell); }
    get DayOfWeek() { return new DayOfTheWeekCell(this.owner, HolidayDayOfTheWeek(this.owner, this.cell)); }
    get Hours() { return HolidayHours(this.owner, this.cell); }
    get Minutes() { return HolidayMinutes(this.owner, this.cell); }

    set(value: number) {
        this.cell.set(value);
        return this.owner;
    }

    get() {
        return this.cell.get();
    }
}
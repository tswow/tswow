import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { CellBasic } from "../GameObject/ElevatorKeyframes";

export function makeSQLDate(
      year: number
    , month: number
    , day: number
    , hours: number = 0
    , minutes: number = 0
    , seconds: number = 0
) {
    return `${year}`
        +  `-${month.toString().padStart(2,'0')}`
        +  `-${day.toString().padStart(2,'0')}`
        +  ` ${hours.toString().padStart(2,'0')}`
        +  `:${minutes.toString().padStart(2,'0')}`
        +  `:${seconds.toString().padStart(2,'0')}`
}

export function splitSQLDate(dateString: string) {
    let year = parseInt(dateString.substring(0,4));
    let month = parseInt(dateString.substring(5,7));
    let day = parseInt(dateString.substring(8,10))
    let hour = parseInt(dateString.substring(11,13))
    let minute = parseInt(dateString.substring(14,16))
    let seconds = parseInt(dateString.substring(17,19))
    return {year,month,day,hour,minute,seconds}
}

type DateObj = {
      year:number
    , month:number
    , day:number
    , hour:number
    , minute:number
    , seconds:number
}

type DateObjKey = 'year'|'month'|'day'|'hour'|'minute'|'seconds'

let now = new Date();
let end = new Date();
end.setFullYear(now.getFullYear()+9,12,31)
end.setHours(7,0)
export const default_end_date = end.toISOString().slice(0,19).replace('T',' ')

export class SQLDateCell<T> extends CellSystem<T> {
    protected cell: Cell<string,any>

    private reconstruct(dateObj: DateObj) {
        this.cell.set(makeSQLDate(
              dateObj.year
            , dateObj.month
            , dateObj.day
            , dateObj.hour
            , dateObj.minute
        ))
    }

    private split(): DateObj {
        return splitSQLDate(this.cell.get());
    }

    private makeCell(key: DateObjKey) {
        return new CellBasic(this.owner
            , ()=> this.split()[key]
            , (value: number)=>{
                let v = this.split();
                v[key] = value;
                this.reconstruct(v);
                return this.owner;
            }
        )
    }

    constructor(owner: T, cell: Cell<string,any>) {
        super(owner);
        this.cell = cell;
    }

    get Year() {  return this.makeCell('year'); }
    get Month() {  return this.makeCell('month'); }
    get Day() {  return this.makeCell('day'); }
    get Hour() {  return this.makeCell('hour'); }
    get Minute() {  return this.makeCell('minute'); }
    get Second() { return this.makeCell('seconds')}

    set(year: number, month = 0, day = 0, hour = 0, minute = 0, seconds = 0) {
        this.Year.set(year);
        this.Month.set(month);
        this.Day.set(day);
        this.Hour.set(hour);
        this.Minute.set(minute);
        this.Second.set(seconds);
        return this.owner;
    }
}
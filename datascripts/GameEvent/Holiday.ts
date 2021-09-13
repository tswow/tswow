import { DBC } from "wotlkdata";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { HolidaysQuery, HolidaysRow } from "wotlkdata/dbc/types/Holidays";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { GameEvent, GameEventRegistry } from "./GameEvent";
import { HolidayDescription, HolidayName } from "./HolidayLoc";
import { HolidayAnnualStages, HolidayPeriod, HolidayWeeklyStages } from "./HolidayStage";

export const all_holidays: any = {}
export function HolidayID(...id: number[]) {
    return function(target: any) {
        id.forEach(x=>all_holidays[x] = target)
    }
}

export class HolidayType<T extends HolidayBase> extends EnumCellWrapper<T> {
    set(value: number) {
        super.set(value);
        // need to update Game Events if we change occurrence
        GameEventRegistry.filter({holiday:this.owner.ID})
            .forEach(x=>GameEvent.updateHolidayOccurrence(x,value))
        return this.owner;
    }

    @EnumField(-1)
    setYearly() { return new HolidayAnnual(this.set(-1).row); }

    @EnumField(0)
    setWeekly() {  return new HolidayWeekly(this.set(0).row) }

    // todo: multiple defined dates don't seem to have working game

    @EnumField(1)
    setDefinedDates() { return new HolidayAnnual(this.set(1).row); }

    // todo: The hourly events don't seem to appear in the calendar,
    // so we'll enable them when we have a workflow up for
    // call to arms stuff. use raw game events for non-call to arms periodics!

    /*
    @EnumField(2)
    setCustomPeriod() {
        let fd = new HolidayFullDate(
              undefined
            , new CellIndexWrapper(undefined,this.owner.row.Date,0)
        )

        // these are always 7 for custom periods it seems
        fd.Year.set(7)
        fd.DayOfWeek.set(7)

        return new HolidayCustomPeriod(this.set(2).row)
    }
    */
}

export class HolidayBase extends MainEntity<HolidaysRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return new HolidayName(this); }
    get Description() { return new HolidayDescription(this); }
    get Priority() { return this.wrap(this.row.Priority); }
    get Flags() { return this.wrap(this.row.Flags); }
    get Type() { return new HolidayType(this, this.row.CalendarFilterType); }
    get Texture() { return this.wrap(this.row.TextureFilename); }

    objectify() {
        let res = all_holidays[this.Type.get()];
        if(res) {
            return res ? new res(this.row).objectify() : super.objectify();
        }
    }
}

@HolidayID(0)
export class HolidayWeekly extends HolidayBase {
    get Stages() { return new HolidayWeeklyStages(this); }
}

@HolidayID(-1,1)
export class HolidayAnnual extends HolidayBase {
    get Stages() { return new HolidayAnnualStages(this); }
}

@HolidayID(2)
export class HolidayCustomPeriod extends HolidayBase {
    // custom periods can only be on stage 0
    get Period() { return new HolidayPeriod(this, 0); }
}

export const HolidayRegistry = {
    create(parent?: number) {
        let id = Ids.Holidays.id()

        const newName = ()=>
            DBC.HolidayNames
            .add(Ids.HolidayNames.id())
            .Name.clear()
            .ID.get()

        const newDesc = ()=>
            DBC.HolidayDescriptions
                .add(Ids.HolidayDescriptions.id())
                .Description.clear()
                .ID.get()

        return new HolidayBase(
            parent
            ? DBC.Holidays
                .findById(parent)
                .clone(id)
                .HolidayNameID.set(newName())
                .HolidayDescriptionID.set(newDesc())
            : DBC.Holidays
                .add(id)
                .Date.fill(0)
                .Duration.fill(0)
                .HolidayNameID.set(newName())
                .HolidayDescriptionID.set(newDesc())
        );
    },

    load(id: number) {
        let res = DBC.Holidays.findById(id);
        return(res ? new HolidayBase(res) : undefined) as HolidayBase;
    },

    filter(query: HolidaysQuery) {
        return DBC.Holidays
            .filter(query)
            .map(x=>new HolidayBase(x))
    },

    find(query: HolidaysQuery) {
        let v = DBC.Holidays.find(query)
        return (v ? new HolidayBase(v) : undefined) as HolidayBase
    }
}
import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { HolidaysQuery, HolidaysRow } from "../../dbc/Holidays";
import { DBC } from "../../DBCFiles";
import { TransformedEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { GameEvent, GameEventRegistry } from "./GameEvent";
import { HolidayDescription, HolidayName } from "./HolidayLoc";
import { HolidayAnnualStages, HolidayPeriod, HolidayWeeklyStages } from "./HolidayStage";

export class HolidayType extends EnumCellTransform<HolidayBase> {
    set(value: number) {
        super.set(value);
        // need to update Game Events if we change occurrence
        GameEventRegistry.queryAll({holiday:this.owner.ID})
            .forEach(x=>GameEvent.updateHolidayOccurrence(x,value))
        return this.owner;
    }

    /** Enum Value = -1 */
    get YEARLY()       { return this.value(-1, x=>new HolidayAnnual(x.row)) }

    /** Enum Value = 0 */
    get WEEKLY()       { return this.value(0, x=>new HolidayWeekly(x.row)) }

    /** Enum Value = 1 */
    get DEFINED_DATES() { return this.value(1, x=>new HolidayAnnual(x.row)) }

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

export class HolidayBase extends TransformedEntity<HolidaysRow,HolidayPlain> {
    protected transformer(): any  { return this.Type; }
    protected default(): HolidayPlain {
        return new HolidayPlain(this.row);
    }

    get ID() { return this.row.ID.get(); }
    get Name() { return new HolidayName(this); }
    get Description() { return new HolidayDescription(this); }
    get Priority() { return this.wrap(this.row.Priority); }
    get Flags() { return this.wrap(this.row.Flags); }
    get Type() { return new HolidayType(this, this.row.CalendarFilterType); }
    get Texture() { return this.wrap(this.row.TextureFilename); }
}

export class HolidayWeekly extends HolidayBase {
    get Stages() { return new HolidayWeeklyStages(this); }
}

export class HolidayAnnual extends HolidayBase {
    get Stages() { return new HolidayAnnualStages(this); }
}

export class HolidayCustomPeriod extends HolidayBase {
    // custom periods can only be on stage 0
    get Period() { return new HolidayPeriod(this, 0); }
}

export class HolidayPlain extends HolidayBase {}

export class HolidayRegistryClass
    extends RegistryStaticNoClone<HolidayPlain,HolidaysRow,HolidaysQuery>
{
    protected Table(): Table<any, HolidaysQuery, HolidaysRow> & { add: (id: number) => HolidaysRow; } {
        return DBC.Holidays
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Holidays
    }
    Clear(entity: HolidayPlain): void {
        let name = DBC.HolidayNames.add(Ids.HolidayNames.id())
        let desc = DBC.HolidayDescriptions.add(Ids.HolidayDescriptions.id())
        name.Name.clear()
        desc.Description.clear()
        entity.row.HolidayNameID.set(name.ID.get())
        entity.row.HolidayDescriptionID.set(desc.ID.get())
        entity
            .Flags.set(0)
            .Priority.set(0)
            .Texture.set('')
            .Type.set(0)
    }
    protected FindByID(id: number): HolidaysRow {
        return DBC.Holidays.findById(id);
    }
    protected EmptyQuery(): HolidaysQuery {
        return {}
    }
    ID(e: HolidayPlain): number {
        return e.ID
    }
    protected Entity(r: HolidaysRow): HolidayPlain {
        return new HolidayPlain(r);
    }
}

export const HolidayRegistry = new HolidayRegistryClass();
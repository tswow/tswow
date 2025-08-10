import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { HolidaysQuery, HolidaysRow } from "../../dbc/Holidays";
import { TransformedEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { HolidayDescription, HolidayName } from "./HolidayLoc";
import { HolidayAnnualStages, HolidayPeriod, HolidayWeeklyStages } from "./HolidayStage";
export declare class HolidayType extends EnumCellTransform<HolidayBase> {
    set(value: number): HolidayBase;
    /** Enum Value = -1 */
    get YEARLY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<HolidayBase, HolidayAnnual>;
    /** Enum Value = 0 */
    get WEEKLY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<HolidayBase, HolidayWeekly>;
    /** Enum Value = 1 */
    get DEFINED_DATES(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<HolidayBase, HolidayAnnual>;
}
export declare class HolidayBase extends TransformedEntity<HolidaysRow, HolidayPlain> {
    protected transformer(): any;
    protected default(): HolidayPlain;
    get ID(): number;
    get Name(): HolidayName;
    get Description(): HolidayDescription;
    get Priority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Type(): HolidayType;
    get Texture(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
}
export declare class HolidayWeekly extends HolidayBase {
    get Stages(): HolidayWeeklyStages;
}
export declare class HolidayAnnual extends HolidayBase {
    get Stages(): HolidayAnnualStages;
}
export declare class HolidayCustomPeriod extends HolidayBase {
    get Period(): HolidayPeriod;
}
export declare class HolidayPlain extends HolidayBase {
}
export declare class HolidayRegistryClass extends RegistryStaticNoClone<HolidayPlain, HolidaysRow, HolidaysQuery> {
    protected Table(): Table<any, HolidaysQuery, HolidaysRow> & {
        add: (id: number) => HolidaysRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: HolidayPlain): void;
    protected FindByID(id: number): HolidaysRow;
    protected EmptyQuery(): HolidaysQuery;
    ID(e: HolidayPlain): number;
    protected Entity(r: HolidaysRow): HolidayPlain;
}
export declare const HolidayRegistry: HolidayRegistryClass;

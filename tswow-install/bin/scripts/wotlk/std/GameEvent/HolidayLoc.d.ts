import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { HolidayBase } from "./Holiday";
export declare class HolidayName extends LocSystem<HolidayBase> {
    private row;
    lang(lang: Language): Cell<string, HolidayBase> & PendingCell;
    get mask(): Cell<number, HolidayBase>;
    set(con: loc_constructor): HolidayBase;
    copy(): HolidayBase;
}
export declare class HolidayDescription extends LocSystem<HolidayBase> {
    private row;
    lang(lang: Language): Cell<string, HolidayBase> & PendingCell;
    get mask(): Cell<number, HolidayBase>;
    set(con: loc_constructor): HolidayBase;
    copy(): HolidayBase;
}

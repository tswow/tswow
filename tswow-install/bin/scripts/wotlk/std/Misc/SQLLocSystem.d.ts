import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
export declare abstract class SQLLocSystem<T> extends LocSystem<T> {
    protected abstract getMain(): Cell<string, any>;
    protected abstract getLoc(loc: Language): Cell<string, any>;
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}

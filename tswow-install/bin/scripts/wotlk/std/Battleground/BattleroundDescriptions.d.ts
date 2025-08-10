import { Cell } from "../../../data/cell/cells/Cell";
import { CellReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
export declare const descriptions: {
    [key: number]: loc_constructor;
};
export declare class DescriptionCell<T> extends Cell<string, T> {
    protected lang: Language;
    protected idCell: CellReadOnly<number, any>;
    constructor(owner: T, idCell: CellReadOnly<number, any>, lang: Language);
    exists(): boolean;
    get(): string;
    set(value: string): T;
}
export declare class BattlegroundDescription<T> extends LocSystem<T> {
    protected idCell: CellReadOnly<number, any>;
    constructor(owner: T, idCell: CellReadOnly<number, any>);
    lang(lang: Language): Cell<string, T> & PendingCell;
    get mask(): Cell<number, T>;
    set(con: loc_constructor): T;
}

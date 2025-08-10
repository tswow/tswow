import { Cell } from "../../../data/cell/cells/Cell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { PvpDifficultyRow } from "../../dbc/PvpDifficulty";
import { MainEntity } from "../Misc/Entity";
import { MinMaxCell } from "../Misc/LimitCells";
export declare class BattlegroundBracket extends MainEntity<PvpDifficultyRow> {
    get ID(): number;
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RangeIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Difficulty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Level(): MinMaxCell<this>;
}
export declare class BattlegroundBrackets<T> extends MultiRowSystem<BattlegroundBracket, T> {
    protected mapCell: Cell<number, any>;
    constructor(owner: T, mapCell: Cell<number, any>);
    protected getAllRows(): BattlegroundBracket[];
    protected isDeleted(value: BattlegroundBracket): boolean;
    add(mod: string, name: string, minLevel: number, maxLevel: number, difficulty?: number): T;
    addGet(mod: string, name: string): BattlegroundBracket;
    addMod(mod: string, name: string, callback: (bracket: BattlegroundBracket) => void): T;
}

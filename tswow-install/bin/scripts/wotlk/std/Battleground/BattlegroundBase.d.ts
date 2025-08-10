import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { BattlemasterListQuery, BattlemasterListRow } from "../../dbc/BattlemasterList";
import { battleground_templateRow } from "../../sql/battleground_template";
import { MinMaxCell } from "../Misc/LimitCells";
import { BattlegroundDescription } from "./BattleroundDescriptions";
export declare class BattlegroundBase extends CellSystemTop {
    dbc_row: BattlemasterListRow;
    sql_row: battleground_templateRow;
    get ID(): number;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): BattlegroundDescription<this>;
    get MaxGroupSize(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HolidayWorldState(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Weight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Level(): MinMaxCell<this>;
    get PlayersPerTeam(): MinMaxCell<this>;
    constructor(dbc_row: BattlemasterListRow, sql_row: battleground_templateRow);
}
export declare function filterBgsBase(query: BattlemasterListQuery): {
    dbc: BattlemasterListRow;
    sql: battleground_templateRow;
}[];
export declare function createBgBase(mod: string, id: string): {
    dbc: BattlemasterListRow;
    sql: battleground_templateRow;
};

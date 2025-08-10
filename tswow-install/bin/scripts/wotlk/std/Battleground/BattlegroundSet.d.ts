import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { battleground_setsRow } from "../../sql/battleground_sets";
import { MinMaxCell } from "../Misc/LimitCells";
import { BattlegroundBase } from "./BattlegroundBase";
export declare class SetEntries extends MultiRowSystem<battleground_setsRow, BattlegroundSet> {
    protected getAllRows(): battleground_setsRow[];
    protected isDeleted(value: battleground_setsRow): boolean;
    add(id: number): BattlegroundSet;
}
export declare class BattlegroundSet extends BattlegroundBase {
    get Entries(): SetEntries;
}
export declare class Battleground extends BattlegroundBase {
    get PlayersPerTeam(): MinMaxCell<this>;
}
export declare const ALL_ARENAS: BattlegroundSet;
export declare const ALL_BATTLEGROUNDS: BattlegroundSet;

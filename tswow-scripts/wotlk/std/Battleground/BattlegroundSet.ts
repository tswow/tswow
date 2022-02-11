import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DBC } from "../../DBCFiles";
import { battleground_setsRow } from "../../sql/battleground_sets";
import { SQL } from "../../SQLFiles";
import { MinMaxCell } from "../Misc/LimitCells";
import { BattlegroundBase } from "./BattlegroundBase";

export class SetEntries extends MultiRowSystem<battleground_setsRow,BattlegroundSet> {
    protected getAllRows(): battleground_setsRow[] {
        return SQL.battleground_sets.queryAll({set:this.owner.ID})
    }
    protected isDeleted(value: battleground_setsRow): boolean {
        return value.isDeleted()
    }

    add(id: number) {
        SQL.battleground_sets.add(this.owner.ID,id)
        return this.owner;
    }
}

export class BattlegroundSet extends BattlegroundBase {
    get Entries() { return new SetEntries(this); }
}

export class Battleground extends BattlegroundBase {
    get PlayersPerTeam() { return new MinMaxCell(this,
              this.sql_row.MinPlayersPerTeam
            , this.sql_row.MaxPlayersPerTeam
    ); }
}

const ALL_ARENA_ID = 6
export const ALL_ARENAS = new BattlegroundSet(
      DBC.BattlemasterList.findById(ALL_ARENA_ID)
    , SQL.battleground_template.query({ID:ALL_ARENA_ID})
)

const ALL_BGS_ID = 32;
export const ALL_BATTLEGROUNDS = new BattlegroundSet(
      DBC.BattlemasterList.findById(ALL_BGS_ID)
    , SQL.battleground_template.query({ID:ALL_BGS_ID})
)
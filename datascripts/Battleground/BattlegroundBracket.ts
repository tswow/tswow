import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata"
import { PvpDifficultyRow } from "wotlkdata/dbc/types/PvpDifficulty";
import { MainEntity } from "../Misc/Entity";
import { Battleground } from "./Battleground";
import { MinMaxCell } from "../Misc/LimitCells";
import { Ids } from "../Misc/Ids";

export class BattlegroundBracket extends MainEntity<PvpDifficultyRow> {
    get ID() { return this.row.ID.get(); }
    get MapID() { return this.wrap(this.row.MapID); }
    get RangeIndex() { return this.wrap(this.row.RangeIndex); }
    get Difficulty() { return this.wrap(this.row.Difficulty); }
    get Level() { return new MinMaxCell(
          this
        , this.row.MinLevel
        , this.row.MaxLevel); 
    }
}

export class BattlegroundBrackets extends MultiRowSystem<BattlegroundBracket,Battleground> {
    protected getAllRows(): BattlegroundBracket[] {
        return DBC.PvpDifficulty
            .filter({MapID:this.owner.Map.getRefID()})
            .map(x=>new BattlegroundBracket(x))
            .sort((a,b)=>a.RangeIndex.get() > b.RangeIndex.get() ? -1 : 1)
    }

    protected isDeleted(value: BattlegroundBracket): boolean {
        return value.row.isDeleted();
    }

    add(minLevel: number, maxLevel: number, difficulty = 0) {
        this.addMod(bracket=>bracket
            .Level.set(minLevel,maxLevel)
            .Difficulty.set(difficulty)
        )
        return this.owner;
    }

    addGet() {
        let rows = this.get()
        return new BattlegroundBracket(
                DBC.PvpDifficulty.add(Ids.PvpDifficulty.id())
            )
            .MapID.set(this.owner.Map.getRefID())
            .RangeIndex.set(
                rows.length === 0 
                    ? 0 
                    : rows[rows.length - 1].RangeIndex.get() + 1
            )
    }

    addMod(callback: (bracket: BattlegroundBracket)=>void) {
        callback(this.addGet());
        return this.owner;
    }
}
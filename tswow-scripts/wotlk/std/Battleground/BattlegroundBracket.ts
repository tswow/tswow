import { Cell } from "../../../data/cell/cells/Cell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { finish } from "../../../data/index";
import { PvpDifficultyRow } from "../../dbc/PvpDifficulty";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MinMaxCell } from "../Misc/LimitCells";

export class BattlegroundBracket extends MainEntity<PvpDifficultyRow> {
    get ID() { return this.row.ID.get(); }
    get Map() { return this.wrap(this.row.MapID); }
    get RangeIndex() { return this.wrap(this.row.RangeIndex); }
    get Difficulty() { return this.wrap(this.row.Difficulty); }
    get Level() { return new MinMaxCell(
          this
        , this.row.MinLevel
        , this.row.MaxLevel);
    }
}

export class BattlegroundBrackets<T> extends MultiRowSystem<BattlegroundBracket,T> {
    protected mapCell: Cell<number,any>

    constructor(owner: T, mapCell: Cell<number,any>) {
        super(owner);
        this.mapCell = mapCell;
    }

    protected getAllRows(): BattlegroundBracket[] {
        return DBC.PvpDifficulty
            .queryAll({MapID:this.mapCell.get()})
            .map(x=>new BattlegroundBracket(x))
            .sort((a,b)=>a.RangeIndex.get() > b.RangeIndex.get() ? -1 : 1)
    }

    protected isDeleted(value: BattlegroundBracket): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, name: string, minLevel: number, maxLevel: number, difficulty = 0) {
        this.addMod(mod,name,bracket=>bracket
            .Level.set(minLevel,maxLevel)
            .Difficulty.set(difficulty)
        )
        return this.owner;
    }

    addGet(mod: string, name: string) {
        let rows = this.get()
        return new BattlegroundBracket(
                DBC.PvpDifficulty.add(Ids.PvpDifficulty.id(mod,name))
            )
            .Map.set(this.mapCell.get())
            .RangeIndex.set(
                rows.length === 0
                    ? 0
                    : rows[rows.length - 1].RangeIndex.get() + 1
            )
    }

    addMod(mod: string, name: string, callback: (bracket: BattlegroundBracket)=>void) {
        callback(this.addGet(mod,name));
        return this.owner;
    }
}

finish('verify-brackets', ()=> {
    DBC.BattlemasterList
        .queryAll({})
        .forEach(x=>{
            if(x.MapID.get().filter(x=>x>=0).length > 1) return;
            const map = x.MapID.getIndex(0)
            const idString = `{bg=${x.ID.get()},map=${map}}`
            if(DBC.PvpDifficulty.queryAll({MapID:map}).length === 0) {
                throw new Error(
                      `Battleground ${idString} has no level brackets registered,`
                    + ` please add at least one level bracket`
                )
            }
        })
})
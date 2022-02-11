import { SQL } from "../../SQLFiles";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";

export class SpellRank<T> extends CellSystem<T>{
    @Transient
    spellId: number;

    constructor(owner: T, spellId: number) {
        super(owner);
        this.spellId = spellId;
    }

    protected getRow() {
        return SQL.spell_ranks.query({spell_id: this.spellId});
    }

    exists() {
        return SQL.spell_ranks.queryAll({spell_id: this.spellId}).length != 0;
    }

    set(firstSpell: number, rank: number) {
        SQL.spell_ranks.add(firstSpell,rank,{spell_id:this.spellId});
    }

    getFirstSpell() {
        return this.getRow() === undefined
            ? undefined
            : this.getRow().first_spell_id.get();
    }

    getRank() {
        return this.getRow().rank.get();
    }

    objectify() {
        return {
            firstSpell: this.getFirstSpell(),
            rank: this.getRank()
        }
    }
}
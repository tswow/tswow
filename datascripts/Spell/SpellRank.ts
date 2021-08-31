import { SQL } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Transient } from "wotlkdata/cell/serialization/Transient";

export class SpellRank<T> extends CellSystem<T>{
    @Transient
    spellId: number;

    constructor(owner: T, spellId: number) {
        super(owner);
        this.spellId = spellId;
    }

    protected getRow() {
        return SQL.spell_ranks.find({spell_id: this.spellId});
    }

    exists() {
        return SQL.spell_ranks.filter({spell_id: this.spellId}).length != 0;
    }

    set(firstSpell: number, rank: number) {
        SQL.spell_ranks.add(firstSpell,rank,{spell_id:this.spellId});
    }

    getFirstSpell() { return this.getRow().first_spell_id.get(); }
    getRank() { return this.getRow().rank.get(); }

    objectify() {
        return {
            firstSpell: this.getFirstSpell(),
            rank: this.getRank()
        }
    }
}
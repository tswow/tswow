import { MainSystem } from "wotlkdata/cell/MainSystem";
import { Spell } from "../Spell";
import { SpellEffects } from "../SpellEffect";
import { Transient } from "wotlkdata/cell/Transient";
import { SpellRank } from "../SpellRank";

export class SpellPreset extends MainSystem {
    @Transient
    protected spell: Spell;

    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    @Transient
    get Raw() { return this.spell; }

    get Name() { return this.wrapLoc(this.spell.Name); }
    get Description() { return this.wrapLoc(this.spell.Description); }

    get Effects(): SpellEffects<this> { return new SpellEffects(this, this.spell); }
    get ID() { return this.spell.ID; }

    get Rank() { return new SpellRank(this, this.ID); }
}
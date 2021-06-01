import { Spell } from "../Spell";
import { SpellEffects } from "../SpellEffect";
import { Transient } from "wotlkdata/cell/misc/Transient";
import { SpellRank } from "../SpellRank";
import { SpellSkillLineAbilites } from "../SpellSkillLines";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";

export class SpellPreset extends CellSystemTop {
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
    get AuraDescription() { return this.wrapLoc(this.spell.AuraDescription); }

    get Effects(): SpellEffects<this> { return new SpellEffects(this, this.spell); }
    get Rank() { return new SpellRank(this, this.ID); }
    get SkillLines() { return new SpellSkillLineAbilites(this, this.spell); }
    get ID() { return this.spell.ID; }
}
import { Spell } from "../Spell/Spell";
import { MainSystem } from "wotlkdata/cell/MainSystem";
import { SingleArraySystem } from "../Base/SingleArraySystem";
import { SpellAnimation } from "../Spell/SpellAnimation";
import { SpellCastTime } from "../Spell/SpellCastTime";
import { SoundEntry } from "../sound/SoundEntry";

export class GatheringSpell extends MainSystem {
    readonly spell: Spell

    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    get CastTime() { return new SpellCastTime(this, [this.spell.row.CastingTimeIndex]); }
    get RequiredTotems() { return new SingleArraySystem(this, this.spell.row.RequiredTotemCategoryID,0); }
    get Animation() { return new SpellAnimation(this, this.spell.Visual.PrecastKit.row.AnimID); }
    get Sound() { return new SoundEntry(this, this.spell.Visual.PrecastKit.row.SoundID); }
}
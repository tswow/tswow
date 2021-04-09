import { Spell } from "../Spell/Spell";
import { MainSystem } from "wotlkdata/cell/MainSystem";
import { SingleArraySystem } from "../Base/SingleArraySystem";
import { SpellAnimation } from "../Spell/SpellAnimation";
import { SharedRefs } from "../Refs/SharedRefs";

export class GatheringSpell extends MainSystem {
    readonly spell: Spell

    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    get CastTime() { return SharedRefs.getOrCreateCastTime(this, this.spell); }
    get RequiredTotems() { return new SingleArraySystem(this, this.spell.row.RequiredTotemCategoryID,0); }
    get Animation() { return new SpellAnimation(this, this.spell.Visual.Kits.Precast.row.AnimID); }
    get Sound() { return this.wrap(this.spell.Visual.Kits.Precast.SoundID); }
}
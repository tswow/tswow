import { Spell } from "../Spell/Spell";
import { MainSystem } from "wotlkdata/cell/MainSystem";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellAnimation } from "../Spell/SpellAnimation";
import { SpellCastTime } from "../Spell/SpellCastTime";
import { SoundEntry } from "../sound/SoundEntry";

export class GatheringSpell extends MainSystem {
    readonly Raw: Spell

    constructor(spell: Spell) {
        super();
        this.Raw = spell;
    }

    get CastTime() { return new SpellCastTime(this, [this.Raw.row.CastingTimeIndex]); }
    get RequiredTotems() { return new SingleArraySystem(this, this.Raw.row.RequiredTotemCategoryID,0); }
    get Animation() { return new SpellAnimation(this, this.Raw.PrecastKit.row.AnimID); }
    get Sound() { return new SoundEntry(this, this.Raw.PrecastKit.row.SoundID); }
}
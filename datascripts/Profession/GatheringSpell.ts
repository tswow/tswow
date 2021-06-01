import { Spell } from "../Spell/Spell";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellAnimation } from "../Spell/SpellAnimation";
import { SpellCastTime } from "../Spell/SpellCastTime";
import { SoundEntry } from "../Sound/SoundEntry";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";

export class GatheringSpell extends CellSystemTop {
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
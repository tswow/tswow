import { SpellPreset } from "./SpellPreset";
import { Spells } from "../Spells";
import { SpellAnimation } from "../SpellAnimation";
import { MulticastCell } from "../../Misc/MulticastCell";
import { SoundEntrySimple } from "../../sound/SoundEntrySimple";

export class ArmorSpell extends SpellPreset {
    static create(mod: string, id: string) {
        return new ArmorSpell(Spells.create(mod,id,687)
            .Name.enGB.set('Armor Spell'))
            .Description.enGB.set('A Demon skin-like armor spell')
            .Effects.clearAll()
    }

    get Animation() { return new SpellAnimation(this, this.spell.PrecastKit.row.AnimID) }

    get HandEffectPath() { return new MulticastCell(this, [
        this.spell.PrecastKit.LeftHandEffect.Filename,
        this.spell.PrecastKit.RightHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
    ])}

    get HeadEffect() { return this.wrap(this.spell.ImpactKit.HeadEffect.Filename); }
    get ImpactSound() { return new SoundEntrySimple(this, this.spell.ImpactKit.row.SoundID); }
    get CastSound() { return new SoundEntrySimple(this, this.spell.CastKit.row.SoundID); }
    get PrecastSound() { return new SoundEntrySimple(this, this.spell.PrecastKit.row.SoundID); }
}
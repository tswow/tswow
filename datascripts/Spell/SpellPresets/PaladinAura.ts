import { SpellPreset } from "./SpellPreset";
import { Spells } from "../Spells";
import { SoundEntrySimple } from "../../sound/SoundEntrySimple";
import { SpellAnimation } from "../SpellAnimation";

export class PaladinAura extends SpellPreset {
    static create(mod: string, id: string) {
        return new PaladinAura(Spells.create(mod,id,465)
            .Name.enGB.set('Paladin Aura'))
            .Description.enGB.set('A paladin-like aura')
            .Effects.clearAll()
    }

    get CastEffect() { return this.wrap(this.spell.CastKit.BaseEffect.Filename); }
    get ImpactEffect() { return this.wrap(this.spell.CastKit.BaseEffect.Filename); }
    get ImpactSound() { return new SoundEntrySimple(this, this.spell.ImpactKit.row.SoundID); }
    get CastAnimation() { return new SpellAnimation(this, this.spell.CastKit.row.AnimID); }
}
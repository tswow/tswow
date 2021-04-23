import { Spells } from "../Spells";
import { MulticastCell } from "../../Misc/MulticastCell";
import { SpellPreset } from "./SpellPreset";
import { SpellAnimation } from "../SpellAnimation";

export class InstantCastSpell extends SpellPreset {
    static create(mod: string, id: string) {
        return new InstantCastSpell(Spells.create(mod,id,172)
            .Name.enGB.set('Instant Spell')
            .Description.enGB.set('Casts instantly'))
            .Effects.clearAll()
    }

    get HandEffectPath() { return new MulticastCell(this, [
        this.spell.CastKit.LeftHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
    ])}
    get BaseEffectPath() { return this.wrap(this.spell.PrecastKit.BaseEffect.Filename); }
    get ImpactPath() { return this.wrap(this.spell.ImpactKit.ChestEffect.Filename) }
    get CastAnimation() { return new SpellAnimation(this, this.spell.CastKit.row.AnimID); }
}
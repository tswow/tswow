import { SpellPreset } from "./SpellPreset";
import { Spells } from "../Spells";
import { SchoolMask } from "../../Misc/School";
import { MulticastCell } from "../../Base/MulticastCell";
import { SpellChainEffect } from "../SpellChainEffect";
import { SoundEntry } from "../../sound/SoundEntry";
import { SoundEntrySimple } from "../../sound/SoundEntrySimple";
import { SpellAnimation } from "../SpellAnimation";
import { SpellCastTime } from "../SpellCastTime";
import { SpellRecovery } from "../SpellRecovery";

export class ChainSpell extends SpellPreset {
    static create(mod: string, id: string) {
        return new ChainSpell(Spells.create(mod,id,421)
            .SchoolMask.clearAll()
            .TargetType.clearAll()
            .Effects.clearAll()
            .Name.enGB.set('Chain Spell')
            .Description.enGB.set('Template spell with a chain effect'))
    }

    get SchoolMask() { return new SchoolMask(this, this.spell.row.SchoolMask); }
    get HandEffectPath() { return new MulticastCell(this, [
        this.spell.PrecastKit.LeftHandEffect.Filename,
        this.spell.PrecastKit.RightHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
    ])}

    get CastTime() { return new SpellCastTime(this, this.spell.row.CastingTimeIndex); }
    get Cooldown() { return new SpellRecovery(this, this.spell); }

    get PrecastSound() { return new SoundEntrySimple(this, this.spell.PrecastKit.row.SoundID); }
    get CastSound() { return new SoundEntrySimple(this, this.spell.CastKit.row.SoundID); }
    get ImpactSound() { return new SoundEntrySimple(this, this.spell.ImpactKit.row.SoundID); }

    get CastAnimation() { return new SpellAnimation(this, this.spell.CastKit.row.AnimID); }
    get ImpactAnimation() { return new SpellAnimation(this, this.spell.ImpactKit.row.AnimID); }

    get ImpactPath() { return this.wrap(this.spell.ImpactKit.ChestEffect.Filename) }
    get MissilePath() { return this.wrap(this.spell.MissileModel.Filename); }
    get ChainEffect() { return new SpellChainEffect(this, this.wrapIndex(this.spell.CastKit.row.CharParamZero,0))}
}
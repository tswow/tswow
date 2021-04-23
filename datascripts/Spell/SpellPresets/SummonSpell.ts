import { SpellPreset } from "./SpellPreset";
import { Spells } from "../Spells";
import { Spell } from "../Spell";
import { MulticastCell } from "../../Misc/MulticastCell";
import { SoundEntrySimple } from "../../sound/SoundEntrySimple";
import { SpellAnimation } from "../SpellAnimation";

export class SummonSpell extends SpellPreset {
    static create(mod: string, id: string) {
        return new SummonSpell(Spells.create(mod,id,688)
            .Name.enGB.set('Summon Spell')
            .Description.enGB.set('Summons a <?> to do your bidding.')
            .Effects
                .getTemplate(0).setSummonPet()
                .SummonedCreature.set(0)
            .end)
    }

    constructor(spell: Spell) {
        super(spell);
    }

    get HandEffectPath() { return new MulticastCell(this, [
        this.spell.PrecastKit.LeftHandEffect.Filename,
        this.spell.PrecastKit.RightHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
        this.spell.CastKit.LeftHandEffect.Filename,
    ])}

    get CastSound() { return new SoundEntrySimple(this, this.spell.CastKit.row.SoundID); }
    get PrecastSound() { return new SoundEntrySimple(this, this.spell.PrecastKit.row.SoundID); }
    get ChannelSound() { return new SoundEntrySimple(this, this.spell.ChannelKit.row.SoundID); }

    get PrecastAnimation() { return new SpellAnimation(this, this.spell.PrecastKit.row.AnimID); }
    get CastAnimation() { return new SpellAnimation(this, this.spell.CastKit.row.AnimID); }
    get ImpactAnimation() { return new SpellAnimation(this, this.spell.ImpactKit.row.AnimID); }

    get SummonedCreature() { return this.wrap(this.spell.Effects.get(0).MiscValueA); }
    get BaseEffectPath() { return this.wrap(this.spell.PrecastKit.BaseEffect.Filename); }
    get ImpactPath() { return this.wrap(this.spell.ImpactKit.BaseEffect.Filename) }
}
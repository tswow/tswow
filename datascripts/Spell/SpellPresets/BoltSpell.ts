import { Spells } from "../Spells";
import { SchoolMask } from "../../Misc/School";
import { SpellPreset } from "./SpellPreset";
import { SpellCastTime } from "../SpellCastTime";
import { SpellRecovery } from "../SpellRecovery";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";

export class BoltSpell extends SpellPreset {
    static create(mod: string, id: string) {
        return new BoltSpell(Spells.create(mod,id,686)
            .SchoolMask.clearAll()
            .TargetType.clearAll()
            .Effects.clearAll()
            .Name.enGB.set('Bolt Spell')
            .Description.enGB.set('Bolt spell doing x damage.'))
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
    get ImpactChest() { return this.wrap(this.spell.ImpactKit.ChestEffect.Filename) }
    get MissilePath() { return this.wrap(this.spell.MissileModel.Filename); }
}
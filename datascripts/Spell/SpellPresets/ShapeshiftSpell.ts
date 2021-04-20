import { SpellPreset } from "./SpellPreset";
import { Spells } from "../Spells";
import { MulticastCell } from "../../Base/MulticastCell";
import { SoundEntrySimple } from "../../sound/SoundEntrySimple";
import { Ids } from "../../Base/Ids";
import { DBC } from "wotlkdata";
import { Spell } from "../Spell";
import { CreatureTypeEnum } from "../../Creature/CreatureType";
import { SpellIconCell } from "../SpellIcon";
import { SingleArraySystem } from "../../Base/SingleArraySystem";
import { ShapeshiftFlags } from "../ShapeshiftFlags";

export class ShapeshiftSpell extends SpellPreset {
    static create(mod: string, id: string) {
        let shapeshiftId = Ids.SpellShapeshiftForm.id();
        DBC.SpellShapeshiftForm.add(shapeshiftId)
        return new ShapeshiftSpell(Spells.create(mod,id,768)
            .Name.enGB.set('Shapeshift Spell'))
            .Description.enGB.set('A druid-like shapeshifting spell')
            .Effects.clear(1)
            .Effects.get(0).MiscValueA.set(shapeshiftId).end
            .ShapeshiftFlags.clearAll()
            .DisplayID.clearAll()
    }

    get shapeshift_row() { 
        return DBC.SpellShapeshiftForm.findById(
            this.spell.Effects.get(0).MiscValueA.get()); 
    }

    get HandEffectPath() { return new MulticastCell(this, [
        this.spell.PrecastKit.LeftHandEffect.Filename,
        this.spell.PrecastKit.RightHandEffect.Filename,
    ])}

    get ImpactSound() { return new SoundEntrySimple(this, this.spell.ImpactKit.row.SoundID); }
    get PrecastSound() { return new SoundEntrySimple(this, this.spell.PrecastKit.row.SoundID); }

    get CreatureType() { return new CreatureTypeEnum(this, this.shapeshift_row.CreatureType)}
    get AttackIcon() { return new SpellIconCell(this, this.shapeshift_row.AttackIconID); }

    get CombatRoundTime() { return this.wrap(this.shapeshift_row.CombatRoundTime); }
    get DisplayID() { return new SingleArraySystem(this, this.shapeshift_row.CreatureDisplayID, 0)}

    get ShapeshiftFlags() { return new ShapeshiftFlags(this, this.shapeshift_row.Flags); }
}
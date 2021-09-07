import { DBC } from "wotlkdata"
import { SpellItemEnchantmentQuery, SpellItemEnchantmentRow } from "wotlkdata/dbc/types/SpellItemEnchantment";
import { ItemEffectsPointer } from "../Item/ItemVisualEffect";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids"
import { RefStatic } from "../Refs/Ref";
import { EnchantmentConditionRef } from "./EnchantmentCondition";
import { EnchantmentEffects } from "./EnchantmentEffect";
import { EnchantmentFlags } from "./EnchantmentFlags";
import { EnchantmentSpells } from "./EnchantmentSpells";

export class Enchantment extends MainEntity<SpellItemEnchantmentRow> {
    get Charges() { return this.wrap(this.row.Charges); }
    get Effects() { return new EnchantmentEffects(this); }
    get ID() { return this.row.ID.get(); }
    /**
     * All spells that are used to cast this enchantment.
     *
     * For spells cast by the enchantment itself, see "Effects"
     */
    get EnchantSpells() { return new EnchantmentSpells(this); }
    get ItemVisuals() { return new ItemEffectsPointer(this, this.row.ItemVisual); }
    get Flags() { return new EnchantmentFlags(this, this.row.Flags); }
    get Condition() { return new EnchantmentConditionRef(this, this.row.Condition_Id); }
    get Name() { return this.wrapLoc(this.row.Name); }
}

export const EnchantmentRegistry = {
    create(mod: string, id: string, parent: number = 0) {
        if(parent > 0) {
            return new Enchantment(DBC.SpellItemEnchantment
                .findById(parent)
                .clone(Ids.SpellItemEnchantment.id(mod,id))
            )
        }
        let ench = DBC.SpellItemEnchantment
            .add(Ids.SpellItemEnchantment.id(mod,id))
            .RequiredSkillID.set(0)
            .RequiredSkillRank.set(0)
            .Src_ItemID.set(0)
            .Charges.set(0)
            .Condition_Id.set(0)
            .Effect.set([0,0,0])
            .EffectArg.set([0,0,0])
            .EffectPointsMax.set([0,0,0])
            .EffectPointsMin.set([0,0,0])
            .Flags.set(0)
            .ItemVisual.set(0)
            .MinLevel.set(0)
        ench.Name.clear();
        return new Enchantment(ench);
    },

    load(id: number) {
        return new Enchantment(DBC.SpellItemEnchantment.findById(id))
    },

    filter(query: SpellItemEnchantmentQuery) {
        return DBC.SpellItemEnchantment
            .filter(query)
            .map(x=>new Enchantment(x))
    },

    find(query: SpellItemEnchantmentQuery) {
        return new Enchantment(DBC.SpellItemEnchantment.find(query));
    }
}

export class EnchantmentRef<T> extends RefStatic<T,Enchantment> {
    protected create(mod: string, id: string): Enchantment {
        return EnchantmentRegistry.create(mod,id);
    }
    protected clone(mod: string, id: string): Enchantment {
        return EnchantmentRegistry.create(mod,id,this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Enchantment): number {
        return v.ID;
    }
    protected resolve(): Enchantment {
        return EnchantmentRegistry.load(this.cell.get());
    }
}
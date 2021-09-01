import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { Items, ItemTemplateRef } from "../Item/ItemTemplate";
import { Spell } from "../Spell/Spell";
import { std } from "../tswow-stdlib-data";
import { Enchantment } from "./Enchantment";
import { SpellReagents } from "../Spell/SpellReagents";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellCastTimePointer } from "../Spell/SpellCastTime";
import { Spells } from "../Spell/Spells";
import { SpellItemEquips } from "../Spell/SpellItemEquips";
import { SpellVisualPointer } from "../Spell/SpellVisual";

export class EnchantmentSpell extends CellSystemTop {
    protected readonly spell: Spell;
    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    get ValidTarget() { return new SpellItemEquips(this, this.spell.row); }
    get Reagents() { return new SpellReagents(this, this.spell); }
    get Totems() { return new SingleArraySystem(this,this.spell.row.RequiredTotemCategoryID,0); }
    get CastTime() { return new SpellCastTimePointer(this, this.spell.row.CastingTimeIndex); }
    get SpellFocus() { return this.wrap(this.spell.RequiresSpellFocus); }
    get Name() { return this.wrapLoc(this.spell.Name); }
    get Subtext() { return this.wrapLoc(this.spell.Subtext); }
    get Visual() {
        return new SpellVisualPointer(
              this
            , this.wrapIndex(this.spell.row.SpellVisualID,0)
        )
    }

    AsSpell() { return this.spell; }

    // TODO: Spell effect in other slot?
    get Item() {
        return new ItemTemplateRef(this
            , this.spell.Effects.get(0)
                .EffectType.setEnchantItem().EnchantingItem
        )
    }
}

export class EnchantmentSpells extends MultiRowSystem<EnchantmentSpell,Enchantment> {
    protected getAllRows(): EnchantmentSpell[] {
        // TODO: false positives
        return std.Spells.filter({Effect:53,EffectMiscValue:this.owner.ID})
            .map(x=>new EnchantmentSpell(x))
    }
    protected isDeleted(value: EnchantmentSpell): boolean {
        return value.AsSpell().row.isDeleted();
    }

    add(mod: string, id: string, createItem = true) {
        let spell = Spells.create(mod,`${id}-spell`)
            .Attributes.isTradeSpell.mark()
            .Attributes.notShapeshifted.mark()
            .Attributes.noThreat.mark()
            .Attributes.mark(25)
            .TargetType.Item.mark()
            .InterruptFlags.OnMovement.mark()
            .InterruptFlags.OnPushback.mark()
            .InterruptFlags.OnInterruptCast.mark()
            .InterruptFlags.mark(3)
            .CastTime.setRefID(6)
            .Visual.setRefID(3182)

        let itemId = 0;
        if(createItem) {
            let item = Items.create(mod,`${id}-item`)
                .Spells.modFree(ispell=>{
                    ispell.SpellID.set(spell.ID)
                        .Trigger.setOnUse()
                        .Charges.set(-1)
                })
                .Class.setItemEnhancement()
                .Material.setCloth()
                .Flags.PlayerCast.mark()
                .Flags.IgnoreReagents.mark()
                .InventoryType.setNonEquippable()
                .MaxStack.set(5)
                .Bonding.setNoBounds()
                .DisplayInfo.setRefID(811)

            spell.Effects.modFree(effect=>{
                effect.EffectType.setEnchantItem()
                    .Enchant.set(this.owner.ID)
                    .EnchantingItem.set(item.ID);
            });
            itemId = item.ID
        }

        spell.Effects.modFree(effect=>{
            effect.EffectType.setEnchantItem()
                .Enchant.set(this.owner.ID)
                .EnchantingItem.set(itemId)
        });

        return new EnchantmentSpell(spell);
    }

    addMod(mod: string, id: string, createItem: boolean, callback: (spell: EnchantmentSpell)=>void = ()=>{}) {
        callback(this.add(mod,id,createItem));
        return this.owner;
    }
}
import { CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { Spell } from "../Spell/Spell";
import { SpellCastTimeRegistry } from "../Spell/SpellCastTime";
import { SpellItemEquips } from "../Spell/SpellItemEquips";
import { SpellReagents } from "../Spell/SpellReagents";
import { SpellRegistry } from "../Spell/Spells";
import { SpellVisualRegistry } from "../Spell/SpellVisual";
import { std } from "../tswow-stdlib-data";
import { Enchantment } from "./Enchantment";

export class EnchantmentSpell extends CellSystemTop {
    protected readonly spell: Spell;
    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    get ValidTarget() { return new SpellItemEquips(this, this.spell.row); }
    get Reagents() { return new SpellReagents(this, this.spell); }
    get Totems() { return new SingleArraySystem(this,this.spell.row.RequiredTotemCategoryID,0); }
    get CastTime() { return SpellCastTimeRegistry.ref(this, this.spell.row.CastingTimeIndex); }
    get SpellFocus() { return this.wrap(this.spell.RequiresSpellFocus); }
    get Name() { return this.wrapLoc(this.spell.Name); }
    get Subtext() { return this.wrapLoc(this.spell.Subtext); }
    get Visual() {
        return SpellVisualRegistry.ref(
              this
            , this.wrapIndex(this.spell.row.SpellVisualID,0)
        )
    }

    AsSpell() { return this.spell; }

    // TODO: Spell effect in other slot?
    get Item() {
        return ItemTemplateRegistry.ref(this
            , this.spell.Effects.get(0)
                .Type.EnchantItem.as().EnchantingItem
        )
    }
}

export class EnchantmentSpells extends MultiRowSystem<EnchantmentSpell,Enchantment> {
    protected getAllRows(): EnchantmentSpell[] {
        // TODO: false positives
        return std.Spells
            .queryAll({Effect:53,EffectMiscValue:this.owner.ID})
            .map(x=>new EnchantmentSpell(x))
    }
    protected isDeleted(value: EnchantmentSpell): boolean {
        return value.AsSpell().row.isDeleted();
    }

    add(mod: string, id: string, createItem = true) {
        let spell = SpellRegistry.create(mod,`${id}-spell`)
            .Attributes.isTradeSpell.set(true)
            .Attributes.notShapeshifted.set(true)
            .Attributes.noThreat.set(true)
            .Attributes.setBit(25, true)
            .TargetType.Item.set(true)
            .InterruptFlags.OnMovement.set(true)
            .InterruptFlags.OnPushback.set(true)
            .InterruptFlags.OnInterruptCast.set(true)
            .InterruptFlags.setBit(3, true)
            .CastTime.set(6)
            .Visual.set(3182)

        let itemId = 0;
        if(createItem) {
            let item = ItemTemplateRegistry.create(mod,`${id}-item`)
                .Spells.addMod(ispell=>{
                    ispell.Spell.set(spell.ID)
                        .Trigger.OnUse.set()
                        .Charges.set(-1)
                })
                .Class.ItemEnhancement.set()
                .Material.Cloth.set()
                .Flags.PlayerCast.set(true)
                .Flags.IgnoreReagents.set(true)
                .InventoryType.NonEquippable.set()
                .MaxStack.set(5)
                .Bonding.NoBounds.set()
                .Quality.White.set()
                .DisplayInfo.set(811)

            spell.Effects.addMod(effect=>{
                effect.Type.EnchantItem.set()
                    .Enchant.set(this.owner.ID)
                    .EnchantingItem.set(item.ID);
            });
            itemId = item.ID
        }

        spell.Effects.addMod(effect=>{
            effect.Type.EnchantItem.set()
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
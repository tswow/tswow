import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { Spell } from "../Spell/Spell";
import { SpellCastTimeRegistry } from "../Spell/SpellCastTime";
import { SpellItemEquips } from "../Spell/SpellItemEquips";
import { SpellReagents } from "../Spell/SpellReagents";
import { SpellRegistry } from "../Spell/Spells";
import { SpellVisualRegistry } from "../Spell/SpellVisual";
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
    get SpellName() { return this.wrapLoc(this.spell.Name); }
    get SpellDescription() { return this.wrapLoc(this.spell.Description); }
    get ItemName() { return this.wrapLoc(this.Item.getRef().Name)}
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
        return ItemTemplateRegistry.ref(
              this
            , this.spell.Effects.get(0)
                .Type.ENCHANT_ITEM.as()
                     .EnchantingItem
        )
    }
}

export class EnchantmentSpells extends MultiRowSystem<EnchantmentSpell,Enchantment> {
    protected getAllRows(): EnchantmentSpell[] {
        // TODO: false positives
        return SpellRegistry
            .queryAll({Effect:53,EffectMiscValue:this.owner.ID})
            .map(x=>new EnchantmentSpell(x))
    }
    protected isDeleted(value: EnchantmentSpell): boolean {
        return value.AsSpell().row.isDeleted();
    }

    add(mod: string, id: string, createItem = true) {
        let spell = SpellRegistry.create(mod,`${id}-spell`)
            .Attributes.IS_TRADE_SPELL.set(true)
            .Attributes.NOT_SHAPESHIFTED.set(true)
            .Attributes.NO_THREAT.set(true)
            .Attributes.setBit(25, true)
            .TargetType.ITEM.set(true)
            .InterruptFlags.ON_MOVEMENT.set(true)
            .InterruptFlags.ON_PUSHBACK.set(true)
            .InterruptFlags.ON_INTERRUPT_CAST.set(true)
            .InterruptFlags.setBit(3, true)
            .CastTime.set(6)
            .Visual.set(3182)

        let itemId = 0;
        if(createItem) {
            let item = ItemTemplateRegistry.create(mod,`${id}-item`)
                .Spells.addMod(ispell=>{
                    ispell.Spell.set(spell.ID)
                        .Trigger.ON_USE.set()
                        .Charges.set(1,'DELETE_ITEM')
                })
                .Class.ITEM_ENHANCEMENT.set()
                .Material.CLOTH.set()
                .Flags.PLAYER_CAST.set(true)
                .Flags.IGNORE_REAGENTS.set(true)
                .InventoryType.NON_EQUIPPABLE.set()
                .MaxStack.set(5)
                .Bonding.NO_BOUNDS.set()
                .Quality.WHITE.set()
                .DisplayInfo.set(811)

            spell.Effects.addMod(effect=>{
                effect.Type.ENCHANT_ITEM.set()
                    .Enchant.set(this.owner.ID)
                    .EnchantingItem.set(item.ID);
            });
            itemId = item.ID
        }

        spell.Effects.addMod(effect=>{
            effect.Type.ENCHANT_ITEM.set()
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
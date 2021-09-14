import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { CellSystemTop, LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { Language } from "wotlkdata/dbc/Localization";
import { GlyphPropertiesQuery, GlyphPropertiesRow } from "wotlkdata/dbc/types/GlyphProperties";
import { loc_constructor } from "wotlkdata/primitives";
import { Items, ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Spell, SpellRef } from "../Spell/Spell";
import { SpellIconCell } from "../Spell/SpellIcon";
import { Spells } from "../Spell/Spells";

export class GlyphFlags extends MaskCell32<Glyph> {
    get IsMinor() { return this.bit(0); }
}

export class GlyphItemName extends LocSystem<GlyphItem> {
    lang(lang: Language): Cell<string, GlyphItem> & PendingCell {
        return new MulticastCell(this.owner,[
                  this.owner.GetSpell().Name.lang(lang)
                , this.owner.GetItem().Name.lang(lang)
        ])
    }

    get mask(): Cell<number, GlyphItem> {
        return new MulticastCell(this.owner,[
            this.owner.GetSpell().Name.mask
          , this.owner.GetItem().Name.mask
        ])
    }

    set(con: loc_constructor): GlyphItem {
        this.owner.GetSpell().Name.set(con);
        this.owner.GetItem().Name.set(con);
        return this.owner;
    }
}

export class GlyphItem extends CellSystemTop {
    protected spell: Spell;
    protected item: ItemTemplate

    constructor(spell: Spell, item: ItemTemplate) {
        super();
        this.spell = spell;
        this.item = item;
    }

    get Name() { return new GlyphItemName(this); }
    // It's only the spell description that should be visible
    get Description() { return this.wrapLoc(this.spell.Description); }

    GetSpell() { return this.spell; }
    GetItem() { return this.item; }

    delete() {
        this.spell.row.delete();
        this.item.row.delete();
        return this;
    }

    undelete() {
        this.spell.row.undelete();
        this.item.row.undelete();
        return this;
    }
}

export class GlyphItems extends MultiRowSystem<GlyphItem,Glyph> {
    protected getAllRows(): GlyphItem[] {
        // TODO: can get false positives if combining 74 with other spell types
        let spells = Spells.filter({Effect:74,EffectMiscValue:this.owner.ID})
        let glyphItems: GlyphItem[] = [];
        spells.forEach(spell=>{
            // TODO: bad not good
            let items = Items.filter({spellid_1:spell.ID});
            items = items.concat(Items.filter({spellid_2:spell.ID}));
            items = items.concat(Items.filter({spellid_3:spell.ID}));
            items = items.concat(Items.filter({spellid_4:spell.ID}));
            items = items.concat(Items.filter({spellid_5:spell.ID}));
            glyphItems = glyphItems.concat(items.map(x=>new GlyphItem(spell,x)))
        });
        return glyphItems;
    }

    add(mod: string, id: string) {
        let spell = Spells.create(mod,`${id}-spell`)
            .Attributes.cannotUseInCombat.set(true)
            .Icon.set('Interface\\Icons\\INV_Inscription_Tradeskill01')
            .TargetType.GlyphSlot.set(true)
            .CastTime.set(6)
            .Effects.addMod(effect=>{
                effect.EffectType.ApplyGlyph.set()
                      .Glyph.set(this.owner.ID)
            })
            .InterruptFlags.OnMovement.set(true)
            .InterruptFlags.OnPushback.set(true)
            .InterruptFlags.OnInterruptCast.set(true)
            .InterruptFlags.setBit(3, true)
            .InterruptFlags.setBit(4, true)
            .InterruptFlags.setBit(5, true)

        let item = Items.create(mod,`${id}-item`)
            .BagFamily.set(16)
            .Quality.White.set()
            .Spells.addMod(ispell=>{
                ispell.SpellID.set(spell.ID)
                    .Trigger.OnUse.set()
                    .Charges.set(-1)
            })
            .Material.Liquid.set()
            .Flags.PlayerCast.set(true)
            .InventoryType.NonEquippable.set()
            .DisplayInfo.set(58841)
            .ClassMask.clearAll()

        return new GlyphItem(spell,item);
    }

    addMod(mod: string, id: string, callback: (glyphitem: GlyphItem)=>void = ()=>{}) {
        callback(this.add(mod,id));
        return this.owner;
    }

    protected isDeleted(value: GlyphItem): boolean {
        let itemDeleted = value.GetItem().row.isDeleted();
        let spellDeleted = value.GetSpell().row.isDeleted();
        let sid = value.GetSpell().ID;
        let iid = value.GetItem().ID;
        if(itemDeleted != spellDeleted) {
            throw new Error(
                `GlyphItem for ${this.owner.ID} has deleted `
                +`${spellDeleted?
                      `spell (id=${sid}), but not item (id=${iid})`
                    : `item (id=${iid}), but not spell (id=${sid})`
                }`
            )
        }

        return itemDeleted && spellDeleted;
    }
}

export class Glyph extends MainEntity<GlyphPropertiesRow> {
    get ID() { return this.row.ID.get(); }
    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }
    get Spell() { return new SpellRef(this, this.row.SpellID); }
    get Flags() { return new GlyphFlags(this, this.row.GlyphSlotFlags); }
    get Items() { return new GlyphItems(this); }
}

export const GlyphRegistry = {
    create(spellId: number) {
        return new Glyph(
            DBC.GlyphProperties.add(Ids.GlyphSlot.id())
               .GlyphSlotFlags.set(0)
               .SpellID.set(spellId)
               .SpellIconID.set(0)
        )
    },

    createWithSpell(mod: string, id: string, parentSpell = 0) {
        return this.create(Spells.create(mod,id,parentSpell).ID)
    },

    load(id: number) {
        return new Glyph(DBC.GlyphProperties.find({ID:id}));
    },

    filter(query: GlyphPropertiesQuery) {
        return DBC.GlyphProperties.filter(query)
            .map(x=>new Glyph(x))
    },

    find(query: GlyphPropertiesQuery) {
        return DBC.GlyphProperties.find(query);
    }
}
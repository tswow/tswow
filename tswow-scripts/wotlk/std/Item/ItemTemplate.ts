/*
* This file is part of tswow (https://github.com/tswow)
*
* Copyright (C) 2020 tswow <https://github.com/tswow/>
* This program is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License as
* published by the Free Software Foundation, version 3.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
* See the GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/>.
*/
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { ItemRow } from "../../dbc/Item";
import { DBC } from "../../DBCFiles";
import { item_templateQuery, item_templateRow } from "../../sql/item_template";
import { SQL } from "../../SQLFiles";
import { ClassMask } from "../Class/ClassRegistry";
import { EnchantmentRegistry } from "../Enchant/Enchantment";
import { HolidayRegistry } from "../GameEvent/Holiday";
import { CellBasic } from "../GameObject/ElevatorKeyframes";
import { GemRegistry } from "../Gem/Gem";
import { getInlineID } from "../InlineScript/InlineScript";
import { LockRegistry } from "../Locks/Locks";
import { Loot, LootSet, LootSetRef } from "../Loot/Loot";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { DurationCell } from "../Misc/DurationCell";
import { MainEntityID } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { MaybeDBCEntity } from "../Misc/SQLDBCEntity";
import { PageTextRegistry } from "../PageText/PageText";
import { RaceMask } from "../Race/RaceType";
import { RegistryStatic } from "../Refs/Registry";
import { TotemCategoryRegistry } from "../TotemCategory/TotemCategory";
import { BagFamily } from "./BagFamily";
import { ItemAmmoType } from "./ItemAmmoTypes";
import { ItemBonding } from "./ItemBonding";
import { ItemClass } from "./ItemClass";
import { ItemDamages } from "./ItemDamage";
import { ItemDisplayinfoRegistry } from "./ItemDisplayInfo";
import { ItemFlags } from "./ItemFlags";
import { ItemFlagsCustom } from "./ItemFlagsCustom";
import { ItemFlagsExtra } from "./ItemFlagsExtra";
import { ItemFoodType } from "./ItemFoodType";
import { ItemInventoryType } from "./ItemInventoryType";
import { ItemMaterial } from "./ItemMaterial";
import { ItemMoneyLoot } from "./ItemMoneyLoot";
import { ItemPrice } from "./ItemPrice";
import { ItemQuality } from "./ItemQuality";
import { ItemRequiredFaction } from "./ItemRequiredFaction";
import { ItemRequirements } from "./ItemRequirements";
import { ItemResistance } from "./ItemResistances";
import { ItemScalingStat } from "./ItemScalingStat";
import { ItemSetRegistry } from "./ItemSet";
import { ItemSetName, ItemSetNameRow } from "./ItemSetName";
import { ItemSheath } from "./ItemSheath";
import { ItemSockets } from "./ItemSocket";
import { ItemSpells } from "./ItemSpells";
import { ItemStats } from "./ItemStats";
import { ItemDescription, ItemName } from "./ItemText";
import { PageMaterialCell } from "./PageMaterial";

export class ItemDBC extends MaybeDBCEntity<ItemTemplate,ItemRow> {
    protected createDBC(): ItemRow {
        return DBC.Item.add(this.owner.ID)
            .SheatheType.set(0)
            .Material.set(0)
            .Sound_Override_Subclassid.set(0)
            .SubclassID.set(this.owner.row.subclass.get())
            .ClassID.set(this.owner.row.class.get())
            .DisplayInfoID.set(this.owner.row.displayid.get())
            .InventoryType.set(this.owner.row.InventoryType.get())
    }
    protected findDBC(): ItemRow {
        return DBC.Item.findById(this.owner.ID)
    }
    protected isValidDBC(dbc: ItemRow): boolean {
        return dbc.ID.get() === this.owner.ID;
    }

    get ClassID()       { return this.wrapDBC(0,dbc=>dbc.ClassID)}
    get SubclassID()    { return this.wrapDBC(0,dbc=>dbc.SubclassID)}
    get SoundOverride() { return this.wrapDBC(0,dbc=>dbc.Sound_Override_Subclassid)}
    get Material()      { return this.wrapDBC(0,dbc=>dbc.Material)}
    get DisplayInfoID() { return this.wrapDBC(0,dbc=>dbc.DisplayInfoID)}
    get InventoryType() { return this.wrapDBC(0,dbc=>dbc.InventoryType)}
    get SheatheType()   { return this.wrapDBC(0,dbc=>dbc.SheatheType)}
}

export class ItemDBCRow extends CellSystem<ItemTemplate> {
    protected readonly DBC = new ItemDBC(this.owner)
    exists() { return this.DBC.exists(); }
    get() { return this.DBC.getOrCreateDBC(); }
    mod(callback: (row: ItemRow)=>void) {
        callback(this.get());
        return this.owner;
    }

    static dbc(inst: ItemTemplate) {
        return inst.DBCRow.DBC;
    }
}

export class ItemTemplate extends MainEntityID<item_templateRow> {
    @Transient
    protected get dbc() { return ItemDBCRow.dbc(this); }
    readonly DBCRow = new ItemDBCRow(this);
    protected ItemSetNameRow = new ItemSetNameRow(this);
    static ItemSetNameRow(template: ItemTemplate) {
        return template.ItemSetNameRow;
    }

    get Name() { return new ItemName(this); }
    get ItemSetName() { return new ItemSetName(this); }
    get Socket() { return new ItemSockets(this); }
    get StartQuest() { return this.wrap(this.row.startquest); }
    get Lock() { return LockRegistry.ref(this, this.row.lockid); }
    get RandomProperty() { return this.wrap(this.row.RandomProperty); }
    get RandomSuffix() { return this.wrap(this.row.RandomSuffix); }
    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'Item'
            , 'livescript'
        ) as _hidden.Item<this>
    }

    /** Only applicable if item is a shield */
    get Block() { return this.wrap(this.row.block); }
    get ItemSet() { return ItemSetRegistry.ref(this, this.row.itemset); }
    get Resistances() { return new ItemResistance(this); }
    get Stats() { return new ItemStats(this); }
    get Area() { return this.wrap(this.row.area); }
    get Map() { return this.wrap(this.row.Map); }
    get BagFamily() {
        return makeMaskCell32(BagFamily,this, this.row.BagFamily);
    }
    get TotemCategory() {
        return TotemCategoryRegistry.ref(this, this.row.TotemCategory);
    }
    get Sheath() {
        return makeEnumCell(ItemSheath,this, this.row.sheath);
    }
    get ScalingStats() { return new ItemScalingStat(this); }
    get Armor() { return this.wrap(this.row.armor); }
    get BonusArmor() { return this.wrap(this.row.ArmorDamageModifier); }
    get Delay() {
        return new DurationCell(
            this, 'MILLISECONDS', false, this.row.delay
        )
    }
    get RangeMod() { return this.wrap(this.row.RangedModRange); }
    get Description() { return new ItemDescription(this); }
    get Quality() {
        return makeEnumCell(ItemQuality,this, this.row.Quality);
    }
    get Durability() { return this.wrap(this.row.MaxDurability); }
    get Disenchant() { return Loot.Disenchant.ref(this, this.row.DisenchantID); }
    get RequiredLevel() { return this.wrap(this.row.RequiredLevel); }
    get ItemLevel() { return this.wrap(this.row.ItemLevel); }
    get RequiredSpell() { return this.wrap(this.row.requiredspell); }
    get RequiredHonorRank() { return this.wrap(this.row.requiredhonorrank); }
    get ClassMask() { return makeMaskCell32(ClassMask, this, this.row.AllowableClass, true); }
    get RaceMask() { return makeMaskCell32(RaceMask, this, this.row.AllowableRace, true); }
    get MaxCount() { return this.wrap(this.row.maxcount); }
    get MaxStack() { return this.wrap(this.row.stackable); }
    get Bonding() {
        return makeEnumCell(ItemBonding,this, this.row.bonding);
    }
    get Damage() { return new ItemDamages(this); }
    get Requirements() { return new ItemRequirements(this); }
    get Spells() { return new ItemSpells(this); }
    get Class() { return new ItemClass(this); }
    get SoundOverride() {
        return new MulticastCell(this,[
              this.row.SoundOverrideSubclass
            , this.dbc.SoundOverride
        ])
    }
    get Price() { return new ItemPrice(this); }
    get Material() {
        return makeEnumCell(ItemMaterial,this
            , new MulticastCell(this, [this.row.Material,this.dbc.Material])
        );
    }
    get Flags() {
        return makeMaskCell32(ItemFlags,this, this.row.Flags);
    }
    get InventoryType() {
        return makeEnumCell(ItemInventoryType,this
            , new MulticastCell(this, [
                  this.row.InventoryType
                , this.dbc.InventoryType
                , new CellBasic(this,()=>0,(value)=>{
                    if(this.ItemSetNameRow.exists()) {
                        this.ItemSetNameRow.InventoryType.set(value);
                    }
                })
            ])
        );
    }
    get SheatheType() { return this.dbc.SheatheType; }
    get RequiredFaction() { return new ItemRequiredFaction(this); }
    get ContainerSlots() { return this.wrap(this.row.ContainerSlots); }
    get RequiredDisenchantSkill() { return this.wrap(this.row.RequiredDisenchantSkill); }
    get Duration() { return this.wrap(this.row.duration); }
    get Holiday() { return HolidayRegistry.ref(this, this.row.HolidayId); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
    get FoodType() {
        return makeEnumCell(ItemFoodType,this, this.row.FoodType);
    }
    get MoneyLoot() { return new ItemMoneyLoot(this); }
    get FlagsCustom() {
        return makeMaskCell32(ItemFlagsCustom,this, this.row.flagsCustom);
    }

    get Loot() { return new LootSetRef(this, new LootSet(this.ID, SQL.item_loot_template)); }

    /**
     * This is readonly, because changing the gem properties
     * will also require changing the item id in the
     * enchantment connected to the gem.
     *
     * To create a new gem, see `std.Gems.create(...)` and its parenting options.
     */
    get GemProperties() { return GemRegistry.readOnlyRef(this, this.row.GemProperties); }

    get SocketBonus() { return EnchantmentRegistry.ref(this, this.row.socketBonus); }

    get DisplayInfo() {
        return ItemDisplayinfoRegistry.ref(this
            , new MulticastCell(this, [
                this.row.displayid, this.dbc.DisplayInfoID
            ])
        )
    }

    get PageText() { return PageTextRegistry.ref(this, this.row.PageText)}
    get PageMaterial() { return new PageMaterialCell(this, this.row.PageMaterial); }

    get AmmoType() {
        return makeEnumCell(ItemAmmoType,this, this.row.ammo_type);
    }

    /** Note: This field seem to have loads of data for >cata in the docs, so it can be very wrong. */
    get FlagsExtra() {
        return makeMaskCell32(ItemFlagsExtra,this, this.row.FlagsExtra);
    }

    get ID() {
        return this.row.entry.get();
    }

    codify(settings: {mod?: string, id?: string, name?: string, create_spells?: boolean, all_locs?: bool} & CodegenSettings)
    {
        const mod = settings.mod || 'mod';
        const id = settings.id || 'id';
        const create_spells = settings.create_spells === undefined ? false : settings.create_spells;
        const all_locs = settings.all_locs === undefined ? false : settings.all_locs

        return GenerateCode(settings,`std.Items.create('${mod}','${id}')`,code=>
        {
            if(all_locs)
            {
                if(settings.name)
                {
                    code.line(`.Name.enGB.set('${settings.name}')`)
                }
                code.loc('Description',this.Description)
                code.loc('ItemSetName',this.ItemSetName)
            }
            else
            {
                if(settings.name)
                {
                    code.line(`.Name.enGB.set('${settings.name}')`)
                }
                else
                {
                    code.line(`.Name.enGB.set('${this.Name.enGB.get().split("'").join("\\'")}')`)
                }
                if(this.Description.enGB.get().length > 0)
                {
                    code.line(`.Description.enGB.set('${this.Description.enGB.get().split("'").join("\\'")}')`)
                }
                if(this.ItemSetName.enGB.get().length > 0)
                {
                    code.line(`.ItemSetName.enGB.set('${this.ItemSetName.enGB.get().split("'").join("\\'")}')`)
                }
            }
            code.non_zero_enum('Bonding',this.Bonding)
            code.non_zero_enum('AmmoType',this.AmmoType)
            code.enum_line('Class',this.Class)
            code.non_zero_enum('FoodType',this.FoodType)
            code.non_zero_enum('InventoryType',this.InventoryType)
            code.non_zero_enum('Material',this.Material)
            code.non_zero_enum('SheatheType',this.SheatheType)
            code.non_zero_enum('TotemCategory',this.TotemCategory)
            code.non_zero_enum('Quality',this.Quality)

            code.non_zero_bitmask('BagFamily',this.BagFamily)
            if(this.ClassMask.get() !== 0xffffffff)
            {
                code.non_zero_bitmask('ClassMask',this.ClassMask)
            }
            if(this.RaceMask.get() !== 0xffffffff)
            {
                code.non_zero_bitmask('RaceMask',this.RaceMask)
            }
            code.non_zero_bitmask('Flags',this.Flags)
            code.non_zero_bitmask('FlagsCustom',this.FlagsCustom)
            code.non_zero_bitmask('FlagsExtra',this.FlagsExtra)

            code.non_def_num('Area',this.Area)
            code.non_def_num('Armor',this.Armor)
            code.non_def_num('Block',this.Block)
            code.non_def_num('BonusArmor',this.BonusArmor)
            code.non_def_num('ContainerSlots',this.ContainerSlots)
            this.Damage.forEach(x=>{
                if(!x.isClear())
                {
                    code.line(`.Damage.add('${x.School.objectify()}',${x.Min.get()},${x.Max.get()})`)
                }
            })

            code.non_def_num('Delay',this.Delay)
            code.non_def_num('Disenchant',this.Disenchant)
            code.non_def_num('Durability',this.Durability)
            code.non_def_num('Price.PlayerBuyPrice',this.Price.PlayerBuyPrice)
            code.non_def_num('Price.PlayerSellPrice',this.Price.PlayerSellPrice)
            code.non_def_num('Price.BuyCount',this.Price.BuyCount)
            code.non_def_num('RequiredLevel',this.RequiredLevel)
            code.non_def_num('RequiredDisenchantSkill',this.RequiredDisenchantSkill,-1)
            code.non_def_num('Duration',this.Duration)
            if(this.GemProperties.get())
            {
                code.line(`// Warning: Ignoring field "GemProperties" (gems will not work)`)
            }
            code.non_def_num('Holiday',this.Holiday)
            code.non_def_num('ItemLevel',this.ItemLevel)
            code.non_def_num('ItemSet',this.ItemSet)
            code.non_def_num('Lock',this.Lock)
            code.non_def_num('Map',this.Map)
            code.non_def_num('MaxCount',this.MaxCount)
            code.non_def_num('MaxStack',this.MaxStack)
            if(this.MoneyLoot.Min.get() !== 0 || this.MoneyLoot.Max.get() !== 0)
            {
                code.line(`.MoneyLoot.set(${this.MoneyLoot.Min.get()},${this.MoneyLoot.Max.get()})`)
            }
            code.non_def_num('ScriptName',this.ScriptName)
            code.non_def_num('Sheath',this.Sheath)
            code.non_def_num('SocketBonus',this.SocketBonus)
            code.non_def_num('StartQuest',this.StartQuest)
            code.non_def_num('SoundOverride',this.SoundOverride)

            this.Socket.forEach(x=>{
                if(!x.isClear())
                {
                    code.line(`.Socket.add('${x.Color.objectify()}',${x.Content.get()})`)
                }
            })

            this.Stats.forEach((x,i)=>{
                if(!x.isClear())
                {
                    code.line(`.Stats.add('${x.Type.objectify()}',${x.Value.get()})`)
                }
            })

            this.Spells.forEach((x,i)=>
            {
                if(!x.Spell.get())
                {
                    return;
                }

                code.begin_block('.Spells.addMod(x=>x')
                if(create_spells)
                {
                    code.begin_block(`.Spell.modRefCopy('${mod}','${id}_spell_${i}',x=>x`)
                    code.substruct(x.Spell.getRef(),settings);
                    code.end_block(')')
                }
                else
                {
                    code.non_def_num('Spell',x.Spell)
                }
                code.non_def_num('Category',x.Category)
                code.non_def_num('CategoryCooldown',x.CategoryCooldown)
                code.non_def_num('Charges.Raw',x.Charges.Raw)
                code.non_def_num('Cooldown',x.Cooldown)
                code.non_def_num('ProcsPerMinute',x.ProcsPerMinute)
                code.enum_line('Trigger',x.Trigger)
                code.end_block(`)`)
            })

            if(this.Loot.get().rows.length > 0)
            {
                code.begin_block(`.Loot.mod(x=>x`)
                this.Loot.get().codify(settings);
                code.end_block(`)`)
            }

            if(this.DisplayInfo.get())
            {
                code.begin_block(`.DisplayInfo.modRefCopy('${mod}','${id}_display',x=>x`)
                code.substruct(this.DisplayInfo.getRef(),Object.assign(settings,{mod:mod,id:id+'_display'}));
                code.end_block(`)`)
            }
        })
    }
}

export class ItemTemplateRegistryClass
extends RegistryStatic<ItemTemplate,item_templateRow,item_templateQuery> {
    protected Clone(mod: string, id: string, r: ItemTemplate, parent: ItemTemplate): void {
        let dbc = DBC.Item.findById(parent.ID);
        r.row.GemProperties.set(0);
        if(dbc) {
            dbc.clone(r.ID);
        }
    }
    protected Table(): Table<any, item_templateQuery, item_templateRow> & { add: (id: number) => item_templateRow; } {
        return SQL.item_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.item_template
    }
    protected Entity(r: item_templateRow): ItemTemplate {
        return new ItemTemplate(r)
    }
    protected FindByID(id: number): item_templateRow {
        return SQL.item_template.query({entry:id});
    }
    protected EmptyQuery(): item_templateQuery {
        return {}
    }
    ID(e: ItemTemplate): number {
        return e.ID;
    }
    Clear(r: ItemTemplate) {
        r.AmmoType.NONE.set()
         .Area.set(0)
         .Armor.set(0)
         .BagFamily.set(0)
         .Block.set(0)
         .Bonding.NO_BOUNDS.set()
         .Class.JUNK.set()
         .ClassMask.set(-1)
         .RaceMask.set(-1)
         .ContainerSlots.set(0)
         .Damage.clearAll()
         .Delay.set(0)
         .Description.clear()
         .Disenchant.set(0)
         .DisplayInfo.set(0)
         .Durability.set(0)
         .Duration.set(0)
         .Flags.clearAll()
         .FlagsCustom.clearAll()
         .FlagsExtra.clearAll()
         .FoodType.set(0)
         .Holiday.set(0)
         .InventoryType.set(0)
         .ItemLevel.set(0)
         .ItemSet.set(0)
         .Lock.set(0)
         .Map.set(0)
         .Material.set(0)
         .MaxCount.set(0)
         .MaxStack.set(1)
         .MoneyLoot.set(0,0)
         .Name.clear()
         .Price.set(0,0,1)
         .Quality.set(0)
         .RandomProperty.set(0)
         .RandomSuffix.set(0)
         .RangeMod.set(0)
         .RequiredDisenchantSkill.set(0)
         .RequiredFaction.set(0,0)
         .RequiredHonorRank.set(0)
         .RequiredLevel.set(1)
         .RequiredSpell.set(0)
         .Requirements.Skill.clear()
         .Requirements.clearAll()
         .Resistances.clearAll()
         .ScalingStats.set(0,0)
         .ScriptName.set('')
         .Sheath.NONE.set()
         .Socket.clearAll()
         .SoundOverride.set(0)
         .Spells.clearAll()
         .StartQuest.set(0)
         .Stats.clearAll()
         .TotemCategory.set(0)
         .row.GemProperties.set(0)
    }
}

export const ItemTemplateRegistry = new ItemTemplateRegistryClass();
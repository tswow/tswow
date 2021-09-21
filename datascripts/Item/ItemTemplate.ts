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
import { DBC } from "wotlkdata";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { ItemRow } from "wotlkdata/dbc/types/Item";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { item_templateQuery, item_templateRow } from "wotlkdata/sql/types/item_template";
import { Table } from "wotlkdata/table/Table";
import { HolidayRegistry } from "../GameEvent/Holiday";
import { GemRegistry } from "../Gem/Gem";
import { LockRegistry } from "../Locks/Locks";
import { Loot } from "../Loot/Loot";
import { ClassMask } from "../Misc/ClassMask";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { ItemAmmoTypes } from "./ItemAmmoTypes";
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
import { ItemSheath } from "./ItemSheath";
import { ItemSkillRequirement } from "./ItemSkillRequirement";
import { ItemSockets } from "./ItemSocket";
import { ItemSpells } from "./ItemSpells";
import { ItemStats } from "./ItemStats";
import { ItemDescription, ItemName } from "./ItemText";
import { ItemTotemCategory } from "./ItemTotemCategory";

export class ItemTemplate extends MainEntity<item_templateRow> {
    @Transient
    sqlRow : item_templateRow;
    @Transient
    dbcRow : ItemRow;

    get Name() { return new ItemName(this); }
    get Socket() { return new ItemSockets(this); }
    get StartQuest() { return this.wrap(this.row.startquest); }
    get Lock() { return LockRegistry.ref(this, this.row.lockid); }
    get RandomProperty() { return this.wrap(this.row.RandomProperty); }
    get RandomSuffix() { return this.wrap(this.row.RandomSuffix); }

    /** Only applicable if item is a shield */
    get BlockChance() { return this.wrap(this.row.block); }
    get ItemSet() { return this.wrap(this.row.itemset); }
    get Resistances() { return new ItemResistance(this); }
    get Stats() { return new ItemStats(this); }
    get Area() { return this.wrap(this.row.area); }
    get Map() { return this.wrap(this.row.Map); }
    get BagFamily() { return this.wrap(this.row.BagFamily); }
    get TotemCategory() { return new ItemTotemCategory(this, this.row.TotemCategory); }
    get Sheath() { return new ItemSheath(this, this.row.sheath); }
    get ScalingStats() { return new ItemScalingStat(this); }
    get Armor() { return this.wrap(this.row.armor); }
    /** Delay in MILLISECONDS */
    get Delay() { return this.wrap(this.row.delay); }
    get RangeMod() { return this.wrap(this.row.RangedModRange); }
    get Description() { return new ItemDescription(this); }
    get Quality() { return new ItemQuality(this); }
    get Durability() { return this.wrap(this.sqlRow.MaxDurability); }
    get Disenchant() { return Loot.Disenchant.ref(this, this.sqlRow.DisenchantID); }
    get RequiredLevel() { return this.wrap(this.sqlRow.RequiredLevel); }
    get ItemLevel() { return this.wrap(this.sqlRow.ItemLevel); }
    get SkillRequirement() { return new ItemSkillRequirement(this); }
    get RequiredSpell() { return this.wrap(this.sqlRow.requiredspell); }
    get RequiredHonorRank() { return this.wrap(this.sqlRow.requiredhonorrank); }
    get ClassMask() { return new ClassMask(this, this.sqlRow.AllowableClass, true); }
    get RaceMask() { return this.wrap(this.sqlRow.AllowableRace); }
    get MaxCount() { return this.wrap(this.sqlRow.maxcount); }
    get MaxStack() { return this.wrap(this.sqlRow.stackable); }
    get Bonding() { return new ItemBonding(this); }
    get Damage() { return new ItemDamages(this); }
    get Requirements() { return new ItemRequirements(this); }
    get Spells() { return new ItemSpells(this); }
    get Class() { return new ItemClass(this); }
    get SoundOverride() { return this.wrap(this.row.SoundOverrideSubclass)}
    get Price() { return new ItemPrice(this); }
    get Material() { return new ItemMaterial(this); }
    get Flags() { return new ItemFlags(this, this.row.Flags); }
    get InventoryType() { return new ItemInventoryType(this); }
    get RequiredFaction() { return new ItemRequiredFaction(this); }
    get ContainerSlots() { return this.wrap(this.row.ContainerSlots); }
    get RequiredDisenchantSkill() { return this.wrap(this.row.RequiredDisenchantSkill); }
    get Duration() { return this.wrap(this.row.duration); }
    get Holiday() { return HolidayRegistry.ref(this, this.row.HolidayId); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
    get FoodType() { return new ItemFoodType(this, this.row.FoodType); }
    get MoneyLoot() { return new ItemMoneyLoot(this); }
    get FlagsCustom() { return new ItemFlagsCustom(this, this.row.flagsCustom); }

    /**
     * This is readonly, because changing the gem properties
     * will also require changing the item id in the
     * enchantment connected to the gem.
     *
     * To create a new gem, see `std.Gems.create(...)` and its parenting options.
     */
    get GemProperties() { return GemRegistry.readOnlyRef(this, this.row.GemProperties); }

    get DisplayInfo() {
        return ItemDisplayinfoRegistry.ref(this
            , new MulticastCell(this, [this.row.displayid, this.dbcRow.DisplayInfoID]))
    }

    get AmmoType() { return new ItemAmmoTypes(this, this.row.ammo_type); }

    /** Note: This field seem to have loads of data for >cata in the docs, so it can be very wrong. */
    get FlagsExtra() { return new ItemFlagsExtra(this, this.row.FlagsExtra); }

    constructor(srow : item_templateRow, crow : ItemRow) {
        super(srow);
        this.sqlRow = srow;
        this.dbcRow = crow;
    }

    get ID() {
        return this.sqlRow.entry.get();
    }
}

export class ItemTemplateRegistryClass
extends RegistryStatic<ItemTemplate,item_templateRow,item_templateQuery> {
    protected Clone(mod: string, name: string, r: ItemTemplate, parent: ItemTemplate): void {
        if(parent.GemProperties.get() !== 0) {
            throw new Error(`Tried cloning an item with GemProperties != 0, this is not supported!`);
        }
    }
    protected Table(): Table<any, item_templateQuery, item_templateRow> & { add: (id: number) => item_templateRow; } {
        return SQL.item_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.item_template
    }
    protected Entity(r: item_templateRow): ItemTemplate {
        return new ItemTemplate(
               r
            ,  DBC.Item.findById(r.entry.get())
            || DBC.Item.add(r.entry.get())
        )
    }
    protected FindByID(id: number): item_templateRow {
        return SQL.item_template.find({entry:id});
    }
    protected EmptyQuery(): item_templateQuery {
        return {}
    }
    ID(e: ItemTemplate): number {
        return e.ID;
    }
    Clear(r: ItemTemplate) {
        r.AmmoType.None.set()
         .Area.set(0)
         .Armor.set(0)
         .BagFamily.set(0)
         .BlockChance.set(0)
         .Bonding.NoBounds.set()
         .Class.setJunk()
         .ClassMask.clearAll()
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
         .MaxStack.set(0)
         .MoneyLoot.set(0,0)
         .Name.clear()
         .Price.set(0,0,0)
         .Quality.set(0)
         .RaceMask.set(0)
         .RandomProperty.set(0)
         .RandomSuffix.set(0)
         .RangeMod.set(0)
         .RequiredDisenchantSkill.set(0)
         .RequiredFaction.set(0,0)
         .RequiredHonorRank.set(0)
         .RequiredLevel.set(0)
         .RequiredSpell.set(0)
         .Requirements.clearAll()
         .Resistances.clearAll()
         .ScalingStats.set(0,0)
         .ScriptName.set('')
         .Sheath.None.set()
         .SkillRequirement.set(0,0)
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
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
import { DBC, SQL } from "wotlkdata";
import { ItemRow } from "wotlkdata/dbc/types/Item";
import { item_templateQuery, item_templateRow } from "wotlkdata/sql/types/item_template";
import { Ids } from "../Misc/Ids";
import { MainEntity } from "../Misc/Entity";
import { ItemAmmoTypes } from "./ItemAmmoTypes";
import { ItemBonding } from "./ItemBonding";
import { ItemClass } from "./ItemClass";
import { ItemDamages } from "./ItemDamage";
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
import { ItemDisplayInfoPointer } from "./ItemDisplayInfo";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";
import { ClassMask } from "../Misc/ClassMask";
import { RefReadOnly, RefStatic } from "../Refs/Ref";
import { GemRef } from "../Gem/Gem";

export class ItemTemplate extends MainEntity<item_templateRow> {
    @Transient
    sqlRow : item_templateRow;
    @Transient
    dbcRow : ItemRow;

    get Name() { return new ItemName(this); }
    get Socket() { return new ItemSockets(this); }
    get StartQuest() { return this.wrap(this.row.startquest); }
    get LockID() { return this.wrap(this.row.lockid); }
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
    get DisenchantId() { return this.wrap(this.sqlRow.DisenchantID); }
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
    get HolidayID() { return this.wrap(this.row.HolidayId); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
    get DisenchantID() { return this.wrap(this.row.DisenchantID); }
    get FoodType() { return new ItemFoodType(this, this.row.FoodType); }
    get MoneyLoot() { return new ItemMoneyLoot(this); }
    get FlagsCustom() { return new ItemFlagsCustom(this, this.row.flagsCustom); }
    get GemProperties() { return new GemRef(this, this.row.GemProperties); }

    get DisplayInfo() {
        return new ItemDisplayInfoPointer(this
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

function getRows(id: number) : [item_templateRow, ItemRow] {
    const sqlParent = SQL.item_template.find({entry:id});
    const dbcParent = DBC.Item.findById(id);
    return [sqlParent,dbcParent];
}

export const Items = {
    create(mod: string, id: string, parent: number = -1) {
        const numid = Ids.item_template.id(mod,id);

        if(parent < 0) {
            const sqlRow = SQL.item_template.add(numid)
            const dbcRow = DBC.Item.add(numid)
            let item = new ItemTemplate(sqlRow,dbcRow)
                .AmmoType.setNone()
                .Area.set(0)
                .Armor.set(0)
                .BagFamily.set(0)
                .BlockChance.set(0)
                .Bonding.setNoBounds()
                .Class.set(0,0)
                .ClassMask.set(-1)
                .RaceMask.set(-1)
                .ContainerSlots.set(0)
                .Damage.clearAll()
                .Delay.set(0)
                .DisenchantID.set(0)
                .DisplayInfo.setRefID(0)
                .Durability.set(0)
                .Duration.set(0)
                .Flags.set(0)
                .FlagsCustom.set(0)
                .FlagsExtra.set(0)
                .FoodType.set(0)
                .HolidayID.set(0)
                .InventoryType.setNonEquippable()
                .ItemLevel.set(0)
                .ItemSet.set(0)
                .LockID.set(0)
                .Map.set(0)
                .Material.set(0)
                .MaxCount.set(0)
                .MaxStack.set(0)
                .MoneyLoot.set(0,0)
                .Name.enGB.set('Plain Item')
                .Price.set(0,0,0)
                .Quality.set(0)
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
                .Sheath.set(0)
                .SkillRequirement.set(0,0)
                .Socket.clearAll()
                .SoundOverride.set(-1)
                .Spells.clearAll()
                .StartQuest.set(0)
                .Stats.clearAll()
                .TotemCategory.set(0)

            item.sqlRow.LanguageID.set(0)
            return item;
        }

        const [sqlParent,dbcParent] = getRows(parent);
        const sqlRow = sqlParent.clone(numid)
        const dbcRow = dbcParent.clone(numid);
        return new ItemTemplate(sqlRow, dbcRow);
    },

    load(item: number) {
        const [sql,dbc] = getRows(item);
        return new ItemTemplate(sql, dbc);
    },

    filter(query: item_templateQuery) {
        // TODO: Can be more efficient
        return SQL.item_template.filter(query).map(x=>Items.load(x.entry.get()));
    }
}

export class ItemTemplateRef<T> extends RefStatic<T,ItemTemplate> {
    protected create(mod: string, id: string, parent?: number): ItemTemplate {
        return Items.create(mod,id,parent);
    }
    protected clone(mod: string, id: string): ItemTemplate {
        return Items.create(mod,id,this.resolve().ID);
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: ItemTemplate): number {
        return v.ID;
    }
    protected resolve(): ItemTemplate {
        return Items.load(this.cell.get());
    }
}

export class ItemTemplateRefReadOnly<T> extends RefReadOnly<T,ItemTemplate> {
    getRef(): ItemTemplate {
        return Items.load(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
}
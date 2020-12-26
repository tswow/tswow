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
import { ItemDisplayInfoRow } from "wotlkdata/dbc/types/ItemDisplayInfo";
import { item_templateRow } from "wotlkdata/sql/types/item_template";
import { Ids } from "../Base/Ids";
import { MainEntity } from "../Base/MainEntity";
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
import { ItemVisual } from "./ItemVisual";

export class ItemTemplate extends MainEntity<item_templateRow> {
    sqlRow : item_templateRow;
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
    get DisplayID() { return this.wrap(this.row.displayid); }
    get Resistances() { return new ItemResistance(this); }
    get Stats() { return new ItemStats(this); }
    get Area() { return this.wrap(this.row.area); }
    get Map() { return this.wrap(this.row.Map); }
    get BagFamily() { return this.wrap(this.row.BagFamily); }
    get TotemCategory() { return new ItemTotemCategory(this); }
    get Sheath() { return new ItemSheath(this); }
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
    get ClassMask() { return this.wrap(this.sqlRow.AllowableClass); }
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
    get FoodType() { return new ItemFoodType(this); }
    get MoneyLoot() { return new ItemMoneyLoot(this); }
    get FlagsCustom() { return new ItemFlagsCustom(this, this.row.flagsCustom); }
    get Visual() { return new ItemVisual(this); }
    
    /** Note: This field seem to have loads of data for >cata in the docs, so it can be very wrong. */
    get FlagsExtra() { return new ItemFlagsExtra(this, this.row.FlagsExtra); }
    
    constructor(srow : item_templateRow, crow : ItemRow, display : ItemDisplayInfoRow) {
        super(srow);
        this.sqlRow = srow;
        this.dbcRow = crow;
    }
    
    get ID() {
        return this.sqlRow.entry.get();
    }
}

function getRows(id: number) : [item_templateRow, ItemRow, ItemDisplayInfoRow] {
    const sqlParent = SQL.item_template.find({entry:id});
    const dbcParent = DBC.Item.find({ID:id});
    const disParent = DBC.ItemDisplayInfo.find({ID:sqlParent.displayid.get()});
    return [sqlParent,dbcParent,disParent];
}

export const Items = {
    create(mod: string, id: string, parent: number) {
        const numid = Ids.Item.id(mod,id);
        const [sqlParent,dbcParent,disParent] = getRows(parent);
        const sqlRow = sqlParent.clone(numid)
        const dbcRow = dbcParent.clone(numid);
        const disRow = disParent.clone(Ids.ItemDisplayInfo.id());
        dbcRow.DisplayInfoID.set(disRow.ID.get());
        sqlRow.displayid.set(disRow.ID.get());
        return new ItemTemplate(sqlRow, dbcRow, disRow);
    },
    
    load(item: number) {
        const [sql,dbc,dis] = getRows(item);
        return new ItemTemplate(sql, dbc, dis);
    },
}
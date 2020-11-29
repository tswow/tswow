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
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { ItemBase } from "./Item";

function IdRows(owner: ItemBase) {
    return [
        owner.row.spellid_1,
        owner.row.spellid_2,
        owner.row.spellid_3,
        owner.row.spellid_4,
        owner.row.spellid_5,
    ] 
}

function CatRows(owner: ItemBase) {
    return [
        owner.row.spellcategory_1,
        owner.row.spellcategory_2,
        owner.row.spellcategory_3,
        owner.row.spellcategory_4,
        owner.row.spellcategory_5,
    ] 
}

function TriggerRows(owner: ItemBase) {
    return [
        owner.row.spelltrigger_1,
        owner.row.spelltrigger_2,
        owner.row.spelltrigger_3,
        owner.row.spelltrigger_4,
        owner.row.spelltrigger_5,
    ] 
}

function ChargeRows(owner: ItemBase) {
    return [
        owner.row.spellcharges_1,
        owner.row.spellcharges_2,
        owner.row.spellcharges_3,
        owner.row.spellcharges_4,
        owner.row.spellcharges_5,
    ] 
}

function PPMRows(owner: ItemBase) {
    return [
        owner.row.spellppmRate_1,
        owner.row.spellppmRate_2,
        owner.row.spellppmRate_3,
        owner.row.spellppmRate_4,
        owner.row.spellppmRate_5,
    ] 
}

function CooldownRows(owner: ItemBase) {
    return [
        owner.row.spellcooldown_1,
        owner.row.spellcooldown_2,
        owner.row.spellcooldown_3,
        owner.row.spellcooldown_4,
        owner.row.spellcooldown_5,
    ] 
}

function CCooldownRows(owner: ItemBase) {
    return [
        owner.row.spellcategorycooldown_1,
        owner.row.spellcategorycooldown_2,
        owner.row.spellcategorycooldown_3,
        owner.row.spellcategorycooldown_4,
        owner.row.spellcategorycooldown_5,
    ] 
}

export class ItemSpell extends ArrayEntry<ItemBase> {
    clear(): ItemBase {
        this.ID.set(0);
        this.Category.set(0);
        this.Trigger.set(0);
        this.Charges.set(0);
        this.ProcsPerMinute.set(0);
        this.Cooldown.set(0);
        this.CategoryCooldown.set(0);
        return this.owner;
    }
    isClear(): boolean {
        return this.ID.get() === 0;
    }

    get ID() { return IdRows(this.owner)[this.index]; }
    get Category() { return CatRows(this.owner)[this.index]; }
    get Trigger() { return TriggerRows(this.owner)[this.index]; }
    get Charges() { return ChargeRows(this.owner)[this.index]; }
    get ProcsPerMinute() { return PPMRows(this.owner)[this.index]; }
    get Cooldown () { return CooldownRows(this.owner)[this.index]; }
    get CategoryCooldown() { return CCooldownRows(this.owner)[this.index]; }
}

export class ItemSpells extends SystemArray<ItemSpell, ItemBase> {
    get(index: number): ItemSpell {
        return new ItemSpell(this.owner, index);
    }

    get length(): number {
        return 5;
    }

    add(id: number, category?: number, trigger?: number, charges?: number, procsPerMinute?: number, cooldown?: number, categoryCooldown?: number) {
        let free = this.getFree();
        free.ID.set(id);
        if(category!==undefined) free.Category.set(category);
        if(trigger!==undefined) free.Category.set(trigger);
        if(charges!==undefined) free.Category.set(charges);
        if(procsPerMinute!==undefined) free.Category.set(procsPerMinute);
        if(cooldown!==undefined) free.Category.set(cooldown);
        if(categoryCooldown!==undefined) free.Category.set(categoryCooldown);
        return free;
    }
}
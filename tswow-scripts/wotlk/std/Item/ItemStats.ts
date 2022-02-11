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
import { EnumCon, makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { ItemTemplate } from "./ItemTemplate";

function a(owner: ItemTemplate) {
    return [
        owner.row.stat_type1,
        owner.row.stat_type2,
        owner.row.stat_type3,
        owner.row.stat_type4,
        owner.row.stat_type5,
        owner.row.stat_type6,
        owner.row.stat_type7,
        owner.row.stat_type8,
        owner.row.stat_type9,
        owner.row.stat_type10,
    ]
}

function b(owner: ItemTemplate) {
    return [
        owner.row.stat_value1,
        owner.row.stat_value2,
        owner.row.stat_value3,
        owner.row.stat_value4,
        owner.row.stat_value5,
        owner.row.stat_value6,
        owner.row.stat_value7,
        owner.row.stat_value8,
        owner.row.stat_value9,
        owner.row.stat_value10,
    ]
}

export enum Stat {
    MANA                     = 0,
    HEALTH                   = 1,
    AGILITY                  = 2,
    STRENGTH                 = 3,
    INTELLECT                = 4,
    SPIRIT                   = 5,
    STAMINA                  = 6,
    DEFENSE_SKILL_RATING     = 7,
    DODGE_RATING             = 8,
    PARRY_RATING             = 9,
    BLOCK_RATING             = 10,
    HIT_MELEE_RATING         = 11,
    HIT_RANGED_RATING        = 12,
    HIT_SPELL_RATING         = 13,
    CRIT_MELEE_RATING        = 14,
    CRIT_RANGED_RATING       = 15,
    CRIT_SPELL_RATING        = 16,
    HIT_TAKEN_MELEE_RATING   = 17,
    HIT_TAKEN_RANGED_RATING  = 18,
    HIT_TAKEN_SPELL_RATING   = 19,
    CRIT_TAKEN_MELEE_RATING  = 20,
    CRIT_TAKEN_RANGED_RATING = 21,
    CRIT_TAKEN_SPELL_RATING  = 22,
    HASTE_MELEE_RATING       = 23,
    HASTE_RANGED_RATING      = 24,
    HASTE_SPELL_RATING       = 25,
    HIT_RATING               = 26,
    CRIT_RATING              = 27,
    HIT_TAKEN_RATING         = 28,
    CRIT_TAKEN_RATING        = 29,
    RESILIENCE_RATING        = 30,
    HASTE_RATING             = 31,
    EXPERTISE_RATING         = 32,
    ATTACK_POWER             = 33,
    RANGED_ATTACK_POWER      = 34,
    FERAL_ATTACK_POWER       = 35,
    SPELL_HEALING_DONE       = 36,
    SPELL_DAMAGE_DONE        = 37,
    MANA_REGENERATION        = 38,
    ARMOR_PENETRATION_RATING = 39,
    SPELL_POWER              = 40,
    HEALTH_REGEN             = 41,
    SPELL_PENETRATION        = 42,
    BLOCK_VALUE              = 43,

}

export class ItemStat extends ArrayEntry<ItemTemplate> {
    get Type() {
        return makeEnumCell(Stat,this, a(this.container)[this.index]);
    }
    get Value() { return b(this.container)[this.index]; }

    clear() {
        this.Type.set(0);
        this.Value.set(0);
        return this;
    }

    isClear(): boolean {
        return this.Type.get() === 0;
    }

}

export class ItemStats extends ArraySystem<ItemStat,ItemTemplate> {
    get length(): number {
        return 10;
    }

    get(index: number) {
        return new ItemStat(this.owner, index);
    }

    add(stat: EnumCon<keyof typeof Stat>, value: number) {
        const free = this.addGet();
        free.Type.set(stat);
        free.Value.set(value);
        // Needs to be updated with the amount of used stats
        this.owner.row.StatsCount.set(ArrayEntry.getIndex(free)+1)
        return this.owner;
    }

    clearAll() {
        super.clearAll();
        this.owner.row.StatsCount.set(0);
        return this.owner;
    }

    addMana(value: number) { return this.add(0, value)}

    addHealth(value: number) { return this.add(1, value)}

    addAgility(value: number) { return this.add(3, value)}

    addStrength(value: number) { return this.add(4, value)}

    addIntellect(value: number) { return this.add(5, value)}

    addSpirit(value: number) { return this.add(6, value)}

    addStamina(value: number) { return this.add(7, value)}

    addDefenseSkillRating(value: number) { return this.add(12, value)}

    addDodgeRating(value: number) { return this.add(13, value)}

    addParryRating(value: number) { return this.add(14, value)}

    addBlockRating(value: number) { return this.add(15, value)}

    addHitMeleeRating(value: number) { return this.add(16, value)}

    addHitRangedRating(value: number) { return this.add(17, value)}

    addHitSpellRating(value: number) { return this.add(18, value)}

    addCritMeleeRating(value: number) { return this.add(19, value)}

    addCritRangedRating(value: number) { return this.add(20, value)}

    addCritSpellRating(value: number) { return this.add(21, value)}

    addHitTakenMeleeRating(value: number) { return this.add(22, value)}

    addHitTakenRangedRating(value: number) { return this.add(23, value)}

    addHitTakenSpellRating(value: number) { return this.add(24, value)}

    addCritTakenMeleeRating(value: number) { return this.add(25, value)}

    addCritTakenRangedRating(value: number) { return this.add(26, value)}

    addCritTakenSpellRating(value: number) { return this.add(27, value)}

    addHasteMeleeRating(value: number) { return this.add(28, value)}

    addHasteRangedRating(value: number) { return this.add(29, value)}

    addHasteSpellRating(value: number) { return this.add(30, value)}

    addHitRating(value: number) { return this.add(31, value)}

    addCritRating(value: number) { return this.add(32, value)}

    addHitTakenRating(value: number) { return this.add(33, value)}

    addCritTakenRating(value: number) { return this.add(34, value)}

    addResilienceRating(value: number) { return this.add(35, value)}

    addHasteRating(value: number) { return this.add(36, value)}

    addExpertiseRating(value: number) { return this.add(37, value)}

    addAttackPower(value: number) { return this.add(38, value)}

    addRangedAttackPower(value: number) { return this.add(39, value)}

    addFeralAttackPower(value: number) { return this.add(40, value)}

    addSpellHealingDone(value: number) { return this.add(41, value)}

    addSpellDamageDone(value: number) { return this.add(42, value)}

    addManaRegeneration(value: number) { return this.add(43, value)}

    addArmorPenetrationRating(value: number) { return this.add(44, value)}

    addSpellPower(value: number) { return this.add(45, value)}

    addHealthRegen(value: number) { return this.add(46, value)}

    addSpellPenetration(value: number) { return this.add(47, value)}

    addBlockValue(value: number) { return this.add(48, value)}
}
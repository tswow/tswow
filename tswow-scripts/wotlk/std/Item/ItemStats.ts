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

export enum Stat
{
    MANA                     = 0,
    HEALTH                   = 1,
    AGILITY                  = 3,
    STRENGTH                 = 4,
    INTELLECT                = 5,
    SPIRIT                   = 6,
    STAMINA                  = 7,
    DEFENSE_SKILL_RATING     = 12,
    DODGE_RATING             = 13,
    PARRY_RATING             = 14,
    BLOCK_RATING             = 15,
    HIT_MELEE_RATING         = 16,
    HIT_RANGED_RATING        = 17,
    HIT_SPELL_RATING         = 18,
    CRIT_MELEE_RATING        = 19,
    CRIT_RANGED_RATING       = 20,
    CRIT_SPELL_RATING        = 21,
    HIT_TAKEN_MELEE_RATING   = 22,
    HIT_TAKEN_RANGED_RATING  = 23,
    HIT_TAKEN_SPELL_RATING   = 24,
    CRIT_TAKEN_MELEE_RATING  = 25,
    CRIT_TAKEN_RANGED_RATING = 26,
    CRIT_TAKEN_SPELL_RATING  = 27,
    HASTE_MELEE_RATING       = 28,
    HASTE_RANGED_RATING      = 29,
    HASTE_SPELL_RATING       = 30,
    HIT_RATING               = 31,
    CRIT_RATING              = 32,
    HIT_TAKEN_RATING         = 33,
    CRIT_TAKEN_RATING        = 34,
    RESILIENCE_RATING        = 35,
    HASTE_RATING             = 36,
    EXPERTISE_RATING         = 37,
    ATTACK_POWER             = 38,
    RANGED_ATTACK_POWER      = 39,
    //FERAL_ATTACK_POWER       = 40, not in 3.3
    SPELL_HEALING_DONE       = 41,                 // deprecated
    SPELL_DAMAGE_DONE        = 42,                 // deprecated
    MANA_REGENERATION        = 43,
    ARMOR_PENETRATION_RATING = 44,
    SPELL_POWER              = 45,
    HEALTH_REGEN             = 46,
    SPELL_PENETRATION        = 47,
    BLOCK_VALUE              = 48
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

    addMana(value: number) { return this.add(Stat.MANA, value)}

    addHealth(value: number) { return this.add(Stat.HEALTH, value)}

    addAgility(value: number) { return this.add(Stat.AGILITY, value)}

    addStrength(value: number) { return this.add(Stat.STRENGTH, value)}

    addIntellect(value: number) { return this.add(Stat.INTELLECT, value)}

    addSpirit(value: number) { return this.add(Stat.SPIRIT, value)}

    addStamina(value: number) { return this.add(Stat.STAMINA, value)}

    addDefenseSkillRating(value: number) { return this.add(Stat.DEFENSE_SKILL_RATING, value)}

    addDodgeRating(value: number) { return this.add(Stat.DODGE_RATING, value)}

    addParryRating(value: number) { return this.add(Stat.PARRY_RATING, value)}

    addBlockRating(value: number) { return this.add(Stat.BLOCK_RATING, value)}

    addHitMeleeRating(value: number) { return this.add(Stat.HIT_MELEE_RATING, value)}

    addHitRangedRating(value: number) { return this.add(Stat.HIT_RANGED_RATING, value)}

    addHitSpellRating(value: number) { return this.add(Stat.HIT_SPELL_RATING, value)}

    addCritMeleeRating(value: number) { return this.add(Stat.CRIT_MELEE_RATING, value)}

    addCritRangedRating(value: number) { return this.add(Stat.CRIT_RANGED_RATING, value)}

    addCritSpellRating(value: number) { return this.add(Stat.CRIT_SPELL_RATING, value)}

    addHitTakenMeleeRating(value: number) { return this.add(Stat.HIT_TAKEN_MELEE_RATING, value)}

    addHitTakenRangedRating(value: number) { return this.add(Stat.HIT_TAKEN_RANGED_RATING, value)}

    addHitTakenSpellRating(value: number) { return this.add(Stat.HIT_TAKEN_SPELL_RATING, value)}

    addCritTakenMeleeRating(value: number) { return this.add(Stat.CRIT_TAKEN_MELEE_RATING, value)}

    addCritTakenRangedRating(value: number) { return this.add(Stat.CRIT_TAKEN_RANGED_RATING, value)}

    addCritTakenSpellRating(value: number) { return this.add(Stat.CRIT_TAKEN_SPELL_RATING, value)}

    addHasteMeleeRating(value: number) { return this.add(Stat.HASTE_MELEE_RATING, value)}

    addHasteRangedRating(value: number) { return this.add(Stat.HASTE_RANGED_RATING, value)}

    addHasteSpellRating(value: number) { return this.add(Stat.HASTE_SPELL_RATING, value)}

    addHitRating(value: number) { return this.add(Stat.HIT_RATING, value)}

    addCritRating(value: number) { return this.add(Stat.CRIT_RATING, value)}

    addHitTakenRating(value: number) { return this.add(Stat.HIT_TAKEN_RATING, value)}

    addCritTakenRating(value: number) { return this.add(Stat.CRIT_TAKEN_RATING, value)}

    addResilienceRating(value: number) { return this.add(Stat.RESILIENCE_RATING, value)}

    addHasteRating(value: number) { return this.add(Stat.HASTE_RATING, value)}

    addExpertiseRating(value: number) { return this.add(Stat.EXPERTISE_RATING, value)}

    addAttackPower(value: number) { return this.add(Stat.ATTACK_POWER, value)}

    addRangedAttackPower(value: number) { return this.add(Stat.RANGED_ATTACK_POWER, value)}

    //addFeralAttackPower(value: number) { return this.add(Stat.FERAL_ATTACK_POWER, value)}

    addSpellHealingDone(value: number) { return this.add(Stat.SPELL_HEALING_DONE, value)}

    addSpellDamageDone(value: number) { return this.add(Stat.SPELL_DAMAGE_DONE, value)}

    addManaRegeneration(value: number) { return this.add(Stat.MANA_REGENERATION, value)}

    addArmorPenetrationRating(value: number) { return this.add(Stat.ARMOR_PENETRATION_RATING, value)}

    addSpellPower(value: number) { return this.add(Stat.SPELL_POWER, value)}

    addHealthRegen(value: number) { return this.add(Stat.HEALTH_REGEN, value)}

    addSpellPenetration(value: number) { return this.add(Stat.SPELL_PENETRATION, value)}

    addBlockValue(value: number) { return this.add(Stat.BLOCK_VALUE, value)}
}
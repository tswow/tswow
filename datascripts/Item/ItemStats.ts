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
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
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

export class Stat extends EnumCell<ItemStat> {
    /** Enum Value:                                  0 */
    get Mana()                   { return this.value(0) }
    /** Enum Value:                                  1 */
    get Health()                 { return this.value(1) }
    /** Enum Value:                                  2 */
    get Agility()                { return this.value(2) }
    /** Enum Value:                                  3 */
    get Strength()               { return this.value(3) }
    /** Enum Value:                                  4 */
    get Intellect()              { return this.value(4) }
    /** Enum Value:                                  5 */
    get Spirit()                 { return this.value(5) }
    /** Enum Value:                                  6 */
    get Stamina()                { return this.value(6) }
    /** Enum Value:                                  7 */
    get DefenseSkillRating()     { return this.value(7) }
    /** Enum Value:                                  8 */
    get DodgeRating()            { return this.value(8) }
    /** Enum Value:                                  9 */
    get ParryRating()            { return this.value(9) }
    /** Enum Value:                                  10 */
    get BlockRating()            { return this.value(10) }
    /** Enum Value:                                  11 */
    get HitMeleeRating()         { return this.value(11) }
    /** Enum Value:                                  12 */
    get HitRangedRating()        { return this.value(12) }
    /** Enum Value:                                  13 */
    get HitSpellRating()         { return this.value(13) }
    /** Enum Value:                                  14 */
    get CritMeleeRating()        { return this.value(14) }
    /** Enum Value:                                  15 */
    get CritRangedRating()       { return this.value(15) }
    /** Enum Value:                                  16 */
    get CritSpellRating()        { return this.value(16) }
    /** Enum Value:                                  17 */
    get HitTakenMeleeRating()    { return this.value(17) }
    /** Enum Value:                                  18 */
    get HitTakenRangedRating()   { return this.value(18) }
    /** Enum Value:                                  19 */
    get HitTakenSpellRating()    { return this.value(19) }
    /** Enum Value:                                  20 */
    get CritTakenMeleeRating()   { return this.value(20) }
    /** Enum Value:                                  21 */
    get CritTakenRangedRating()  { return this.value(21) }
    /** Enum Value:                                  22 */
    get CritTakenSpellRating()   { return this.value(22) }
    /** Enum Value:                                  23 */
    get HasteMeleeRating()       { return this.value(23) }
    /** Enum Value:                                  24 */
    get HasteRangedRating()      { return this.value(24) }
    /** Enum Value:                                  25 */
    get HasteSpellRating()       { return this.value(25) }
    /** Enum Value:                                  26 */
    get HitRating()              { return this.value(26) }
    /** Enum Value:                                  27 */
    get CritRating()             { return this.value(27) }
    /** Enum Value:                                  28 */
    get HitTakenRating()         { return this.value(28) }
    /** Enum Value:                                  29 */
    get CritTakenRating()        { return this.value(29) }
    /** Enum Value:                                  30 */
    get ResilienceRating()       { return this.value(30) }
    /** Enum Value:                                  31 */
    get HasteRating()            { return this.value(31) }
    /** Enum Value:                                  32 */
    get ExpertiseRating()        { return this.value(32) }
    /** Enum Value:                                  33 */
    get AttackPower()            { return this.value(33) }
    /** Enum Value:                                  34 */
    get RangedAttackPower()      { return this.value(34) }
    /** Enum Value:                                  35 */
    get FeralAttackPower()       { return this.value(35) }
    /** Enum Value:                                  36 */
    get SpellHealingDone()       { return this.value(36) }
    /** Enum Value:                                  37 */
    get SpellDamageDone()        { return this.value(37) }
    /** Enum Value:                                  38 */
    get ManaRegeneration()       { return this.value(38) }
    /** Enum Value:                                  39 */
    get ArmorPenetrationRating() { return this.value(39) }
    /** Enum Value:                                  40 */
    get SpellPower()             { return this.value(40) }
    /** Enum Value:                                  41 */
    get HealthRegen()            { return this.value(41) }
    /** Enum Value:                                  42 */
    get SpellPenetration()       { return this.value(42) }
    /** Enum Value:                                  43 */
    get BlockValue()             { return this.value(43) }
}

export class ItemStat extends ArrayEntry<ItemTemplate> {
    get Type() { return new Stat(this, a(this.container)[this.index])}
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

    private add(stat: number, value: number) {
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
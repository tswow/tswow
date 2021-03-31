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
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { ArrayEntry, SystemArray } from "wotlkdata/cell/systems/SystemArray";
import { SQLCell } from "wotlkdata/sql/SQLCell";
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

export class Stat extends Enum<ItemTemplate> {
    @EnumField(0)
    setMana() { return this.set(0)}
    
    @EnumField(1)
    setHealth() { return this.set(1)}
    
    @EnumField(2)
    setAgility() { return this.set(2)}
    
    @EnumField(3)
    setStrength() { return this.set(3)}
    
    @EnumField(4)
    setIntellect() { return this.set(4)}
    
    @EnumField(5)
    setSpirit() { return this.set(5)}
    
    @EnumField(6)
    setStamina() { return this.set(6)}
    
    @EnumField(7)  
    setDefenseSkillRating() { return this.set(7)}
    
    @EnumField(8)
    setDodgeRating() { return this.set(8)}
    
    @EnumField(9)
    setParryRating() { return this.set(9)}
    
    @EnumField(10)
    setBlockRating() { return this.set(10)}
    
    @EnumField(11)     
    setHitMeleeRating() { return this.set(11)}
    
    @EnumField(12)    
    setHitRangedRating() { return this.set(12)}
    
    @EnumField(13)     
    setHitSpellRating() { return this.set(13)}
    
    @EnumField(14)    
    setCritMeleeRating() { return this.set(14)}
    
    @EnumField(15)   
    setCritRangedRating() { return this.set(15)}
    
    @EnumField(16)    
    setCritSpellRating() { return this.set(16)}
    
    @EnumField(17)
    setHitTakenMeleeRating() { return this.set(17)}
    
    @EnumField(18)
    setHitTakenRangedRating() { return this.set(18)}
    
    @EnumField(19)
    setHitTakenSpellRating() { return this.set(19)}
    
    @EnumField(20)
    setCritTakenMeleeRating() { return this.set(20)}
    
    @EnumField(21)
    setCritTakenRangedRating() { return this.set(21)}        
    
    @EnumField(22)
    setCritTakenSpellRating() { return this.set(22)}
    
    @EnumField(23)   
    setHasteMeleeRating() { return this.set(23)}
    
    @EnumField(24)  
    setHasteRangedRating() { return this.set(24)}
    
    @EnumField(25)   
    setHasteSpellRating() { return this.set(25)}
    
    @EnumField(26)
    setHitRating() { return this.set(26)}
    
    @EnumField(27)
    setCritRating() { return this.set(27)}
    
    @EnumField(28)     
    setHitTakenRating() { return this.set(28)}
    
    @EnumField(29)    
    setCritTakenRating() { return this.set(29)}
    
    @EnumField(30)    
    setResilienceRating() { return this.set(30)}
    
    @EnumField(31)
    setHasteRating() { return this.set(31)}
    
    @EnumField(32)     
    setExpertiseRating() { return this.set(32)}
    
    @EnumField(33)
    setAttackPower() { return this.set(33)}
    
    @EnumField(34)  
    setRangedAttackPower() { return this.set(34)}
    
    @EnumField(35)   
    setFeralAttackPower() { return this.set(35)}
    
    @EnumField(36)   
    setSpellHealingDone() { return this.set(36)}
    
    @EnumField(37)    
    setSpellDamageDone() { return this.set(37)}
    
    @EnumField(38)    
    setManaRegeneration() { return this.set(38)}
    
    @EnumField(39)
    setArmorPenetrationRating() { return this.set(39)}       
    
    @EnumField(40)
    setSpellPower() { return this.set(40)}
    
    @EnumField(41)
    setHealthRegen() { return this.set(41)}
    
    @EnumField(42)    
    setSpellPenetration() { return this.set(42)}
    
    @EnumField(43)
    setBlockValue() { return this.set(43)}    
}

export class ItemStat extends ArrayEntry<ItemTemplate> {
    get Type() { return new Stat(this.owner, a(this.owner)[this.index])}
    get Value() { return b(this.owner)[this.index]; }

    clear(): ItemTemplate {
        this.Type.set(0);
        this.Value.set(0);
        return this.owner;
    }

    isClear(): boolean {
        return this.Type.get() === 0;
    }

}

export class ItemStats extends SystemArray<ItemStat,ItemTemplate> {
    get length(): number {
        return a.length;
    }

    get(index: number) {
        return new ItemStat(this.owner, index);
    }

    private add(stat: number, value: number) {
        const free = this.getFree();
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

    addAgility(value: number) { return this.add(2, value)}

    addStrength(value: number) { return this.add(3, value)}

    addIntellect(value: number) { return this.add(4, value)}

    addSpirit(value: number) { return this.add(5, value)}

    addStamina(value: number) { return this.add(6, value)}

    addDefenseSkillRating(value: number) { return this.add(7, value)}

    addDodgeRating(value: number) { return this.add(8, value)}

    addParryRating(value: number) { return this.add(9, value)}

    addBlockRating(value: number) { return this.add(10, value)}

    addHitMeleeRating(value: number) { return this.add(11, value)}

    addHitRangedRating(value: number) { return this.add(12, value)}

    addHitSpellRating(value: number) { return this.add(13, value)}

    addCritMeleeRating(value: number) { return this.add(14, value)}

    addCritRangedRating(value: number) { return this.add(15, value)}

    addCritSpellRating(value: number) { return this.add(16, value)}

    addHitTakenMeleeRating(value: number) { return this.add(17, value)}

    addHitTakenRangedRating(value: number) { return this.add(18, value)}

    addHitTakenSpellRating(value: number) { return this.add(19, value)}

    addCritTakenMeleeRating(value: number) { return this.add(20, value)}

    addCritTakenRangedRating(value: number) { return this.add(21, value)}        

    addCritTakenSpellRating(value: number) { return this.add(22, value)}

    addHasteMeleeRating(value: number) { return this.add(23, value)}

    addHasteRangedRating(value: number) { return this.add(24, value)}

    addHasteSpellRating(value: number) { return this.add(25, value)}

    addHitRating(value: number) { return this.add(26, value)}

    addCritRating(value: number) { return this.add(27, value)}

    addHitTakenRating(value: number) { return this.add(28, value)}

    addCritTakenRating(value: number) { return this.add(29, value)}

    addResilienceRating(value: number) { return this.add(30, value)}

    addHasteRating(value: number) { return this.add(31, value)}

    addExpertiseRating(value: number) { return this.add(32, value)}

    addAttackPower(value: number) { return this.add(33, value)}

    addRangedAttackPower(value: number) { return this.add(34, value)}

    addFeralAttackPower(value: number) { return this.add(35, value)}

    addSpellHealingDone(value: number) { return this.add(36, value)}

    addSpellDamageDone(value: number) { return this.add(37, value)}

    addManaRegeneration(value: number) { return this.add(38, value)}

    addArmorPenetrationRating(value: number) { return this.add(39, value)}       

    addSpellPower(value: number) { return this.add(40, value)}

    addHealthRegen(value: number) { return this.add(41, value)}

    addSpellPenetration(value: number) { return this.add(42, value)}

    addBlockValue(value: number) { return this.add(43, value)}
}
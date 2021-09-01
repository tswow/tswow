import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";

export class StatType<T> extends EnumCellWrapper<T> {
    @EnumField(1)
    setHealth() { return this.set(1); }
    @EnumField(2)
    setMana() { return this.set(2); }
    @EnumField(3)
    setAgility() { return this.set(3); }
    @EnumField(4)
    setStrength() { return this.set(4); }
    @EnumField(5)
    setIntellect() { return this.set(5); }
    @EnumField(6)
    setSpirit() { return this.set(6); }
    @EnumField(7)
    setStamina() { return this.set(7); }
    @EnumField(12)
    setDefenseRating() { return this.set(12); }
    @EnumField(13)
    setDodgeRating() { return this.set(13); }
    @EnumField(14)
    setParryRating() { return this.set(14); }
    @EnumField(15)
    setShieldBlock() { return this.set(15); }
    @EnumField(16)
    setMeleeHit() { return this.set(16); }
    @EnumField(17)
    setRangedHit() { return this.set(17); }
    @EnumField(18)
    setSpellHit() { return this.set(18); }
    @EnumField(19)
    setMeleeCrit() { return this.set(19); }
    @EnumField(20)
    setRangedCrit() { return this.set(20); }
    @EnumField(21)
    setSpellCrit() { return this.set(21); }
    @EnumField(22)
    setMeleeHitAvoidance() { return this.set(22); }
    @EnumField(23)
    setRangedHitAvoidance() { return this.set(23); }
    @EnumField(24)
    setSpellHitAvoidance() { return this.set(24); }
    @EnumField(25)
    setMeleeCritAvoidance() { return this.set(25); }
    @EnumField(26)
    setRangedCritAvoidance() { return this.set(26); }
    @EnumField(27)
    setSpellCritAvoidance() { return this.set(27); }
    @EnumField(28)
    setMeleeHaste() { return this.set(28); }
    @EnumField(29)
    setRangedHaste() { return this.set(29); }
    @EnumField(30)
    setSpellHaste() { return this.set(30); }
    @EnumField(31)
    setHitRating() { return this.set(31); }
    @EnumField(32)
    setCritRating() { return this.set(32); }
    @EnumField(33)
    setHitAvoidance() { return this.set(33); }
    @EnumField(34)
    setCritAvoidance() { return this.set(34); }
    @EnumField(35)
    setResilience() { return this.set(35); }
    @EnumField(36)
    setHaste() { return this.set(36); }
    @EnumField(37)
    setExpertise() { return this.set(37); }
    @EnumField(38)
    setAttackPower() { return this.set(38); }
    @EnumField(39)
    setRangedPower() { return this.set(39); }
    @EnumField(40)
    setFeralPower() { return this.set(40); }
    @EnumField(41)
    setDamageDone() { return this.set(41); }
    @EnumField(42)
    setHealingDone() { return this.set(42); }
    @EnumField(43)
    setManaPer5Seconds() { return this.set(43); }
    @EnumField(44)
    setArmorPenetration() { return this.set(44); }
    @EnumField(45)
    setSpellpower() { return this.set(45); }
    @EnumField(46)
    setHealthPer5Seconds() { return this.set(46); }
    @EnumField(47)
    setSpellPenetration() { return this.set(47); }
    @EnumField(48)
    setBlockValue() { return this.set(48); }
}
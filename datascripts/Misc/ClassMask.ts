import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";

export class ClassMask<T> extends MaskCell32<T> {
    enableClass(classId: number) { return this.setBit(classId-1, true); }
    disableClass(classId: number) { return this.setBit(classId-1, false); }
    get Warrior() { return this.bit(0); }
    get Paladin() { return this.bit(1); }
    get Hunter() { return this.bit(2); }
    get Rogue() { return this.bit(3); }
    get Priest() { return this.bit(4); }
    get DeathKnight() { return this.bit(5); }
    get Shaman() { return this.bit(6); }
    get Mage() { return this.bit(7); }
    get Warlock() { return this.bit(8); }
    get Druid() { return this.bit(10); }
}

export class ClassMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Warrior() { return this.bit(0); }
    get Paladin() { return this.bit(1); }
    get Hunter() { return this.bit(2); }
    get Rogue() { return this.bit(3); }
    get Priest() { return this.bit(4); }
    get DeathKnight() { return this.bit(5); }
    get Shaman() { return this.bit(6); }
    get Mage() { return this.bit(7); }
    get Warlock() { return this.bit(8); }
    get Druid() { return this.bit(10); }
}
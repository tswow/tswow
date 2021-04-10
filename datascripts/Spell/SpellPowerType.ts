import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";

export class SpellPowerType<T> extends Enum<T> {

    @EnumField(-2)
    setHealth() { return this.set(-2); }

    @EnumField(0)
    setMana() { return this.set(0); }

    @EnumField(1)
    setRage() { return this.set(1); }

    @EnumField(2)
    setFocus() { return this.set(2); }

    @EnumField(3)
    setEnergy() { return this.set(3); }

    @EnumField(4)
    setHappiness() { return this.set(4); }

    @EnumField(5)
    setRune() { return this.set(5); }

    @EnumField(6)
    setRunicPower() { return this.set(6); }

    @EnumField(127)
    setAll() { return this.set(127); }
}
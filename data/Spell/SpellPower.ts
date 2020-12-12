import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellPower extends Subsystem<Spell> {

    /**
     * Sets this spell to use mana
     * @param baseCost 
     * @param costPct 
     * @param perLevel 
     * @param perSecondBase 
     * @param perSecondPerLevel 
     */
    setMana(baseCost: number, costPct = 0, perLevel = 0, perSecondBase = 0, perSecondPerLevel = 0) {
        this.owner.row.PowerType.set(0);
        this.owner.row.ManaCost.set(baseCost);
        this.owner.row.ManaCostPct.set(costPct);
        this.owner.row.ManaCostPerLevel.set(perLevel);
        this.owner.row.ManaPerSecond.set(perSecondBase);
        this.owner.row.ManaPerSecondPerLevel.set(perSecondPerLevel);
        return this.owner;
    }

    /**
     * Sets this spell to use energy
     * @param energy 
     */
    setEnergy(energy: number) {
        this.owner.row.PowerType.set(3);
        this.owner.row.ManaCost.set(energy);
        return this.owner;
    }

    /**
     * Set this spell to use rage
     * @param rage
     */
    setRage(rage: number) {
        this.owner.row.PowerType.set(1);
        this.owner.row.ManaCost.set(rage*10);
        return this.owner;
    }

    /**
     * Sets this spell to use runic power
     * @param blood How many blood runes to use
     * @param unholy How many unholy runes to use
     * @param frost How many frost runes to use
     * @param runicPower How much runic power to use
     */
    setRunes(blood: number, unholy: number, frost: number, runicPower: number) {
        DBC.SpellRuneCost.add(Ids.SpellRuneCost.id())
            .Blood.set(blood)
            .Unholy.set(unholy)
            .Frost.set(frost)
            .RunicPower.set(runicPower)
        return this.owner;
    }
}
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
import { DBC } from "wotlkdata";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Ids } from "../Base/Ids";
import { Spell } from "./Spell";

export class SpellPower<T> extends Subsystem<T> {
    spell: Spell;
    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    /**
     * Sets this spell to use mana
     * @param baseCost 
     * @param costPct 
     * @param perLevel 
     * @param perSecondBase 
     * @param perSecondPerLevel 
     */
    setMana(baseCost: number, costPct = 0, perLevel = 0, perSecondBase = 0, perSecondPerLevel = 0) {
        this.spell.row.PowerType.set(0);
        this.spell.row.ManaCost.set(baseCost);
        this.spell.row.ManaCostPct.set(costPct);
        this.spell.row.ManaCostPerLevel.set(perLevel);
        this.spell.row.ManaPerSecond.set(perSecondBase);
        this.spell.row.ManaPerSecondPerLevel.set(perSecondPerLevel);
        return this.owner;
    }

    /**
     * Sets this spell to use energy
     * @param energy 
     */
    setEnergy(energy: number) {
        this.spell.row.PowerType.set(3);
        this.spell.row.ManaCost.set(energy);
        return this.owner;
    }

    /**
     * Set this spell to use rage
     * @param rage
     */
    setRage(rage: number) {
        this.spell.row.PowerType.set(1);
        this.spell.row.ManaCost.set(rage*10);
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
        const row = DBC.SpellRuneCost.add(Ids.SpellRuneCost.id())
            .Blood.set(blood)
            .Unholy.set(unholy)
            .Frost.set(frost)
            .RunicPower.set(runicPower)
        this.spell.row.RuneCostID.set(row.ID.get())
        return this.owner;
    }
}
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
import { Cell } from "wotlkdata/cell/cells/Cell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SpellRuneCostQuery, SpellRuneCostRow } from "wotlkdata/dbc/types/SpellRuneCost";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamicNoRef } from "../Refs/Registry";
import { Spell } from "./Spell";

export const PowerTypeMap = {
    'HEALTH':-2,
    'INVALID':-1,
    'MANA':0,
    'RAGE':1,
    'PET_ENERGY':2,
    'ENERGY':3,
    'ELIXIR':4,
    'RUNES':5,
    'RUNIC_POWER':6,
}

export type PowerType = keyof typeof PowerTypeMap

export class Power<T> extends CellSystem<T> {
    readonly spell: Spell;

    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get(): PowerType {
        let type = this.spell.row.PowerType.get()
        for(let key in PowerTypeMap) {
            if(PowerTypeMap[key as PowerType] == type) {
                return key as PowerType;
            }
        }
        return 'INVALID'
    }

    set(type: PowerType) {
        this.spell.row.PowerType.set(PowerTypeMap[type]);
        return this.owner;
    }

    objectify() {
        return this.get();
    }
}

export class SpellRuneCost extends MainEntity<SpellRuneCostRow> {
    get ID() { return this.row.ID.get(); }
    get RunicPower() { return this.wrap(this.row.RunicPower); }
    get Blood() { return this.wrap(this.row.Blood); }
    get Frost() { return this.wrap(this.row.Frost); }
    get Unholy() { return this.wrap(this.row.Unholy); }
}

export class SpellRuneCostRef<T> extends RefDynamic<T,SpellRuneCost> {

    setSimple(runicPower: number, blood: number, frost: number, unholy: number) {
        this.getRefCopy()
            .RunicPower.set(runicPower)
            .Blood.set(blood)
            .Frost.set(frost)
            .Unholy.set(unholy)
        return this.owner;
    }
}

export class SpellRuneCostRegistryClass
    extends RegistryDynamicNoRef<SpellRuneCost,SpellRuneCostRow,SpellRuneCostQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new SpellRuneCostRef(owner, cell, this);
    }
    protected Table(): Table<any, SpellRuneCostQuery, SpellRuneCostRow> & { add: (id: number) => SpellRuneCostRow; } {
        return DBC.SpellRuneCost
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellRuneCost
    }
    Clear(entity: SpellRuneCost): void {
        entity.Blood.set(0)
              .Frost.set(0)
              .RunicPower.set(0)
              .Unholy.set(0)
    }
    protected Clone(entity: SpellRuneCost, parent: SpellRuneCost): void {
        throw new Error("Method not implemented.");
    }
    protected FindByID(id: number): SpellRuneCostRow {
        return DBC.SpellRuneCost.findById(id);
    }
    protected EmptyQuery(): SpellRuneCostQuery {
        return {}
    }
    ID(e: SpellRuneCost): number {
        return e.ID
    }
    protected Entity(r: SpellRuneCostRow): SpellRuneCost {
        return new SpellRuneCost(r);
    }
}

export const SpellRuneCostRegistry = new SpellRuneCostRegistryClass()

export class SpellPower<T> extends CellSystem<T> {
    @Transient
    readonly spell: Spell;
    constructor(owner: T, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get PowerType() { return new Power(this.owner, this.spell); }
    get PowerCostBase() { return this.ownerWrap(this.spell.row.ManaCost);}
    get PowerCostPercent() { return this.ownerWrap(this.spell.row.ManaCostPct);}
    get PowerCostPerLevel() { return this.ownerWrap(this.spell.row.ManaCostPerLevel);}
    get PowerPerSecond() { return this.ownerWrap(this.spell.row.ManaPerSecond);}
    get PowerPerSecondPerLevel() { return this.ownerWrap(this.spell.row.ManaPerSecondPerLevel);}
    get RuneCost() { return SpellRuneCostRegistry.ref(this.spell, this.spell.row.RuneCostID); }

    /**
     * Sets this spell to use mana
     * @param baseCost
     * @param costPct
     * @param perLevel
     * @param perSecondBase
     * @param perSecondPerLevel
     */
    setMana(baseCost: number, costPct = 0, perLevel = 0, perSecondBase = 0, perSecondPerLevel = 0) {
        this.PowerType.set('MANA');
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
        this.PowerType.set('ENERGY');
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
}
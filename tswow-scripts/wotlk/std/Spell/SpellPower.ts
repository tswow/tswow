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
import { Cell } from "../../../data/cell/cells/Cell";
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { Table } from "../../../data/table/Table";
import { SpellRuneCostQuery, SpellRuneCostRow } from "../../dbc/SpellRuneCost";
import { DBC } from "../../DBCFiles";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { Substruct } from "../Misc/Substruct";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { Spell } from "./Spell";

export enum PowerTypeEnum
{
    HEALTH = -2,
    INVALID = -1,
    MANA = 0,
    RAGE = 1,
    PET_ENERGY = 2,
    ENERGY = 3,
    ELIXIR = 4,
    RUNES = 5,
    RUNIC_POWER = 6,
}
export class SpellRuneCost extends MainEntity<SpellRuneCostRow> {
    get ID() { return this.row.ID.get(); }
    get RunicPower() { return this.wrap(this.row.RunicPower); }
    get Blood() { return this.wrap(this.row.Blood); }
    get Frost() { return this.wrap(this.row.Frost); }
    get Unholy() { return this.wrap(this.row.Unholy); }

    codify(settings: CodegenSettings)
    {
        return GenerateCode(settings,'std.SpellRuneCost.create()',(gen)=>
        {
            gen.non_def_num('RunicPower',this.RunicPower);
            gen.non_def_num('Blood',this.Blood);
            gen.non_def_num('Frost',this.Frost);
            gen.non_def_num('Unholy',this.Unholy);
        })
    }
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
    extends RegistryDynamic<SpellRuneCost,SpellRuneCostRow,SpellRuneCostQuery>
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

export class SpellPower<T> extends Substruct<T,Spell> {
    constructor(owner: T, spell: Spell) {
        super(owner,spell);
    }

    get Type() { return makeEnumCell(PowerTypeEnum, this.owner, this.realOwner.row.PowerType)}
    get CostBase() { return this.ownerWrap(this.realOwner.row.ManaCost);}
    get CostPercent() { return this.ownerWrap(this.realOwner.row.ManaCostPct);}
    get CostPerLevel() { return this.ownerWrap(this.realOwner.row.ManaCostPerLevel);}
    get CostPerSecond() { return this.ownerWrap(this.realOwner.row.ManaPerSecond);}
    get CostPerSecondPerLevel() { return this.ownerWrap(this.realOwner.row.ManaPerSecondPerLevel);}

    mod(callback: (power: SpellPowerCB)=>void)
    {
        callback(new SpellPowerCB(this.realOwner));
        return this.owner;
    }

    /** @deprecated Use 'Type'*/
    @Transient
    get PowerType() { return makeEnumCell(PowerTypeEnum, this.owner, this.realOwner.row.PowerType)}
    /** @deprecated Use 'CostBase'*/
    @Transient
    get PowerCostBase() { return this.ownerWrap(this.realOwner.row.ManaCost);}
    /** @deprecated Use 'CostPercent'*/
    @Transient
    get PowerCostPercent() { return this.ownerWrap(this.realOwner.row.ManaCostPct);}
    /** @deprecated Use 'CostPerLevel'*/
    @Transient
    get PowerCostPerLevel() { return this.ownerWrap(this.realOwner.row.ManaCostPerLevel);}
    /** @deprecated Use 'CostPerSecond'*/
    @Transient
    get PowerPerSecond() { return this.ownerWrap(this.realOwner.row.ManaPerSecond);}
    /** @deprecated Use 'CostPerSecondPerLevel'*/
    @Transient
    get PowerPerSecondPerLevel() { return this.ownerWrap(this.realOwner.row.ManaPerSecondPerLevel);}

    get RuneCost() { return SpellRuneCostRegistry.ref(this.owner, this.realOwner.row.RuneCostID); }

    /**
     * Sets this.realOwner.to use mana
     * @param baseCost {number} Defines the spell's base mana cost
     * @param costPct {number} Defines a percentage of the user's max mana as cost (i.e. 10% of maximum mana)
     * @param perLevel {number} Increases the spell's mana cost for each level
     * @param perSecondBase {number} Defines a base mana cost per second
     * @param perSecondPerLevel {number} Increases the spell's mana cost per second for each level
     */
    setMana(baseCost: number, costPct: number = 0, perLevel: number = 0, perSecondBase: number = 0, perSecondPerLevel: number = 0) {
        this.Type.set('MANA')
        this.realOwner.row.ManaCost.set(baseCost);
        this.realOwner.row.ManaCostPct.set(costPct);
        this.realOwner.row.ManaCostPerLevel.set(perLevel);
        this.realOwner.row.ManaPerSecond.set(perSecondBase);
        this.realOwner.row.ManaPerSecondPerLevel.set(perSecondPerLevel);
        return this.owner;
    }

    /**
     * Sets this.realOwner.to use energy
     * @param baseCost {number} Defines the spell's base energy cost
     * @param costPct {number} Defines a percentage of the user's max energy as cost (i.e. 10% of maximum energy)
     * @param perLevel {number} Increases the spell's energy cost for each level
     * @param perSecondBase {number} Defines a base energy cost per second
     * @param perSecondPerLevel {number} Increases the spell's energy cost per second for each level
     */
    setEnergy(baseCost: number, costPct: number = 0, perLevel: number = 0, perSecondBase: number = 0, perSecondPerLevel: number = 0) {
        this.Type.set('ENERGY');
        this.realOwner.row.ManaCost.set(baseCost);
        this.realOwner.row.ManaCostPct.set(costPct);
        this.realOwner.row.ManaCostPerLevel.set(perLevel);
        this.realOwner.row.ManaPerSecond.set(perSecondBase);
        this.realOwner.row.ManaPerSecondPerLevel.set(perSecondPerLevel);
        return this.owner;
    }

    /**
     * Set this.realOwner.to use rage
     * @param baseCost {number} Defines the spell's base rage cost
     * @param costPct {number} Defines a percentage of the user's max rage as cost (i.e. 10% of maximum rage)
     * @param perLevel {number} Increases the spell's rage cost for each level
     * @param perSecondBase {number} Defines a base rage cost per second
     * @param perSecondPerLevel {number} Increases the spell's rage cost per second for each level
     */
    setRage(baseCost: number, costPct: number = 0, perLevel: number = 0, perSecondBase: number = 0, perSecondPerLevel: number = 0) {
        this.Type.set('RAGE');
        this.realOwner.row.ManaCost.set(baseCost*10);
        this.realOwner.row.ManaCostPct.set(costPct);
        this.realOwner.row.ManaCostPerLevel.set(perLevel*10);
        this.realOwner.row.ManaPerSecond.set(perSecondBase*10);
        this.realOwner.row.ManaPerSecondPerLevel.set(perSecondPerLevel*10);
        return this.owner;
    }
}

export class SpellPowerCB extends SpellPower<SpellPowerCB>
{
    constructor(owner: Spell)
    {
        super(undefined,owner);
        this.injectThis(this);
    }
}
import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { SpellRuneCostQuery, SpellRuneCostRow } from "../../dbc/SpellRuneCost";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { Substruct } from "../Misc/Substruct";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { Spell } from "./Spell";
export declare enum PowerTypeEnum {
    HEALTH = -2,
    INVALID = -1,
    MANA = 0,
    RAGE = 1,
    PET_ENERGY = 2,
    ENERGY = 3,
    ELIXIR = 4,
    RUNES = 5,
    RUNIC_POWER = 6
}
export declare class SpellRuneCost extends MainEntity<SpellRuneCostRow> {
    get ID(): number;
    get RunicPower(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Blood(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Frost(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Unholy(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings): string;
}
export declare class SpellRuneCostRef<T> extends RefDynamic<T, SpellRuneCost> {
    setSimple(runicPower: number, blood: number, frost: number, unholy: number): T;
}
export declare class SpellRuneCostRegistryClass extends RegistryDynamic<SpellRuneCost, SpellRuneCostRow, SpellRuneCostQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): SpellRuneCostRef<T>;
    protected Table(): Table<any, SpellRuneCostQuery, SpellRuneCostRow> & {
        add: (id: number) => SpellRuneCostRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellRuneCost): void;
    protected FindByID(id: number): SpellRuneCostRow;
    protected EmptyQuery(): SpellRuneCostQuery;
    ID(e: SpellRuneCost): number;
    protected Entity(r: SpellRuneCostRow): SpellRuneCost;
}
export declare const SpellRuneCostRegistry: SpellRuneCostRegistryClass;
export declare class SpellPower<T> extends Substruct<T, Spell> {
    constructor(owner: T, spell: Spell);
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<T, typeof PowerTypeEnum>;
    get CostBase(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CostPercent(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CostPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CostPerSecond(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get CostPerSecondPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    mod(callback: (power: SpellPowerCB) => void): T;
    /** @deprecated Use 'Type'*/
    get PowerType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<T, typeof PowerTypeEnum>;
    /** @deprecated Use 'CostBase'*/
    get PowerCostBase(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated Use 'CostPercent'*/
    get PowerCostPercent(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated Use 'CostPerLevel'*/
    get PowerCostPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated Use 'CostPerSecond'*/
    get PowerPerSecond(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    /** @deprecated Use 'CostPerSecondPerLevel'*/
    get PowerPerSecondPerLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, T>;
    get RuneCost(): SpellRuneCostRef<T>;
    /**
     * Sets this.realOwner.to use mana
     * @param baseCost {number} Defines the spell's base mana cost
     * @param costPct {number} Defines a percentage of the user's max mana as cost (i.e. 10% of maximum mana)
     * @param perLevel {number} Increases the spell's mana cost for each level
     * @param perSecondBase {number} Defines a base mana cost per second
     * @param perSecondPerLevel {number} Increases the spell's mana cost per second for each level
     */
    setMana(baseCost: number, costPct?: number, perLevel?: number, perSecondBase?: number, perSecondPerLevel?: number): T;
    /**
     * Sets this.realOwner.to use energy
     * @param baseCost {number} Defines the spell's base energy cost
     * @param costPct {number} Defines a percentage of the user's max energy as cost (i.e. 10% of maximum energy)
     * @param perLevel {number} Increases the spell's energy cost for each level
     * @param perSecondBase {number} Defines a base energy cost per second
     * @param perSecondPerLevel {number} Increases the spell's energy cost per second for each level
     */
    setEnergy(baseCost: number, costPct?: number, perLevel?: number, perSecondBase?: number, perSecondPerLevel?: number): T;
    /**
     * Set this.realOwner.to use rage
     * @param baseCost {number} Defines the spell's base rage cost
     * @param costPct {number} Defines a percentage of the user's max rage as cost (i.e. 10% of maximum rage)
     * @param perLevel {number} Increases the spell's rage cost for each level
     * @param perSecondBase {number} Defines a base rage cost per second
     * @param perSecondPerLevel {number} Increases the spell's rage cost per second for each level
     */
    setRage(baseCost: number, costPct?: number, perLevel?: number, perSecondBase?: number, perSecondPerLevel?: number): T;
}
export declare class SpellPowerCB extends SpellPower<SpellPowerCB> {
    constructor(owner: Spell);
}

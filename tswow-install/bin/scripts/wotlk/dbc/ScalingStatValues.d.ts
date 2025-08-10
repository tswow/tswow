import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ScalingStatValuesRow extends DBCRow<ScalingStatValuesCreator, ScalingStatValuesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Charlevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ShoulderBudget(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TrinketBudget(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponBudget1H(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RangedBudget(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClothShoulderArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LeatherShoulderArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MailShoulderArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PlateShoulderArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponDPS1H(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WeaponDPS2H(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellcasterDPS1H(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellcasterDPS2H(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RangedDPS(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WandDPS(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellPower(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PrimaryBudget(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TertiaryBudget(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClothCloakArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClothChestArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LeatherChestArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MailChestArmor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PlateChestArmor(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ScalingStatValuesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ScalingStatValuesCreator = {
    Charlevel?: int;
    ShoulderBudget?: int;
    TrinketBudget?: int;
    WeaponBudget1H?: int;
    RangedBudget?: int;
    ClothShoulderArmor?: int;
    LeatherShoulderArmor?: int;
    MailShoulderArmor?: int;
    PlateShoulderArmor?: int;
    WeaponDPS1H?: int;
    WeaponDPS2H?: int;
    SpellcasterDPS1H?: int;
    SpellcasterDPS2H?: int;
    RangedDPS?: int;
    WandDPS?: int;
    SpellPower?: int;
    PrimaryBudget?: int;
    TertiaryBudget?: int;
    ClothCloakArmor?: int;
    ClothChestArmor?: int;
    LeatherChestArmor?: int;
    MailChestArmor?: int;
    PlateChestArmor?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ScalingStatValuesQuery = {
    ID?: Relation<int>;
    Charlevel?: Relation<int>;
    ShoulderBudget?: Relation<int>;
    TrinketBudget?: Relation<int>;
    WeaponBudget1H?: Relation<int>;
    RangedBudget?: Relation<int>;
    ClothShoulderArmor?: Relation<int>;
    LeatherShoulderArmor?: Relation<int>;
    MailShoulderArmor?: Relation<int>;
    PlateShoulderArmor?: Relation<int>;
    WeaponDPS1H?: Relation<int>;
    WeaponDPS2H?: Relation<int>;
    SpellcasterDPS1H?: Relation<int>;
    SpellcasterDPS2H?: Relation<int>;
    RangedDPS?: Relation<int>;
    WandDPS?: Relation<int>;
    SpellPower?: Relation<int>;
    PrimaryBudget?: Relation<int>;
    TertiaryBudget?: Relation<int>;
    ClothCloakArmor?: Relation<int>;
    ClothChestArmor?: Relation<int>;
    LeatherChestArmor?: Relation<int>;
    MailChestArmor?: Relation<int>;
    PlateChestArmor?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ScalingStatValuesDBCFile extends DBCFile<ScalingStatValuesCreator, ScalingStatValuesQuery, ScalingStatValuesRow> {
    constructor();
    /** Loads a new ScalingStatValues.dbc from a file. */
    static read(path: string): ScalingStatValuesDBCFile;
    add(ID: int, c?: ScalingStatValuesCreator): ScalingStatValuesRow;
}

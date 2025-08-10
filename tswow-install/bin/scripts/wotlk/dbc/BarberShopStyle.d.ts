import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class BarberShopStyleRow extends DBCRow<BarberShopStyleCreator, BarberShopStyleQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Cost_Modifier(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Race(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Sex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Data(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: BarberShopStyleCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type BarberShopStyleCreator = {
    Type?: int;
    DisplayName?: loc_constructor;
    Description?: loc_constructor;
    Cost_Modifier?: float;
    Race?: int;
    Sex?: int;
    Data?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type BarberShopStyleQuery = {
    ID?: Relation<int>;
    Type?: Relation<int>;
    DisplayName?: Relation<string>;
    Description?: Relation<string>;
    Cost_Modifier?: Relation<float>;
    Race?: Relation<int>;
    Sex?: Relation<int>;
    Data?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class BarberShopStyleDBCFile extends DBCFile<BarberShopStyleCreator, BarberShopStyleQuery, BarberShopStyleRow> {
    constructor();
    /** Loads a new BarberShopStyle.dbc from a file. */
    static read(path: string): BarberShopStyleDBCFile;
    add(ID: int, c?: BarberShopStyleCreator): BarberShopStyleRow;
    findById(id: number): BarberShopStyleRow;
}

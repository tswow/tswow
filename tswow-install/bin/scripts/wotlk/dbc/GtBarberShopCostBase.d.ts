import { DBCFloatCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GtBarberShopCostBaseRow extends DBCRow<GtBarberShopCostBaseCreator, GtBarberShopCostBaseQuery> {
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: GtBarberShopCostBaseCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GtBarberShopCostBaseCreator = {
    Data?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type GtBarberShopCostBaseQuery = {
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GtBarberShopCostBaseDBCFile extends DBCFile<GtBarberShopCostBaseCreator, GtBarberShopCostBaseQuery, GtBarberShopCostBaseRow> {
    constructor();
    /** Loads a new GtBarberShopCostBase.dbc from a file. */
    static read(path: string): GtBarberShopCostBaseDBCFile;
    add(c?: GtBarberShopCostBaseCreator): GtBarberShopCostBaseRow;
}

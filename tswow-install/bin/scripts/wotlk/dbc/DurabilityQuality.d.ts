import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class DurabilityQualityRow extends DBCRow<DurabilityQualityCreator, DurabilityQualityQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DurabilityQualityCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DurabilityQualityCreator = {
    Data?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type DurabilityQualityQuery = {
    ID?: Relation<int>;
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DurabilityQualityDBCFile extends DBCFile<DurabilityQualityCreator, DurabilityQualityQuery, DurabilityQualityRow> {
    constructor();
    /** Loads a new DurabilityQuality.dbc from a file. */
    static read(path: string): DurabilityQualityDBCFile;
    add(ID: int, c?: DurabilityQualityCreator): DurabilityQualityRow;
    findById(id: number): DurabilityQualityRow;
}

import { DBCFloatCell, DBCUIntCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GtOCTClassCombatRatingScalarRow extends DBCRow<GtOCTClassCombatRatingScalarCreator, GtOCTClassCombatRatingScalarQuery> {
    /**
     * No comment (yet!)
     */
    get ID(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: GtOCTClassCombatRatingScalarCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GtOCTClassCombatRatingScalarCreator = {
    ID?: uint;
    Data?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type GtOCTClassCombatRatingScalarQuery = {
    ID?: Relation<uint>;
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GtOCTClassCombatRatingScalarDBCFile extends DBCFile<GtOCTClassCombatRatingScalarCreator, GtOCTClassCombatRatingScalarQuery, GtOCTClassCombatRatingScalarRow> {
    constructor();
    /** Loads a new GtOCTClassCombatRatingScalar.dbc from a file. */
    static read(path: string): GtOCTClassCombatRatingScalarDBCFile;
    add(c?: GtOCTClassCombatRatingScalarCreator): GtOCTClassCombatRatingScalarRow;
}

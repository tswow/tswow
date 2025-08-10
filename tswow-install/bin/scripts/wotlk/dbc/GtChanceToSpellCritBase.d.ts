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
export declare class GtChanceToSpellCritBaseRow extends DBCRow<GtChanceToSpellCritBaseCreator, GtChanceToSpellCritBaseQuery> {
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(c?: GtChanceToSpellCritBaseCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GtChanceToSpellCritBaseCreator = {
    Data?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type GtChanceToSpellCritBaseQuery = {
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GtChanceToSpellCritBaseDBCFile extends DBCFile<GtChanceToSpellCritBaseCreator, GtChanceToSpellCritBaseQuery, GtChanceToSpellCritBaseRow> {
    constructor();
    /** Loads a new GtChanceToSpellCritBase.dbc from a file. */
    static read(path: string): GtChanceToSpellCritBaseDBCFile;
    add(c?: GtChanceToSpellCritBaseCreator): GtChanceToSpellCritBaseRow;
}

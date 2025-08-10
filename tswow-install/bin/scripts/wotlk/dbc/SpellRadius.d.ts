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
export declare class SpellRadiusRow extends DBCRow<SpellRadiusCreator, SpellRadiusQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Radius(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RadiusPerLevel(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RadiusMax(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellRadiusCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellRadiusCreator = {
    Radius?: float;
    RadiusPerLevel?: float;
    RadiusMax?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellRadiusQuery = {
    ID?: Relation<int>;
    Radius?: Relation<float>;
    RadiusPerLevel?: Relation<float>;
    RadiusMax?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellRadiusDBCFile extends DBCFile<SpellRadiusCreator, SpellRadiusQuery, SpellRadiusRow> {
    constructor();
    /** Loads a new SpellRadius.dbc from a file. */
    static read(path: string): SpellRadiusDBCFile;
    add(ID: int, c?: SpellRadiusCreator): SpellRadiusRow;
    findById(id: number): SpellRadiusRow;
}

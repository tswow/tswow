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
export declare class SpellCastTimesRow extends DBCRow<SpellCastTimesCreator, SpellCastTimesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Base(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PerLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Minimum(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellCastTimesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellCastTimesCreator = {
    Base?: int;
    PerLevel?: int;
    Minimum?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellCastTimesQuery = {
    ID?: Relation<int>;
    Base?: Relation<int>;
    PerLevel?: Relation<int>;
    Minimum?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellCastTimesDBCFile extends DBCFile<SpellCastTimesCreator, SpellCastTimesQuery, SpellCastTimesRow> {
    constructor();
    /** Loads a new SpellCastTimes.dbc from a file. */
    static read(path: string): SpellCastTimesDBCFile;
    add(ID: int, c?: SpellCastTimesCreator): SpellCastTimesRow;
    findById(id: number): SpellCastTimesRow;
}

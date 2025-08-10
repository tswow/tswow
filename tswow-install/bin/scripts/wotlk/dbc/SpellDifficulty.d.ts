import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDifficultyRow extends DBCRow<SpellDifficultyCreator, SpellDifficultyQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get DifficultySpellID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellDifficultyCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellDifficultyCreator = {
    DifficultySpellID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellDifficultyQuery = {
    ID?: Relation<int>;
    DifficultySpellID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDifficultyDBCFile extends DBCFile<SpellDifficultyCreator, SpellDifficultyQuery, SpellDifficultyRow> {
    constructor();
    /** Loads a new SpellDifficulty.dbc from a file. */
    static read(path: string): SpellDifficultyDBCFile;
    add(ID: int, c?: SpellDifficultyCreator): SpellDifficultyRow;
    findById(id: number): SpellDifficultyRow;
}

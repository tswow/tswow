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
export declare class SpellDurationRow extends DBCRow<SpellDurationCreator, SpellDurationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Duration(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DurationPerLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxDuration(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellDurationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellDurationCreator = {
    Duration?: int;
    DurationPerLevel?: int;
    MaxDuration?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellDurationQuery = {
    ID?: Relation<int>;
    Duration?: Relation<int>;
    DurationPerLevel?: Relation<int>;
    MaxDuration?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDurationDBCFile extends DBCFile<SpellDurationCreator, SpellDurationQuery, SpellDurationRow> {
    constructor();
    /** Loads a new SpellDuration.dbc from a file. */
    static read(path: string): SpellDurationDBCFile;
    add(ID: int, c?: SpellDurationCreator): SpellDurationRow;
    findById(id: number): SpellDurationRow;
}

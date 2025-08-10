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
export declare class LockRow extends DBCRow<LockCreator, LockQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Index(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Skill(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Action(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LockCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LockCreator = {
    Type?: int[];
    Index?: int[];
    Skill?: int[];
    Action?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type LockQuery = {
    ID?: Relation<int>;
    Type?: Relation<int>;
    Index?: Relation<int>;
    Skill?: Relation<int>;
    Action?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LockDBCFile extends DBCFile<LockCreator, LockQuery, LockRow> {
    constructor();
    /** Loads a new Lock.dbc from a file. */
    static read(path: string): LockDBCFile;
    add(ID: int, c?: LockCreator): LockRow;
    findById(id: number): LockRow;
}

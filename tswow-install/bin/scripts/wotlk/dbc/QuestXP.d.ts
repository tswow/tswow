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
export declare class QuestXPRow extends DBCRow<QuestXPCreator, QuestXPQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Difficulty(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: QuestXPCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type QuestXPCreator = {
    Difficulty?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type QuestXPQuery = {
    ID?: Relation<int>;
    Difficulty?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class QuestXPDBCFile extends DBCFile<QuestXPCreator, QuestXPQuery, QuestXPRow> {
    constructor();
    /** Loads a new QuestXP.dbc from a file. */
    static read(path: string): QuestXPDBCFile;
    add(ID: int, c?: QuestXPCreator): QuestXPRow;
    findById(id: number): QuestXPRow;
}

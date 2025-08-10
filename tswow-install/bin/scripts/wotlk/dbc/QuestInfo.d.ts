import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class QuestInfoRow extends DBCRow<QuestInfoCreator, QuestInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get InfoName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: QuestInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type QuestInfoCreator = {
    InfoName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type QuestInfoQuery = {
    ID?: Relation<int>;
    InfoName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class QuestInfoDBCFile extends DBCFile<QuestInfoCreator, QuestInfoQuery, QuestInfoRow> {
    constructor();
    /** Loads a new QuestInfo.dbc from a file. */
    static read(path: string): QuestInfoDBCFile;
    add(ID: int, c?: QuestInfoCreator): QuestInfoRow;
    findById(id: number): QuestInfoRow;
}

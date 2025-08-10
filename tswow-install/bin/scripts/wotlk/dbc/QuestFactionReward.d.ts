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
export declare class QuestFactionRewardRow extends DBCRow<QuestFactionRewardCreator, QuestFactionRewardQuery> {
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
    clone(ID: int, c?: QuestFactionRewardCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type QuestFactionRewardCreator = {
    Difficulty?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type QuestFactionRewardQuery = {
    ID?: Relation<int>;
    Difficulty?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class QuestFactionRewardDBCFile extends DBCFile<QuestFactionRewardCreator, QuestFactionRewardQuery, QuestFactionRewardRow> {
    constructor();
    /** Loads a new QuestFactionReward.dbc from a file. */
    static read(path: string): QuestFactionRewardDBCFile;
    add(ID: int, c?: QuestFactionRewardCreator): QuestFactionRewardRow;
    findById(id: number): QuestFactionRewardRow;
}

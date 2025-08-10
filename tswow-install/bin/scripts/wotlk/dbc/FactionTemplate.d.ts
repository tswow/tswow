import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionTemplateRow extends DBCRow<FactionTemplateCreator, FactionTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Faction(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FactionGroup(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FriendGroup(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get EnemyGroup(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Enemies(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Friend(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: FactionTemplateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type FactionTemplateCreator = {
    Faction?: int;
    Flags?: int;
    FactionGroup?: int;
    FriendGroup?: int;
    EnemyGroup?: int;
    Enemies?: int[];
    Friend?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type FactionTemplateQuery = {
    ID?: Relation<int>;
    Faction?: Relation<int>;
    Flags?: Relation<int>;
    FactionGroup?: Relation<int>;
    FriendGroup?: Relation<int>;
    EnemyGroup?: Relation<int>;
    Enemies?: Relation<int>;
    Friend?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class FactionTemplateDBCFile extends DBCFile<FactionTemplateCreator, FactionTemplateQuery, FactionTemplateRow> {
    constructor();
    /** Loads a new FactionTemplate.dbc from a file. */
    static read(path: string): FactionTemplateDBCFile;
    add(ID: int, c?: FactionTemplateCreator): FactionTemplateRow;
    findById(id: number): FactionTemplateRow;
}

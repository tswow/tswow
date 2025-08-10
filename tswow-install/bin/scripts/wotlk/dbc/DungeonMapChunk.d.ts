import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class DungeonMapChunkRow extends DBCRow<DungeonMapChunkCreator, DungeonMapChunkQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get WmoGroupID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DungeonMapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinZ(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DungeonMapChunkCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DungeonMapChunkCreator = {
    MapID?: int;
    WmoGroupID?: int;
    DungeonMapID?: int;
    MinZ?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type DungeonMapChunkQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    WmoGroupID?: Relation<int>;
    DungeonMapID?: Relation<int>;
    MinZ?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DungeonMapChunkDBCFile extends DBCFile<DungeonMapChunkCreator, DungeonMapChunkQuery, DungeonMapChunkRow> {
    constructor();
    /** Loads a new DungeonMapChunk.dbc from a file. */
    static read(path: string): DungeonMapChunkDBCFile;
    add(ID: int, c?: DungeonMapChunkCreator): DungeonMapChunkRow;
}

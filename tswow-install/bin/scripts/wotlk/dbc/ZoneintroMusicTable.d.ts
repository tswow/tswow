import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ZoneintroMusicTableRow extends DBCRow<ZoneintroMusicTableCreator, ZoneintroMusicTableQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Priority(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinDelayMinutes(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ZoneintroMusicTableCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ZoneintroMusicTableCreator = {
    Name?: string;
    SoundID?: int;
    Priority?: int;
    MinDelayMinutes?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ZoneintroMusicTableQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    SoundID?: Relation<int>;
    Priority?: Relation<int>;
    MinDelayMinutes?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ZoneintroMusicTableDBCFile extends DBCFile<ZoneintroMusicTableCreator, ZoneintroMusicTableQuery, ZoneintroMusicTableRow> {
    constructor();
    /** Loads a new ZoneintroMusicTable.dbc from a file. */
    static read(path: string): ZoneintroMusicTableDBCFile;
    add(ID: int, c?: ZoneintroMusicTableCreator): ZoneintroMusicTableRow;
    findById(id: number): ZoneintroMusicTableRow;
}

import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ZoneMusicRow extends DBCRow<ZoneMusicCreator, ZoneMusicQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SetName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SilenceintervalMin(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get SilenceintervalMax(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Sounds(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ZoneMusicCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ZoneMusicCreator = {
    SetName?: string;
    SilenceintervalMin?: int[];
    SilenceintervalMax?: int[];
    Sounds?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type ZoneMusicQuery = {
    ID?: Relation<int>;
    SetName?: Relation<string>;
    SilenceintervalMin?: Relation<int>;
    SilenceintervalMax?: Relation<int>;
    Sounds?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ZoneMusicDBCFile extends DBCFile<ZoneMusicCreator, ZoneMusicQuery, ZoneMusicRow> {
    constructor();
    /** Loads a new ZoneMusic.dbc from a file. */
    static read(path: string): ZoneMusicDBCFile;
    add(ID: int, c?: ZoneMusicCreator): ZoneMusicRow;
    findById(id: number): ZoneMusicRow;
}

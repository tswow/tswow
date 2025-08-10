import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ScreenEffectRow extends DBCRow<ScreenEffectCreator, ScreenEffectQuery> {
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
    get Effect(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Param(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get LightParamsID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundAmbienceID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ZoneMusicID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ScreenEffectCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ScreenEffectCreator = {
    Name?: string;
    Effect?: int;
    Param?: int[];
    LightParamsID?: int;
    SoundAmbienceID?: int;
    ZoneMusicID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ScreenEffectQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Effect?: Relation<int>;
    Param?: Relation<int>;
    LightParamsID?: Relation<int>;
    SoundAmbienceID?: Relation<int>;
    ZoneMusicID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ScreenEffectDBCFile extends DBCFile<ScreenEffectCreator, ScreenEffectQuery, ScreenEffectRow> {
    constructor();
    /** Loads a new ScreenEffect.dbc from a file. */
    static read(path: string): ScreenEffectDBCFile;
    add(ID: int, c?: ScreenEffectCreator): ScreenEffectRow;
    findById(id: number): ScreenEffectRow;
}

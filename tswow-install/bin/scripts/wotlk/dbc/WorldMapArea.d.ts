import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldMapAreaRow extends DBCRow<WorldMapAreaCreator, WorldMapAreaQuery> {
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
    get AreaID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get LocLeft(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocRight(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocTop(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocBottom(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayMapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DefaultDungeonFloor(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParentWorldMapID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldMapAreaCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapAreaCreator = {
    MapID?: int;
    AreaID?: int;
    AreaName?: string;
    LocLeft?: float;
    LocRight?: float;
    LocTop?: float;
    LocBottom?: float;
    DisplayMapID?: int;
    DefaultDungeonFloor?: int;
    ParentWorldMapID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldMapAreaQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    AreaID?: Relation<int>;
    AreaName?: Relation<string>;
    LocLeft?: Relation<float>;
    LocRight?: Relation<float>;
    LocTop?: Relation<float>;
    LocBottom?: Relation<float>;
    DisplayMapID?: Relation<int>;
    DefaultDungeonFloor?: Relation<int>;
    ParentWorldMapID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldMapAreaDBCFile extends DBCFile<WorldMapAreaCreator, WorldMapAreaQuery, WorldMapAreaRow> {
    constructor();
    /** Loads a new WorldMapArea.dbc from a file. */
    static read(path: string): WorldMapAreaDBCFile;
    add(ID: int, c?: WorldMapAreaCreator): WorldMapAreaRow;
    findById(id: number): WorldMapAreaRow;
}

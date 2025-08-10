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
export declare class WorldMapOverlayRow extends DBCRow<WorldMapOverlayCreator, WorldMapOverlayQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapAreaID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get MapPointX(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapPointY(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureName(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureWidth(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureHeight(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OffsetX(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OffsetY(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HitRectTop(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HitRectLeft(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HitRectBottom(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HitRectRight(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldMapOverlayCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldMapOverlayCreator = {
    MapAreaID?: int[];
    AreaID?: int;
    MapPointX?: int;
    MapPointY?: int;
    TextureName?: string;
    TextureWidth?: int;
    TextureHeight?: int;
    OffsetX?: int;
    OffsetY?: int;
    HitRectTop?: int;
    HitRectLeft?: int;
    HitRectBottom?: int;
    HitRectRight?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldMapOverlayQuery = {
    ID?: Relation<int>;
    MapAreaID?: Relation<int>;
    AreaID?: Relation<int>;
    MapPointX?: Relation<int>;
    MapPointY?: Relation<int>;
    TextureName?: Relation<string>;
    TextureWidth?: Relation<int>;
    TextureHeight?: Relation<int>;
    OffsetX?: Relation<int>;
    OffsetY?: Relation<int>;
    HitRectTop?: Relation<int>;
    HitRectLeft?: Relation<int>;
    HitRectBottom?: Relation<int>;
    HitRectRight?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldMapOverlayDBCFile extends DBCFile<WorldMapOverlayCreator, WorldMapOverlayQuery, WorldMapOverlayRow> {
    constructor();
    /** Loads a new WorldMapOverlay.dbc from a file. */
    static read(path: string): WorldMapOverlayDBCFile;
    add(ID: int, c?: WorldMapOverlayCreator): WorldMapOverlayRow;
    findById(id: number): WorldMapOverlayRow;
}

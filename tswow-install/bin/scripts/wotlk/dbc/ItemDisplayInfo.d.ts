import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringArrayCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemDisplayInfoRow extends DBCRow<ItemDisplayInfoCreator, ItemDisplayInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ModelName(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ModelTexture(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get InventoryIcon(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get GeosetGroup(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellVisualID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GroupSoundIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HelmetGeosetVis(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Texture(): DBCStringArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemVisual(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ParticleColorID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ItemDisplayInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ItemDisplayInfoCreator = {
    ModelName?: string[];
    ModelTexture?: string[][];
    InventoryIcon?: string[];
    GeosetGroup?: int[];
    Flags?: int;
    SpellVisualID?: int;
    GroupSoundIndex?: int;
    HelmetGeosetVis?: int[];
    Texture?: string;
    ItemVisual?: int;
    ParticleColorID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type ItemDisplayInfoQuery = {
    ID?: Relation<int>;
    ModelName?: Relation<string>;
    ModelTexture?: Relation<string>;
    InventoryIcon?: Relation<string>;
    GeosetGroup?: Relation<int>;
    Flags?: Relation<int>;
    SpellVisualID?: Relation<int>;
    GroupSoundIndex?: Relation<int>;
    HelmetGeosetVis?: Relation<int>;
    Texture?: Relation<string>;
    ItemVisual?: Relation<int>;
    ParticleColorID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ItemDisplayInfoDBCFile extends DBCFile<ItemDisplayInfoCreator, ItemDisplayInfoQuery, ItemDisplayInfoRow> {
    constructor();
    /** Loads a new ItemDisplayInfo.dbc from a file. */
    static read(path: string): ItemDisplayInfoDBCFile;
    add(ID: int, c?: ItemDisplayInfoCreator): ItemDisplayInfoRow;
    findById(id: number): ItemDisplayInfoRow;
}

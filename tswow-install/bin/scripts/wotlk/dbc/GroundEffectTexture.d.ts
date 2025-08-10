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
export declare class GroundEffectTextureRow extends DBCRow<GroundEffectTextureCreator, GroundEffectTextureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get DoodadId(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get DoodadWeight(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Density(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Sound(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GroundEffectTextureCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GroundEffectTextureCreator = {
    DoodadId?: int[];
    DoodadWeight?: int[];
    Density?: int;
    Sound?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GroundEffectTextureQuery = {
    ID?: Relation<int>;
    DoodadId?: Relation<int>;
    DoodadWeight?: Relation<int>;
    Density?: Relation<int>;
    Sound?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GroundEffectTextureDBCFile extends DBCFile<GroundEffectTextureCreator, GroundEffectTextureQuery, GroundEffectTextureRow> {
    constructor();
    /** Loads a new GroundEffectTexture.dbc from a file. */
    static read(path: string): GroundEffectTextureDBCFile;
    add(ID: int, c?: GroundEffectTextureCreator): GroundEffectTextureRow;
}

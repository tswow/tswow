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
export declare class CinematicCameraRow extends DBCRow<CinematicCameraCreator, CinematicCameraQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Model(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OriginX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OriginY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OriginZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OriginFacing(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CinematicCameraCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CinematicCameraCreator = {
    Model?: string;
    SoundID?: int;
    OriginX?: float;
    OriginY?: float;
    OriginZ?: float;
    OriginFacing?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type CinematicCameraQuery = {
    ID?: Relation<int>;
    Model?: Relation<string>;
    SoundID?: Relation<int>;
    OriginX?: Relation<float>;
    OriginY?: Relation<float>;
    OriginZ?: Relation<float>;
    OriginFacing?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CinematicCameraDBCFile extends DBCFile<CinematicCameraCreator, CinematicCameraQuery, CinematicCameraRow> {
    constructor();
    /** Loads a new CinematicCamera.dbc from a file. */
    static read(path: string): CinematicCameraDBCFile;
    add(ID: int, c?: CinematicCameraCreator): CinematicCameraRow;
    findById(id: number): CinematicCameraRow;
}

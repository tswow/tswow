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
export declare class CameraShakesRow extends DBCRow<CameraShakesCreator, CameraShakesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ShakeType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Direction(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Amplitude(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Frequency(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Duration(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Phase(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Coefficient(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CameraShakesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CameraShakesCreator = {
    ShakeType?: int;
    Direction?: int;
    Amplitude?: float;
    Frequency?: float;
    Duration?: float;
    Phase?: float;
    Coefficient?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type CameraShakesQuery = {
    ID?: Relation<int>;
    ShakeType?: Relation<int>;
    Direction?: Relation<int>;
    Amplitude?: Relation<float>;
    Frequency?: Relation<float>;
    Duration?: Relation<float>;
    Phase?: Relation<float>;
    Coefficient?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CameraShakesDBCFile extends DBCFile<CameraShakesCreator, CameraShakesQuery, CameraShakesRow> {
    constructor();
    /** Loads a new CameraShakes.dbc from a file. */
    static read(path: string): CameraShakesDBCFile;
    add(ID: int, c?: CameraShakesCreator): CameraShakesRow;
    findById(id: number): CameraShakesRow;
}

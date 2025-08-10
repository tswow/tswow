import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LightRow extends DBCRow<LightCreator, LightQuery> {
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
    get X(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Y(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Z(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FalloffStart(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get FalloffEnd(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LightParamsID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LightCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LightCreator = {
    MapID?: int;
    X?: float;
    Y?: float;
    Z?: float;
    FalloffStart?: float;
    FalloffEnd?: float;
    LightParamsID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type LightQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    X?: Relation<float>;
    Y?: Relation<float>;
    Z?: Relation<float>;
    FalloffStart?: Relation<float>;
    FalloffEnd?: Relation<float>;
    LightParamsID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LightDBCFile extends DBCFile<LightCreator, LightQuery, LightRow> {
    constructor();
    /** Loads a new Light.dbc from a file. */
    static read(path: string): LightDBCFile;
    add(ID: int, c?: LightCreator): LightRow;
    findById(id: number): LightRow;
}

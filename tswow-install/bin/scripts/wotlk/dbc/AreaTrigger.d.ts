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
export declare class AreaTriggerRow extends DBCRow<AreaTriggerCreator, AreaTriggerQuery> {
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
    get Radius(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Box_Length(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Box_Width(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Box_Height(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Box_Yaw(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AreaTriggerCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AreaTriggerCreator = {
    MapID?: int;
    X?: float;
    Y?: float;
    Z?: float;
    Radius?: float;
    Box_Length?: float;
    Box_Width?: float;
    Box_Height?: float;
    Box_Yaw?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type AreaTriggerQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    X?: Relation<float>;
    Y?: Relation<float>;
    Z?: Relation<float>;
    Radius?: Relation<float>;
    Box_Length?: Relation<float>;
    Box_Width?: Relation<float>;
    Box_Height?: Relation<float>;
    Box_Yaw?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AreaTriggerDBCFile extends DBCFile<AreaTriggerCreator, AreaTriggerQuery, AreaTriggerRow> {
    constructor();
    /** Loads a new AreaTrigger.dbc from a file. */
    static read(path: string): AreaTriggerDBCFile;
    add(ID: int, c?: AreaTriggerCreator): AreaTriggerRow;
}

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
export declare class TransportRotationRow extends DBCRow<TransportRotationCreator, TransportRotationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get GameObjectsID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RotX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RotY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RotZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get RotW(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TransportRotationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TransportRotationCreator = {
    GameObjectsID?: int;
    TimeIndex?: int;
    RotX?: float;
    RotY?: float;
    RotZ?: float;
    RotW?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type TransportRotationQuery = {
    ID?: Relation<int>;
    GameObjectsID?: Relation<int>;
    TimeIndex?: Relation<int>;
    RotX?: Relation<float>;
    RotY?: Relation<float>;
    RotZ?: Relation<float>;
    RotW?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TransportRotationDBCFile extends DBCFile<TransportRotationCreator, TransportRotationQuery, TransportRotationRow> {
    constructor();
    /** Loads a new TransportRotation.dbc from a file. */
    static read(path: string): TransportRotationDBCFile;
    add(ID: int, c?: TransportRotationCreator): TransportRotationRow;
}

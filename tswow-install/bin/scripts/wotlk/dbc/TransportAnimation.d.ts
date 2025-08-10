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
export declare class TransportAnimationRow extends DBCRow<TransportAnimationCreator, TransportAnimationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get TransportID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TimeIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PosX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PosY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get PosZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get SequenceID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TransportAnimationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TransportAnimationCreator = {
    TransportID?: int;
    TimeIndex?: int;
    PosX?: float;
    PosY?: float;
    PosZ?: float;
    SequenceID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type TransportAnimationQuery = {
    ID?: Relation<int>;
    TransportID?: Relation<int>;
    TimeIndex?: Relation<int>;
    PosX?: Relation<float>;
    PosY?: Relation<float>;
    PosZ?: Relation<float>;
    SequenceID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TransportAnimationDBCFile extends DBCFile<TransportAnimationCreator, TransportAnimationQuery, TransportAnimationRow> {
    constructor();
    /** Loads a new TransportAnimation.dbc from a file. */
    static read(path: string): TransportAnimationDBCFile;
    add(ID: int, c?: TransportAnimationCreator): TransportAnimationRow;
}

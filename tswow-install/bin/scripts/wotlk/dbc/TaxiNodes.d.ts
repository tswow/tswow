import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TaxiNodesRow extends DBCRow<TaxiNodesCreator, TaxiNodesQuery> {
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
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get MountCreatureID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TaxiNodesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TaxiNodesCreator = {
    MapID?: int;
    X?: float;
    Y?: float;
    Z?: float;
    Name?: loc_constructor;
    MountCreatureID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type TaxiNodesQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    X?: Relation<float>;
    Y?: Relation<float>;
    Z?: Relation<float>;
    Name?: Relation<string>;
    MountCreatureID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TaxiNodesDBCFile extends DBCFile<TaxiNodesCreator, TaxiNodesQuery, TaxiNodesRow> {
    constructor();
    /** Loads a new TaxiNodes.dbc from a file. */
    static read(path: string): TaxiNodesDBCFile;
    add(ID: int, c?: TaxiNodesCreator): TaxiNodesRow;
    findById(id: number): TaxiNodesRow;
}

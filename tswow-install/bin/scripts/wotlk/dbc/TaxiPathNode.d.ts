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
export declare class TaxiPathNodeRow extends DBCRow<TaxiPathNodeCreator, TaxiPathNodeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get PathID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NodeIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LocX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Delay(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ArrivalEventID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DepartureEventID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TaxiPathNodeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TaxiPathNodeCreator = {
    PathID?: int;
    NodeIndex?: int;
    MapID?: int;
    LocX?: float;
    LocY?: float;
    LocZ?: float;
    Flags?: int;
    Delay?: int;
    ArrivalEventID?: int;
    DepartureEventID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type TaxiPathNodeQuery = {
    ID?: Relation<int>;
    PathID?: Relation<int>;
    NodeIndex?: Relation<int>;
    MapID?: Relation<int>;
    LocX?: Relation<float>;
    LocY?: Relation<float>;
    LocZ?: Relation<float>;
    Flags?: Relation<int>;
    Delay?: Relation<int>;
    ArrivalEventID?: Relation<int>;
    DepartureEventID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TaxiPathNodeDBCFile extends DBCFile<TaxiPathNodeCreator, TaxiPathNodeQuery, TaxiPathNodeRow> {
    constructor();
    /** Loads a new TaxiPathNode.dbc from a file. */
    static read(path: string): TaxiPathNodeDBCFile;
    add(ID: int, c?: TaxiPathNodeCreator): TaxiPathNodeRow;
}

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
export declare class VehicleUIIndSeatRow extends DBCRow<VehicleUIIndSeatCreator, VehicleUIIndSeatQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get VehicleUIIndicatorID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VirtualSeatIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get XPos(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get YPos(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: VehicleUIIndSeatCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type VehicleUIIndSeatCreator = {
    VehicleUIIndicatorID?: int;
    VirtualSeatIndex?: int;
    XPos?: float;
    YPos?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type VehicleUIIndSeatQuery = {
    ID?: Relation<int>;
    VehicleUIIndicatorID?: Relation<int>;
    VirtualSeatIndex?: Relation<int>;
    XPos?: Relation<float>;
    YPos?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class VehicleUIIndSeatDBCFile extends DBCFile<VehicleUIIndSeatCreator, VehicleUIIndSeatQuery, VehicleUIIndSeatRow> {
    constructor();
    /** Loads a new VehicleUIIndSeat.dbc from a file. */
    static read(path: string): VehicleUIIndSeatDBCFile;
    add(ID: int, c?: VehicleUIIndSeatCreator): VehicleUIIndSeatRow;
    findById(id: number): VehicleUIIndSeatRow;
}

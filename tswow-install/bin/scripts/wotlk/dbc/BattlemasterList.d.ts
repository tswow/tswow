import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class BattlemasterListRow extends DBCRow<BattlemasterListCreator, BattlemasterListQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get InstanceType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GroupsAllowed(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxGroupSize(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HolidayWorldState(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Minlevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Maxlevel(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: BattlemasterListCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type BattlemasterListCreator = {
    MapID?: int[];
    InstanceType?: int;
    GroupsAllowed?: int;
    Name?: loc_constructor;
    MaxGroupSize?: int;
    HolidayWorldState?: int;
    Minlevel?: int;
    Maxlevel?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type BattlemasterListQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    InstanceType?: Relation<int>;
    GroupsAllowed?: Relation<int>;
    Name?: Relation<string>;
    MaxGroupSize?: Relation<int>;
    HolidayWorldState?: Relation<int>;
    Minlevel?: Relation<int>;
    Maxlevel?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class BattlemasterListDBCFile extends DBCFile<BattlemasterListCreator, BattlemasterListQuery, BattlemasterListRow> {
    constructor();
    /** Loads a new BattlemasterList.dbc from a file. */
    static read(path: string): BattlemasterListDBCFile;
    add(ID: int, c?: BattlemasterListCreator): BattlemasterListRow;
    findById(id: number): BattlemasterListRow;
}

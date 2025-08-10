import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class HolidayDescriptionsRow extends DBCRow<HolidayDescriptionsCreator, HolidayDescriptionsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: HolidayDescriptionsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type HolidayDescriptionsCreator = {
    Description?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type HolidayDescriptionsQuery = {
    ID?: Relation<int>;
    Description?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class HolidayDescriptionsDBCFile extends DBCFile<HolidayDescriptionsCreator, HolidayDescriptionsQuery, HolidayDescriptionsRow> {
    constructor();
    /** Loads a new HolidayDescriptions.dbc from a file. */
    static read(path: string): HolidayDescriptionsDBCFile;
    add(ID: int, c?: HolidayDescriptionsCreator): HolidayDescriptionsRow;
    findById(id: number): HolidayDescriptionsRow;
}

import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class HolidaysRow extends DBCRow<HolidaysCreator, HolidaysQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Duration(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Date(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Region(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Looping(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CalendarFlags(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get HolidayNameID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get HolidayDescriptionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureFilename(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Priority(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CalendarFilterType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: HolidaysCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type HolidaysCreator = {
    Duration?: int[];
    Date?: int[];
    Region?: int;
    Looping?: int;
    CalendarFlags?: int[];
    HolidayNameID?: int;
    HolidayDescriptionID?: int;
    TextureFilename?: string;
    Priority?: int;
    CalendarFilterType?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type HolidaysQuery = {
    ID?: Relation<int>;
    Duration?: Relation<int>;
    Date?: Relation<int>;
    Region?: Relation<int>;
    Looping?: Relation<int>;
    CalendarFlags?: Relation<int>;
    HolidayNameID?: Relation<int>;
    HolidayDescriptionID?: Relation<int>;
    TextureFilename?: Relation<string>;
    Priority?: Relation<int>;
    CalendarFilterType?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class HolidaysDBCFile extends DBCFile<HolidaysCreator, HolidaysQuery, HolidaysRow> {
    constructor();
    /** Loads a new Holidays.dbc from a file. */
    static read(path: string): HolidaysDBCFile;
    add(ID: int, c?: HolidaysCreator): HolidaysRow;
    findById(id: number): HolidaysRow;
}

import { int, loc_constructor, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCEnumCell, DBCFlagCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class Achievement_CriteriaRow extends DBCRow<Achievement_CriteriaCreator, Achievement_CriteriaQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Achievement_Id(): DBCPointerCell<this>;
    /**
     * What kind of Achievement this is. Defines the rows below.
     */
    get Type(): DBCEnumCell<this>;
    /**
     * Main requirement id, such as creature or type.
     */
    get Asset_Id(): DBCIntCell<this>;
    /**
     * Main requirement count
     */
    get Quantity(): DBCIntCell<this>;
    /**
     * Additional requirement 1 type
     */
    get Start_Event(): DBCIntCell<this>;
    /**
     * Additional requirement 1 value
     */
    get Start_Asset(): DBCIntCell<this>;
    /**
     * Additional requirement 2 type
     */
    get Fail_Event(): DBCIntCell<this>;
    /**
     * Additional requirement 2 value
     */
    get Fail_Asset(): DBCIntCell<this>;
    /**
     * Displayed description
     */
    get Description(): DBCLocCell<this>;
    /**
     * 1 means it shows a progress bar.
     */
    get Flags(): DBCFlagCell<this>;
    /**
     * No comment (yet!)
     */
    get Timer_Start_Event(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Timer_Asset_Id(): DBCIntCell<this>;
    /**
     * For complete quest in %i seconds type of events
     */
    get Timer_Time(): DBCIntCell<this>;
    /**
     * Sort order in achievement row. Lower means higher up.
     */
    get Ui_Order(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: Achievement_CriteriaCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type Achievement_CriteriaCreator = {
    Achievement_Id?: uint;
    Type?: uint;
    Asset_Id?: int;
    Quantity?: int;
    Start_Event?: int;
    Start_Asset?: int;
    Fail_Event?: int;
    Fail_Asset?: int;
    Description?: loc_constructor;
    Flags?: uint;
    Timer_Start_Event?: int;
    Timer_Asset_Id?: int;
    Timer_Time?: int;
    Ui_Order?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type Achievement_CriteriaQuery = {
    ID?: Relation<int>;
    Achievement_Id?: Relation<number>;
    Type?: Relation<number>;
    Asset_Id?: Relation<int>;
    Quantity?: Relation<int>;
    Start_Event?: Relation<int>;
    Start_Asset?: Relation<int>;
    Fail_Event?: Relation<int>;
    Fail_Asset?: Relation<int>;
    Description?: Relation<string>;
    Flags?: Relation<number>;
    Timer_Start_Event?: Relation<int>;
    Timer_Asset_Id?: Relation<int>;
    Timer_Time?: Relation<int>;
    Ui_Order?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class Achievement_CriteriaDBCFile extends DBCFile<Achievement_CriteriaCreator, Achievement_CriteriaQuery, Achievement_CriteriaRow> {
    constructor();
    /** Loads a new Achievement_Criteria.dbc from a file. */
    static read(path: string): Achievement_CriteriaDBCFile;
    add(ID: int, c?: Achievement_CriteriaCreator): Achievement_CriteriaRow;
}

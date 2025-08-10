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
export declare class AchievementRow extends DBCRow<AchievementCreator, AchievementQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Faction(): DBCEnumCell<this>;
    /**
     * Only set if achievement is related to a zone, otherwise set to -1
     */
    get Map(): DBCIntCell<this>;
    /**
     * If the Achievement belongs to a series, this is the ID of the previous one. 0 otherwise.
     */
    get Previous(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Title(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Category(): DBCPointerCell<this>;
    /**
     * How many Achievement points this achievement is worth.
     */
    get Points(): DBCIntCell<this>;
    /**
     * Sort order in achievement pane. Lower means higher up.
     */
    get Ui_Order(): DBCIntCell<this>;
    /**
     * 256 means only one person per realm can reach it.
     */
    get Flags(): DBCFlagCell<this>;
    /**
     * No comment (yet!)
     */
    get IconID(): DBCPointerCell<this>;
    /**
     * No comment (yet!)
     */
    get Reward(): DBCLocCell<this>;
    /**
     * Number of things you must get/fulfill for this achievement.
     */
    get Minimum_Criteria(): DBCIntCell<this>;
    /**
     * Achievement that this achievement is a subtask of
     */
    get Shares_Criteria(): DBCPointerCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: AchievementCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type AchievementCreator = {
    Faction?: uint;
    Map?: int;
    Previous?: int;
    Title?: loc_constructor;
    Description?: loc_constructor;
    Category?: uint;
    Points?: int;
    Ui_Order?: int;
    Flags?: uint;
    IconID?: uint;
    Reward?: loc_constructor;
    Minimum_Criteria?: int;
    Shares_Criteria?: uint;
};
/**
 * Used for queries (Don't comment these)
 */
export type AchievementQuery = {
    ID?: Relation<int>;
    Faction?: Relation<number>;
    Map?: Relation<int>;
    Previous?: Relation<int>;
    Title?: Relation<string>;
    Description?: Relation<string>;
    Category?: Relation<number>;
    Points?: Relation<int>;
    Ui_Order?: Relation<int>;
    Flags?: Relation<number>;
    IconID?: Relation<number>;
    Reward?: Relation<string>;
    Minimum_Criteria?: Relation<int>;
    Shares_Criteria?: Relation<number>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class AchievementDBCFile extends DBCFile<AchievementCreator, AchievementQuery, AchievementRow> {
    constructor();
    /** Loads a new Achievement.dbc from a file. */
    static read(path: string): AchievementDBCFile;
    add(ID: int, c?: AchievementCreator): AchievementRow;
}

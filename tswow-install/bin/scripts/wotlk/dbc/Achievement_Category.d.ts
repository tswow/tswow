import { int, loc_constructor, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCPointerCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class Achievement_CategoryRow extends DBCRow<Achievement_CategoryCreator, Achievement_CategoryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * -1 if none.
     */
    get Parent(): DBCPointerCell<this>;
    /**
     * Display name
     */
    get Name(): DBCLocCell<this>;
    /**
     * Sort order in achievement category pane. Lower means higher up.
     */
    get Ui_Order(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: Achievement_CategoryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type Achievement_CategoryCreator = {
    Parent?: uint;
    Name?: loc_constructor;
    Ui_Order?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type Achievement_CategoryQuery = {
    ID?: Relation<int>;
    Parent?: Relation<number>;
    Name?: Relation<string>;
    Ui_Order?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class Achievement_CategoryDBCFile extends DBCFile<Achievement_CategoryCreator, Achievement_CategoryQuery, Achievement_CategoryRow> {
    constructor();
    /** Loads a new Achievement_Category.dbc from a file. */
    static read(path: string): Achievement_CategoryDBCFile;
    add(ID: int, c?: Achievement_CategoryCreator): Achievement_CategoryRow;
}

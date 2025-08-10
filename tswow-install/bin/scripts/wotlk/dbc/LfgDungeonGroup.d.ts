import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonGroupRow extends DBCRow<LfgDungeonGroupCreator, LfgDungeonGroupQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Order_Index(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Parent_Group_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Typeid(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LfgDungeonGroupCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonGroupCreator = {
    Name?: loc_constructor;
    Order_Index?: int;
    Parent_Group_Id?: int;
    Typeid?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonGroupQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Order_Index?: Relation<int>;
    Parent_Group_Id?: Relation<int>;
    Typeid?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonGroupDBCFile extends DBCFile<LfgDungeonGroupCreator, LfgDungeonGroupQuery, LfgDungeonGroupRow> {
    constructor();
    /** Loads a new LfgDungeonGroup.dbc from a file. */
    static read(path: string): LfgDungeonGroupDBCFile;
    add(ID: int, c?: LfgDungeonGroupCreator): LfgDungeonGroupRow;
}

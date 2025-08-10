import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonExpansionRow extends DBCRow<LfgDungeonExpansionCreator, LfgDungeonExpansionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Lfg_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Expansion_Level(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Random_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Hard_Level_Min(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Hard_Level_Max(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Target_Level_Min(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Target_Level_Max(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LfgDungeonExpansionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonExpansionCreator = {
    Lfg_Id?: int;
    Expansion_Level?: int;
    Random_Id?: int;
    Hard_Level_Min?: int;
    Hard_Level_Max?: int;
    Target_Level_Min?: int;
    Target_Level_Max?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonExpansionQuery = {
    ID?: Relation<int>;
    Lfg_Id?: Relation<int>;
    Expansion_Level?: Relation<int>;
    Random_Id?: Relation<int>;
    Hard_Level_Min?: Relation<int>;
    Hard_Level_Max?: Relation<int>;
    Target_Level_Min?: Relation<int>;
    Target_Level_Max?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonExpansionDBCFile extends DBCFile<LfgDungeonExpansionCreator, LfgDungeonExpansionQuery, LfgDungeonExpansionRow> {
    constructor();
    /** Loads a new LfgDungeonExpansion.dbc from a file. */
    static read(path: string): LfgDungeonExpansionDBCFile;
    add(ID: int, c?: LfgDungeonExpansionCreator): LfgDungeonExpansionRow;
}

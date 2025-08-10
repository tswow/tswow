import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonsRow extends DBCRow<LfgDungeonsCreator, LfgDungeonsQuery> {
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
    get MinLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MaxLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Target_Level(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Target_Level_Min(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Target_Level_Max(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Difficulty(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TypeID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Faction(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TextureFilename(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get ExpansionLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Order_Index(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Group_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Description(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LfgDungeonsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LfgDungeonsCreator = {
    Name?: loc_constructor;
    MinLevel?: int;
    MaxLevel?: int;
    Target_Level?: int;
    Target_Level_Min?: int;
    Target_Level_Max?: int;
    MapID?: int;
    Difficulty?: int;
    Flags?: int;
    TypeID?: int;
    Faction?: int;
    TextureFilename?: string;
    ExpansionLevel?: int;
    Order_Index?: int;
    Group_Id?: int;
    Description?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type LfgDungeonsQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    MinLevel?: Relation<int>;
    MaxLevel?: Relation<int>;
    Target_Level?: Relation<int>;
    Target_Level_Min?: Relation<int>;
    Target_Level_Max?: Relation<int>;
    MapID?: Relation<int>;
    Difficulty?: Relation<int>;
    Flags?: Relation<int>;
    TypeID?: Relation<int>;
    Faction?: Relation<int>;
    TextureFilename?: Relation<string>;
    ExpansionLevel?: Relation<int>;
    Order_Index?: Relation<int>;
    Group_Id?: Relation<int>;
    Description?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LfgDungeonsDBCFile extends DBCFile<LfgDungeonsCreator, LfgDungeonsQuery, LfgDungeonsRow> {
    constructor();
    /** Loads a new LfgDungeons.dbc from a file. */
    static read(path: string): LfgDungeonsDBCFile;
    add(ID: int, c?: LfgDungeonsCreator): LfgDungeonsRow;
}

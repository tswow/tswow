import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldStateUIRow extends DBCRow<WorldStateUICreator, WorldStateUIQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PhaseShift(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Icon(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get String(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Tooltip(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get StateVariable(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DynamicIcon(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get DynamicTooltip(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get ExtendedUI(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get ExtendedUIStateVariable(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldStateUICreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldStateUICreator = {
    MapID?: int;
    AreaID?: int;
    PhaseShift?: int;
    Icon?: string;
    String?: loc_constructor;
    Tooltip?: loc_constructor;
    StateVariable?: int;
    Type?: int;
    DynamicIcon?: string;
    DynamicTooltip?: loc_constructor;
    ExtendedUI?: string;
    ExtendedUIStateVariable?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldStateUIQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    AreaID?: Relation<int>;
    PhaseShift?: Relation<int>;
    Icon?: Relation<string>;
    String?: Relation<string>;
    Tooltip?: Relation<string>;
    StateVariable?: Relation<int>;
    Type?: Relation<int>;
    DynamicIcon?: Relation<string>;
    DynamicTooltip?: Relation<string>;
    ExtendedUI?: Relation<string>;
    ExtendedUIStateVariable?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldStateUIDBCFile extends DBCFile<WorldStateUICreator, WorldStateUIQuery, WorldStateUIRow> {
    constructor();
    /** Loads a new WorldStateUI.dbc from a file. */
    static read(path: string): WorldStateUIDBCFile;
    add(ID: int, c?: WorldStateUICreator): WorldStateUIRow;
}

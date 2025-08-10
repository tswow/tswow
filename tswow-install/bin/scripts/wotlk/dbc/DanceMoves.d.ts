import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class DanceMovesRow extends DBCRow<DanceMovesCreator, DanceMovesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Type(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Param(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Fallback(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Racemask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Internal_Name(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get LockID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DanceMovesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DanceMovesCreator = {
    Type?: int;
    Param?: int;
    Fallback?: int;
    Racemask?: int;
    Internal_Name?: string;
    Name?: loc_constructor;
    LockID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type DanceMovesQuery = {
    ID?: Relation<int>;
    Type?: Relation<int>;
    Param?: Relation<int>;
    Fallback?: Relation<int>;
    Racemask?: Relation<int>;
    Internal_Name?: Relation<string>;
    Name?: Relation<string>;
    LockID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DanceMovesDBCFile extends DBCFile<DanceMovesCreator, DanceMovesQuery, DanceMovesRow> {
    constructor();
    /** Loads a new DanceMoves.dbc from a file. */
    static read(path: string): DanceMovesDBCFile;
    add(ID: int, c?: DanceMovesCreator): DanceMovesRow;
    findById(id: number): DanceMovesRow;
}

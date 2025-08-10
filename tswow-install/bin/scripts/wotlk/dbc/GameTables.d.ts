import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GameTablesRow extends DBCRow<GameTablesCreator, GameTablesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Name(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get NumRows(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get NumColumns(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(Name: string, c?: GameTablesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GameTablesCreator = {
    NumRows?: int;
    NumColumns?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GameTablesQuery = {
    Name?: Relation<string>;
    NumRows?: Relation<int>;
    NumColumns?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GameTablesDBCFile extends DBCFile<GameTablesCreator, GameTablesQuery, GameTablesRow> {
    constructor();
    /** Loads a new GameTables.dbc from a file. */
    static read(path: string): GameTablesDBCFile;
    add(Name: string, c?: GameTablesCreator): GameTablesRow;
}

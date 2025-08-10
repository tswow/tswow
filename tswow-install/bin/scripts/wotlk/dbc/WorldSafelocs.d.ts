import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldSafelocsRow extends DBCRow<WorldSafelocsCreator, WorldSafelocsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Continent(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get LocX(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocY(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get LocZ(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get AreaName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: WorldSafelocsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type WorldSafelocsCreator = {
    Continent?: int;
    LocX?: float;
    LocY?: float;
    LocZ?: float;
    AreaName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type WorldSafelocsQuery = {
    ID?: Relation<int>;
    Continent?: Relation<int>;
    LocX?: Relation<float>;
    LocY?: Relation<float>;
    LocZ?: Relation<float>;
    AreaName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class WorldSafelocsDBCFile extends DBCFile<WorldSafelocsCreator, WorldSafelocsQuery, WorldSafelocsRow> {
    constructor();
    /** Loads a new WorldSafelocs.dbc from a file. */
    static read(path: string): WorldSafelocsDBCFile;
    add(ID: int, c?: WorldSafelocsCreator): WorldSafelocsRow;
    findById(id: number): WorldSafelocsRow;
}

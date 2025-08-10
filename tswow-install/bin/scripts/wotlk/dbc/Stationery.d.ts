import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class StationeryRow extends DBCRow<StationeryCreator, StationeryQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Texture(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: StationeryCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type StationeryCreator = {
    ItemID?: int;
    Texture?: string;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type StationeryQuery = {
    ID?: Relation<int>;
    ItemID?: Relation<int>;
    Texture?: Relation<string>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class StationeryDBCFile extends DBCFile<StationeryCreator, StationeryQuery, StationeryRow> {
    constructor();
    /** Loads a new Stationery.dbc from a file. */
    static read(path: string): StationeryDBCFile;
    add(ID: int, c?: StationeryCreator): StationeryRow;
    findById(id: number): StationeryRow;
}

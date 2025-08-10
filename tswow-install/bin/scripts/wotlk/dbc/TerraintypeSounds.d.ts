import { DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TerraintypeSoundsRow extends DBCRow<TerraintypeSoundsCreator, TerraintypeSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TerraintypeSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TerraintypeSoundsCreator = {};
/**
 * Used for queries (Don't comment these)
 */
export type TerraintypeSoundsQuery = {
    ID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TerraintypeSoundsDBCFile extends DBCFile<TerraintypeSoundsCreator, TerraintypeSoundsQuery, TerraintypeSoundsRow> {
    constructor();
    /** Loads a new TerraintypeSounds.dbc from a file. */
    static read(path: string): TerraintypeSoundsDBCFile;
    add(ID: int, c?: TerraintypeSoundsCreator): TerraintypeSoundsRow;
    findById(id: number): TerraintypeSoundsRow;
}

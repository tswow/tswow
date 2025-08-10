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
export declare class EnvironmentalDamageRow extends DBCRow<EnvironmentalDamageCreator, EnvironmentalDamageQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get EnumID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get VisualkitID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: EnvironmentalDamageCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type EnvironmentalDamageCreator = {
    EnumID?: int;
    VisualkitID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type EnvironmentalDamageQuery = {
    ID?: Relation<int>;
    EnumID?: Relation<int>;
    VisualkitID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class EnvironmentalDamageDBCFile extends DBCFile<EnvironmentalDamageCreator, EnvironmentalDamageQuery, EnvironmentalDamageRow> {
    constructor();
    /** Loads a new EnvironmentalDamage.dbc from a file. */
    static read(path: string): EnvironmentalDamageDBCFile;
    add(ID: int, c?: EnvironmentalDamageCreator): EnvironmentalDamageRow;
    findById(id: number): EnvironmentalDamageRow;
}

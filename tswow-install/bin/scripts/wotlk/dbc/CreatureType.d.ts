import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureTypeRow extends DBCRow<CreatureTypeCreator, CreatureTypeQuery> {
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
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureTypeCreator = {
    Name?: loc_constructor;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureTypeQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureTypeDBCFile extends DBCFile<CreatureTypeCreator, CreatureTypeQuery, CreatureTypeRow> {
    constructor();
    /** Loads a new CreatureType.dbc from a file. */
    static read(path: string): CreatureTypeDBCFile;
    add(ID: int, c?: CreatureTypeCreator): CreatureTypeRow;
    findById(id: number): CreatureTypeRow;
}

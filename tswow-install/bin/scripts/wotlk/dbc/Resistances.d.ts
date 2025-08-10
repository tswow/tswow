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
export declare class ResistancesRow extends DBCRow<ResistancesCreator, ResistancesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FizzleSoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ResistancesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ResistancesCreator = {
    Flags?: int;
    FizzleSoundID?: int;
    Name?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type ResistancesQuery = {
    ID?: Relation<int>;
    Flags?: Relation<int>;
    FizzleSoundID?: Relation<int>;
    Name?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ResistancesDBCFile extends DBCFile<ResistancesCreator, ResistancesQuery, ResistancesRow> {
    constructor();
    /** Loads a new Resistances.dbc from a file. */
    static read(path: string): ResistancesDBCFile;
    add(ID: int, c?: ResistancesCreator): ResistancesRow;
    findById(id: number): ResistancesRow;
}

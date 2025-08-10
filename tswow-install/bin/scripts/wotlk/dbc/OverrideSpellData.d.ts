import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class OverrideSpellDataRow extends DBCRow<OverrideSpellDataCreator, OverrideSpellDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Spells(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: OverrideSpellDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type OverrideSpellDataCreator = {
    Spells?: int[];
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type OverrideSpellDataQuery = {
    ID?: Relation<int>;
    Spells?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class OverrideSpellDataDBCFile extends DBCFile<OverrideSpellDataCreator, OverrideSpellDataQuery, OverrideSpellDataRow> {
    constructor();
    /** Loads a new OverrideSpellData.dbc from a file. */
    static read(path: string): OverrideSpellDataDBCFile;
    add(ID: int, c?: OverrideSpellDataCreator): OverrideSpellDataRow;
    findById(id: number): OverrideSpellDataRow;
}

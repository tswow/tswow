import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDescriptionVariablesRow extends DBCRow<SpellDescriptionVariablesCreator, SpellDescriptionVariablesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Variables(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellDescriptionVariablesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellDescriptionVariablesCreator = {
    Variables?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellDescriptionVariablesQuery = {
    ID?: Relation<int>;
    Variables?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDescriptionVariablesDBCFile extends DBCFile<SpellDescriptionVariablesCreator, SpellDescriptionVariablesQuery, SpellDescriptionVariablesRow> {
    constructor();
    /** Loads a new SpellDescriptionVariables.dbc from a file. */
    static read(path: string): SpellDescriptionVariablesDBCFile;
    add(ID: int, c?: SpellDescriptionVariablesCreator): SpellDescriptionVariablesRow;
    findById(id: number): SpellDescriptionVariablesRow;
}

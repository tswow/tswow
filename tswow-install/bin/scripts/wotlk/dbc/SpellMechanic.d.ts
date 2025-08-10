import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellMechanicRow extends DBCRow<SpellMechanicCreator, SpellMechanicQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get StateName(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellMechanicCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellMechanicCreator = {
    StateName?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellMechanicQuery = {
    ID?: Relation<int>;
    StateName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellMechanicDBCFile extends DBCFile<SpellMechanicCreator, SpellMechanicQuery, SpellMechanicRow> {
    constructor();
    /** Loads a new SpellMechanic.dbc from a file. */
    static read(path: string): SpellMechanicDBCFile;
    add(ID: int, c?: SpellMechanicCreator): SpellMechanicRow;
    findById(id: number): SpellMechanicRow;
}

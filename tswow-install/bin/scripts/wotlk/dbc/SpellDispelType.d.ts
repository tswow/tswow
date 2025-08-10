import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDispelTypeRow extends DBCRow<SpellDispelTypeCreator, SpellDispelTypeQuery> {
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
    get flag(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ImmunityPossible(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get InternalName(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellDispelTypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellDispelTypeCreator = {
    Name?: loc_constructor;
    flag?: int;
    ImmunityPossible?: int;
    InternalName?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellDispelTypeQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    flag?: Relation<int>;
    ImmunityPossible?: Relation<int>;
    InternalName?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellDispelTypeDBCFile extends DBCFile<SpellDispelTypeCreator, SpellDispelTypeQuery, SpellDispelTypeRow> {
    constructor();
    /** Loads a new SpellDispelType.dbc from a file. */
    static read(path: string): SpellDispelTypeDBCFile;
    add(ID: int, c?: SpellDispelTypeCreator): SpellDispelTypeRow;
    findById(id: number): SpellDispelTypeRow;
}

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
export declare class GlyphPropertiesRow extends DBCRow<GlyphPropertiesCreator, GlyphPropertiesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GlyphSlotFlags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellIconID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GlyphPropertiesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GlyphPropertiesCreator = {
    SpellID?: int;
    GlyphSlotFlags?: int;
    SpellIconID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GlyphPropertiesQuery = {
    ID?: Relation<int>;
    SpellID?: Relation<int>;
    GlyphSlotFlags?: Relation<int>;
    SpellIconID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GlyphPropertiesDBCFile extends DBCFile<GlyphPropertiesCreator, GlyphPropertiesQuery, GlyphPropertiesRow> {
    constructor();
    /** Loads a new GlyphProperties.dbc from a file. */
    static read(path: string): GlyphPropertiesDBCFile;
    add(ID: int, c?: GlyphPropertiesCreator): GlyphPropertiesRow;
    findById(id: number): GlyphPropertiesRow;
}

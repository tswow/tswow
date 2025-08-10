import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellRangeRow extends DBCRow<SpellRangeCreator, SpellRangeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get RangeMin(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get RangeMax(): DBCFloatArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayName(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get DisplayNameShort(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellRangeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellRangeCreator = {
    RangeMin?: float[];
    RangeMax?: float[];
    Flags?: int;
    DisplayName?: loc_constructor;
    DisplayNameShort?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellRangeQuery = {
    ID?: Relation<int>;
    RangeMin?: Relation<float>;
    RangeMax?: Relation<float>;
    Flags?: Relation<int>;
    DisplayName?: Relation<string>;
    DisplayNameShort?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellRangeDBCFile extends DBCFile<SpellRangeCreator, SpellRangeQuery, SpellRangeRow> {
    constructor();
    /** Loads a new SpellRange.dbc from a file. */
    static read(path: string): SpellRangeDBCFile;
    add(ID: int, c?: SpellRangeCreator): SpellRangeRow;
    findById(id: number): SpellRangeRow;
}

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
export declare class SpellRuneCostRow extends DBCRow<SpellRuneCostCreator, SpellRuneCostQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Blood(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Unholy(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Frost(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RunicPower(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellRuneCostCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellRuneCostCreator = {
    Blood?: int;
    Unholy?: int;
    Frost?: int;
    RunicPower?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellRuneCostQuery = {
    ID?: Relation<int>;
    Blood?: Relation<int>;
    Unholy?: Relation<int>;
    Frost?: Relation<int>;
    RunicPower?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellRuneCostDBCFile extends DBCFile<SpellRuneCostCreator, SpellRuneCostQuery, SpellRuneCostRow> {
    constructor();
    /** Loads a new SpellRuneCost.dbc from a file. */
    static read(path: string): SpellRuneCostDBCFile;
    add(ID: int, c?: SpellRuneCostCreator): SpellRuneCostRow;
    findById(id: number): SpellRuneCostRow;
}

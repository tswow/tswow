import { float, int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class ExhaustionRow extends DBCRow<ExhaustionCreator, ExhaustionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Xp(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Factor(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get OutdoorHours(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get InnHours(): DBCFloatCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Threshold(): DBCFloatCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: ExhaustionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type ExhaustionCreator = {
    Xp?: int;
    Factor?: float;
    OutdoorHours?: float;
    InnHours?: float;
    Name?: loc_constructor;
    Threshold?: float;
};
/**
 * Used for queries (Don't comment these)
 */
export type ExhaustionQuery = {
    ID?: Relation<int>;
    Xp?: Relation<int>;
    Factor?: Relation<float>;
    OutdoorHours?: Relation<float>;
    InnHours?: Relation<float>;
    Name?: Relation<string>;
    Threshold?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class ExhaustionDBCFile extends DBCFile<ExhaustionCreator, ExhaustionQuery, ExhaustionRow> {
    constructor();
    /** Loads a new Exhaustion.dbc from a file. */
    static read(path: string): ExhaustionDBCFile;
    add(ID: int, c?: ExhaustionCreator): ExhaustionRow;
    findById(id: number): ExhaustionRow;
}

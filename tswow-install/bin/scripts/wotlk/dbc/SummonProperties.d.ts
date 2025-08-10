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
export declare class SummonPropertiesRow extends DBCRow<SummonPropertiesCreator, SummonPropertiesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Control(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Faction(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Title(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Slot(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SummonPropertiesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SummonPropertiesCreator = {
    Control?: int;
    Faction?: int;
    Title?: int;
    Slot?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SummonPropertiesQuery = {
    ID?: Relation<int>;
    Control?: Relation<int>;
    Faction?: Relation<int>;
    Title?: Relation<int>;
    Slot?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SummonPropertiesDBCFile extends DBCFile<SummonPropertiesCreator, SummonPropertiesQuery, SummonPropertiesRow> {
    constructor();
    /** Loads a new SummonProperties.dbc from a file. */
    static read(path: string): SummonPropertiesDBCFile;
    add(ID: int, c?: SummonPropertiesCreator): SummonPropertiesRow;
    findById(id: number): SummonPropertiesRow;
}

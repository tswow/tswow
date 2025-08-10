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
export declare class DungeonEncounterRow extends DBCRow<DungeonEncounterCreator, DungeonEncounterQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get MapID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Difficulty(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OrderIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Bit(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellIconID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: DungeonEncounterCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type DungeonEncounterCreator = {
    MapID?: int;
    Difficulty?: int;
    OrderIndex?: int;
    Bit?: int;
    Name?: loc_constructor;
    SpellIconID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type DungeonEncounterQuery = {
    ID?: Relation<int>;
    MapID?: Relation<int>;
    Difficulty?: Relation<int>;
    OrderIndex?: Relation<int>;
    Bit?: Relation<int>;
    Name?: Relation<string>;
    SpellIconID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class DungeonEncounterDBCFile extends DBCFile<DungeonEncounterCreator, DungeonEncounterQuery, DungeonEncounterRow> {
    constructor();
    /** Loads a new DungeonEncounter.dbc from a file. */
    static read(path: string): DungeonEncounterDBCFile;
    add(ID: int, c?: DungeonEncounterCreator): DungeonEncounterRow;
}

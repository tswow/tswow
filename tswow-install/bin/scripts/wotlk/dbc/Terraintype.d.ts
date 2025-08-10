import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TerraintypeRow extends DBCRow<TerraintypeCreator, TerraintypeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get TerrainID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get TerrainDesc(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get FootstepSprayRun(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FootstepSprayWalk(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(TerrainID: int, c?: TerraintypeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TerraintypeCreator = {
    TerrainDesc?: string;
    FootstepSprayRun?: int;
    FootstepSprayWalk?: int;
    SoundID?: int;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type TerraintypeQuery = {
    TerrainID?: Relation<int>;
    TerrainDesc?: Relation<string>;
    FootstepSprayRun?: Relation<int>;
    FootstepSprayWalk?: Relation<int>;
    SoundID?: Relation<int>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TerraintypeDBCFile extends DBCFile<TerraintypeCreator, TerraintypeQuery, TerraintypeRow> {
    constructor();
    /** Loads a new Terraintype.dbc from a file. */
    static read(path: string): TerraintypeDBCFile;
    add(TerrainID: int, c?: TerraintypeCreator): TerraintypeRow;
}

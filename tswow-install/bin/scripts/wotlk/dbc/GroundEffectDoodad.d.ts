import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class GroundEffectDoodadRow extends DBCRow<GroundEffectDoodadCreator, GroundEffectDoodadQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Doodadpath(): DBCStringCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GroundEffectDoodadCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GroundEffectDoodadCreator = {
    Doodadpath?: string;
    Flags?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GroundEffectDoodadQuery = {
    ID?: Relation<int>;
    Doodadpath?: Relation<string>;
    Flags?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GroundEffectDoodadDBCFile extends DBCFile<GroundEffectDoodadCreator, GroundEffectDoodadQuery, GroundEffectDoodadRow> {
    constructor();
    /** Loads a new GroundEffectDoodad.dbc from a file. */
    static read(path: string): GroundEffectDoodadDBCFile;
    add(ID: int, c?: GroundEffectDoodadCreator): GroundEffectDoodadRow;
    findById(id: number): GroundEffectDoodadRow;
}

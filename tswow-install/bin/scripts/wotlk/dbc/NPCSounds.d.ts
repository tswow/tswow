import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class NPCSoundsRow extends DBCRow<NPCSoundsCreator, NPCSoundsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: NPCSoundsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type NPCSoundsCreator = {
    SoundID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type NPCSoundsQuery = {
    ID?: Relation<int>;
    SoundID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class NPCSoundsDBCFile extends DBCFile<NPCSoundsCreator, NPCSoundsQuery, NPCSoundsRow> {
    constructor();
    /** Loads a new NPCSounds.dbc from a file. */
    static read(path: string): NPCSoundsDBCFile;
    add(ID: int, c?: NPCSoundsCreator): NPCSoundsRow;
    findById(id: number): NPCSoundsRow;
}

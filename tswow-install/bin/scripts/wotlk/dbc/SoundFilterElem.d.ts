import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCFloatArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundFilterElemRow extends DBCRow<SoundFilterElemCreator, SoundFilterElemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SoundFilterID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OrderIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get FilterType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Params(): DBCFloatArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SoundFilterElemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SoundFilterElemCreator = {
    SoundFilterID?: int;
    OrderIndex?: int;
    FilterType?: int;
    Params?: float[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SoundFilterElemQuery = {
    ID?: Relation<int>;
    SoundFilterID?: Relation<int>;
    OrderIndex?: Relation<int>;
    FilterType?: Relation<int>;
    Params?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SoundFilterElemDBCFile extends DBCFile<SoundFilterElemCreator, SoundFilterElemQuery, SoundFilterElemRow> {
    constructor();
    /** Loads a new SoundFilterElem.dbc from a file. */
    static read(path: string): SoundFilterElemDBCFile;
    add(ID: int, c?: SoundFilterElemCreator): SoundFilterElemRow;
    findById(id: number): SoundFilterElemRow;
}

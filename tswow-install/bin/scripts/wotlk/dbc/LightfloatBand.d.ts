import { DBCFloatArrayCell, DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { float, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LightfloatBandRow extends DBCRow<LightfloatBandCreator, LightfloatBandQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Num(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Time(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Data(): DBCFloatArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LightfloatBandCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LightfloatBandCreator = {
    Num?: int;
    Time?: int[];
    Data?: float[];
};
/**
 * Used for queries (Don't comment these)
 */
export type LightfloatBandQuery = {
    ID?: Relation<int>;
    Num?: Relation<int>;
    Time?: Relation<int>;
    Data?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LightfloatBandDBCFile extends DBCFile<LightfloatBandCreator, LightfloatBandQuery, LightfloatBandRow> {
    constructor();
    /** Loads a new LightfloatBand.dbc from a file. */
    static read(path: string): LightfloatBandDBCFile;
    add(ID: int, c?: LightfloatBandCreator): LightfloatBandRow;
    findById(id: number): LightfloatBandRow;
}

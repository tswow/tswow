import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class LightintBandRow extends DBCRow<LightintBandCreator, LightintBandQuery> {
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
    get Data(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: LightintBandCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type LightintBandCreator = {
    Num?: int;
    Time?: int[];
    Data?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type LightintBandQuery = {
    ID?: Relation<int>;
    Num?: Relation<int>;
    Time?: Relation<int>;
    Data?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class LightintBandDBCFile extends DBCFile<LightintBandCreator, LightintBandQuery, LightintBandRow> {
    constructor();
    /** Loads a new LightintBand.dbc from a file. */
    static read(path: string): LightintBandDBCFile;
    add(ID: int, c?: LightintBandCreator): LightintBandRow;
    findById(id: number): LightintBandRow;
}

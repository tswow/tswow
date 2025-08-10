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
export declare class HelmetGeosetVisDataRow extends DBCRow<HelmetGeosetVisDataCreator, HelmetGeosetVisDataQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get HideGeoset(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: HelmetGeosetVisDataCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type HelmetGeosetVisDataCreator = {
    HideGeoset?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type HelmetGeosetVisDataQuery = {
    ID?: Relation<int>;
    HideGeoset?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class HelmetGeosetVisDataDBCFile extends DBCFile<HelmetGeosetVisDataCreator, HelmetGeosetVisDataQuery, HelmetGeosetVisDataRow> {
    constructor();
    /** Loads a new HelmetGeosetVisData.dbc from a file. */
    static read(path: string): HelmetGeosetVisDataDBCFile;
    add(ID: int, c?: HelmetGeosetVisDataCreator): HelmetGeosetVisDataRow;
    findById(id: number): HelmetGeosetVisDataRow;
}

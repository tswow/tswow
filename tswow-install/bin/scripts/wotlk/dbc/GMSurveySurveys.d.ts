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
export declare class GMSurveySurveysRow extends DBCRow<GMSurveySurveysCreator, GMSurveySurveysQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Q(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GMSurveySurveysCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GMSurveySurveysCreator = {
    Q?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type GMSurveySurveysQuery = {
    ID?: Relation<int>;
    Q?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GMSurveySurveysDBCFile extends DBCFile<GMSurveySurveysCreator, GMSurveySurveysQuery, GMSurveySurveysRow> {
    constructor();
    /** Loads a new GMSurveySurveys.dbc from a file. */
    static read(path: string): GMSurveySurveysDBCFile;
    add(ID: int, c?: GMSurveySurveysCreator): GMSurveySurveysRow;
    findById(id: number): GMSurveySurveysRow;
}

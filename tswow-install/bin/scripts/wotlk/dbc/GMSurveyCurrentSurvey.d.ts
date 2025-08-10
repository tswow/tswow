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
export declare class GMSurveyCurrentSurveyRow extends DBCRow<GMSurveyCurrentSurveyCreator, GMSurveyCurrentSurveyQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get GMSURVEY_ID(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GMSurveyCurrentSurveyCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GMSurveyCurrentSurveyCreator = {
    GMSURVEY_ID?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type GMSurveyCurrentSurveyQuery = {
    ID?: Relation<int>;
    GMSURVEY_ID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GMSurveyCurrentSurveyDBCFile extends DBCFile<GMSurveyCurrentSurveyCreator, GMSurveyCurrentSurveyQuery, GMSurveyCurrentSurveyRow> {
    constructor();
    /** Loads a new GMSurveyCurrentSurvey.dbc from a file. */
    static read(path: string): GMSurveyCurrentSurveyDBCFile;
    add(ID: int, c?: GMSurveyCurrentSurveyCreator): GMSurveyCurrentSurveyRow;
    findById(id: number): GMSurveyCurrentSurveyRow;
}

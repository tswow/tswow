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
export declare class GMSurveyAnswersRow extends DBCRow<GMSurveyAnswersCreator, GMSurveyAnswersQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Sort_Index(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get GMSurveyQuestionID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Answer(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: GMSurveyAnswersCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type GMSurveyAnswersCreator = {
    Sort_Index?: int;
    GMSurveyQuestionID?: int;
    Answer?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type GMSurveyAnswersQuery = {
    ID?: Relation<int>;
    Sort_Index?: Relation<int>;
    GMSurveyQuestionID?: Relation<int>;
    Answer?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class GMSurveyAnswersDBCFile extends DBCFile<GMSurveyAnswersCreator, GMSurveyAnswersQuery, GMSurveyAnswersRow> {
    constructor();
    /** Loads a new GMSurveyAnswers.dbc from a file. */
    static read(path: string): GMSurveyAnswersDBCFile;
    add(ID: int, c?: GMSurveyAnswersCreator): GMSurveyAnswersRow;
}

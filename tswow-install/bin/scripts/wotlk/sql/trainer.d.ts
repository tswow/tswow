import { int, mediumint, smallint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class trainerRow extends SqlRow<trainerCreator, trainerQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Requirement(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Greeting(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get raceMask(): SQLCell<number, this>;
    /**
     * Custom tswow field
     */
    get classMask(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Id: int, c?: trainerCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type trainerCreator = {
    Id?: int;
    Type?: tinyint;
    Requirement?: mediumint;
    Greeting?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type trainerQuery = {
    Id?: Relation<int>;
    Type?: Relation<tinyint>;
    Requirement?: Relation<mediumint>;
    Greeting?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class trainerTable extends SqlTable<trainerCreator, trainerQuery, trainerRow> {
    add(Id: int, c?: trainerCreator): trainerRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_trainer: trainerTable;

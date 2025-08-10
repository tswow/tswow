import { mediumint, smallint, text, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class quest_greeting_localeRow extends SqlRow<quest_greeting_localeCreator, quest_greeting_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Type(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Greeting(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, Type: tinyint, locale: varchar, c?: quest_greeting_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_greeting_localeCreator = {
    ID?: mediumint;
    Type?: tinyint;
    locale?: varchar;
    Greeting?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_greeting_localeQuery = {
    ID?: Relation<mediumint>;
    Type?: Relation<tinyint>;
    locale?: Relation<varchar>;
    Greeting?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_greeting_localeTable extends SqlTable<quest_greeting_localeCreator, quest_greeting_localeQuery, quest_greeting_localeRow> {
    add(ID: mediumint, Type: tinyint, locale: varchar, c?: quest_greeting_localeCreator): quest_greeting_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_greeting_locale: quest_greeting_localeTable;

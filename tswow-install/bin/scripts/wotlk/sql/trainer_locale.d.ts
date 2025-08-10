import { int, smallint, text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class trainer_localeRow extends SqlRow<trainer_localeCreator, trainer_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Id(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Greeting_lang(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Id: int, locale: varchar, c?: trainer_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type trainer_localeCreator = {
    Id?: int;
    locale?: varchar;
    Greeting_lang?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type trainer_localeQuery = {
    Id?: Relation<int>;
    locale?: Relation<varchar>;
    Greeting_lang?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class trainer_localeTable extends SqlTable<trainer_localeCreator, trainer_localeQuery, trainer_localeRow> {
    add(Id: int, locale: varchar, c?: trainer_localeCreator): trainer_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_trainer_locale: trainer_localeTable;

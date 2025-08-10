import { mediumint, smallint, text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_template_localeRow extends SqlRow<creature_template_localeCreator, creature_template_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Title(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, locale: varchar, c?: creature_template_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_localeCreator = {
    entry?: mediumint;
    locale?: varchar;
    Name?: text;
    Title?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_localeQuery = {
    entry?: Relation<mediumint>;
    locale?: Relation<varchar>;
    Name?: Relation<text>;
    Title?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_template_localeTable extends SqlTable<creature_template_localeCreator, creature_template_localeQuery, creature_template_localeRow> {
    add(entry: mediumint, locale: varchar, c?: creature_template_localeCreator): creature_template_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template_locale: creature_template_localeTable;

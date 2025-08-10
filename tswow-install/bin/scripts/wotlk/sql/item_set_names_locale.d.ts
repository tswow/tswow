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
export declare class item_set_names_localeRow extends SqlRow<item_set_names_localeCreator, item_set_names_localeQuery> {
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
    get locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, locale: varchar, c?: item_set_names_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type item_set_names_localeCreator = {
    ID?: mediumint;
    locale?: varchar;
    Name?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type item_set_names_localeQuery = {
    ID?: Relation<mediumint>;
    locale?: Relation<varchar>;
    Name?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class item_set_names_localeTable extends SqlTable<item_set_names_localeCreator, item_set_names_localeQuery, item_set_names_localeRow> {
    add(ID: mediumint, locale: varchar, c?: item_set_names_localeCreator): item_set_names_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_item_set_names_locale: item_set_names_localeTable;

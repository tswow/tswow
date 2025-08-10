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
export declare class broadcast_text_localeRow extends SqlRow<broadcast_text_localeCreator, broadcast_text_localeQuery> {
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
    get Text(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, locale: varchar, c?: broadcast_text_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type broadcast_text_localeCreator = {
    ID?: mediumint;
    locale?: varchar;
    Text?: text;
    Text1?: text;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type broadcast_text_localeQuery = {
    ID?: Relation<mediumint>;
    locale?: Relation<varchar>;
    Text?: Relation<text>;
    Text1?: Relation<text>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class broadcast_text_localeTable extends SqlTable<broadcast_text_localeCreator, broadcast_text_localeQuery, broadcast_text_localeRow> {
    add(ID: mediumint, locale: varchar, c?: broadcast_text_localeCreator): broadcast_text_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_broadcast_text_locale: broadcast_text_localeTable;

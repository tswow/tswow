import { longtext, mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class page_textRow extends SqlRow<page_textCreator, page_textQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Text(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get NextPageID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: page_textCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type page_textCreator = {
    ID?: mediumint;
    Text?: longtext;
    NextPageID?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type page_textQuery = {
    ID?: Relation<mediumint>;
    Text?: Relation<longtext>;
    NextPageID?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class page_textTable extends SqlTable<page_textCreator, page_textQuery, page_textRow> {
    add(ID: mediumint, c?: page_textCreator): page_textRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_page_text: page_textTable;

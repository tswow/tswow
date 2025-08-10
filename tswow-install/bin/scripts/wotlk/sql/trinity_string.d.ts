import { mediumint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class trinity_stringRow extends SqlRow<trinity_stringCreator, trinity_stringQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get content_default(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc2(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc3(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc4(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc5(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc6(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc7(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get content_loc8(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: trinity_stringCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type trinity_stringCreator = {
    entry?: mediumint;
    content_default?: text;
    content_loc1?: text;
    content_loc2?: text;
    content_loc3?: text;
    content_loc4?: text;
    content_loc5?: text;
    content_loc6?: text;
    content_loc7?: text;
    content_loc8?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type trinity_stringQuery = {
    entry?: Relation<mediumint>;
    content_default?: Relation<text>;
    content_loc1?: Relation<text>;
    content_loc2?: Relation<text>;
    content_loc3?: Relation<text>;
    content_loc4?: Relation<text>;
    content_loc5?: Relation<text>;
    content_loc6?: Relation<text>;
    content_loc7?: Relation<text>;
    content_loc8?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class trinity_stringTable extends SqlTable<trinity_stringCreator, trinity_stringQuery, trinity_stringRow> {
    add(entry: mediumint, c?: trinity_stringCreator): trinity_stringRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_trinity_string: trinity_stringTable;

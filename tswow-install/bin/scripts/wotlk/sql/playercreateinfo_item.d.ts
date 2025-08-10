import { mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class playercreateinfo_itemRow extends SqlRow<playercreateinfo_itemCreator, playercreateinfo_itemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get race(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get itemid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get amount(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race: tinyint, cls: tinyint, itemid: mediumint, c?: playercreateinfo_itemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfo_itemCreator = {
    race?: tinyint;
    class?: tinyint;
    itemid?: mediumint;
    amount?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfo_itemQuery = {
    race?: Relation<tinyint>;
    class?: Relation<tinyint>;
    itemid?: Relation<mediumint>;
    amount?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class playercreateinfo_itemTable extends SqlTable<playercreateinfo_itemCreator, playercreateinfo_itemQuery, playercreateinfo_itemRow> {
    add(race: tinyint, cls: tinyint, itemid: mediumint, c?: playercreateinfo_itemCreator): playercreateinfo_itemRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_playercreateinfo_item: playercreateinfo_itemTable;

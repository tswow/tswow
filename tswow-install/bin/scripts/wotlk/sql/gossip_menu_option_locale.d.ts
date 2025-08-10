import { smallint, text, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gossip_menu_option_localeRow extends SqlRow<gossip_menu_option_localeCreator, gossip_menu_option_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get MenuID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get OptionID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get OptionText(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BoxText(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID: smallint, OptionID: smallint, Locale: varchar, c?: gossip_menu_option_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menu_option_localeCreator = {
    MenuID?: smallint;
    OptionID?: smallint;
    Locale?: varchar;
    OptionText?: text;
    BoxText?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menu_option_localeQuery = {
    MenuID?: Relation<smallint>;
    OptionID?: Relation<smallint>;
    Locale?: Relation<varchar>;
    OptionText?: Relation<text>;
    BoxText?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gossip_menu_option_localeTable extends SqlTable<gossip_menu_option_localeCreator, gossip_menu_option_localeQuery, gossip_menu_option_localeRow> {
    add(MenuID: smallint, OptionID: smallint, Locale: varchar, c?: gossip_menu_option_localeCreator): gossip_menu_option_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gossip_menu_option_locale: gossip_menu_option_localeTable;

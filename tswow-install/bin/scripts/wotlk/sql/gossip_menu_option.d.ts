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
export declare class gossip_menu_optionRow extends SqlRow<gossip_menu_optionCreator, gossip_menu_optionQuery> {
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
     * No comment (yet!)
     */
    get OptionIcon(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get OptionText(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get OptionBroadcastTextID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get OptionType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get OptionNpcFlag(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ActionMenuID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ActionPoiID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BoxCoded(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BoxMoney(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BoxText(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BoxBroadcastTextID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID: smallint, OptionID: smallint, c?: gossip_menu_optionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menu_optionCreator = {
    MenuID?: smallint;
    OptionID?: smallint;
    OptionIcon?: mediumint;
    OptionText?: text;
    OptionBroadcastTextID?: mediumint;
    OptionType?: tinyint;
    OptionNpcFlag?: int;
    ActionMenuID?: int;
    ActionPoiID?: mediumint;
    BoxCoded?: tinyint;
    BoxMoney?: int;
    BoxText?: text;
    BoxBroadcastTextID?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menu_optionQuery = {
    MenuID?: Relation<smallint>;
    OptionID?: Relation<smallint>;
    OptionIcon?: Relation<mediumint>;
    OptionText?: Relation<text>;
    OptionBroadcastTextID?: Relation<mediumint>;
    OptionType?: Relation<tinyint>;
    OptionNpcFlag?: Relation<int>;
    ActionMenuID?: Relation<int>;
    ActionPoiID?: Relation<mediumint>;
    BoxCoded?: Relation<tinyint>;
    BoxMoney?: Relation<int>;
    BoxText?: Relation<text>;
    BoxBroadcastTextID?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gossip_menu_optionTable extends SqlTable<gossip_menu_optionCreator, gossip_menu_optionQuery, gossip_menu_optionRow> {
    add(MenuID: smallint, OptionID: smallint, c?: gossip_menu_optionCreator): gossip_menu_optionRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gossip_menu_option: gossip_menu_optionTable;

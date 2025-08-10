import { mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gossip_menuRow extends SqlRow<gossip_menuCreator, gossip_menuQuery> {
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
    get TextID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(MenuID: smallint, TextID: mediumint, c?: gossip_menuCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gossip_menuCreator = {
    MenuID?: smallint;
    TextID?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gossip_menuQuery = {
    MenuID?: Relation<smallint>;
    TextID?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gossip_menuTable extends SqlTable<gossip_menuCreator, gossip_menuQuery, gossip_menuRow> {
    add(MenuID: smallint, TextID: mediumint, c?: gossip_menuCreator): gossip_menuRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gossip_menu: gossip_menuTable;

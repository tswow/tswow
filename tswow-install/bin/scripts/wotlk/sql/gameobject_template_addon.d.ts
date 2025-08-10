import { int, mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class gameobject_template_addonRow extends SqlRow<gameobject_template_addonCreator, gameobject_template_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get faction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mingold(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get maxgold(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get artkit0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get artkit1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get artkit2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get artkit3(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: gameobject_template_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobject_template_addonCreator = {
    entry?: mediumint;
    faction?: smallint;
    flags?: int;
    mingold?: mediumint;
    maxgold?: mediumint;
    artkit0?: int;
    artkit1?: int;
    artkit2?: int;
    artkit3?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobject_template_addonQuery = {
    entry?: Relation<mediumint>;
    faction?: Relation<smallint>;
    flags?: Relation<int>;
    mingold?: Relation<mediumint>;
    maxgold?: Relation<mediumint>;
    artkit0?: Relation<int>;
    artkit1?: Relation<int>;
    artkit2?: Relation<int>;
    artkit3?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobject_template_addonTable extends SqlTable<gameobject_template_addonCreator, gameobject_template_addonQuery, gameobject_template_addonRow> {
    add(entry: mediumint, c?: gameobject_template_addonCreator): gameobject_template_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject_template_addon: gameobject_template_addonTable;

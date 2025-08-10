import { float, mediumint, smallint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class reference_loot_templateRow extends SqlRow<reference_loot_templateCreator, reference_loot_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Item(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Reference(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get QuestRequired(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get LootMode(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get GroupId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MinCount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxCount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(Entry: mediumint, Item: mediumint, c?: reference_loot_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type reference_loot_templateCreator = {
    Entry?: mediumint;
    Item?: mediumint;
    Reference?: mediumint;
    Chance?: float;
    QuestRequired?: tinyint;
    LootMode?: smallint;
    GroupId?: tinyint;
    MinCount?: tinyint;
    MaxCount?: tinyint;
    Comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type reference_loot_templateQuery = {
    Entry?: Relation<mediumint>;
    Item?: Relation<mediumint>;
    Reference?: Relation<mediumint>;
    Chance?: Relation<float>;
    QuestRequired?: Relation<tinyint>;
    LootMode?: Relation<smallint>;
    GroupId?: Relation<tinyint>;
    MinCount?: Relation<tinyint>;
    MaxCount?: Relation<tinyint>;
    Comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class reference_loot_templateTable extends SqlTable<reference_loot_templateCreator, reference_loot_templateQuery, reference_loot_templateRow> {
    add(Entry: mediumint, Item: mediumint, c?: reference_loot_templateCreator): reference_loot_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_reference_loot_template: reference_loot_templateTable;

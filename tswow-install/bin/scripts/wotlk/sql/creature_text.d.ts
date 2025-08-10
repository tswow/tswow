import { float, longtext, mediumint, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_textRow extends SqlRow<creature_textCreator, creature_textQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get GroupID(): SQLCellReadOnly<number, this>;
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
    get Type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Language(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Duration(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Sound(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get TextRange(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID: mediumint, GroupID: tinyint, ID: tinyint, c?: creature_textCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_textCreator = {
    CreatureID?: mediumint;
    GroupID?: tinyint;
    ID?: tinyint;
    Text?: longtext;
    Type?: tinyint;
    Language?: tinyint;
    Probability?: float;
    Emote?: mediumint;
    Duration?: mediumint;
    Sound?: mediumint;
    BroadcastTextId?: mediumint;
    TextRange?: tinyint;
    comment?: varchar;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_textQuery = {
    CreatureID?: Relation<mediumint>;
    GroupID?: Relation<tinyint>;
    ID?: Relation<tinyint>;
    Text?: Relation<longtext>;
    Type?: Relation<tinyint>;
    Language?: Relation<tinyint>;
    Probability?: Relation<float>;
    Emote?: Relation<mediumint>;
    Duration?: Relation<mediumint>;
    Sound?: Relation<mediumint>;
    BroadcastTextId?: Relation<mediumint>;
    TextRange?: Relation<tinyint>;
    comment?: Relation<varchar>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_textTable extends SqlTable<creature_textCreator, creature_textQuery, creature_textRow> {
    add(CreatureID: mediumint, GroupID: tinyint, ID: tinyint, c?: creature_textCreator): creature_textRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_text: creature_textTable;

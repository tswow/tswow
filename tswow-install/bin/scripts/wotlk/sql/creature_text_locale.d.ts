import { mediumint, text, tinyint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_text_localeRow extends SqlRow<creature_text_localeCreator, creature_text_localeQuery> {
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
     * Primary Key
     *
     * No comment (yet!)
     */
    get Locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Text(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID: mediumint, GroupID: tinyint, ID: tinyint, Locale: varchar, c?: creature_text_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_text_localeCreator = {
    CreatureID?: mediumint;
    GroupID?: tinyint;
    ID?: tinyint;
    Locale?: varchar;
    Text?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_text_localeQuery = {
    CreatureID?: Relation<mediumint>;
    GroupID?: Relation<tinyint>;
    ID?: Relation<tinyint>;
    Locale?: Relation<varchar>;
    Text?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_text_localeTable extends SqlTable<creature_text_localeCreator, creature_text_localeQuery, creature_text_localeRow> {
    add(CreatureID: mediumint, GroupID: tinyint, ID: tinyint, Locale: varchar, c?: creature_text_localeCreator): creature_text_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_text_locale: creature_text_localeTable;

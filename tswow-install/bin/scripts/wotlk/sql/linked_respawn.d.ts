import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class linked_respawnRow extends SqlRow<linked_respawnCreator, linked_respawnQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get linkedGuid(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get linkType(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, linkType: tinyint, c?: linked_respawnCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type linked_respawnCreator = {
    guid?: int;
    linkedGuid?: int;
    linkType?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type linked_respawnQuery = {
    guid?: Relation<int>;
    linkedGuid?: Relation<int>;
    linkType?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class linked_respawnTable extends SqlTable<linked_respawnCreator, linked_respawnQuery, linked_respawnRow> {
    add(guid: int, linkType: tinyint, c?: linked_respawnCreator): linked_respawnRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_linked_respawn: linked_respawnTable;

import { int, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_questitemRow extends SqlRow<creature_questitemCreator, creature_questitemQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureEntry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Idx(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureEntry: int, Idx: int, c?: creature_questitemCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_questitemCreator = {
    CreatureEntry?: int;
    Idx?: int;
    ItemId?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_questitemQuery = {
    CreatureEntry?: Relation<int>;
    Idx?: Relation<int>;
    ItemId?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_questitemTable extends SqlTable<creature_questitemCreator, creature_questitemQuery, creature_questitemRow> {
    add(CreatureEntry: int, Idx: int, c?: creature_questitemCreator): creature_questitemRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_questitem: creature_questitemTable;

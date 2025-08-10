import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class achievement_dbcRow extends SqlRow<achievement_dbcCreator, achievement_dbcQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get requiredFaction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mapID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get points(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get count(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get refAchievement(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: int, c?: achievement_dbcCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type achievement_dbcCreator = {
    ID?: int;
    requiredFaction?: int;
    mapID?: int;
    points?: int;
    flags?: int;
    count?: int;
    refAchievement?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type achievement_dbcQuery = {
    ID?: Relation<int>;
    requiredFaction?: Relation<int>;
    mapID?: Relation<int>;
    points?: Relation<int>;
    flags?: Relation<int>;
    count?: Relation<int>;
    refAchievement?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class achievement_dbcTable extends SqlTable<achievement_dbcCreator, achievement_dbcQuery, achievement_dbcRow> {
    add(ID: int, c?: achievement_dbcCreator): achievement_dbcRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_achievement_dbc: achievement_dbcTable;

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
export declare class quest_poi_pointsRow extends SqlRow<quest_poi_pointsCreator, quest_poi_pointsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get QuestID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Idx1(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Idx2(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get X(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestID: int, Idx1: int, Idx2: int, c?: quest_poi_pointsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_poi_pointsCreator = {
    QuestID?: int;
    Idx1?: int;
    Idx2?: int;
    X?: int;
    Y?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_poi_pointsQuery = {
    QuestID?: Relation<int>;
    Idx1?: Relation<int>;
    Idx2?: Relation<int>;
    X?: Relation<int>;
    Y?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_poi_pointsTable extends SqlTable<quest_poi_pointsCreator, quest_poi_pointsQuery, quest_poi_pointsRow> {
    add(QuestID: int, Idx1: int, Idx2: int, c?: quest_poi_pointsCreator): quest_poi_pointsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_poi_points: quest_poi_pointsTable;

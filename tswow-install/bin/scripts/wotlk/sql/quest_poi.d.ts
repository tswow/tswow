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
export declare class quest_poiRow extends SqlRow<quest_poiCreator, quest_poiQuery> {
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
    get id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ObjectiveIndex(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MapID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get WorldMapAreaId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Floor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Priority(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(QuestID: int, id: int, c?: quest_poiCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_poiCreator = {
    QuestID?: int;
    id?: int;
    ObjectiveIndex?: int;
    MapID?: int;
    WorldMapAreaId?: int;
    Floor?: int;
    Priority?: int;
    Flags?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_poiQuery = {
    QuestID?: Relation<int>;
    id?: Relation<int>;
    ObjectiveIndex?: Relation<int>;
    MapID?: Relation<int>;
    WorldMapAreaId?: Relation<int>;
    Floor?: Relation<int>;
    Priority?: Relation<int>;
    Flags?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_poiTable extends SqlTable<quest_poiCreator, quest_poiQuery, quest_poiRow> {
    add(QuestID: int, id: int, c?: quest_poiCreator): quest_poiRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_poi: quest_poiTable;

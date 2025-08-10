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
export declare class quest_detailsRow extends SqlRow<quest_detailsCreator, quest_detailsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: quest_detailsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type quest_detailsCreator = {
    ID?: mediumint;
    Emote1?: smallint;
    Emote2?: smallint;
    Emote3?: smallint;
    Emote4?: smallint;
    EmoteDelay1?: int;
    EmoteDelay2?: int;
    EmoteDelay3?: int;
    EmoteDelay4?: int;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type quest_detailsQuery = {
    ID?: Relation<mediumint>;
    Emote1?: Relation<smallint>;
    Emote2?: Relation<smallint>;
    Emote3?: Relation<smallint>;
    Emote4?: Relation<smallint>;
    EmoteDelay1?: Relation<int>;
    EmoteDelay2?: Relation<int>;
    EmoteDelay3?: Relation<int>;
    EmoteDelay4?: Relation<int>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class quest_detailsTable extends SqlTable<quest_detailsCreator, quest_detailsQuery, quest_detailsRow> {
    add(ID: mediumint, c?: quest_detailsCreator): quest_detailsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_quest_details: quest_detailsTable;

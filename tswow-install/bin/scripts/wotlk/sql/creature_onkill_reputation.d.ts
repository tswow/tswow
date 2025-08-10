import { mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_onkill_reputationRow extends SqlRow<creature_onkill_reputationCreator, creature_onkill_reputationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get creature_id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get RewOnKillRepFaction1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewOnKillRepFaction2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxStanding1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get IsTeamAward1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewOnKillRepValue1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MaxStanding2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get IsTeamAward2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RewOnKillRepValue2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get TeamDependent(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(creature_id: mediumint, c?: creature_onkill_reputationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_onkill_reputationCreator = {
    creature_id?: mediumint;
    RewOnKillRepFaction1?: smallint;
    RewOnKillRepFaction2?: smallint;
    MaxStanding1?: tinyint;
    IsTeamAward1?: tinyint;
    RewOnKillRepValue1?: mediumint;
    MaxStanding2?: tinyint;
    IsTeamAward2?: tinyint;
    RewOnKillRepValue2?: mediumint;
    TeamDependent?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_onkill_reputationQuery = {
    creature_id?: Relation<mediumint>;
    RewOnKillRepFaction1?: Relation<smallint>;
    RewOnKillRepFaction2?: Relation<smallint>;
    MaxStanding1?: Relation<tinyint>;
    IsTeamAward1?: Relation<tinyint>;
    RewOnKillRepValue1?: Relation<mediumint>;
    MaxStanding2?: Relation<tinyint>;
    IsTeamAward2?: Relation<tinyint>;
    RewOnKillRepValue2?: Relation<mediumint>;
    TeamDependent?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_onkill_reputationTable extends SqlTable<creature_onkill_reputationCreator, creature_onkill_reputationQuery, creature_onkill_reputationRow> {
    add(creature_id: mediumint, c?: creature_onkill_reputationCreator): creature_onkill_reputationRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_onkill_reputation: creature_onkill_reputationTable;

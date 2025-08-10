import { char, float, int, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creatureRow extends SqlRow<creatureCreator, creatureQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get zoneId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get areaId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spawnMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get phaseMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get equipment_id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get position_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get orientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spawntimesecs(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get wander_distance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get currentwaypoint(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get curhealth(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get curmana(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MovementType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get npcflag(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get unit_flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dynamicflags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: creatureCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creatureCreator = {
    guid?: int;
    id?: mediumint;
    map?: smallint;
    zoneId?: smallint;
    areaId?: smallint;
    spawnMask?: tinyint;
    phaseMask?: int;
    modelid?: mediumint;
    equipment_id?: tinyint;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    spawntimesecs?: int;
    wander_distance?: float;
    currentwaypoint?: mediumint;
    curhealth?: int;
    curmana?: int;
    MovementType?: tinyint;
    npcflag?: int;
    unit_flags?: int;
    dynamicflags?: int;
    ScriptName?: char;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creatureQuery = {
    guid?: Relation<int>;
    id?: Relation<mediumint>;
    map?: Relation<smallint>;
    zoneId?: Relation<smallint>;
    areaId?: Relation<smallint>;
    spawnMask?: Relation<tinyint>;
    phaseMask?: Relation<int>;
    modelid?: Relation<mediumint>;
    equipment_id?: Relation<tinyint>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    spawntimesecs?: Relation<int>;
    wander_distance?: Relation<float>;
    currentwaypoint?: Relation<mediumint>;
    curhealth?: Relation<int>;
    curmana?: Relation<int>;
    MovementType?: Relation<tinyint>;
    npcflag?: Relation<int>;
    unit_flags?: Relation<int>;
    dynamicflags?: Relation<int>;
    ScriptName?: Relation<char>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creatureTable extends SqlTable<creatureCreator, creatureQuery, creatureRow> {
    add(guid: int, c?: creatureCreator): creatureRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature: creatureTable;

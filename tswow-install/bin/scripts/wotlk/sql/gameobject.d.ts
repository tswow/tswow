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
export declare class gameobjectRow extends SqlRow<gameobjectCreator, gameobjectQuery> {
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
    get rotation0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rotation1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rotation2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rotation3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spawntimesecs(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get animprogress(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get state(): SQLCell<number, this>;
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
    clone(guid: int, c?: gameobjectCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type gameobjectCreator = {
    guid?: int;
    id?: mediumint;
    map?: smallint;
    zoneId?: smallint;
    areaId?: smallint;
    spawnMask?: tinyint;
    phaseMask?: int;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    rotation0?: float;
    rotation1?: float;
    rotation2?: float;
    rotation3?: float;
    spawntimesecs?: int;
    animprogress?: tinyint;
    state?: tinyint;
    ScriptName?: char;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type gameobjectQuery = {
    guid?: Relation<int>;
    id?: Relation<mediumint>;
    map?: Relation<smallint>;
    zoneId?: Relation<smallint>;
    areaId?: Relation<smallint>;
    spawnMask?: Relation<tinyint>;
    phaseMask?: Relation<int>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    rotation0?: Relation<float>;
    rotation1?: Relation<float>;
    rotation2?: Relation<float>;
    rotation3?: Relation<float>;
    spawntimesecs?: Relation<int>;
    animprogress?: Relation<tinyint>;
    state?: Relation<tinyint>;
    ScriptName?: Relation<char>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class gameobjectTable extends SqlTable<gameobjectCreator, gameobjectQuery, gameobjectRow> {
    add(guid: int, c?: gameobjectCreator): gameobjectRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_gameobject: gameobjectTable;

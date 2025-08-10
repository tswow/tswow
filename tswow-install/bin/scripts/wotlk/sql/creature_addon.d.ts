import { int, mediumint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_addonRow extends SqlRow<creature_addonCreator, creature_addonQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get guid(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get path_id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mount(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get MountCreatureID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get StandState(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AnimTier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VisFlags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SheathState(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PvPFlags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get emote(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get visibilityDistanceType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get auras(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(guid: int, c?: creature_addonCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_addonCreator = {
    guid?: int;
    path_id?: int;
    mount?: mediumint;
    MountCreatureID?: int;
    StandState?: tinyint;
    AnimTier?: tinyint;
    VisFlags?: tinyint;
    SheathState?: tinyint;
    PvPFlags?: tinyint;
    emote?: int;
    visibilityDistanceType?: tinyint;
    auras?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_addonQuery = {
    guid?: Relation<int>;
    path_id?: Relation<int>;
    mount?: Relation<mediumint>;
    MountCreatureID?: Relation<mediumint>;
    StandState?: Relation<tinyint>;
    AnimTier?: Relation<tinyint>;
    VisFlags?: Relation<tinyint>;
    SheathState?: Relation<tinyint>;
    PvPFlags?: Relation<tinyint>;
    emote?: Relation<int>;
    visibilityDistanceType?: Relation<tinyint>;
    auras?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_addonTable extends SqlTable<creature_addonCreator, creature_addonQuery, creature_addonRow> {
    add(guid: int, c?: creature_addonCreator): creature_addonRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_addon: creature_addonTable;

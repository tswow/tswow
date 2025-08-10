import { char, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class game_weatherRow extends SqlRow<game_weatherCreator, game_weatherQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get zone(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get spring_rain_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spring_snow_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spring_storm_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get summer_rain_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get summer_snow_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get summer_storm_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get fall_rain_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get fall_snow_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get fall_storm_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get winter_rain_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get winter_snow_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get winter_storm_chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(zone: mediumint, c?: game_weatherCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type game_weatherCreator = {
    zone?: mediumint;
    spring_rain_chance?: tinyint;
    spring_snow_chance?: tinyint;
    spring_storm_chance?: tinyint;
    summer_rain_chance?: tinyint;
    summer_snow_chance?: tinyint;
    summer_storm_chance?: tinyint;
    fall_rain_chance?: tinyint;
    fall_snow_chance?: tinyint;
    fall_storm_chance?: tinyint;
    winter_rain_chance?: tinyint;
    winter_snow_chance?: tinyint;
    winter_storm_chance?: tinyint;
    ScriptName?: char;
};
/**
 * Used for object queries (Don't comment these)
 */
export type game_weatherQuery = {
    zone?: Relation<mediumint>;
    spring_rain_chance?: Relation<tinyint>;
    spring_snow_chance?: Relation<tinyint>;
    spring_storm_chance?: Relation<tinyint>;
    summer_rain_chance?: Relation<tinyint>;
    summer_snow_chance?: Relation<tinyint>;
    summer_storm_chance?: Relation<tinyint>;
    fall_rain_chance?: Relation<tinyint>;
    fall_snow_chance?: Relation<tinyint>;
    fall_storm_chance?: Relation<tinyint>;
    winter_rain_chance?: Relation<tinyint>;
    winter_snow_chance?: Relation<tinyint>;
    winter_storm_chance?: Relation<tinyint>;
    ScriptName?: Relation<char>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class game_weatherTable extends SqlTable<game_weatherCreator, game_weatherQuery, game_weatherRow> {
    add(zone: mediumint, c?: game_weatherCreator): game_weatherRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_game_weather: game_weatherTable;

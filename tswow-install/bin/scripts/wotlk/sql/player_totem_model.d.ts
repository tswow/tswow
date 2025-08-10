import { int, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class player_totem_modelRow extends SqlRow<player_totem_modelCreator, player_totem_modelQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get TotemSlot(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get RaceId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get DisplayId(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TotemSlot: tinyint, RaceId: tinyint, c?: player_totem_modelCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type player_totem_modelCreator = {
    TotemSlot?: tinyint;
    RaceId?: tinyint;
    DisplayId?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type player_totem_modelQuery = {
    TotemSlot?: Relation<tinyint>;
    RaceId?: Relation<tinyint>;
    DisplayId?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class player_totem_modelTable extends SqlTable<player_totem_modelCreator, player_totem_modelQuery, player_totem_modelRow> {
    add(TotemSlot: tinyint, RaceId: tinyint, c?: player_totem_modelCreator): player_totem_modelRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_player_totem_model: player_totem_modelTable;

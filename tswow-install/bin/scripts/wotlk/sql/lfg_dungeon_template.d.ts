import { float, int, smallint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class lfg_dungeon_templateRow extends SqlRow<lfg_dungeon_templateCreator, lfg_dungeon_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get dungeonId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
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
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(dungeonId: int, c?: lfg_dungeon_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type lfg_dungeon_templateCreator = {
    dungeonId?: int;
    name?: varchar;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type lfg_dungeon_templateQuery = {
    dungeonId?: Relation<int>;
    name?: Relation<varchar>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class lfg_dungeon_templateTable extends SqlTable<lfg_dungeon_templateCreator, lfg_dungeon_templateQuery, lfg_dungeon_templateRow> {
    add(dungeonId: int, c?: lfg_dungeon_templateCreator): lfg_dungeon_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_lfg_dungeon_template: lfg_dungeon_templateTable;

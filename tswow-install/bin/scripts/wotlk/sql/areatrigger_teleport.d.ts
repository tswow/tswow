import { float, mediumint, smallint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class areatrigger_teleportRow extends SqlRow<areatrigger_teleportCreator, areatrigger_teleportQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get target_map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_position_x(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_position_y(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_position_z(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get target_orientation(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: areatrigger_teleportCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_teleportCreator = {
    ID?: mediumint;
    Name?: text;
    target_map?: smallint;
    target_position_x?: float;
    target_position_y?: float;
    target_position_z?: float;
    target_orientation?: float;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_teleportQuery = {
    ID?: Relation<mediumint>;
    Name?: Relation<text>;
    target_map?: Relation<smallint>;
    target_position_x?: Relation<float>;
    target_position_y?: Relation<float>;
    target_position_z?: Relation<float>;
    target_orientation?: Relation<float>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class areatrigger_teleportTable extends SqlTable<areatrigger_teleportCreator, areatrigger_teleportQuery, areatrigger_teleportRow> {
    add(ID: mediumint, c?: areatrigger_teleportCreator): areatrigger_teleportRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_areatrigger_teleport: areatrigger_teleportTable;

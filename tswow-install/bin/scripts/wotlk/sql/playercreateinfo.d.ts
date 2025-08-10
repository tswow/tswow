import { float, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class playercreateinfoRow extends SqlRow<playercreateinfoCreator, playercreateinfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get race(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get map(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get zone(): SQLCell<number, this>;
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
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(race: tinyint, cls: tinyint, c?: playercreateinfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type playercreateinfoCreator = {
    race?: tinyint;
    class?: tinyint;
    map?: smallint;
    zone?: mediumint;
    position_x?: float;
    position_y?: float;
    position_z?: float;
    orientation?: float;
};
/**
 * Used for object queries (Don't comment these)
 */
export type playercreateinfoQuery = {
    race?: Relation<tinyint>;
    class?: Relation<tinyint>;
    map?: Relation<smallint>;
    zone?: Relation<mediumint>;
    position_x?: Relation<float>;
    position_y?: Relation<float>;
    position_z?: Relation<float>;
    orientation?: Relation<float>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class playercreateinfoTable extends SqlTable<playercreateinfoCreator, playercreateinfoQuery, playercreateinfoRow> {
    add(race: tinyint, cls: tinyint, c?: playercreateinfoCreator): playercreateinfoRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_playercreateinfo: playercreateinfoTable;

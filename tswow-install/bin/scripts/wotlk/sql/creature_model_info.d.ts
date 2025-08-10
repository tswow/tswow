import { float, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_model_infoRow extends SqlRow<creature_model_infoCreator, creature_model_infoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get DisplayID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get BoundingRadius(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get CombatReach(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Gender(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DisplayID_Other_Gender(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(DisplayID: mediumint, c?: creature_model_infoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_model_infoCreator = {
    DisplayID?: mediumint;
    BoundingRadius?: float;
    CombatReach?: float;
    Gender?: tinyint;
    DisplayID_Other_Gender?: mediumint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_model_infoQuery = {
    DisplayID?: Relation<mediumint>;
    BoundingRadius?: Relation<float>;
    CombatReach?: Relation<float>;
    Gender?: Relation<tinyint>;
    DisplayID_Other_Gender?: Relation<mediumint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_model_infoTable extends SqlTable<creature_model_infoCreator, creature_model_infoQuery, creature_model_infoRow> {
    add(DisplayID: mediumint, c?: creature_model_infoCreator): creature_model_infoRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_model_info: creature_model_infoTable;

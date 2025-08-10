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
export declare class creature_template_resistanceRow extends SqlRow<creature_template_resistanceCreator, creature_template_resistanceQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get CreatureID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get School(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get Resistance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID: mediumint, School: tinyint, c?: creature_template_resistanceCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_template_resistanceCreator = {
    CreatureID?: mediumint;
    School?: tinyint;
    Resistance?: smallint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_template_resistanceQuery = {
    CreatureID?: Relation<mediumint>;
    School?: Relation<tinyint>;
    Resistance?: Relation<smallint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_template_resistanceTable extends SqlTable<creature_template_resistanceCreator, creature_template_resistanceQuery, creature_template_resistanceRow> {
    add(CreatureID: mediumint, School: tinyint, c?: creature_template_resistanceCreator): creature_template_resistanceRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template_resistance: creature_template_resistanceTable;

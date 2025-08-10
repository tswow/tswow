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
export declare class creature_equip_templateRow extends SqlRow<creature_equip_templateCreator, creature_equip_templateQuery> {
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
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemID1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemID2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ItemID3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(CreatureID: mediumint, ID: tinyint, c?: creature_equip_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_equip_templateCreator = {
    CreatureID?: mediumint;
    ID?: tinyint;
    ItemID1?: mediumint;
    ItemID2?: mediumint;
    ItemID3?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_equip_templateQuery = {
    CreatureID?: Relation<mediumint>;
    ID?: Relation<tinyint>;
    ItemID1?: Relation<mediumint>;
    ItemID2?: Relation<mediumint>;
    ItemID3?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_equip_templateTable extends SqlTable<creature_equip_templateCreator, creature_equip_templateQuery, creature_equip_templateRow> {
    add(CreatureID: mediumint, ID: tinyint, c?: creature_equip_templateCreator): creature_equip_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_equip_template: creature_equip_templateTable;

import { float, smallint, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_classlevelstatsRow extends SqlRow<creature_classlevelstatsCreator, creature_classlevelstatsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get level(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get class(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get basehp0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get basehp1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get basehp2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get basemana(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get basearmor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get attackpower(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rangedattackpower(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get damage_base(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get damage_exp1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get damage_exp2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(level: tinyint, cls: tinyint, c?: creature_classlevelstatsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_classlevelstatsCreator = {
    level?: tinyint;
    class?: tinyint;
    basehp0?: smallint;
    basehp1?: smallint;
    basehp2?: smallint;
    basemana?: smallint;
    basearmor?: smallint;
    attackpower?: smallint;
    rangedattackpower?: smallint;
    damage_base?: float;
    damage_exp1?: float;
    damage_exp2?: float;
    comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_classlevelstatsQuery = {
    level?: Relation<tinyint>;
    class?: Relation<tinyint>;
    basehp0?: Relation<smallint>;
    basehp1?: Relation<smallint>;
    basehp2?: Relation<smallint>;
    basemana?: Relation<smallint>;
    basearmor?: Relation<smallint>;
    attackpower?: Relation<smallint>;
    rangedattackpower?: Relation<smallint>;
    damage_base?: Relation<float>;
    damage_exp1?: Relation<float>;
    damage_exp2?: Relation<float>;
    comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_classlevelstatsTable extends SqlTable<creature_classlevelstatsCreator, creature_classlevelstatsQuery, creature_classlevelstatsRow> {
    add(level: tinyint, cls: tinyint, c?: creature_classlevelstatsCreator): creature_classlevelstatsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_classlevelstats: creature_classlevelstatsTable;

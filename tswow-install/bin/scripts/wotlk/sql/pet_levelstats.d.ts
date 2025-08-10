import { int, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class pet_levelstatsRow extends SqlRow<pet_levelstatsCreator, pet_levelstatsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get creature_entry(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get level(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get hp(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mana(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get armor(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get str(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get agi(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get sta(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get inte(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spi(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get min_dmg(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get max_dmg(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(creature_entry: mediumint, level: tinyint, c?: pet_levelstatsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type pet_levelstatsCreator = {
    creature_entry?: mediumint;
    level?: tinyint;
    hp?: smallint;
    mana?: smallint;
    armor?: int;
    str?: smallint;
    agi?: smallint;
    sta?: smallint;
    inte?: smallint;
    spi?: smallint;
    min_dmg?: smallint;
    max_dmg?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type pet_levelstatsQuery = {
    creature_entry?: Relation<mediumint>;
    level?: Relation<tinyint>;
    hp?: Relation<smallint>;
    mana?: Relation<smallint>;
    armor?: Relation<int>;
    str?: Relation<smallint>;
    agi?: Relation<smallint>;
    sta?: Relation<smallint>;
    inte?: Relation<smallint>;
    spi?: Relation<smallint>;
    min_dmg?: Relation<smallint>;
    max_dmg?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class pet_levelstatsTable extends SqlTable<pet_levelstatsCreator, pet_levelstatsQuery, pet_levelstatsRow> {
    add(creature_entry: mediumint, level: tinyint, c?: pet_levelstatsCreator): pet_levelstatsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_pet_levelstats: pet_levelstatsTable;

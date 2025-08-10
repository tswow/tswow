import { int, mediumint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_areaRow extends SqlRow<spell_areaCreator, spell_areaQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get spell(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get area(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get quest_start(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_end(): SQLCell<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get aura_spell(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get racemask(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get gender(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get autocast(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_start_status(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get quest_end_status(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(spell: mediumint, area: mediumint, quest_start: mediumint, aura_spell: mediumint, racemask: mediumint, gender: tinyint, c?: spell_areaCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_areaCreator = {
    spell?: mediumint;
    area?: mediumint;
    quest_start?: mediumint;
    quest_end?: mediumint;
    aura_spell?: mediumint;
    racemask?: mediumint;
    gender?: tinyint;
    autocast?: tinyint;
    quest_start_status?: int;
    quest_end_status?: int;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_areaQuery = {
    spell?: Relation<mediumint>;
    area?: Relation<mediumint>;
    quest_start?: Relation<mediumint>;
    quest_end?: Relation<mediumint>;
    aura_spell?: Relation<mediumint>;
    racemask?: Relation<mediumint>;
    gender?: Relation<tinyint>;
    autocast?: Relation<tinyint>;
    quest_start_status?: Relation<int>;
    quest_end_status?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_areaTable extends SqlTable<spell_areaCreator, spell_areaQuery, spell_areaRow> {
    add(spell: mediumint, area: mediumint, quest_start: mediumint, aura_spell: mediumint, racemask: mediumint, gender: tinyint, c?: spell_areaCreator): spell_areaRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_area: spell_areaTable;

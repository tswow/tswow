import { char, mediumint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class areatrigger_scriptsRow extends SqlRow<areatrigger_scriptsCreator, areatrigger_scriptsQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: areatrigger_scriptsCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_scriptsCreator = {
    entry?: mediumint;
    ScriptName?: char;
};
/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_scriptsQuery = {
    entry?: Relation<mediumint>;
    ScriptName?: Relation<char>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class areatrigger_scriptsTable extends SqlTable<areatrigger_scriptsCreator, areatrigger_scriptsQuery, areatrigger_scriptsRow> {
    add(entry: mediumint, c?: areatrigger_scriptsCreator): areatrigger_scriptsRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_areatrigger_scripts: areatrigger_scriptsTable;

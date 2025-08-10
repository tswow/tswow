import { mediumint, text } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class areatrigger_tavernRow extends SqlRow<areatrigger_tavernCreator, areatrigger_tavernQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: mediumint, c?: areatrigger_tavernCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type areatrigger_tavernCreator = {
    id?: mediumint;
    name?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type areatrigger_tavernQuery = {
    id?: Relation<mediumint>;
    name?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class areatrigger_tavernTable extends SqlTable<areatrigger_tavernCreator, areatrigger_tavernQuery, areatrigger_tavernRow> {
    add(id: mediumint, c?: areatrigger_tavernCreator): areatrigger_tavernRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_areatrigger_tavern: areatrigger_tavernTable;

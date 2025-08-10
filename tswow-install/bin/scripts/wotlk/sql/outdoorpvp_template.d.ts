import { char, text, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class outdoorpvp_templateRow extends SqlRow<outdoorpvp_templateCreator, outdoorpvp_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get TypeId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get comment(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(TypeId: tinyint, c?: outdoorpvp_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type outdoorpvp_templateCreator = {
    TypeId?: tinyint;
    ScriptName?: char;
    comment?: text;
};
/**
 * Used for object queries (Don't comment these)
 */
export type outdoorpvp_templateQuery = {
    TypeId?: Relation<tinyint>;
    ScriptName?: Relation<char>;
    comment?: Relation<text>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class outdoorpvp_templateTable extends SqlTable<outdoorpvp_templateCreator, outdoorpvp_templateQuery, outdoorpvp_templateRow> {
    add(TypeId: tinyint, c?: outdoorpvp_templateCreator): outdoorpvp_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_outdoorpvp_template: outdoorpvp_templateTable;

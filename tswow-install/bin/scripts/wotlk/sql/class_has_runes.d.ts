import { tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class class_has_runesRow extends SqlRow<class_has_runesCreator, class_has_runesQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get classID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get raceID(): SQLCellReadOnly<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(cls: tinyint, race: tinyint, c?: class_has_runesCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type class_has_runesCreator = {
    classID?: tinyint;
    raceID?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type class_has_runesQuery = {
    classID?: Relation<tinyint>;
    raceID?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class class_has_runesTable extends SqlTable<class_has_runesCreator, class_has_runesQuery, class_has_runesRow> {
    add(cls: tinyint, race: tinyint, c?: class_has_runesCreator): class_has_runesRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_class_has_runes: class_has_runesTable;

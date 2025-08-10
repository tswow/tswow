import { mediumint, tinyint, tinytext } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class pet_name_generationRow extends SqlRow<pet_name_generationCreator, pet_name_generationQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get id(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get word(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get entry(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get half(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(id: mediumint, c?: pet_name_generationCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type pet_name_generationCreator = {
    id?: mediumint;
    word?: tinytext;
    entry?: mediumint;
    half?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type pet_name_generationQuery = {
    id?: Relation<mediumint>;
    word?: Relation<tinytext>;
    entry?: Relation<mediumint>;
    half?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class pet_name_generationTable extends SqlTable<pet_name_generationCreator, pet_name_generationQuery, pet_name_generationRow> {
    add(id: mediumint, c?: pet_name_generationCreator): pet_name_generationRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_pet_name_generation: pet_name_generationTable;

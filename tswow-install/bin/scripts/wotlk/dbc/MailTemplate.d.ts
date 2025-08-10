import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class MailTemplateRow extends DBCRow<MailTemplateCreator, MailTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Subject(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Body(): DBCLocCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: MailTemplateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type MailTemplateCreator = {
    Subject?: loc_constructor;
    Body?: loc_constructor;
};
/**
 * Used for queries (Don't comment these)
 */
export type MailTemplateQuery = {
    ID?: Relation<int>;
    Subject?: Relation<string>;
    Body?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class MailTemplateDBCFile extends DBCFile<MailTemplateCreator, MailTemplateQuery, MailTemplateRow> {
    constructor();
    /** Loads a new MailTemplate.dbc from a file. */
    static read(path: string): MailTemplateDBCFile;
    add(ID: int, c?: MailTemplateCreator): MailTemplateRow;
    findById(id: number): MailTemplateRow;
}

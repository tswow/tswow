import { longtext, mediumint, varchar } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class npc_text_localeRow extends SqlRow<npc_text_localeCreator, npc_text_localeQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get Locale(): SQLCellReadOnly<string, this>;
    /**
     * No comment (yet!)
     */
    get Text0_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text0_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text1_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text1_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text2_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text2_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text3_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text3_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text4_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text4_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text5_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text5_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text6_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text6_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text7_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text7_1(): SQLCell<string, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, Locale: varchar, c?: npc_text_localeCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type npc_text_localeCreator = {
    ID?: mediumint;
    Locale?: varchar;
    Text0_0?: longtext;
    Text0_1?: longtext;
    Text1_0?: longtext;
    Text1_1?: longtext;
    Text2_0?: longtext;
    Text2_1?: longtext;
    Text3_0?: longtext;
    Text3_1?: longtext;
    Text4_0?: longtext;
    Text4_1?: longtext;
    Text5_0?: longtext;
    Text5_1?: longtext;
    Text6_0?: longtext;
    Text6_1?: longtext;
    Text7_0?: longtext;
    Text7_1?: longtext;
};
/**
 * Used for object queries (Don't comment these)
 */
export type npc_text_localeQuery = {
    ID?: Relation<mediumint>;
    Locale?: Relation<varchar>;
    Text0_0?: Relation<longtext>;
    Text0_1?: Relation<longtext>;
    Text1_0?: Relation<longtext>;
    Text1_1?: Relation<longtext>;
    Text2_0?: Relation<longtext>;
    Text2_1?: Relation<longtext>;
    Text3_0?: Relation<longtext>;
    Text3_1?: Relation<longtext>;
    Text4_0?: Relation<longtext>;
    Text4_1?: Relation<longtext>;
    Text5_0?: Relation<longtext>;
    Text5_1?: Relation<longtext>;
    Text6_0?: Relation<longtext>;
    Text6_1?: Relation<longtext>;
    Text7_0?: Relation<longtext>;
    Text7_1?: Relation<longtext>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class npc_text_localeTable extends SqlTable<npc_text_localeCreator, npc_text_localeQuery, npc_text_localeRow> {
    add(ID: mediumint, Locale: varchar, c?: npc_text_localeCreator): npc_text_localeRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_npc_text_locale: npc_text_localeTable;

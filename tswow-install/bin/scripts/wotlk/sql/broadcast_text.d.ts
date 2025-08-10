import { longtext, mediumint, smallint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class broadcast_textRow extends SqlRow<broadcast_textCreator, broadcast_textQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get LanguageID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Text(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get Text1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get EmoteID1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteID2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteID3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SoundEntriesID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmotesID(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: broadcast_textCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type broadcast_textCreator = {
    ID?: mediumint;
    LanguageID?: mediumint;
    Text?: longtext;
    Text1?: longtext;
    EmoteID1?: mediumint;
    EmoteID2?: mediumint;
    EmoteID3?: mediumint;
    EmoteDelay1?: mediumint;
    EmoteDelay2?: mediumint;
    EmoteDelay3?: mediumint;
    SoundEntriesID?: mediumint;
    EmotesID?: mediumint;
    Flags?: mediumint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type broadcast_textQuery = {
    ID?: Relation<mediumint>;
    LanguageID?: Relation<mediumint>;
    Text?: Relation<longtext>;
    Text1?: Relation<longtext>;
    EmoteID1?: Relation<mediumint>;
    EmoteID2?: Relation<mediumint>;
    EmoteID3?: Relation<mediumint>;
    EmoteDelay1?: Relation<mediumint>;
    EmoteDelay2?: Relation<mediumint>;
    EmoteDelay3?: Relation<mediumint>;
    SoundEntriesID?: Relation<mediumint>;
    EmotesID?: Relation<mediumint>;
    Flags?: Relation<mediumint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class broadcast_textTable extends SqlTable<broadcast_textCreator, broadcast_textQuery, broadcast_textRow> {
    add(ID: mediumint, c?: broadcast_textCreator): broadcast_textRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_broadcast_text: broadcast_textTable;

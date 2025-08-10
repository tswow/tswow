import { float, longtext, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class npc_textRow extends SqlRow<npc_textCreator, npc_textQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get text0_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text0_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay0_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote0_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay0_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote0_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay0_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote0_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text1_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text1_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay1_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote1_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay1_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote1_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay1_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote1_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text2_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text2_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay2_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote2_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay2_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote2_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay2_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote2_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text3_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text3_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay3_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote3_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay3_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote3_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay3_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote3_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text4_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text4_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay4_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote4_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay4_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote4_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay4_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote4_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text5_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text5_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability5(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay5_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote5_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay5_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote5_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay5_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote5_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text6_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text6_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability6(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay6_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote6_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay6_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote6_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay6_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote6_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get text7_0(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get text7_1(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get BroadcastTextID7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lang7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Probability7(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay7_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote7_0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay7_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote7_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get EmoteDelay7_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Emote7_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(ID: mediumint, c?: npc_textCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type npc_textCreator = {
    ID?: mediumint;
    text0_0?: longtext;
    text0_1?: longtext;
    BroadcastTextID0?: mediumint;
    lang0?: tinyint;
    Probability0?: float;
    EmoteDelay0_0?: smallint;
    Emote0_0?: smallint;
    EmoteDelay0_1?: smallint;
    Emote0_1?: smallint;
    EmoteDelay0_2?: smallint;
    Emote0_2?: smallint;
    text1_0?: longtext;
    text1_1?: longtext;
    BroadcastTextID1?: mediumint;
    lang1?: tinyint;
    Probability1?: float;
    EmoteDelay1_0?: smallint;
    Emote1_0?: smallint;
    EmoteDelay1_1?: smallint;
    Emote1_1?: smallint;
    EmoteDelay1_2?: smallint;
    Emote1_2?: smallint;
    text2_0?: longtext;
    text2_1?: longtext;
    BroadcastTextID2?: mediumint;
    lang2?: tinyint;
    Probability2?: float;
    EmoteDelay2_0?: smallint;
    Emote2_0?: smallint;
    EmoteDelay2_1?: smallint;
    Emote2_1?: smallint;
    EmoteDelay2_2?: smallint;
    Emote2_2?: smallint;
    text3_0?: longtext;
    text3_1?: longtext;
    BroadcastTextID3?: mediumint;
    lang3?: tinyint;
    Probability3?: float;
    EmoteDelay3_0?: smallint;
    Emote3_0?: smallint;
    EmoteDelay3_1?: smallint;
    Emote3_1?: smallint;
    EmoteDelay3_2?: smallint;
    Emote3_2?: smallint;
    text4_0?: longtext;
    text4_1?: longtext;
    BroadcastTextID4?: mediumint;
    lang4?: tinyint;
    Probability4?: float;
    EmoteDelay4_0?: smallint;
    Emote4_0?: smallint;
    EmoteDelay4_1?: smallint;
    Emote4_1?: smallint;
    EmoteDelay4_2?: smallint;
    Emote4_2?: smallint;
    text5_0?: longtext;
    text5_1?: longtext;
    BroadcastTextID5?: mediumint;
    lang5?: tinyint;
    Probability5?: float;
    EmoteDelay5_0?: smallint;
    Emote5_0?: smallint;
    EmoteDelay5_1?: smallint;
    Emote5_1?: smallint;
    EmoteDelay5_2?: smallint;
    Emote5_2?: smallint;
    text6_0?: longtext;
    text6_1?: longtext;
    BroadcastTextID6?: mediumint;
    lang6?: tinyint;
    Probability6?: float;
    EmoteDelay6_0?: smallint;
    Emote6_0?: smallint;
    EmoteDelay6_1?: smallint;
    Emote6_1?: smallint;
    EmoteDelay6_2?: smallint;
    Emote6_2?: smallint;
    text7_0?: longtext;
    text7_1?: longtext;
    BroadcastTextID7?: mediumint;
    lang7?: tinyint;
    Probability7?: float;
    EmoteDelay7_0?: smallint;
    Emote7_0?: smallint;
    EmoteDelay7_1?: smallint;
    Emote7_1?: smallint;
    EmoteDelay7_2?: smallint;
    Emote7_2?: smallint;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type npc_textQuery = {
    ID?: Relation<mediumint>;
    text0_0?: Relation<longtext>;
    text0_1?: Relation<longtext>;
    BroadcastTextID0?: Relation<mediumint>;
    lang0?: Relation<tinyint>;
    Probability0?: Relation<float>;
    EmoteDelay0_0?: Relation<smallint>;
    Emote0_0?: Relation<smallint>;
    EmoteDelay0_1?: Relation<smallint>;
    Emote0_1?: Relation<smallint>;
    EmoteDelay0_2?: Relation<smallint>;
    Emote0_2?: Relation<smallint>;
    text1_0?: Relation<longtext>;
    text1_1?: Relation<longtext>;
    BroadcastTextID1?: Relation<mediumint>;
    lang1?: Relation<tinyint>;
    Probability1?: Relation<float>;
    EmoteDelay1_0?: Relation<smallint>;
    Emote1_0?: Relation<smallint>;
    EmoteDelay1_1?: Relation<smallint>;
    Emote1_1?: Relation<smallint>;
    EmoteDelay1_2?: Relation<smallint>;
    Emote1_2?: Relation<smallint>;
    text2_0?: Relation<longtext>;
    text2_1?: Relation<longtext>;
    BroadcastTextID2?: Relation<mediumint>;
    lang2?: Relation<tinyint>;
    Probability2?: Relation<float>;
    EmoteDelay2_0?: Relation<smallint>;
    Emote2_0?: Relation<smallint>;
    EmoteDelay2_1?: Relation<smallint>;
    Emote2_1?: Relation<smallint>;
    EmoteDelay2_2?: Relation<smallint>;
    Emote2_2?: Relation<smallint>;
    text3_0?: Relation<longtext>;
    text3_1?: Relation<longtext>;
    BroadcastTextID3?: Relation<mediumint>;
    lang3?: Relation<tinyint>;
    Probability3?: Relation<float>;
    EmoteDelay3_0?: Relation<smallint>;
    Emote3_0?: Relation<smallint>;
    EmoteDelay3_1?: Relation<smallint>;
    Emote3_1?: Relation<smallint>;
    EmoteDelay3_2?: Relation<smallint>;
    Emote3_2?: Relation<smallint>;
    text4_0?: Relation<longtext>;
    text4_1?: Relation<longtext>;
    BroadcastTextID4?: Relation<mediumint>;
    lang4?: Relation<tinyint>;
    Probability4?: Relation<float>;
    EmoteDelay4_0?: Relation<smallint>;
    Emote4_0?: Relation<smallint>;
    EmoteDelay4_1?: Relation<smallint>;
    Emote4_1?: Relation<smallint>;
    EmoteDelay4_2?: Relation<smallint>;
    Emote4_2?: Relation<smallint>;
    text5_0?: Relation<longtext>;
    text5_1?: Relation<longtext>;
    BroadcastTextID5?: Relation<mediumint>;
    lang5?: Relation<tinyint>;
    Probability5?: Relation<float>;
    EmoteDelay5_0?: Relation<smallint>;
    Emote5_0?: Relation<smallint>;
    EmoteDelay5_1?: Relation<smallint>;
    Emote5_1?: Relation<smallint>;
    EmoteDelay5_2?: Relation<smallint>;
    Emote5_2?: Relation<smallint>;
    text6_0?: Relation<longtext>;
    text6_1?: Relation<longtext>;
    BroadcastTextID6?: Relation<mediumint>;
    lang6?: Relation<tinyint>;
    Probability6?: Relation<float>;
    EmoteDelay6_0?: Relation<smallint>;
    Emote6_0?: Relation<smallint>;
    EmoteDelay6_1?: Relation<smallint>;
    Emote6_1?: Relation<smallint>;
    EmoteDelay6_2?: Relation<smallint>;
    Emote6_2?: Relation<smallint>;
    text7_0?: Relation<longtext>;
    text7_1?: Relation<longtext>;
    BroadcastTextID7?: Relation<mediumint>;
    lang7?: Relation<tinyint>;
    Probability7?: Relation<float>;
    EmoteDelay7_0?: Relation<smallint>;
    Emote7_0?: Relation<smallint>;
    EmoteDelay7_1?: Relation<smallint>;
    Emote7_1?: Relation<smallint>;
    EmoteDelay7_2?: Relation<smallint>;
    Emote7_2?: Relation<smallint>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class npc_textTable extends SqlTable<npc_textCreator, npc_textQuery, npc_textRow> {
    add(ID: mediumint, c?: npc_textCreator): npc_textRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_npc_text: npc_textTable;

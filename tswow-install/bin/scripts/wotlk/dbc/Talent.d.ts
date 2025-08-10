import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TalentRow extends DBCRow<TalentCreator, TalentQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get TabID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TierID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ColumnIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellRank(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PrereqTalent(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PrereqRank(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredSpellID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CategoryMask(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TalentCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TalentCreator = {
    TabID?: int;
    TierID?: int;
    ColumnIndex?: int;
    SpellRank?: int[];
    PrereqTalent?: int[];
    PrereqRank?: int[];
    Flags?: int;
    RequiredSpellID?: int;
    CategoryMask?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type TalentQuery = {
    ID?: Relation<int>;
    TabID?: Relation<int>;
    TierID?: Relation<int>;
    ColumnIndex?: Relation<int>;
    SpellRank?: Relation<int>;
    PrereqTalent?: Relation<int>;
    PrereqRank?: Relation<int>;
    Flags?: Relation<int>;
    RequiredSpellID?: Relation<int>;
    CategoryMask?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TalentDBCFile extends DBCFile<TalentCreator, TalentQuery, TalentRow> {
    constructor();
    /** Loads a new Talent.dbc from a file. */
    static read(path: string): TalentDBCFile;
    add(ID: int, c?: TalentCreator): TalentRow;
}

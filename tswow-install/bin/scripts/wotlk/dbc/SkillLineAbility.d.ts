import { int, uint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCKeyCell, DBCMaskCell, DBCUIntArrayCell, DBCUIntCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillLineAbilityRow extends DBCRow<SkillLineAbilityCreator, SkillLineAbilityQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillLine(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Spell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceMask(): DBCMaskCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassMask(): DBCMaskCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceMaskForbidden(): DBCMaskCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassMaskForbidden(): DBCMaskCell<this>;
    /**
     * No comment (yet!)
     */
    get MinSkillLineRank(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SupercededBySpell(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AcquireMethod(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TrivialSkillLineRankHigh(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get TrivialSkillLineRankLow(): DBCUIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CharacterPoints(): DBCUIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillLineAbilityCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillLineAbilityCreator = {
    SkillLine?: uint;
    Spell?: uint;
    RaceMask?: uint;
    ClassMask?: uint;
    RaceMaskForbidden?: uint;
    ClassMaskForbidden?: uint;
    MinSkillLineRank?: uint;
    SupercededBySpell?: uint;
    AcquireMethod?: uint;
    TrivialSkillLineRankHigh?: uint;
    TrivialSkillLineRankLow?: uint;
    CharacterPoints?: uint[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillLineAbilityQuery = {
    ID?: Relation<int>;
    SkillLine?: Relation<uint>;
    Spell?: Relation<uint>;
    RaceMask?: Relation<uint>;
    ClassMask?: Relation<uint>;
    RaceMaskForbidden?: Relation<uint>;
    ClassMaskForbidden?: Relation<uint>;
    MinSkillLineRank?: Relation<uint>;
    SupercededBySpell?: Relation<uint>;
    AcquireMethod?: Relation<uint>;
    TrivialSkillLineRankHigh?: Relation<uint>;
    TrivialSkillLineRankLow?: Relation<uint>;
    CharacterPoints?: Relation<uint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillLineAbilityDBCFile extends DBCFile<SkillLineAbilityCreator, SkillLineAbilityQuery, SkillLineAbilityRow> {
    constructor();
    /** Loads a new SkillLineAbility.dbc from a file. */
    static read(path: string): SkillLineAbilityDBCFile;
    add(ID: int, c?: SkillLineAbilityCreator): SkillLineAbilityRow;
}

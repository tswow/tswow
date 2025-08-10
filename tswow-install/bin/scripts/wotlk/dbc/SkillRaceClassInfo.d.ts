import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCMaskCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillRaceClassInfoRow extends DBCRow<SkillRaceClassInfoCreator, SkillRaceClassInfoQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillID(): DBCIntCell<this>;
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
    get Flags(): DBCMaskCell<this>;
    /**
     * No comment (yet!)
     */
    get MinLevel(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillTierID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get SkillCostIndex(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SkillRaceClassInfoCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SkillRaceClassInfoCreator = {
    SkillID?: int;
    RaceMask?: int;
    ClassMask?: int;
    Flags?: int;
    MinLevel?: int;
    SkillTierID?: int;
    SkillCostIndex?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SkillRaceClassInfoQuery = {
    ID?: Relation<int>;
    SkillID?: Relation<int>;
    RaceMask?: Relation<int>;
    ClassMask?: Relation<int>;
    Flags?: Relation<int>;
    MinLevel?: Relation<int>;
    SkillTierID?: Relation<int>;
    SkillCostIndex?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SkillRaceClassInfoDBCFile extends DBCFile<SkillRaceClassInfoCreator, SkillRaceClassInfoQuery, SkillRaceClassInfoRow> {
    constructor();
    /** Loads a new SkillRaceClassInfo.dbc from a file. */
    static read(path: string): SkillRaceClassInfoDBCFile;
    add(ID: int, c?: SkillRaceClassInfoCreator): SkillRaceClassInfoRow;
}

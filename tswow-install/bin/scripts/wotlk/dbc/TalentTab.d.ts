import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class TalentTabRow extends DBCRow<TalentTabCreator, TalentTabQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get SpellIconID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RaceMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get ClassMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get PetTalentMask(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get OrderIndex(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get BackgroundFile(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: TalentTabCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type TalentTabCreator = {
    Name?: loc_constructor;
    SpellIconID?: int;
    RaceMask?: int;
    ClassMask?: int;
    PetTalentMask?: int;
    OrderIndex?: int;
    BackgroundFile?: string;
};
/**
 * Used for queries (Don't comment these)
 */
export type TalentTabQuery = {
    ID?: Relation<int>;
    Name?: Relation<string>;
    SpellIconID?: Relation<int>;
    RaceMask?: Relation<int>;
    ClassMask?: Relation<int>;
    PetTalentMask?: Relation<int>;
    OrderIndex?: Relation<int>;
    BackgroundFile?: Relation<string>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class TalentTabDBCFile extends DBCFile<TalentTabCreator, TalentTabQuery, TalentTabRow> {
    constructor();
    /** Loads a new TalentTab.dbc from a file. */
    static read(path: string): TalentTabDBCFile;
    add(ID: int, c?: TalentTabCreator): TalentTabRow;
}

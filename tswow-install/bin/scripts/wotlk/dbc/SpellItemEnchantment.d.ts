import { int, loc_constructor } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCIntArrayCell, DBCIntCell, DBCKeyCell, DBCLocCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellItemEnchantmentRow extends DBCRow<SpellItemEnchantmentCreator, SpellItemEnchantmentQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Charges(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Effect(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectPointsMin(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectPointsMax(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get EffectArg(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get ItemVisual(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Src_ItemID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Condition_Id(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get RequiredSkillRank(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get MinLevel(): DBCIntCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellItemEnchantmentCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellItemEnchantmentCreator = {
    Charges?: int;
    Effect?: int[];
    EffectPointsMin?: int[];
    EffectPointsMax?: int[];
    EffectArg?: int[];
    Name?: loc_constructor;
    ItemVisual?: int;
    Flags?: int;
    Src_ItemID?: int;
    Condition_Id?: int;
    RequiredSkillID?: int;
    RequiredSkillRank?: int;
    MinLevel?: int;
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellItemEnchantmentQuery = {
    ID?: Relation<int>;
    Charges?: Relation<int>;
    Effect?: Relation<int>;
    EffectPointsMin?: Relation<int>;
    EffectPointsMax?: Relation<int>;
    EffectArg?: Relation<int>;
    Name?: Relation<string>;
    ItemVisual?: Relation<int>;
    Flags?: Relation<int>;
    Src_ItemID?: Relation<int>;
    Condition_Id?: Relation<int>;
    RequiredSkillID?: Relation<int>;
    RequiredSkillRank?: Relation<int>;
    MinLevel?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellItemEnchantmentDBCFile extends DBCFile<SpellItemEnchantmentCreator, SpellItemEnchantmentQuery, SpellItemEnchantmentRow> {
    constructor();
    /** Loads a new SpellItemEnchantment.dbc from a file. */
    static read(path: string): SpellItemEnchantmentDBCFile;
    add(ID: int, c?: SpellItemEnchantmentCreator): SpellItemEnchantmentRow;
    findById(id: number): SpellItemEnchantmentRow;
}

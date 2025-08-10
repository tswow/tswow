import { byte, int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { DBCByteArrayCell, DBCIntArrayCell, DBCKeyCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellItemEnchantmentConditionRow extends DBCRow<SpellItemEnchantmentConditionCreator, SpellItemEnchantmentConditionQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get Lt_OperandType(): DBCByteArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Lt_Operand(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Operator(): DBCByteArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Rt_OperandType(): DBCByteArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Rt_Operand(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get Logic(): DBCByteArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellItemEnchantmentConditionCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellItemEnchantmentConditionCreator = {
    Lt_OperandType?: byte[];
    Lt_Operand?: int[];
    Operator?: byte[];
    Rt_OperandType?: byte[];
    Rt_Operand?: int[];
    Logic?: byte[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellItemEnchantmentConditionQuery = {
    ID?: Relation<int>;
    Lt_OperandType?: Relation<byte>;
    Lt_Operand?: Relation<int>;
    Operator?: Relation<byte>;
    Rt_OperandType?: Relation<byte>;
    Rt_Operand?: Relation<int>;
    Logic?: Relation<byte>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellItemEnchantmentConditionDBCFile extends DBCFile<SpellItemEnchantmentConditionCreator, SpellItemEnchantmentConditionQuery, SpellItemEnchantmentConditionRow> {
    constructor();
    /** Loads a new SpellItemEnchantmentCondition.dbc from a file. */
    static read(path: string): SpellItemEnchantmentConditionDBCFile;
    add(ID: int, c?: SpellItemEnchantmentConditionCreator): SpellItemEnchantmentConditionRow;
    findById(id: number): SpellItemEnchantmentConditionRow;
}

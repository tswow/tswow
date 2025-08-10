import { float, int, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class spell_procRow extends SqlRow<spell_procCreator, spell_procQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get SpellId(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get SchoolMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyName(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyMask0(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyMask1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellFamilyMask2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcFlags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellTypeMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get SpellPhaseMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HitMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AttributesMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DisableEffectsMask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ProcsPerMinute(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Chance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Cooldown(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get Charges(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(SpellId: int, c?: spell_procCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type spell_procCreator = {
    SpellId?: int;
    SchoolMask?: tinyint;
    SpellFamilyName?: smallint;
    SpellFamilyMask0?: int;
    SpellFamilyMask1?: int;
    SpellFamilyMask2?: int;
    ProcFlags?: int;
    SpellTypeMask?: int;
    SpellPhaseMask?: int;
    HitMask?: int;
    AttributesMask?: int;
    DisableEffectsMask?: int;
    ProcsPerMinute?: float;
    Chance?: float;
    Cooldown?: int;
    Charges?: tinyint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type spell_procQuery = {
    SpellId?: Relation<int>;
    SchoolMask?: Relation<tinyint>;
    SpellFamilyName?: Relation<smallint>;
    SpellFamilyMask0?: Relation<int>;
    SpellFamilyMask1?: Relation<int>;
    SpellFamilyMask2?: Relation<int>;
    ProcFlags?: Relation<int>;
    SpellTypeMask?: Relation<int>;
    SpellPhaseMask?: Relation<int>;
    HitMask?: Relation<int>;
    AttributesMask?: Relation<int>;
    DisableEffectsMask?: Relation<int>;
    ProcsPerMinute?: Relation<float>;
    Chance?: Relation<float>;
    Cooldown?: Relation<int>;
    Charges?: Relation<tinyint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class spell_procTable extends SqlTable<spell_procCreator, spell_procQuery, spell_procRow> {
    add(SpellId: int, c?: spell_procCreator): spell_procRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_spell_proc: spell_procTable;

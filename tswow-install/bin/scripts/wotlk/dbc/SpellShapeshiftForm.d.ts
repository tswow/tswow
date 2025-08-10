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
export declare class SpellShapeshiftFormRow extends DBCRow<SpellShapeshiftFormCreator, SpellShapeshiftFormQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get ID(): DBCKeyCell<this>;
    /**
     * No comment (yet!)
     */
    get BonusActionBar(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get Name(): DBCLocCell<this>;
    /**
     * No comment (yet!)
     */
    get Flags(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureType(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get AttackIconID(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CombatRoundTime(): DBCIntCell<this>;
    /**
     * No comment (yet!)
     */
    get CreatureDisplayID(): DBCIntArrayCell<this>;
    /**
     * No comment (yet!)
     */
    get PresetSpellID(): DBCIntArrayCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: SpellShapeshiftFormCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type SpellShapeshiftFormCreator = {
    BonusActionBar?: int;
    Name?: loc_constructor;
    Flags?: int;
    CreatureType?: int;
    AttackIconID?: int;
    CombatRoundTime?: int;
    CreatureDisplayID?: int[];
    PresetSpellID?: int[];
};
/**
 * Used for queries (Don't comment these)
 */
export type SpellShapeshiftFormQuery = {
    ID?: Relation<int>;
    BonusActionBar?: Relation<int>;
    Name?: Relation<string>;
    Flags?: Relation<int>;
    CreatureType?: Relation<int>;
    AttackIconID?: Relation<int>;
    CombatRoundTime?: Relation<int>;
    CreatureDisplayID?: Relation<int>;
    PresetSpellID?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class SpellShapeshiftFormDBCFile extends DBCFile<SpellShapeshiftFormCreator, SpellShapeshiftFormQuery, SpellShapeshiftFormRow> {
    constructor();
    /** Loads a new SpellShapeshiftForm.dbc from a file. */
    static read(path: string): SpellShapeshiftFormDBCFile;
    add(ID: int, c?: SpellShapeshiftFormCreator): SpellShapeshiftFormRow;
    findById(id: number): SpellShapeshiftFormRow;
}

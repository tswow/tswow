import { char, float, int, mediumint, smallint, tinyint } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
import { SQLCell, SQLCellReadOnly } from '../../data/sql/SQLCell';
import { SqlRow } from '../../data/sql/SQLRow';
import { SqlTable } from '../../data/sql/SQLTable';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class creature_templateRow extends SqlRow<creature_templateCreator, creature_templateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): SQLCellReadOnly<number, this>;
    /**
     * No comment (yet!)
     */
    get difficulty_entry_1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get difficulty_entry_2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get difficulty_entry_3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get KillCredit1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get KillCredit2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid1(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid3(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get modelid4(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get name(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get subname(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get IconName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get gossip_menu_id(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get minlevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get maxlevel(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get exp(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get faction(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get npcflag(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get speed_walk(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get speed_run(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get scale(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get rank(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dmgschool(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BaseAttackTime(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RangeAttackTime(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get BaseVariance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RangeVariance(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get unit_class(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get unit_flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get unit_flags2(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get dynamicflags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get family(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get type(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get type_flags(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get lootid(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get pickpocketloot(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get skinloot(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get PetSpellDataId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get VehicleId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mingold(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get maxgold(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get AIName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get MovementType(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HoverHeight(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get HealthModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ManaModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ArmorModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get DamageModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ExperienceModifier(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RacialLeader(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get movementId(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get RegenHealth(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get mechanic_immune_mask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get spell_school_immune_mask(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get flags_extra(): SQLCell<number, this>;
    /**
     * No comment (yet!)
     */
    get ScriptName(): SQLCell<string, this>;
    /**
     * No comment (yet!)
     */
    get VerifiedBuild(): SQLCell<number, this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added to the SQL table.
     */
    clone(entry: mediumint, c?: creature_templateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type creature_templateCreator = {
    entry?: mediumint;
    difficulty_entry_1?: mediumint;
    difficulty_entry_2?: mediumint;
    difficulty_entry_3?: mediumint;
    KillCredit1?: int;
    KillCredit2?: int;
    modelid1?: mediumint;
    modelid2?: mediumint;
    modelid3?: mediumint;
    modelid4?: mediumint;
    name?: char;
    subname?: char;
    IconName?: char;
    gossip_menu_id?: mediumint;
    minlevel?: tinyint;
    maxlevel?: tinyint;
    exp?: smallint;
    faction?: smallint;
    npcflag?: int;
    speed_walk?: float;
    speed_run?: float;
    scale?: float;
    rank?: tinyint;
    dmgschool?: tinyint;
    BaseAttackTime?: int;
    RangeAttackTime?: int;
    BaseVariance?: float;
    RangeVariance?: float;
    unit_class?: tinyint;
    unit_flags?: int;
    unit_flags2?: int;
    dynamicflags?: int;
    family?: tinyint;
    type?: tinyint;
    type_flags?: int;
    lootid?: mediumint;
    pickpocketloot?: mediumint;
    skinloot?: mediumint;
    PetSpellDataId?: mediumint;
    VehicleId?: mediumint;
    mingold?: mediumint;
    maxgold?: mediumint;
    AIName?: char;
    MovementType?: tinyint;
    HoverHeight?: float;
    HealthModifier?: float;
    ManaModifier?: float;
    ArmorModifier?: float;
    DamageModifier?: float;
    ExperienceModifier?: float;
    RacialLeader?: tinyint;
    movementId?: int;
    RegenHealth?: tinyint;
    mechanic_immune_mask?: int;
    spell_school_immune_mask?: int;
    flags_extra?: int;
    ScriptName?: char;
    VerifiedBuild?: smallint;
};
/**
 * Used for object queries (Don't comment these)
 */
export type creature_templateQuery = {
    entry?: Relation<mediumint>;
    difficulty_entry_1?: Relation<mediumint>;
    difficulty_entry_2?: Relation<mediumint>;
    difficulty_entry_3?: Relation<mediumint>;
    KillCredit1?: Relation<int>;
    KillCredit2?: Relation<int>;
    modelid1?: Relation<mediumint>;
    modelid2?: Relation<mediumint>;
    modelid3?: Relation<mediumint>;
    modelid4?: Relation<mediumint>;
    name?: Relation<char>;
    subname?: Relation<char>;
    IconName?: Relation<char>;
    gossip_menu_id?: Relation<mediumint>;
    minlevel?: Relation<tinyint>;
    maxlevel?: Relation<tinyint>;
    exp?: Relation<smallint>;
    faction?: Relation<smallint>;
    npcflag?: Relation<int>;
    speed_walk?: Relation<float>;
    speed_run?: Relation<float>;
    scale?: Relation<float>;
    rank?: Relation<tinyint>;
    dmgschool?: Relation<tinyint>;
    BaseAttackTime?: Relation<int>;
    RangeAttackTime?: Relation<int>;
    BaseVariance?: Relation<float>;
    RangeVariance?: Relation<float>;
    unit_class?: Relation<tinyint>;
    unit_flags?: Relation<int>;
    unit_flags2?: Relation<int>;
    dynamicflags?: Relation<int>;
    family?: Relation<tinyint>;
    type?: Relation<tinyint>;
    type_flags?: Relation<int>;
    lootid?: Relation<mediumint>;
    pickpocketloot?: Relation<mediumint>;
    skinloot?: Relation<mediumint>;
    PetSpellDataId?: Relation<mediumint>;
    VehicleId?: Relation<mediumint>;
    mingold?: Relation<mediumint>;
    maxgold?: Relation<mediumint>;
    AIName?: Relation<char>;
    MovementType?: Relation<tinyint>;
    HoverHeight?: Relation<float>;
    HealthModifier?: Relation<float>;
    ManaModifier?: Relation<float>;
    ArmorModifier?: Relation<float>;
    DamageModifier?: Relation<float>;
    ExperienceModifier?: Relation<float>;
    RacialLeader?: Relation<tinyint>;
    movementId?: Relation<int>;
    RegenHealth?: Relation<tinyint>;
    mechanic_immune_mask?: Relation<int>;
    spell_school_immune_mask?: Relation<int>;
    flags_extra?: Relation<int>;
    ScriptName?: Relation<char>;
    VerifiedBuild?: Relation<smallint>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to SQLFiles.ts
 */
export declare class creature_templateTable extends SqlTable<creature_templateCreator, creature_templateQuery, creature_templateRow> {
    add(entry: mediumint, c?: creature_templateCreator): creature_templateRow;
}
/**
 * Table singleton (Object used by 'SQL' namespace)
 * - Add file comments to SQLFiles.ts
 */
export declare const SQL_creature_template: creature_templateTable;

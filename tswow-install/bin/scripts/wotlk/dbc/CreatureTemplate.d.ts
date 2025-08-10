import { DBCFloatCell, DBCIntCell, DBCKeyCell, DBCLocCell, DBCStringCell } from '../../data/dbc/DBCCell';
import { DBCFile } from '../../data/dbc/DBCFile';
import { DBCRow } from '../../data/dbc/DBCRow';
import { int } from '../../data/primitives';
import { Relation } from '../../data/query/Relations';
/**
 * Main row definition
 * - Add column comments to the commented getters below
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureTemplateRow extends DBCRow<CreatureTemplateCreator, CreatureTemplateQuery> {
    /**
     * Primary Key
     *
     * No comment (yet!)
     */
    get entry(): DBCKeyCell<this>;
    get difficulty_entry_1(): DBCIntCell<this>;
    get difficulty_entry_2(): DBCIntCell<this>;
    get difficulty_entry_3(): DBCIntCell<this>;
    get name(): DBCLocCell<this>;
    get subname(): DBCLocCell<this>;
    get IconName(): DBCStringCell<this>;
    get gossip_menu_id(): DBCIntCell<this>;
    get minlevel(): DBCIntCell<this>;
    get maxlevel(): DBCIntCell<this>;
    get exp(): DBCIntCell<this>;
    get faction(): DBCIntCell<this>;
    get npcflag(): DBCIntCell<this>;
    get speed_walk(): DBCFloatCell<this>;
    get speed_run(): DBCFloatCell<this>;
    get scale(): DBCIntCell<this>;
    get rank(): DBCIntCell<this>;
    get dmgschool(): DBCIntCell<this>;
    get BaseAttackTime(): DBCIntCell<this>;
    get RangeAttackTime(): DBCIntCell<this>;
    get BaseVariance(): DBCFloatCell<this>;
    get RangeVariance(): DBCFloatCell<this>;
    get unit_class(): DBCIntCell<this>;
    get unit_flags(): DBCIntCell<this>;
    get unit_flags2(): DBCIntCell<this>;
    get dynamicflags(): DBCIntCell<this>;
    get family(): DBCIntCell<this>;
    get type(): DBCIntCell<this>;
    get type_flags(): DBCIntCell<this>;
    get lootid(): DBCIntCell<this>;
    get pickpocketloot(): DBCIntCell<this>;
    get skinloot(): DBCIntCell<this>;
    get PetSpellDataId(): DBCIntCell<this>;
    get VehicleId(): DBCIntCell<this>;
    get mingold(): DBCIntCell<this>;
    get maxgold(): DBCIntCell<this>;
    get AIName(): DBCStringCell<this>;
    get MovementType(): DBCIntCell<this>;
    get HoverHeight(): DBCFloatCell<this>;
    get HealthModifier(): DBCFloatCell<this>;
    get ManaModifier(): DBCFloatCell<this>;
    get ArmorModifier(): DBCFloatCell<this>;
    get DamageModifier(): DBCFloatCell<this>;
    get ExperienceModifier(): DBCFloatCell<this>;
    get RacialLeader(): DBCIntCell<this>;
    get movementId(): DBCIntCell<this>;
    get RegenHealth(): DBCIntCell<this>;
    get mechanic_immune_mask(): DBCIntCell<this>;
    get spell_school_immune_mask(): DBCIntCell<this>;
    get flags_extra(): DBCIntCell<this>;
    get ScriptName(): DBCStringCell<this>;
    /**
     * Creates a clone of this row with new primary keys.
     *
     * Cloned rows are automatically added at the end of the DBC file.
     */
    clone(ID: int, c?: CreatureTemplateCreator): this;
}
/**
 * Used for object creation (Don't comment these)
 */
export type CreatureTemplateCreator = {};
/**
 * Used for queries (Don't comment these)
 */
export type CreatureTemplateQuery = {
    entry?: Relation<int>;
};
/**
 * Table definition (specifies arguments to 'add' function)
 * - Add file comments to DBCFiles.ts
 */
export declare class CreatureTemplateDBCFile extends DBCFile<CreatureTemplateRow, CreatureTemplateQuery, CreatureTemplateRow> {
    constructor();
    /** Loads a new CreatureTemplate.dbc from a file. */
    static read(path: string): CreatureTemplateDBCFile;
    add(entry: int, c?: CreatureTemplateCreator): CreatureTemplateRow;
    findById(id: number): CreatureTemplateRow;
}

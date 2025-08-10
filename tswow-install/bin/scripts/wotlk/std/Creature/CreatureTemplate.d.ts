import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_templateRow } from "../../sql/creature_template";
import { creature_template_addonRow } from "../../sql/creature_template_addon";
import { LootSetPointer } from "../Loot/Loot";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntityID } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { SchoolMask } from "../Misc/School";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { RefStatic } from "../Refs/Ref";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { VehicleTemplateAccessories } from "../Vehicle/VehicleAccessory";
import { VendorItems } from "../Vendor/Vendor";
import { CreatureAI } from "./CreatureAI";
import { CreatureAttackTime } from "./CreatureAttackTime";
import { CreatureDamageSchool } from "./CreatureDamageSchool";
import { CreatureDefaultTrainer } from "./CreatureDefaultTrainer";
import { CreatureEquipment } from "./CreatureEquipment";
import { CreatureFamily } from "./CreatureFamily";
import { CreatureFlagsExtra } from "./CreatureFlagsExtra";
import { CreatureGold } from "./CreatureGold";
import { CreatureIconNames } from "./CreatureIconNames";
import { CreatureInstance } from "./CreatureInstance";
import { CreatureLevel } from "./CreatureLevel";
import { CreatureName, CreatureSubname } from "./CreatureLoc";
import { MechanicImmunity } from "./CreatureMechanicImmunity";
import { CreatureModels } from "./CreatureModels";
import { CreatureMovementSpeed } from "./CreatureMovementSpeed";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreatureQuestgiver } from "./CreatureQuestGiver";
import { CreatureRank } from "./CreatureRank";
import { CreatureResistances } from "./CreatureResistances";
import { CreatureStats } from "./CreatureStats";
import { CreatureType } from "./CreatureType";
import { CreatureTypeFlags } from "./CreatureTypeFlags";
import { DynFlags } from "./DynFlags";
import { NPCFlags } from "./NPCFlags";
import { UnitClass } from "./UnitClass";
import { UnitFlags } from "./UnitFlags";
export declare class CreatureDifficultyRef extends RefStatic<CreatureTemplate, CreatureTemplate> {
    constructor(owner: CreatureTemplate, cell: Cell<number, any>);
    getRefCopyRoot(mod: string, id: string): CreatureTemplate;
    modRefCopyRoot(mod: string, id: string, callback: (template: CreatureTemplate) => void): CreatureTemplate;
}
export declare class CreatureDifficulties extends CellSystem<CreatureTemplate> {
    get Heroic5Man(): CreatureDifficultyRef;
    get Normal25man(): CreatureDifficultyRef;
    get Heroic10Man(): CreatureDifficultyRef;
    get Heroic25Man(): CreatureDifficultyRef;
}
export interface CreatureInstancePosition extends Position {
    spawnTime?: number;
    wander?: number;
}
export declare class CreatureTemplateInstances extends MultiRowSystem<CreatureInstance, CreatureTemplate> {
    protected getAllRows(): CreatureInstance[];
    protected isDeleted(value: CreatureInstance): boolean;
    add(mod: string, id: string, pos: CreatureInstancePosition | CreatureInstancePosition[], callback?: (spawn: CreatureInstance) => void): CreatureTemplate;
    addGet(mod: string, id: string, pos: CreatureInstancePosition | CreatureInstancePosition[], callback?: (spawn: CreatureInstance) => void): CreatureInstance[];
    addMod(mod: string, id: string, pos: Position | Position[], callback: (spawn: CreatureInstance) => void): CreatureTemplate;
}
export declare class CreatureTemplateAddon extends MaybeSQLEntity<CreatureTemplate, creature_template_addonRow> {
    protected createSQL(): creature_template_addonRow;
    protected findSQL(): creature_template_addonRow;
    protected isValidSQL(sql: creature_template_addonRow): boolean;
    get Auras(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, string, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get StandState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get AnimTier(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get VisFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get SheathState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get PvPFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Emote(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Mount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Path(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get VisibilityDistanceType(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
}
export declare class CreatureTemplateAddonRow extends CellSystem<CreatureTemplate> {
    protected readonly Addon: CreatureTemplateAddon;
    get(): creature_template_addonRow;
    mod(callback: (row: creature_template_addonRow) => void): void;
    exists(): boolean;
    static addon(template: CreatureTemplate): CreatureTemplateAddon;
}
export declare class CreatureTemplate extends MainEntityID<creature_templateRow> {
    get ID(): number;
    get Name(): CreatureName<this>;
    get Subname(): CreatureSubname<this>;
    get Scripts(): AttachedScript<this>;
    protected get Addon(): CreatureTemplateAddon;
    readonly AddonRow: CreatureTemplateAddonRow;
    get Auras(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, string, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Emote(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Mount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get Path(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get StandState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get AnimTier(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get VisFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get SheathState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get PvPFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    get VisibilityDistanceType(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureTemplate, number, creature_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureTemplate, creature_template_addonRow>>;
    /**
     * What expansion the creatures health is taken from, values are from 0-2
     */
    get HealthExpansion(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * ID of the Faction template this creature belongs to
     */
    get FactionTemplate(): import("../Refs/Ref").RefNoCreateTT<this, import("../Faction/FactionTemplates").FactionTemplate, typeof import("../Faction/FactionTemplates").FactionTemplateValues>;
    get InlineScripts(): _hidden.Creature<this>;
    /**
     * - 0 = does not regenerate health
     * - 1 = regenerates health
     */
    get RegenHealth(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Questgiver(): CreatureQuestgiver;
    get NPCFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof NPCFlags>;
    get Type(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureType>;
    get TypeFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureTypeFlags>;
    get DynFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof DynFlags>;
    get UnitFlags(): UnitFlags;
    get FlagsExtra(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CreatureFlagsExtra>;
    get UnitClass(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof UnitClass>;
    get DynamicFlags(): RefStatic<this, CreatureTemplate>;
    get Difficulty(): CreatureDifficulties;
    get Models(): CreatureModels<this>;
    get Icon(): CreatureIconNames;
    get Gossip(): import("../Gossip/Gossips").GossipRef<this>;
    get Level(): CreatureLevel;
    get MovementSpeed(): CreatureMovementSpeed;
    get Scale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Rank(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureRank>;
    get DamageSchool(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureDamageSchool>;
    get AttackTime(): CreatureAttackTime;
    get Family(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureFamily>;
    get PetSpells(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Vehicle(): import("../Refs/Ref").RefDynamic<this, import("../Vehicle/Vehicle").Vehicle>;
    get Gold(): CreatureGold;
    get AIName(): CreatureAI;
    get MovementType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureMovementType>;
    get HoverHeight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Stats(): CreatureStats;
    get RacialLeader(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Movement(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MechanicImmunity(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof MechanicImmunity>;
    get SchoolImmunity(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SchoolMask>;
    get Trainer(): CreatureDefaultTrainer;
    get Vendor(): VendorItems<this>;
    get Texts(): import("../BroadcastText/CreatureText").CreatureTexts;
    get Resistances(): CreatureResistances;
    /**
     * @note This can be overridden by creature outfits
     */
    get Weapons(): CreatureEquipment;
    get NormalLoot(): LootSetPointer<this>;
    get PickpocketLoot(): LootSetPointer<this>;
    get SkinningLoot(): LootSetPointer<this>;
    get VehicleAccessories(): VehicleTemplateAccessories;
    get Spawns(): CreatureTemplateInstances;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
        all_locs?: boolean;
        name?: string;
    }): string;
}

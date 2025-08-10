import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { creatureRow } from "../../sql/creature";
import { creature_addonRow } from "../../sql/creature_addon";
import { instance_boss_creatureRow } from "../../sql/instance_boss_creature";
import { CreatureGameEventsForward, GameEventModelEquipForward, GameEventNPCFlagForward, GameEventNPCVendorCreature } from "../GameEvent/GameEventRelations";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { SpawnMask } from "../Misc/SpawnMask";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { VehicleInstanceAccessories } from "../Vehicle/VehicleAccessory";
import { CreatureMovementType } from "./CreatureMovementType";
import { CreaturePatrolPath } from "./CreaturePatrolPath";
export declare class CreatureInstanceAddon extends MaybeSQLEntity<CreatureInstance, creature_addonRow> {
    protected createSQL(): creature_addonRow;
    protected findSQL(): creature_addonRow;
    protected isValidSQL(sql: creature_addonRow): boolean;
    get Auras(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, string, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get StandState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get AnimTier(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get VisFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get SheathState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get PvPFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Path(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Emote(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Mount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get VisibilityDistanceType(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
}
export declare class CreatureInstanceBoss extends MaybeSQLEntity<CreatureInstance, instance_boss_creatureRow> {
    protected createSQL(): instance_boss_creatureRow;
    protected findSQL(): instance_boss_creatureRow;
    protected isValidSQL(sql: instance_boss_creatureRow): boolean;
    get Boss(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, instance_boss_creatureRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, instance_boss_creatureRow>>;
    set(boss: number): void;
    get(): number;
}
export declare class CreatureInstanceAddonRow extends CellSystem<CreatureInstance> {
    protected readonly Addon: CreatureInstanceAddon;
    exists(): boolean;
    get(): creature_addonRow;
    mod(callback: (row: creature_addonRow) => void): CreatureInstance;
    static addon(inst: CreatureInstance): CreatureInstanceAddon;
}
export declare class CreatureInstance extends MainEntity<creatureRow> {
    protected get Addon(): CreatureInstanceAddon;
    readonly AddonRow: CreatureInstanceAddonRow;
    get Auras(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, string, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Path(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get StandState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get AnimTier(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get VisFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get SheathState(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get PvPFlags(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Emote(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get Mount(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get VisibilityDistanceType(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, creature_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, creature_addonRow>>;
    get EncounterSpawn(): import("../SpawnGroup/ImplicitBossGroup").ImplicitBossStateEntity<CreatureInstance>;
    get ID(): number;
    get Template(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpawnMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpawnMask>;
    get PhaseMask(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /** If 0, use a random model from CreatureTemplate#Models */
    get Model(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Position(): PositionMapXYZOCell<this>;
    /** Respawn time in seconds */
    get SpawnTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WanderDistance(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MovementType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof CreatureMovementType>;
    get PatrolPath(): CreaturePatrolPath;
    get VehicleAccessories(): VehicleInstanceAccessories;
    /**
     * The game events where this creature will be spawned.
     * If empty, the creature is always spawned
     */
    get GameEvents(): CreatureGameEventsForward;
    /**
     * Special flags this creature will gain during different
     * game events.
     */
    get GameEventFlags(): GameEventNPCFlagForward;
    /**
     * Special equips this creature can have during ONE event.
     *
     * @note it is **not** possible to define different equips for
     * **multiple** game_events.
     */
    get GameEventEquips(): GameEventModelEquipForward;
    /**
     * Special items this creature will sell during one event.
     *
     * @note it is **not** possible to define a single
     *       creature/item pair for **multiple** game_events.
     */
    get GameEventVendor(): GameEventNPCVendorCreature;
    /**
     * The boss id of this creature in the instance it belongs to
     */
    get Boss(): CreatureInstanceBoss;
    /**
     * The Equipment from `creature_equip_template` the instance should use.
     */
    get EquipmentID(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}

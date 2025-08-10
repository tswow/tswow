import { MaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { gameobjectRow } from "../../sql/gameobject";
import { gameobject_addonRow } from "../../sql/gameobject_addon";
import { GameObjectGameEventsForward } from "../GameEvent/GameEventRelations";
import { MainEntityID } from "../Misc/Entity";
import { PositionMapXYZOCell, QuaternionCell } from "../Misc/PositionCell";
import { SpawnMask } from "../Misc/SpawnMask";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
export declare enum InvisibilityTypes {
    GENERAL = 0,
    TRAP = 3,
    DRUNK = 6
}
export declare class GameObjectInstanceAddon extends MaybeSQLEntity<GameObjectInstance, gameobject_addonRow> {
    protected createSQL(): gameobject_addonRow;
    protected findSQL(): gameobject_addonRow;
    protected isValidSQL(sql: gameobject_addonRow): boolean;
    get Invisibility(): {
        Type: import("../../../data/cell/cells/MaskCell").MaskCellWrite<GameObjectInstance, typeof InvisibilityTypes>;
        Value: import("../Misc/SQLDBCEntity").MaybeSQLCell<GameObjectInstance, number, gameobject_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<GameObjectInstance, gameobject_addonRow>>;
        set(type: InvisibilityTypes, value: number): GameObjectInstance;
    };
    /** TODO: order */
    get ParentRotation(): QuaternionCell<GameObjectInstance>;
}
export declare class GameObjectAddonRow extends CellSystem<GameObjectInstance> {
    protected readonly Addon: GameObjectInstanceAddon;
    get(): gameobject_addonRow;
    mod(callback: (row: gameobject_addonRow) => void): void;
    exists(): boolean;
    static addon(template: GameObjectInstance): GameObjectInstanceAddon;
}
export declare class GameObjectInstance extends MainEntityID<gameobjectRow> {
    get ID(): number;
    get Position(): PositionMapXYZOCell<this>;
    get Rotation(): QuaternionCell<this>;
    get Zone(): import("../Refs/Ref").RefNoCreate<this, import("../Area/Area").Area>;
    get Area(): import("../Refs/Ref").RefNoCreate<this, import("../Area/Area").Area>;
    get SpawnMask(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpawnMask>;
    get PhaseMask(): MaskCell32<this>;
    get SpawnTimeSecs(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get State(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EncounterSpawn(): import("../SpawnGroup/ImplicitBossGroup").ImplicitBossStateEntity<GameObjectInstance>;
    get ScriptName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get GameEvents(): GameObjectGameEventsForward;
    get Template(): import("../Refs/Ref").RefStatic<this, import("./GameObjectTemplate").GameObjectPlain>;
    protected get Addon(): GameObjectInstanceAddon;
    readonly AddonRow: GameObjectAddonRow;
    get Invisibility(): {
        Type: import("../../../data/cell/cells/MaskCell").MaskCellWrite<GameObjectInstance, typeof InvisibilityTypes>;
        Value: import("../Misc/SQLDBCEntity").MaybeSQLCell<GameObjectInstance, number, gameobject_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<GameObjectInstance, gameobject_addonRow>>;
        set(type: InvisibilityTypes, value: number): GameObjectInstance;
    };
    get ParentRotation(): QuaternionCell<GameObjectInstance>;
}

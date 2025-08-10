import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { gameobject_templateRow } from "../../sql/gameobject_template";
import { gameobject_template_addonRow } from "../../sql/gameobject_template_addon";
import { AttachedScript } from "../SmartScript/AttachedScript";
import { LootSetPointer } from "../Loot/Loot";
import { Codegen, CodegenSettings } from "../Misc/Codegen";
import { TransformedEntityID } from "../Misc/Entity";
import { Position } from "../Misc/Position";
import { RefUnknown } from "../Refs/Ref";
import { BattlegroundDoorObjects } from "./BattlegroundDoorObject";
import { ElevatorKeyframes } from "./ElevatorKeyframes";
import { GameObjectInstance } from "./GameObjectInstance";
import { GameObjectName } from "./GameObjectName";
import { GameObjectTemplateAddon } from "./GameObjectTemplateAddon";
import { InstanceDoorObjects } from "./InstanceDoorObject";
import { GameObjectAI } from "./GameObjectAI";
export declare class GameObjectTemplateInstances<T extends GameObjectTemplate> extends MultiRowSystem<GameObjectInstance, T> {
    protected getAllRows(): GameObjectInstance[];
    protected isDeleted(value: GameObjectInstance): boolean;
    addGet(mod: string, id: string, pos: Position | Position[], callback?: (go: GameObjectInstance) => void): GameObjectInstance[];
    addMod(mod: string, id: string, pos: Position | Position[], callback: (go: GameObjectInstance) => void): T;
    add(mod: string, id: string, pos: Position | Position[], spawnTime?: number, spawnMask?: number): T;
}
export declare class GameObjectTemplateAddonRow<T extends GameObjectTemplate> extends CellSystem<T> {
    protected readonly Addon: GameObjectTemplateAddon<T>;
    get(): gameobject_template_addonRow;
    mod(callback: (row: gameobject_template_addonRow) => void): void;
    exists(): boolean;
    static addon<T extends GameObjectTemplate>(template: T): GameObjectTemplateAddon<T>;
}
export declare class GameObjectTemplate extends TransformedEntityID<gameobject_templateRow, GameObjectPlain> {
    protected transformer(): GameObjectType;
    protected default(): GameObjectPlain;
    protected get Addon(): GameObjectTemplateAddon<this>;
    readonly AddonRow: GameObjectTemplateAddonRow<this>;
    get ArtKits(): import("./GameObjectTemplateAddon").ArtKits<this>;
    get Faction(): import("../Misc/SQLDBCEntity").MaybeSQLCell<this, number, gameobject_template_addonRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<this, gameobject_template_addonRow>>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof import("./GameObjectFlags").GameObjectFlags>;
    get Gold(): import("../Misc/LimitCells").MinMaxCell<this>;
    get AIName(): GameObjectAI;
    get Type(): GameObjectType;
    get ID(): number;
    get Name(): GameObjectName<this>;
    get Icon(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get CastBarCaption(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Size(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Display(): import("./GameObjects").GameObjectDisplayRef<this>;
    get Scripts(): AttachedScript<this>;
    get Spawns(): GameObjectTemplateInstances<this>;
    get InlineScripts(): _hidden.GameObject<this>;
    protected codifyBase(mod: string, id: string, settings: CodegenSettings, code: Codegen & {
        all_locs?: boolean;
    }): void;
}
export declare class GameObjectPlain extends GameObjectTemplate {
    get Data0(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data3(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data4(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data5(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data6(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data7(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data8(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data9(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data10(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data11(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data12(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data13(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data14(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data15(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data16(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data17(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data18(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data19(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data20(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data21(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data22(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Data23(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectAreaDamage extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamageMin(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamageMax(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamageSchool(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AutoCloseTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get Closetext(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectAuraGenerator extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get StartOpen(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AuraID1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition1(): RefUnknown<this>;
    get AuraID2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition2(): RefUnknown<this>;
    get ServerOnly(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectBarberChair extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get ChairHeight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get HeightOffset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectButton extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    /**
     * Whether this button starts pressed
     */
    get StartsActive(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * The lock used to press this button
     */
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get AutoClose(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * A linked spawned gameobject of type 6
     */
    get LinkedTrap(): import("../Refs/Ref").RefStatic<this, GameObjectTrap>;
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get IsLarge(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * Text displayed when the button is pressed
     */
    get ActivateText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    /**
     * Text displayed when the button is unpressed
     */
    get DeactivateText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    /**
     * TODO: ??
     */
    get LineOfSightOK(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectCamera extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Cinematic(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Event(): RefUnknown<this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectCapturePoint extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldState1(): import("../Refs/Ref").RefStatic<this, import("../WorldState/WorldState").WorldState>;
    get WorldState2(): import("../Refs/Ref").RefStatic<this, import("../WorldState/WorldState").WorldState>;
    get WinEvent1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WinEvent2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ContestedEvent1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ContestedEvent2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ProgressEvent1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ProgressEvent2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NeutralEvent1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NeutralEvent2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NeutralPercent(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldState3(): import("../Refs/Ref").RefStatic<this, import("../WorldState/WorldState").WorldState>;
    get MinSuperiority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxSuperiority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MinTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Highlight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartingValue(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Unidirectional(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectChair extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Slots(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Height(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OnlyCreatorUse(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TriggeredEvent(): RefUnknown<this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectChest extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Loot(): LootSetPointer<this>;
    /**
     * Restock time in seconds
     */
    get RestockTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get IsConsumable(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MinRestock(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxRestock(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * EventID from event_scripts
     */
    get LootedEvent(): RefUnknown<this>;
    get LinkedTrap(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Quest(): import("../Refs/Ref").RefStatic<this, import("../Quest/Quest").Quest>;
    get Level(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LosOK(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LeaveLoot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NotInCombat(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LogLoot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get UseGroupLoot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Tooltip(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectDestructibleBuilding extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get InteractNumHits(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CreditProxyCreature(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get IntactEvent(): RefUnknown<this>;
    get Empty2(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamageNumHits(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty3(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty4(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty5(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamagedEvent(): RefUnknown<this>;
    get Empty6(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty7(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty8(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty9(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DestroyedEvent(): RefUnknown<this>;
    get Empty10(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RebuildingTimeSecs(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty11(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DestructibleData(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RebuildingEvent(): RefUnknown<this>;
    get Empty12(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Empty13(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DamageEvent(): RefUnknown<this>;
    get Empty14(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectDoor extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    /**
     * Whether or not the door starts open (0=closed, 1=open)
     */
    get StartOpen(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * Lock ID to DBC.Lock that opens this door
     */
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    /**
     * After how many milliseconds the door autocloses
     */
    get AutoClose(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     *
     */
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * Text displayed when the door is opened
     */
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    /**
     * Text displayed when the door is closed
     */
    get CloseText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    /**
     * Whether pathfinding should ignore this door
     */
    get IgnoredByPathfinding(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get BossStates(): InstanceDoorObjects;
    get BattlegroundStates(): BattlegroundDoorObjects;
    get Condition1(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectDungeonDifficulty extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get Difficulty(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectFishingHole extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    /**
     * How close bobber must be
     */
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Loot(): LootSetPointer<this>;
    get MinSuccessOpens(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxSuccessOpens(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /**
     * Possibly 1628 for all fishing holes.
     */
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectFlagDrop extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Event(): RefUnknown<this>;
    get PickupSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectFlagStand extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get PickupSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ReturnAura(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ReturnSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get LineOfSightOK(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectGeneric extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Tooltip(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Highlight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ServerOnly(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FloatOnWater(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Quest(): import("../Refs/Ref").RefStatic<this, import("../Quest/Quest").Quest>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare enum SpellFlags {
    USER_CAST = 1,
    TARGET_GOBJ = 2,
    TRIGGERED = 4
}
export declare class GameObjectGoober extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Quest(): import("../Refs/Ref").RefStatic<this, import("../Quest/Quest").Quest>;
    get Event(): RefUnknown<this>;
    get AutoCloseTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CustomAnim(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Consumable(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Cooldown(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Page(): import("../PageText/PageText").PageTextRef<this>;
    get Language(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PageMaterial(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LinkedTrap(): import("../Refs/Ref").RefStatic<this, GameObjectTrap>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get CloseText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get LineOfSightOK(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AllowMounted(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FloatingTooltip(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Gossip(): import("../Gossip/Gossips").GossipRef<this>;
    get WorldStateSetsState(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FloatOnWater(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    get SpellFlags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SpellFlags>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectGuardPost extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    /** Assume this is a template, but it's not used in tc */
    get CreatureTemplateUnused(): RefUnknown<this>;
    get Charges(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectGuildBank extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectMailbox extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectMeetingStone extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get MinLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Area(): import("../Refs/Ref").RefNoCreate<this, import("../Area/Area").Area>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectMinigame extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get GameType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectShip extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get TaxiPath(): import("../Refs/Ref").RefNoCreate<this, import("../Taxi/Taxi").TaxiPath>;
    get MoveSpeed(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AccelRate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartEvent(): RefUnknown<this>;
    get StopEvent(): RefUnknown<this>;
    get TransportPhysics(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpawnGroup(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldState1(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CanBeStopped(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectQuestGiver extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get QuestList(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PageMaterial(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Gossip(): import("../Gossip/Gossips").GossipRef<this>;
    get CustomAnim(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NoDamageImmune(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get IsLOSOk(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get AllowMounted(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get IsLarge(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectSpellCaster extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get Charges(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PartyOnly(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AllowMounted(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectSpellFocus extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Focus(): import("../Refs/Ref").RefDynamic<this, import("../SpellFocus/SpellFocus").SpellFocus>;
    get Distance(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LinkedTrap(): import("../Refs/Ref").RefStatic<this, GameObjectTrap>;
    get ServerOnly(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Quest(): import("../Refs/Ref").RefStatic<this, import("../Quest/Quest").Quest>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FloatingTooltip(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FloatOnWater(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectSummoningRitual extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get RequiredParticipants(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get AnimSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RitualPersistent(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CasterTargetSpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CasterTargetSpellTargets(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CasterGrouped(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RitualNoTargetCheck(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectText extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Page(): import("../PageText/PageText").PageTextRef<this>;
    get Language(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get PageMaterial(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AllowMounted(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectElevator extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Pause(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartOpen(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AutoCloseTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Pause1Event(): RefUnknown<this>;
    get Pause2Event(): RefUnknown<this>;
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Keyframes(): ElevatorKeyframes;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectTrap extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get Lock(): import("../Refs/Ref").RefStatic<this, import("../Locks/Lock").Lock>;
    get Level(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Diameter(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Spell(): import("../Refs/Ref").RefStatic<this, import("../Spell/Spell").Spell>;
    get TrapType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Cooldown(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AutoCloseTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ServerOnly(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Stealthed(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Large(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Invisible(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OpenText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get CloseText(): import("../BroadcastText/BroadcastText").BroadcastTextRef<this>;
    get IgnoreTotems(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Condition(): RefUnknown<this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectTrapdoor extends GameObjectTemplate {
    constructor(row: gameobject_templateRow);
    get WhenToPause(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartOpen(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AutoClose(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
}
export declare class GameObjectType extends EnumCellTransform<GameObjectTemplate> {
    get DOOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectDoor>;
    get BUTTON(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectButton>;
    get QUESTGIVER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectQuestGiver>;
    get CHEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectChest>;
    get BINDER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get GENERIC(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get TRAP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTrap>;
    get CHAIR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectChair>;
    get SPELL_FOCUS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectSpellFocus>;
    get TEXT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectText>;
    get GOOBER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectGoober>;
    get ELEVATOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectElevator>;
    get AREA_DAMAGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectAreaDamage>;
    get CAMERA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectCamera>;
    get MAP_OBJECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get SHIP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectShip>;
    get DUEL_ARBITER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get FISHINGNODE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get RITUAL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectSummoningRitual>;
    get MAILBOX(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectMailbox>;
    get AUCTIONHOUSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get GUARD_POST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectGuardPost>;
    get SPELL_CASTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectSpellCaster>;
    get MEETING_STONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectMeetingStone>;
    get FLAG_STAND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectFlagStand>;
    get FISHING_HOLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectFishingHole>;
    get FLAG_DROP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectFlagDrop>;
    get MINIGAME(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectMinigame>;
    get LOTTERY_KIOSK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTemplate>;
    get CAPTURE_POINT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectCapturePoint>;
    get AURA_GENERATOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectAuraGenerator>;
    get DUNGEON_DIFFICULTY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectDungeonDifficulty>;
    get BARBER_CHAIR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectBarberChair>;
    get DESTRUCTIBLE_BUILDING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectDestructibleBuilding>;
    get GUILD_BANK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectGuildBank>;
    get TRAPDOOR(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<GameObjectTemplate, GameObjectTrapdoor>;
}

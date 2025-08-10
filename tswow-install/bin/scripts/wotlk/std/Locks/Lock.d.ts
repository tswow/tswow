import { EnumCellTransform, EnumValueTransform, TransformedClass } from "../../../data/cell/cells/EnumCell";
import { ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { LockRow } from "../../dbc/Lock";
import { GameObjectAreaDamage, GameObjectButton, GameObjectCamera, GameObjectChest, GameObjectDoor, GameObjectFishingHole, GameObjectFlagDrop, GameObjectFlagStand, GameObjectGoober, GameObjectQuestGiver, GameObjectTemplate, GameObjectTrap, GameObjectType } from "../GameObject/GameObjectTemplate";
import { MainEntity } from "../Misc/Entity";
export declare class LockIndexBase extends TransformedClass<LockIndexPlain> {
    protected container: Lock;
    readonly index: number;
    constructor(container: Lock, index: number);
    get Type(): LockIndexType;
    get Action(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    protected transformer(): EnumCellTransform<any>;
    protected default(): LockIndexPlain;
    clear(): this;
    isClear(): boolean;
    static container(index: LockIndexBase): Lock;
}
export declare class LockIndexPlain extends LockIndexBase {
    get Properties(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get RequiredSkill(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class LockIndexLockType extends LockIndexBase {
    get LockType(): import("../Refs/Ref").RefDynamic<this, import("./LockType").LockType>;
    get RequiredSkill(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
}
export declare class LockIndexItem extends LockIndexBase {
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
}
export declare class LockIndexType extends EnumCellTransform<LockIndexBase> {
    protected get container(): Lock;
    get ITEM(): EnumValueTransform<LockIndexBase, LockIndexItem>;
    get LOCK_TYPE(): EnumValueTransform<LockIndexBase, LockIndexLockType>;
}
type QueryKey = 'Data0' | 'Data1' | 'Data2' | 'Data3' | 'Data4' | 'Data5' | 'Data6' | 'Data7' | 'Data8' | 'Data9' | 'Data10' | 'Data11' | 'Data12' | 'Data13' | 'Data14' | 'Data15' | 'Data16' | 'Data17' | 'Data18' | 'Data19' | 'Data20';
export declare abstract class LockGameObject<T extends GameObjectTemplate> extends MultiRowSystem<T, Lock> {
    protected isDeleted(value: T): boolean;
    protected getAllRows(): T[];
    protected abstract values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, T>];
}
export declare class LockChests extends LockGameObject<GameObjectChest> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectChest>];
}
export declare class LockAreaDamages extends LockGameObject<GameObjectAreaDamage> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectAreaDamage>];
}
export declare class LockButtons extends LockGameObject<GameObjectButton> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectButton>];
}
export declare class LockCameras extends LockGameObject<GameObjectCamera> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectCamera>];
}
export declare class LockDoors extends LockGameObject<GameObjectDoor> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectDoor>];
}
export declare class LockFishingHoles extends LockGameObject<GameObjectFishingHole> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFishingHole>];
}
export declare class LockFlagDrops extends LockGameObject<GameObjectFlagDrop> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagDrop>];
}
export declare class LockFlagStands extends LockGameObject<GameObjectFlagStand> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagStand>];
}
export declare class LockGoobers extends LockGameObject<GameObjectGoober> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectGoober>];
}
export declare class LockQuestGivers extends LockGameObject<GameObjectQuestGiver> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectQuestGiver>];
}
export declare class LockTraps extends LockGameObject<GameObjectTrap> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectTrap>];
}
export declare class LockReferences extends CellSystem<Lock> {
    get Chests(): LockChests;
    get AreaDamages(): LockAreaDamages;
    get Buttons(): LockButtons;
    get Cameras(): LockCameras;
    get Doors(): LockDoors;
    get FishingHoles(): LockFishingHoles;
    get FlagDrops(): LockFlagDrops;
    get FlagStands(): LockFlagStands;
    get Goobers(): LockGoobers;
    get QuestGivers(): LockQuestGivers;
    get Traps(): LockTraps;
}
export declare class LockRequirements extends ArraySystem<LockIndexBase, Lock> {
    addEmpty(): this;
    addItem(item: number, action?: number): Lock;
    /**
     * Adds a LockType ref requirement to this Lock
     * @param lockType ID of the referenced lock type
     * @param reqSkill Skill point requirement (if lockType is a skill).
     *                 Default = 0
     */
    addLockType(lockType: number, reqSkill?: number, action?: number): Lock;
    get(index: number): LockIndexPlain;
    requiresType(lockType: number): LockIndexBase;
    requiresItem(item: number): boolean;
    get length(): number;
}
export declare class Lock extends MainEntity<LockRow> {
    get ID(): number;
    get Requirements(): LockRequirements;
    get References(): LockReferences;
}
export {};

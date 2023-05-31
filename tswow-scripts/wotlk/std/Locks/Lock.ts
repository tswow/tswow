import { EnumCellTransform, EnumValueTransform, TransformedClass } from "../../../data/cell/cells/EnumCell";
import { Transient } from "../../../data/cell/serialization/Transient";
import { ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { LockRow } from "../../dbc/Lock";
import { gameobject_templateQuery } from "../../sql/gameobject_template";
import { GORegistry } from "../GameObject/GameObjectRegistries";
import { GameObjectAreaDamage, GameObjectButton, GameObjectCamera, GameObjectChest, GameObjectDoor, GameObjectFishingHole, GameObjectFlagDrop, GameObjectFlagStand, GameObjectGoober, GameObjectQuestGiver, GameObjectTemplate, GameObjectTrap, GameObjectType } from "../GameObject/GameObjectTemplate";
import { GAMEOBJECT_TYPE_AREADAMAGE, GAMEOBJECT_TYPE_BUTTON, GAMEOBJECT_TYPE_CAMERA, GAMEOBJECT_TYPE_CHEST, GAMEOBJECT_TYPE_DOOR, GAMEOBJECT_TYPE_FISHINGHOLE, GAMEOBJECT_TYPE_FLAGDROP, GAMEOBJECT_TYPE_FLAGSTAND, GAMEOBJECT_TYPE_GOOBER, GAMEOBJECT_TYPE_QUESTGIVER, GAMEOBJECT_TYPE_TRAP } from "../GameObject/GameObjectTypes";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { LockTypeRegistry } from "./Locks";

export class LockIndexBase extends TransformedClass<LockIndexPlain> {
    @Transient
    protected container: Lock;
    readonly index: number;

    constructor(container: Lock, index: number) {
        super();
        this.container = container;
        this.index = index;
    }

    get Type() {
        return new LockIndexType(
            this
          , this.wrapIndex(this.container.row.Type,this.index)
      )
    }

    get Action() {
        return this.wrapIndex(this.container.row.Action, this.index)
    }

    protected transformer(): EnumCellTransform<any> {
        return this.Type;
    }

    protected default(): LockIndexPlain {
        return new LockIndexPlain(this.container, this.index);
    }

    clear(): this {
        this.container.row
            .Type.setIndex(this.index,0)
            .Skill.setIndex(this.index,0)
            .Index.setIndex(this.index,0)
            .Action.setIndex(this.index,0)
        return this;
    }

    isClear(): boolean {
        return this.container.row.Type.getIndex(this.index) === 0
    }

    static container(index: LockIndexBase) {
        return index.container;
    }
}

export class LockIndexPlain extends LockIndexBase {
    get Properties() {
        return this.wrapIndex(this.container.row.Index,this.index);
    }
    get RequiredSkill() {
        return this.wrapIndex(this.container.row.Skill, this.index);
    }
}

export class LockIndexLockType extends LockIndexBase {
    get LockType() {
        return LockTypeRegistry.ref(
              this
            , this.wrapIndex(this.container.row.Index,this.index)
        )
    }

    get RequiredSkill() {
        return this.wrapIndex(this.container.row.Skill, this.index);
    }
}

export class LockIndexItem extends LockIndexBase {
    get Item() {
        return ItemTemplateRegistry.ref(
              this
            , this.wrapIndex(this.container.row.Index, this.index)
        )
    }
}

export class LockIndexType extends EnumCellTransform<LockIndexBase> {
    protected get container() {
        return LockIndexBase.container(this.owner);
    }

    get ITEM() {
        return this.value(
              1
            , t=>new LockIndexItem(this.container,t.index)
        )
    }

    get LOCK_TYPE() {
        return this.value(
              2
            , t=>new LockIndexLockType(this.container,t.index)
        )
    }

}

type QueryKey =
      'Data0'
    | 'Data1'
    | 'Data2'
    | 'Data3'
    | 'Data4'
    | 'Data5'
    | 'Data6'
    | 'Data7'
    | 'Data8'
    | 'Data9'
    | 'Data10'
    | 'Data11'
    | 'Data12'
    | 'Data13'
    | 'Data14'
    | 'Data15'
    | 'Data16'
    | 'Data17'
    | 'Data18'
    | 'Data19'
    | 'Data20'

export abstract class LockGameObject<T extends GameObjectTemplate> extends MultiRowSystem<T,Lock> {
    protected isDeleted(value: T): boolean {
        return value.row.isDeleted();
    }

    protected getAllRows() {
        let [lockIndex,type,transformer] = this.values();
        let query: gameobject_templateQuery = {type}
        query[lockIndex] = this.owner.ID
        return GORegistry.Generic
            .queryAll(query)
            .map(x=>transformer(x.Type).as())
    }

    protected abstract values(): [QueryKey,number,(gobj: GameObjectType)=>EnumValueTransform<GameObjectTemplate,T>]
}

export class LockChests extends LockGameObject<GameObjectChest> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectChest>] {
        return ['Data0',GAMEOBJECT_TYPE_CHEST,x=>x.CHEST]
    }
}

export class LockAreaDamages extends LockGameObject<GameObjectAreaDamage> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectAreaDamage>] {
        return ['Data0',GAMEOBJECT_TYPE_AREADAMAGE,x=>x.AREA_DAMAGE]
    }
}

export class LockButtons extends LockGameObject<GameObjectButton> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectButton>] {
        return ['Data1',GAMEOBJECT_TYPE_BUTTON,x=>x.BUTTON]
    }
}

export class LockCameras extends LockGameObject<GameObjectCamera> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectCamera>] {
        return ['Data0',GAMEOBJECT_TYPE_CAMERA,x=>x.CAMERA]
    }
}

export class LockDoors extends LockGameObject<GameObjectDoor> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectDoor>] {
        return ['Data0',GAMEOBJECT_TYPE_DOOR,x=>x.DOOR]
    }
}

export class LockFishingHoles extends LockGameObject<GameObjectFishingHole> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFishingHole>] {
        return ['Data4', GAMEOBJECT_TYPE_FISHINGHOLE,x=>x.FISHING_HOLE]
    }
}

export class LockFlagDrops extends LockGameObject<GameObjectFlagDrop> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagDrop>] {
        return ['Data0',GAMEOBJECT_TYPE_FLAGDROP,x=>x.FLAG_DROP]
    }
}

export class LockFlagStands extends LockGameObject<GameObjectFlagStand> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagStand>] {
        return ['Data0',GAMEOBJECT_TYPE_FLAGSTAND,x=>x.FLAG_STAND]
    }
}

export class LockGoobers extends LockGameObject<GameObjectGoober> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectGoober>] {
        return ['Data0',GAMEOBJECT_TYPE_GOOBER,x=>x.GOOBER]
    }
}

export class LockQuestGivers extends LockGameObject<GameObjectQuestGiver> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectQuestGiver>] {
        return ['Data0',GAMEOBJECT_TYPE_QUESTGIVER,x=>x.QUESTGIVER]
    }
}

export class LockTraps extends LockGameObject<GameObjectTrap> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectTrap>] {
        return ['Data0',GAMEOBJECT_TYPE_TRAP,x=>x.TRAP]
    }
}

export class LockReferences extends CellSystem<Lock> {
    get Chests() { return new LockChests(this.owner); }
    get AreaDamages() { return new LockAreaDamages(this.owner); }
    get Buttons() { return new LockButtons(this.owner); }
    get Cameras() { return new LockCameras(this.owner); }
    get Doors() { return new LockDoors(this.owner); }
    get FishingHoles() { return new LockFishingHoles(this.owner); }
    get FlagDrops() { return new LockFlagDrops(this.owner); }
    get FlagStands() { return new LockFlagStands(this.owner); }
    get Goobers() { return new LockGoobers(this.owner); }
    get QuestGivers() { return new LockQuestGivers(this.owner); }
    get Traps() { return new LockTraps(this.owner); }
}

// @ts-ignore - hack, it's valid
export class LockRequirements extends ArraySystem<LockIndexBase,Lock> {
    addEmpty() {
        const index = this.addGet().index;
        this.owner.row.Action.setIndex(index,0)
        this.owner.row.Index.setIndex(index,0)
        this.owner.row.Skill.setIndex(index,0)
        return this;
    }

    addItem(item: number, action = 1) {
        this.addGet()
            .Type.ITEM.set()
            .Item.set(item)
            .Action.set(action)
        return this.owner;
    }

    /**
     * Adds a LockType ref requirement to this Lock
     * @param lockType ID of the referenced lock type
     * @param reqSkill Skill point requirement (if lockType is a skill).
     *                 Default = 0
     */
    addLockType(lockType: number, reqSkill: number = 0, action = 1) {
        this.addGet()
            .Type.LOCK_TYPE.set()
            .LockType.set(lockType)
            .RequiredSkill.set(reqSkill)
            .Action.set(action)
        return this.owner;
    }

    get(index: number): LockIndexPlain {
        return new LockIndexPlain(this.owner, index);
    }

    requiresType(lockType: number) {
        return this.find(x=>
               x.Type.LOCK_TYPE.is()
            && x.Type.LOCK_TYPE.as().LockType.get() === lockType
        )
    }

    requiresItem(item: number) {
        return this.find(x=>
               x.Type.ITEM.is()
            && x.Type.ITEM.as().Item.get() === item
        ) !== undefined
    }

    get length(): number {
        return 8;
    }
}

export class Lock extends MainEntity<LockRow> {
    get ID() { return this.row.ID.get(); }

    get Requirements() { return new LockRequirements(this); }
    get References() { return new LockReferences(this); }
}
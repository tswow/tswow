import { EnumCellTransform, EnumValueTransform, TransformedClass } from "wotlkdata/cell/cells/EnumCell";
import { ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { LockRow } from "wotlkdata/dbc/types/Lock";
import { gameobject_templateQuery } from "wotlkdata/sql/types/gameobject_template";
import { GameObjectTemplates } from "../GameObject/GameObjects";
import { GameObjectAreaDamage, GameObjectButton, GameObjectCamera, GameObjectChest, GameObjectDoor, GameObjectFishingHole, GameObjectFlagDrop, GameObjectFlagStand, GameObjectGoober, GameObjectQuestGiver, GameObjectTemplate, GameObjectTrap, GameObjectType } from "../GameObject/GameObjectTemplate";
import { GAMEOBJECT_TYPE_AREADAMAGE, GAMEOBJECT_TYPE_BUTTON, GAMEOBJECT_TYPE_CAMERA, GAMEOBJECT_TYPE_CHEST, GAMEOBJECT_TYPE_DOOR, GAMEOBJECT_TYPE_FISHINGHOLE, GAMEOBJECT_TYPE_FLAGDROP, GAMEOBJECT_TYPE_FLAGSTAND, GAMEOBJECT_TYPE_GOOBER, GAMEOBJECT_TYPE_QUESTGIVER, GAMEOBJECT_TYPE_TRAP } from "../GameObject/GameObjectTypes";
import { ItemTemplateRef } from "../Item/ItemTemplate";
import { Ref } from "../Refs/Ref";
import { Locks } from "./Locks";
import { LockTypeRef } from "./LockType";

export class LockIndexBase extends TransformedClass<LockIndexPlain> {
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
            .Action.setIndex(this.index,0)
        return this;
    }

    isClear(): boolean {
        return this.container.row.Type.getIndex(this.index) !== 0
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
        return new LockTypeRef(
              this
            , this.wrapIndex(this.container.row.Index,this.index)
        )
    }

    get RequiredSkill() {
        return this.wrapIndex(this.container.row.Skill, this.index);
    }
}

export class LockIndexItem extends LockIndexBase {
    get ItemTemplate() {
        return new ItemTemplateRef(
              this
            , this.wrapIndex(this.container.row.Index, this.index)
        )
    }
}

export class LockIndexType extends EnumCellTransform<LockIndexBase> {
    protected get container() {
        return LockIndexBase.container(this.owner);
    }

    get ItemTemplate() {
        return this.value(
              1
            , t=>new LockIndexItem(this.container,t.index)
        )
    }

    get LockType() {
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
        return GameObjectTemplates
            .filter(query)
            .map(x=>transformer(x.Type).as())
    }

    protected abstract values(): [QueryKey,number,(gobj: GameObjectType)=>EnumValueTransform<GameObjectTemplate,T>]
}

export class LockChests extends LockGameObject<GameObjectChest> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectChest>] {
        return ['Data0',GAMEOBJECT_TYPE_CHEST,x=>x.Chest]
    }
}

export class LockAreaDamages extends LockGameObject<GameObjectAreaDamage> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectAreaDamage>] {
        return ['Data0',GAMEOBJECT_TYPE_AREADAMAGE,x=>x.Areadamage]
    }
}

export class LockButtons extends LockGameObject<GameObjectButton> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectButton>] {
        return ['Data1',GAMEOBJECT_TYPE_BUTTON,x=>x.Button]
    }
}

export class LockCameras extends LockGameObject<GameObjectCamera> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectCamera>] {
        return ['Data0',GAMEOBJECT_TYPE_CAMERA,x=>x.Camera]
    }
}

export class LockDoors extends LockGameObject<GameObjectDoor> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectDoor>] {
        return ['Data0',GAMEOBJECT_TYPE_DOOR,x=>x.Door]
    }
}

export class LockFishingHoles extends LockGameObject<GameObjectFishingHole> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFishingHole>] {
        return ['Data4', GAMEOBJECT_TYPE_FISHINGHOLE,x=>x.Fishinghole]
    }
}

export class LockFlagDrops extends LockGameObject<GameObjectFlagDrop> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagDrop>] {
        return ['Data0',GAMEOBJECT_TYPE_FLAGDROP,x=>x.Flagdrop]
    }
}

export class LockFlagStands extends LockGameObject<GameObjectFlagStand> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectFlagStand>] {
        return ['Data0',GAMEOBJECT_TYPE_FLAGSTAND,x=>x.Flagstand]
    }
}

export class LockGoobers extends LockGameObject<GameObjectGoober> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectGoober>] {
        return ['Data0',GAMEOBJECT_TYPE_GOOBER,x=>x.Goober]
    }
}

export class LockQuestGivers extends LockGameObject<GameObjectQuestGiver> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectQuestGiver>] {
        return ['Data0',GAMEOBJECT_TYPE_QUESTGIVER,x=>x.Questgiver]
    }
}

export class LockTraps extends LockGameObject<GameObjectTrap> {
    protected values(): [QueryKey, number, (gobj: GameObjectType) => EnumValueTransform<GameObjectTemplate, GameObjectTrap>] {
        return ['Data0',GAMEOBJECT_TYPE_TRAP,x=>x.Trap]
    }
}

// @ts-ignore -- hack, it's valid
export class Lock extends ArraySystem<LockIndexPlain, Lock> {
    get ID() { return this.row.ID.get(); }

    get length(): number {
        return 8;
    }

    get(index: number): LockIndexPlain {
        return new LockIndexPlain(this, index);
    }

    readonly row: LockRow

    constructor(row: LockRow) {
        // @ts-ignore -- hack
        super(undefined);
        // @ts-ignore
        this.owner = this;
        this.row = row;
    }

    isOfType(lockType: number) {
        return this.find(x=>
               x.Type.LockType.isSelected()
            && x.Type.LockType.as().LockType.get() === lockType
        )
    }

    requiresItem(item: number) {
        return this.find(x=>
               x.Type.ItemTemplate.isSelected()
            && x.Type.ItemTemplate.as().ItemTemplate.get() === item
        )
    }

    get Chests() { return new LockChests(this); }
    get AreaDamages() { return new LockAreaDamages(this); }
    get Buttons() { return new LockButtons(this); }
    get Cameras() { return new LockCameras(this); }
    get Doors() { return new LockDoors(this); }
    get FishingHoles() { return new LockFishingHoles(this); }
    get FlagDrops() { return new LockFlagDrops(this); }
    get FlagStands() { return new LockFlagStands(this); }
    get Goobers() { return new LockGoobers(this); }
    get QuestGivers() { return new LockQuestGivers(this); }
    get Traps() { return new LockTraps(this); }
}

export class LockRef<T> extends Ref<T,Lock> {
    protected create(): Lock {
        return Locks.create();
    }
    protected clone(): Lock {
        return Locks.create(this.cell.get());
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: Lock): number {
        return v.ID
    }
    protected resolve(): Lock {
        return Locks.load(this.cell.get());
    }
}
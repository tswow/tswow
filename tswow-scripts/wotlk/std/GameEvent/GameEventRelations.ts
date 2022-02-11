import { SQL } from "wotlkdata";
import { CellReadOnly } from "wotlkdata/wotlkdata/cell/cells/CellReadOnly";
import { makeMaskCell32 } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { any } from "wotlkdata/wotlkdata/query/Relations";
import { SqlRow } from "wotlkdata/wotlkdata/sql/SQLRow";
import { game_event_creatureRow } from "wotlkdata/wotlkdata/sql/types/game_event_creature";
import { game_event_creature_questQuery, game_event_creature_questRow } from "wotlkdata/wotlkdata/sql/types/game_event_creature_quest";
import { game_event_gameobjectRow } from "wotlkdata/wotlkdata/sql/types/game_event_gameobject";
import { game_event_gameobject_questQuery, game_event_gameobject_questRow } from "wotlkdata/wotlkdata/sql/types/game_event_gameobject_quest";
import { game_event_model_equipRow } from "wotlkdata/wotlkdata/sql/types/game_event_model_equip";
import { game_event_npcflagRow } from "wotlkdata/wotlkdata/sql/types/game_event_npcflag";
import { game_event_npc_vendorRow } from "wotlkdata/wotlkdata/sql/types/game_event_npc_vendor";
import { game_event_seasonal_questrelationRow } from "wotlkdata/wotlkdata/sql/types/game_event_seasonal_questrelation";
import { CreatureInstance } from "../Creature/CreatureInstance";
import { CreatureInstanceRegistry, CreatureTemplateRegistry } from "../Creature/Creatures";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { NPCFlags } from "../Creature/NPCFlags";
import { GameObjectInstance } from "../GameObject/GameObjectInstance";
import { GORegistry } from "../GameObject/GameObjectRegistries";
import { GameObjectInstances } from "../GameObject/GameObjects";
import { GameObjectTemplate } from "../GameObject/GameObjectTemplate";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Quest } from "../Quest/Quest";
import { QuestRegistry } from "../Quest/Quests";
import { GameEvent, GameEventRegistry } from "./GameEvent";

export class GameEventRelationBase<T extends SqlRow<any,any>> extends MainEntity<T> {}

export abstract class GameEventMultiRowSystem<T extends GameEventRelationBase<any>,V> extends MultiRowSystem<T,V> {
    protected isDeleted(value: T): boolean {
        return value.isDeleted();
    }
}

/**
 * Quests
 */

export class QuestGameEvent extends GameEventRelationBase<game_event_seasonal_questrelationRow>{
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get Quest() { return QuestRegistry.readOnlyRef(this, this.row.questId); }
}

export class QuestGameEventsForward extends GameEventMultiRowSystem<QuestGameEvent,Quest> {
    protected getAllRows(): QuestGameEvent[] {
        return SQL.game_event_seasonal_questrelation
            .queryAll({questId:this.owner.ID})
            .map(x=>new QuestGameEvent(x))
    }
    add(event: number) {
        SQL.game_event_seasonal_questrelation.add(this.owner.ID,event);
        return this.owner;
    }

    remove(event: number) {
        let r = SQL.game_event_seasonal_questrelation
            .query({questId:this.owner.ID,eventEntry:event});
        if(r) r.delete();
        return this.owner;
    }
}

export class QuestGameEventsBackward extends GameEventMultiRowSystem<QuestGameEvent,GameEvent> {
    protected getAllRows(): QuestGameEvent[] {
        return SQL.game_event_seasonal_questrelation
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new QuestGameEvent(x))
    }
    add(quest: number) {
        SQL.game_event_seasonal_questrelation.add(quest, this.owner.ID);
        return this.owner;
    }

    remove(quest: number) {
        let r = SQL.game_event_seasonal_questrelation
            .query({eventEntry:this.owner.ID,questId:quest});
        if(r) r.delete();
        return this.owner;
    }
}

// Creatures

export class PositiveNegativeCell<T> extends CellSystem<T> {
    protected cell: CellReadOnly<number,any>;
    constructor(owner: T, cell: CellReadOnly<number,any>) {
        super(owner);
        this.cell = cell;
    }

    get() {
        return Math.abs(this.cell.get());
    }

    isPositive() {
        return this.cell.get() >= 0;
    }
}

export type SpawnType = 'SPAWNS'|'DESPAWNS'

export class CreatureGameEvent extends GameEventRelationBase<game_event_creatureRow>{
    get Event() { return new PositiveNegativeCell(this, this.row.eventEntry); }
    get CreatureInstance() {
        return CreatureInstanceRegistry
            .readOnlyRef(this, this.row.guid);
    }
    get Type(): SpawnType {
        return this.Event.isPositive() ? 'SPAWNS':'DESPAWNS'
    }
}

export class CreatureGameEventsForward extends GameEventMultiRowSystem<CreatureGameEvent,CreatureInstance> {
    protected getAllRows(): CreatureGameEvent[] {
        return SQL.game_event_creature
            .queryAll({guid:this.owner.ID})
            .map(x=>new CreatureGameEvent(x))
    }
    add(event: number, type: SpawnType) {
        SQL.game_event_creature.add(
              type==='SPAWNS'
                ? event
                : -event
            , this.owner.ID
        );
        return this.owner;
    }

    remove(event: number, type: SpawnType) {
        let r = SQL.game_event_creature
            .query({
                  guid:this.owner.ID
                , eventEntry:type==='SPAWNS'
                    ?event
                    :-event
                });
        if(r) r.delete();
        return this.owner;
    }
}

export class CreatureGameEventsBackwards extends GameEventMultiRowSystem<CreatureGameEvent,GameEvent> {
    protected getAllRows(): CreatureGameEvent[] {
        return SQL.game_event_creature
            .queryAll({eventEntry:any(this.owner.ID,-this.owner.ID)})
            .map(x=>new CreatureGameEvent(x))
    }

    add(guid: number, type: SpawnType) {
        SQL.game_event_creature.add(
              type === 'SPAWNS'
                ? this.owner.ID
                : -this.owner.ID

            , guid
        );
        return this.owner;
    }

    remove(guid: number, type: SpawnType) {
        let r = SQL.game_event_creature
            .query({
                  guid
                , eventEntry:type ==='SPAWNS'
                    ? this.owner.ID
                    : -this.owner.ID
            });
        if(r) r.delete();
        return this.owner;
    }
}

/**
 * Quests
 */

 export class CreatureQuestGameEvent extends GameEventRelationBase<game_event_creature_questRow>{
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get CreatureInstance() { return CreatureTemplateRegistry.readOnlyRef(this, this.row.id); }
    get Quest() { return QuestRegistry.readOnlyRef(this, this.row.quest); }
}

export class CreatureQuestGameEventsForwardCreature extends GameEventMultiRowSystem<CreatureQuestGameEvent,CreatureTemplate> {
    protected getAllRows(): CreatureQuestGameEvent[] {
        return SQL.game_event_creature_quest
            .queryAll({id:this.owner.ID})
            .map(x=>new CreatureQuestGameEvent(x))
    }
    add(quest: number, event: number) {
        SQL.game_event_creature_quest.add(this.owner.ID,quest).eventEntry.set(event)
        return this.owner;
    }

    remove(quest?: number, event?: number) {
        let obj: game_event_creature_questQuery = {
            id: this.owner.ID
        }
        if(quest !== undefined) obj.quest = quest;
        if(event !== undefined) obj.eventEntry = event;
        SQL.game_event_creature_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

export class CreatureQuestGameEventsForwardQuest extends GameEventMultiRowSystem<CreatureQuestGameEvent,Quest> {
    protected getAllRows(): CreatureQuestGameEvent[] {
        return SQL.game_event_creature_quest
            .queryAll({quest:this.owner.ID})
            .map(x=>new CreatureQuestGameEvent(x))
    }
    add(creature: number, event: number) {
        SQL.game_event_creature_quest.add(creature,this.owner.ID).eventEntry.set(event)
        return this.owner;
    }

    remove(creature?: number, event?: number) {
        let obj: game_event_creature_questQuery = {
            quest: this.owner.ID
        }
        if(creature !== undefined) obj.id = creature;
        if(event !== undefined) obj.eventEntry = event;
        SQL.game_event_creature_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

export class CreatureQuestGameEventsBackward extends GameEventMultiRowSystem<CreatureQuestGameEvent,GameEvent> {
    protected getAllRows(): CreatureQuestGameEvent[] {
        return SQL.game_event_creature_quest
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new CreatureQuestGameEvent(x))
    }

    add(creature: number, quest: number) {
        SQL.game_event_creature_quest.add(creature,quest).eventEntry.set(this.owner.ID)
        return this.owner;
    }

    remove(creature?: number, quest?: number) {
        let obj: game_event_creature_questQuery = {
            eventEntry: this.owner.ID
        }
        if(creature !== undefined) obj.id = creature;
        if(quest !== undefined) obj.quest = quest;
        SQL.game_event_creature_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

/** gameobject */

export class GameObjectGameEvent extends GameEventRelationBase<game_event_gameobjectRow>{
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get GOInstance() {
        return GameObjectInstances
            .readOnlyRef(this, this.row.guid);
    }
}

export class GameObjectGameEventsForward extends GameEventMultiRowSystem<GameObjectGameEvent,GameObjectInstance> {
    protected getAllRows(): GameObjectGameEvent[] {
        return SQL.game_event_gameobject
            .queryAll({guid:this.owner.ID})
            .map(x=>new GameObjectGameEvent(x))
    }
    add(event: number) {
        SQL.game_event_gameobject.add(this.owner.ID,event);
        return this.owner;
    }

    remove(event: number) {
        let r = SQL.game_event_gameobject
            .query({guid:this.owner.ID,eventEntry:event});
        if(r) r.delete();
        return this.owner;
    }
}

export class GameObjectGameEventsBackward extends GameEventMultiRowSystem<GameObjectGameEvent,GameEvent> {
    protected getAllRows(): GameObjectGameEvent[] {
        return SQL.game_event_gameobject
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new GameObjectGameEvent(x))
    }
    add(guid: number) {
        SQL.game_event_gameobject.add(guid,this.owner.ID);
        return this.owner;
    }
    remove(guid: number) {
        let r = SQL.game_event_gameobject
            .query({guid:guid,eventEntry:this.owner.ID});
        if(r) r.delete();
        return this.owner;
    }
}

/** GameObject / Quest */

export class GameObjectQuestGameEvent extends GameEventRelationBase<game_event_gameobject_questRow>{
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get GameObject() {
        // is GOQuestGiver?
        return GORegistry.Plain.readOnlyRef(this, this.row.id);
    }
    get Quest() { return QuestRegistry.readOnlyRef(this, this.row.quest); }
}

export class GameObejctQuestGameEventsForwardGameObject extends GameEventMultiRowSystem<GameObjectQuestGameEvent,GameObjectTemplate> {
    protected getAllRows(): GameObjectQuestGameEvent[] {
        return SQL.game_event_gameobject_quest
            .queryAll({id:this.owner.ID})
            .map(x=>new GameObjectQuestGameEvent(x))
    }
    add(quest: number, event: number) {
        SQL.game_event_gameobject_quest.add(this.owner.ID,quest,event);
        return this.owner;
    }

    remove(quest?: number, event?: number) {
        let obj: game_event_gameobject_questQuery = {
            id: this.owner.ID
        }
        if(quest !== undefined) obj.quest = quest;
        if(event !== undefined) obj.eventEntry = event;
        SQL.game_event_gameobject_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

export class GameObjectQuestGameEventsForwardQuest extends GameEventMultiRowSystem<GameObjectQuestGameEvent,Quest> {
    protected getAllRows(): GameObjectQuestGameEvent[] {
        return SQL.game_event_gameobject_quest
            .queryAll({quest:this.owner.ID})
            .map(x=>new GameObjectQuestGameEvent(x))
    }
    add(gobj: number, event: number) {
        SQL.game_event_gameobject_quest.add(gobj,this.owner.ID,event);
        return this.owner;
    }

    remove(gobj?: number, event?: number) {
        let obj: game_event_gameobject_questQuery = {
            quest: this.owner.ID
        }
        if(gobj !== undefined) obj.id = gobj;
        if(event !== undefined) obj.eventEntry = event;
        SQL.game_event_gameobject_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

export class GameObjectQuestGameEventsBackward extends GameEventMultiRowSystem<GameObjectQuestGameEvent,GameEvent> {
    protected getAllRows(): GameObjectQuestGameEvent[] {
        return SQL.game_event_gameobject_quest
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new GameObjectQuestGameEvent(x))
    }

    add(gobj: number, quest: number) {
        SQL.game_event_gameobject_quest.add(gobj,quest,this.owner.ID)
        return this.owner;
    }

    remove(gobj?: number, quest?: number) {
        let obj: game_event_creature_questQuery = {
            eventEntry: this.owner.ID
        }
        if(gobj !== undefined) obj.id = gobj;
        if(quest !== undefined) obj.quest = quest;
        SQL.game_event_gameobject_quest
            .queryAll(obj)
            .forEach(x=>x.delete());
        return this.owner;
    }
}

export class GameEventModelEquipForward extends MaybeSQLEntity<CreatureInstance,game_event_model_equipRow>{
    protected createSQL(): game_event_model_equipRow {
        return SQL.game_event_model_equip.add(this.owner.ID)
            .equipment_id.set(0)
            .eventEntry.set(0)
            .modelid.set(0)
    }

    protected findSQL(): game_event_model_equipRow {
        return SQL.game_event_model_equip.query({guid:this.owner.ID});
    }

    protected isValidSQL(sql: game_event_model_equipRow): boolean {
        return sql.guid.get() === this.owner.ID;
    }

    get Event() { return GameEventRegistry.ref(this, this.wrapSQL(0,sql=>sql.eventEntry))}
    get Model() { return this.wrapSQL(0,sql=>sql.modelid); }
    get Equipment() { return this.wrapSQL(0,sql=>sql.equipment_id); }
}

export class GameEventModelEquipBackward extends GameEventRelationBase<game_event_model_equipRow> {
    get Event() { return GameEventRegistry.ref(this, this.row.eventEntry )}
    get Model() { return this.wrap(this.row.modelid); }
    get Equipment() { return this.wrap(this.row.equipment_id); }
    get CreatureInstance() {
        return CreatureInstanceRegistry
            .readOnlyRef(this, this.row.guid);
    }
}

export class GameEventModelEquipsBackward extends GameEventMultiRowSystem<GameEventModelEquipBackward,GameEvent> {
    protected getAllRows(): GameEventModelEquipBackward[] {
        return SQL.game_event_model_equip
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new GameEventModelEquipBackward(x))
    }
}

/** npcflag */

export class GameEventNPCFlag extends GameEventRelationBase<game_event_npcflagRow> {
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get CreatureInstance() {
        return CreatureInstanceRegistry
            .readOnlyRef(this, this.row.guid);
    }
    get NPCFlag() {
        return makeMaskCell32(NPCFlags,this, this.row.npcflag);
    }
}

export class GameEventNPCFlagForward extends GameEventMultiRowSystem<GameEventNPCFlag,CreatureInstance> {
    protected getAllRows(): GameEventNPCFlag[] {
        return SQL.game_event_npcflag
            .queryAll({guid:this.owner.ID})
            .map(x=>new GameEventNPCFlag(x))
    }

    add(event: number, flag: number) {
        SQL.game_event_npcflag.add(event, this.owner.ID).npcflag.set(flag);
        return this.owner;
    }

    addGet(event: number) {
        return new GameEventNPCFlag(SQL.game_event_npcflag.add(event, this.owner.ID))
    }

    addMod(event: number, callback: (flag: GameEventNPCFlag)=>void) {
        callback(this.addGet(event));
        return this.owner;
    }
}

export class GameEventModelNPCFlagsBackward extends GameEventMultiRowSystem<GameEventNPCFlag,GameEvent> {
    protected getAllRows(): GameEventNPCFlag[] {
        return SQL.game_event_npcflag
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new GameEventNPCFlag(x))
    }

    add(guid: number, flag: number) {
        SQL.game_event_npcflag.add(guid,this.owner.ID).npcflag.set(flag);
        return this.owner;
    }

    addGet(guid: number) {
        return new GameEventNPCFlag(SQL.game_event_npcflag.add(guid,this.owner.ID))
    }

    addMod(guid: number, callback: (flag: GameEventNPCFlag)=>void) {
        callback(this.addGet(guid));
        return this.owner;
    }
}

/** npc_vendor */

export class GameEventNPCVendor extends GameEventRelationBase<game_event_npc_vendorRow> {
    get Event() { return GameEventRegistry.readOnlyRef(this, this.row.eventEntry)}
    get CreatureInstance() {
        return CreatureInstanceRegistry
            .readOnlyRef(this, this.row.guid);
    }
    get Item() { return ItemTemplateRegistry.readOnlyRef(this, this.row.item); }
    get Slot() { return this.wrap(this.row.slot); }
    get MaxCount() { return this.wrap(this.row.maxcount); }
    get IncrementTime() { return this.wrap(this.row.incrtime); }
    // todo: ref
    get ExtendedCost() { return this.wrap(this.row.ExtendedCost); }
}

export class GameEventNPCVendorCreature extends GameEventMultiRowSystem<GameEventNPCVendor,CreatureInstance> {
    protected getAllRows(): GameEventNPCVendor[] {
        return SQL.game_event_npc_vendor
            .queryAll({guid:this.owner.ID})
            .map(x=>new GameEventNPCVendor(x))
    }

    add(event: number, item: number, slot = 0, maxcount = 0, incrtime = 0, extendedCost = 0) {
        SQL.game_event_npc_vendor.add(this.owner.ID,item)
            .eventEntry.set(event)
            .slot.set(slot)
            .maxcount.set(maxcount)
            .incrtime.set(incrtime)
            .ExtendedCost.set(extendedCost)
        return this.owner;
    }

    addGet(event: number, item: number) {
        return new GameEventNPCVendor(SQL.game_event_npc_vendor
            .add(this.owner.ID,item).eventEntry.set(event))
    }

    addMod(event: number, item: number, callback: (event: GameEventNPCVendor)=>void) {
        callback(this.addGet(event,item));
        return this.owner;
    }
}

export class GameEventNPCVendorItem extends GameEventMultiRowSystem<GameEventNPCVendor,ItemTemplate> {
    protected getAllRows(): GameEventNPCVendor[] {
        return SQL.game_event_npc_vendor
            .queryAll({item:this.owner.ID})
            .map(x=>new GameEventNPCVendor(x))
    }

    add(event: number, creature: number, slot = 0, maxcount = 0, incrtime = 0, extendedCost = 0) {
        SQL.game_event_npc_vendor.add(creature,this.owner.ID)
            .eventEntry.set(event)
            .slot.set(slot)
            .maxcount.set(maxcount)
            .incrtime.set(incrtime)
            .ExtendedCost.set(extendedCost)
        return this.owner;
    }

    addGet(event: number, creatureGuid: number) {
        return new GameEventNPCVendor(SQL.game_event_npc_vendor
            .add(creatureGuid,this.owner.ID).eventEntry.set(event))
    }

    addMod(event: number, creatureGuid: number, callback: (event: GameEventNPCVendor)=>void) {
        callback(this.addGet(event,creatureGuid));
        return this.owner;
    }
}

export class GameEventNPCVendorBackward extends GameEventMultiRowSystem<GameEventNPCVendor,GameEvent> {
    protected getAllRows(): GameEventNPCVendor[] {
        return SQL.game_event_npc_vendor
            .queryAll({eventEntry:this.owner.ID})
            .map(x=>new GameEventNPCVendor(x))
    }

    add(item: number, creature: number, slot = 0, maxcount = 0, incrtime = 0, extendedCost = 0) {
        SQL.game_event_npc_vendor.add(creature,item)
            .eventEntry.set(this.owner.ID)
            .slot.set(slot)
            .maxcount.set(maxcount)
            .incrtime.set(incrtime)
            .ExtendedCost.set(extendedCost)
        return this.owner;
    }

    addGet(item: number, creatureGuid: number) {
        return new GameEventNPCVendor(SQL.game_event_npc_vendor
            .add(creatureGuid,item).eventEntry.set(this.owner.ID))
    }

    addMod(item: number, creatureGuid: number, callback: (event: GameEventNPCVendor)=>void) {
        callback(this.addGet(item,creatureGuid));
        return this.owner;
    }
}

export class GameEventBackwardRelations extends CellSystem<GameEvent> {
    get Quests() { return new QuestGameEventsBackward(this.owner); }
    get GameObjects() { return new GameObjectGameEventsBackward(this.owner); }
    get GameObjectQuests() { return new GameObjectQuestGameEventsBackward(this.owner); }
    get Creatures() { return new CreatureGameEventsBackwards(this.owner); }
    get CreatureQuest() { return new CreatureQuestGameEventsBackward(this.owner); }
    get CreatureModelEquips() { return new GameEventModelEquipsBackward(this.owner); }
    get CreatureNPCFlags() { return new GameEventModelNPCFlagsBackward(this.owner); }
    get CreatureVendors() { return new GameEventNPCVendorBackward(this.owner); }
}
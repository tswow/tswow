import { CellReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SqlRow } from "../../../data/sql/SQLRow";
import { game_event_creatureRow } from "../../sql/game_event_creature";
import { game_event_creature_questRow } from "../../sql/game_event_creature_quest";
import { game_event_gameobjectRow } from "../../sql/game_event_gameobject";
import { game_event_gameobject_questRow } from "../../sql/game_event_gameobject_quest";
import { game_event_model_equipRow } from "../../sql/game_event_model_equip";
import { game_event_npcflagRow } from "../../sql/game_event_npcflag";
import { game_event_npc_vendorRow } from "../../sql/game_event_npc_vendor";
import { game_event_seasonal_questrelationRow } from "../../sql/game_event_seasonal_questrelation";
import { CreatureInstance } from "../Creature/CreatureInstance";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { NPCFlags } from "../Creature/NPCFlags";
import { GameObjectInstance } from "../GameObject/GameObjectInstance";
import { GameObjectTemplate } from "../GameObject/GameObjectTemplate";
import { ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { MaybeSQLEntity } from "../Misc/SQLDBCEntity";
import { Quest } from "../Quest/Quest";
import { GameEvent } from "./GameEvent";
export declare class GameEventRelationBase<T extends SqlRow<any, any>> extends MainEntity<T> {
}
export declare abstract class GameEventMultiRowSystem<T extends GameEventRelationBase<any>, V> extends MultiRowSystem<T, V> {
    protected isDeleted(value: T): boolean;
}
/**
 * Quests
 */
export declare class QuestGameEvent extends GameEventRelationBase<game_event_seasonal_questrelationRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get Quest(): import("../Refs/Ref").RefReadOnly<this, Quest>;
}
export declare class QuestGameEventsForward extends GameEventMultiRowSystem<QuestGameEvent, Quest> {
    protected getAllRows(): QuestGameEvent[];
    add(event: number): Quest;
    remove(event: number): Quest;
}
export declare class QuestGameEventsBackward extends GameEventMultiRowSystem<QuestGameEvent, GameEvent> {
    protected getAllRows(): QuestGameEvent[];
    add(quest: number): GameEvent;
    remove(quest: number): GameEvent;
}
export declare class PositiveNegativeCell<T> extends CellSystem<T> {
    protected cell: CellReadOnly<number, any>;
    constructor(owner: T, cell: CellReadOnly<number, any>);
    get(): number;
    isPositive(): boolean;
}
export type SpawnType = 'SPAWNS' | 'DESPAWNS';
export declare class CreatureGameEvent extends GameEventRelationBase<game_event_creatureRow> {
    get Event(): PositiveNegativeCell<this>;
    get CreatureInstance(): import("../Refs/Ref").RefReadOnly<this, CreatureInstance>;
    get Type(): SpawnType;
}
export declare class CreatureGameEventsForward extends GameEventMultiRowSystem<CreatureGameEvent, CreatureInstance> {
    protected getAllRows(): CreatureGameEvent[];
    add(event: number, type: SpawnType): CreatureInstance;
    remove(event: number, type: SpawnType): CreatureInstance;
}
export declare class CreatureGameEventsBackwards extends GameEventMultiRowSystem<CreatureGameEvent, GameEvent> {
    protected getAllRows(): CreatureGameEvent[];
    add(guid: number, type: SpawnType): GameEvent;
    remove(guid: number, type: SpawnType): GameEvent;
}
/**
 * Quests
 */
export declare class CreatureQuestGameEvent extends GameEventRelationBase<game_event_creature_questRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get CreatureInstance(): import("../Refs/Ref").RefReadOnly<this, CreatureTemplate>;
    get Quest(): import("../Refs/Ref").RefReadOnly<this, Quest>;
}
export declare class CreatureQuestGameEventsForwardCreature extends GameEventMultiRowSystem<CreatureQuestGameEvent, CreatureTemplate> {
    protected getAllRows(): CreatureQuestGameEvent[];
    add(quest: number, event: number): CreatureTemplate;
    remove(quest?: number, event?: number): CreatureTemplate;
}
export declare class CreatureQuestGameEventsForwardQuest extends GameEventMultiRowSystem<CreatureQuestGameEvent, Quest> {
    protected getAllRows(): CreatureQuestGameEvent[];
    add(creature: number, event: number): Quest;
    remove(creature?: number, event?: number): Quest;
}
export declare class CreatureQuestGameEventsBackward extends GameEventMultiRowSystem<CreatureQuestGameEvent, GameEvent> {
    protected getAllRows(): CreatureQuestGameEvent[];
    add(creature: number, quest: number): GameEvent;
    remove(creature?: number, quest?: number): GameEvent;
}
/** gameobject */
export declare class GameObjectGameEvent extends GameEventRelationBase<game_event_gameobjectRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get GOInstance(): import("../Refs/Ref").RefReadOnly<this, GameObjectInstance>;
}
export declare class GameObjectGameEventsForward extends GameEventMultiRowSystem<GameObjectGameEvent, GameObjectInstance> {
    protected getAllRows(): GameObjectGameEvent[];
    add(event: number): GameObjectInstance;
    remove(event: number): GameObjectInstance;
}
export declare class GameObjectGameEventsBackward extends GameEventMultiRowSystem<GameObjectGameEvent, GameEvent> {
    protected getAllRows(): GameObjectGameEvent[];
    add(guid: number): GameEvent;
    remove(guid: number): GameEvent;
}
/** GameObject / Quest */
export declare class GameObjectQuestGameEvent extends GameEventRelationBase<game_event_gameobject_questRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get GameObject(): import("../Refs/Ref").RefReadOnly<this, import("../GameObject/GameObjectTemplate").GameObjectPlain>;
    get Quest(): import("../Refs/Ref").RefReadOnly<this, Quest>;
}
export declare class GameObejctQuestGameEventsForwardGameObject extends GameEventMultiRowSystem<GameObjectQuestGameEvent, GameObjectTemplate> {
    protected getAllRows(): GameObjectQuestGameEvent[];
    add(quest: number, event: number): GameObjectTemplate;
    remove(quest?: number, event?: number): GameObjectTemplate;
}
export declare class GameObjectQuestGameEventsForwardQuest extends GameEventMultiRowSystem<GameObjectQuestGameEvent, Quest> {
    protected getAllRows(): GameObjectQuestGameEvent[];
    add(gobj: number, event: number): Quest;
    remove(gobj?: number, event?: number): Quest;
}
export declare class GameObjectQuestGameEventsBackward extends GameEventMultiRowSystem<GameObjectQuestGameEvent, GameEvent> {
    protected getAllRows(): GameObjectQuestGameEvent[];
    add(gobj: number, quest: number): GameEvent;
    remove(gobj?: number, quest?: number): GameEvent;
}
export declare class GameEventModelEquipForward extends MaybeSQLEntity<CreatureInstance, game_event_model_equipRow> {
    protected createSQL(): game_event_model_equipRow;
    protected findSQL(): game_event_model_equipRow;
    protected isValidSQL(sql: game_event_model_equipRow): boolean;
    get Event(): import("../Refs/Ref").RefNoCreate<this, GameEvent>;
    get Model(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, game_event_model_equipRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, game_event_model_equipRow>>;
    get Equipment(): import("../Misc/SQLDBCEntity").MaybeSQLCell<CreatureInstance, number, game_event_model_equipRow, import("../Misc/SQLDBCEntity").MaybeSQLEntityPublic<CreatureInstance, game_event_model_equipRow>>;
}
export declare class GameEventModelEquipBackward extends GameEventRelationBase<game_event_model_equipRow> {
    get Event(): import("../Refs/Ref").RefNoCreate<this, GameEvent>;
    get Model(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Equipment(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CreatureInstance(): import("../Refs/Ref").RefReadOnly<this, CreatureInstance>;
}
export declare class GameEventModelEquipsBackward extends GameEventMultiRowSystem<GameEventModelEquipBackward, GameEvent> {
    protected getAllRows(): GameEventModelEquipBackward[];
}
/** npcflag */
export declare class GameEventNPCFlag extends GameEventRelationBase<game_event_npcflagRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get CreatureInstance(): import("../Refs/Ref").RefReadOnly<this, CreatureInstance>;
    get NPCFlag(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof NPCFlags>;
}
export declare class GameEventNPCFlagForward extends GameEventMultiRowSystem<GameEventNPCFlag, CreatureInstance> {
    protected getAllRows(): GameEventNPCFlag[];
    add(event: number, flag: number): CreatureInstance;
    addGet(event: number): GameEventNPCFlag;
    addMod(event: number, callback: (flag: GameEventNPCFlag) => void): CreatureInstance;
}
export declare class GameEventModelNPCFlagsBackward extends GameEventMultiRowSystem<GameEventNPCFlag, GameEvent> {
    protected getAllRows(): GameEventNPCFlag[];
    add(guid: number, flag: number): GameEvent;
    addGet(guid: number): GameEventNPCFlag;
    addMod(guid: number, callback: (flag: GameEventNPCFlag) => void): GameEvent;
}
/** npc_vendor */
export declare class GameEventNPCVendor extends GameEventRelationBase<game_event_npc_vendorRow> {
    get Event(): import("../Refs/Ref").RefReadOnly<this, GameEvent>;
    get CreatureInstance(): import("../Refs/Ref").RefReadOnly<this, CreatureInstance>;
    get Item(): import("../Refs/Ref").RefReadOnly<this, ItemTemplate>;
    get Slot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MaxCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get IncrementTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ExtendedCost(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class GameEventNPCVendorCreature extends GameEventMultiRowSystem<GameEventNPCVendor, CreatureInstance> {
    protected getAllRows(): GameEventNPCVendor[];
    add(event: number, item: number, slot?: number, maxcount?: number, incrtime?: number, extendedCost?: number): CreatureInstance;
    addGet(event: number, item: number): GameEventNPCVendor;
    addMod(event: number, item: number, callback: (event: GameEventNPCVendor) => void): CreatureInstance;
}
export declare class GameEventNPCVendorItem extends GameEventMultiRowSystem<GameEventNPCVendor, ItemTemplate> {
    protected getAllRows(): GameEventNPCVendor[];
    add(event: number, creature: number, slot?: number, maxcount?: number, incrtime?: number, extendedCost?: number): ItemTemplate;
    addGet(event: number, creatureGuid: number): GameEventNPCVendor;
    addMod(event: number, creatureGuid: number, callback: (event: GameEventNPCVendor) => void): ItemTemplate;
}
export declare class GameEventNPCVendorBackward extends GameEventMultiRowSystem<GameEventNPCVendor, GameEvent> {
    protected getAllRows(): GameEventNPCVendor[];
    add(item: number, creature: number, slot?: number, maxcount?: number, incrtime?: number, extendedCost?: number): GameEvent;
    addGet(item: number, creatureGuid: number): GameEventNPCVendor;
    addMod(item: number, creatureGuid: number, callback: (event: GameEventNPCVendor) => void): GameEvent;
}
export declare class GameEventBackwardRelations extends CellSystem<GameEvent> {
    get Quests(): QuestGameEventsBackward;
    get GameObjects(): GameObjectGameEventsBackward;
    get GameObjectQuests(): GameObjectQuestGameEventsBackward;
    get Creatures(): CreatureGameEventsBackwards;
    get CreatureQuest(): CreatureQuestGameEventsBackward;
    get CreatureModelEquips(): GameEventModelEquipsBackward;
    get CreatureNPCFlags(): GameEventModelNPCFlagsBackward;
    get CreatureVendors(): GameEventNPCVendorBackward;
}

import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SmartScript } from "./SmartScript";
export declare class AttachedScript<T> extends CellSystem<T> {
    protected create: () => SmartScript;
    constructor(owner: T, create: () => SmartScript);
    /**
     *  In combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateIc(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  Out of combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateOoc(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHealthPct(HPMin: number, HPMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onManaPct(ManaMin: number, ManaMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Aggro
     */
    onAggro(callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Kill
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param Player only (0/1)
     *  @param Creature entry (if param3 is 0)
     */
    onKill(CooldownMin: number, CooldownMax: number, Player: number, Creature: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Death
     */
    onDeath(callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Evade Attack
     */
    onEvade(callback: (script: SmartScript) => void): T;
    /**
     *  On Creature/Gameobject Spell Hit
     *  @param SpellID
     *  @param School
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSpellhit(SpellID: number, School: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target In Range
     *  @param MinDist
     *  @param MaxDist
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRange(MinDist: number, MaxDist: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target In Distance Out of Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onOocLos(NoHostile: number, MaxRange: number, CooldownMin: number, CooldownMax: number, zo: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature/Gameobject Respawn
     *  @param type (None= 0, Map = 1, Area = 2)
     *  @param MapId
     *  @param ZoneId
     */
    onRespawn(type: number, MapId: number, ZoneId: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetHealthPct(HPMin: number, HPMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Casting Spell
     *  @param RepeatMin
     *  @param RepeatMax
     *  @param Spell id (0 any)
     */
    onVictimCasting(RepeatMin: number, RepeatMax: number, Spell: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Friendly Health Deficit
     *  @param HPDeficit
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyHealth(HPDeficit: number, Radius: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyIsCc(Radius: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Friendly Lost Buff
     *  @param SpellId
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyMissingBuff(SpellId: number, Radius: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature/Gameobject Summoned Unit
     *  @param CretureId (0 all)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonedUnit(CretureId: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetManaPct(ManaMin: number, ManaMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Accepted Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onAcceptedQuest(QuestID: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Rewarded Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRewardQuest(QuestID: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Reached Home
     */
    onReachedHome(callback: (script: SmartScript) => void): T;
    /**
     *  On Receive Emote.
     *  @param EmoteId
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveEmote(EmoteId: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Has Aura
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHasAura(SpellID: number, Stacks: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Buffed With Spell
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetBuffed(SpellID: number, Stacks: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  After Combat, On Respawn or Spawn
     */
    onReset(callback: (script: SmartScript) => void): T;
    /**
     *  On Target In Distance In Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onIcLos(NoHostile: number, MaxRange: number, CooldownMin: number, CooldownMax: number, zo: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerBoarded(CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerRemoved(CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Charmed
     *  @param 0 (on charm apply) / 1 (on charm remove)
     */
    onCharmed(ZERO: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Charmed
     */
    onCharmedTarget(callback: (script: SmartScript) => void): T;
    /**
     *  On Target Spell Hit
     *  @param SpellId
     *  @param School
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onSpellhitTarget(SpellId: number, School: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamaged(MinDmg: number, MaxDmg: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamagedTarget(MinDmg: number, MaxDmg: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  MovementType
     *  @param MovementType (0=any)
     *  @param PointID
     */
    onMovementinform(MovementType: number, PointID: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Summoned Unit Despawned
     *  @param Entry
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonDespawned(Entry: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Corpse Removed
     */
    onCorpseRemoved(callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onAiInit(callback: (script: SmartScript) => void): T;
    /**
     *  On Creature/Gameobject Data Set, Can be used with SMART_ACTION_SET_DATA
     *  @param Field
     *  @param Value
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onDataSet(Field: number, Value: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Waypoint ID Started
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointStart(PointId: number, pathId: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Waypoint ID Reached
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointReached(PointId: number, pathId: number, callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onTransportAddplayer(callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param Entry (0 any)
     */
    onTransportAddcreature(Entry: number, callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onTransportRemovePlayer(callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param PointId
     */
    onTransportRelocate(PointId: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param Team (0 any)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onInstancePlayerEnter(Team: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param TriggerId (0 any)
     */
    onAreatriggerOntrigger(TriggerId: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Target Quest Objective Completed
     */
    onQuestObjCompletion(callback: (script: SmartScript) => void): T;
    /**
     *  On Target Quest Completed
     */
    onQuestCompletion(callback: (script: SmartScript) => void): T;
    /**
     *  On Target Quest Rewarded
     */
    onQuestRewarded(callback: (script: SmartScript) => void): T;
    /**
     *  On Target Quest Field
     */
    onQuestFail(callback: (script: SmartScript) => void): T;
    /**
     *  On TEXT_OVER Event Triggered After SMART_ACTION_TALK
     *  @param GroupId (from creature_text)
     *  @param Creature.Id (0 any)
     */
    onTextOver(GroupId: number, CreatureId: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Received Healing
     *  @param MinHeal
     *  @param MaxHeal
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveHeal(MinHeal: number, MaxHeal: number, CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Just spawned
     */
    onJustSummoned(callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Paused at Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointPaused(PointId: number, pathID: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Resumed after Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointResumed(PointId: number, pathID: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Stopped On Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointStopped(PointId: number, pathID: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature Waypoint Path Ended
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointEnded(PointId: number, pathID: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param Id
     */
    onTimedEventTriggered(Id: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdate(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  Used to link together multiple events as a chain of events.
     */
    onLink(callback: (script: SmartScript) => void): T;
    /**
     *  On gossip clicked (gossip_menu_option335).
     *  @param menu_id
     *  @param id
     */
    onGossipSelect(menu_id: number, id: number, callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onJustCreated(callback: (script: SmartScript) => void): T;
    /**
     *  On Right-Click Creature/Gameobject that have gossip enabled.
     *  @param 0/1/2 (For gameobject only) 0 = on gossip hello and on report use This might result in the action being executed twice when clicking the GameObject, 1 = on gossip hello only, 2 = on report use only
     */
    onGossipHello(zo: number, callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onFollowCompleted(callback: (script: SmartScript) => void): T;
    /**
     *  On event phase mask set
     *  @param event phase mask
     */
    onEventPhaseChange(event: number, callback: (script: SmartScript) => void): T;
    /**
     *  On Creature is behind target.
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onIsBehindTarget(CooldownMin: number, CooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On game_event started.
     *  @param game_event.eventEntry
     */
    onGameEventStart(game_eventeventEntry: number, callback: (script: SmartScript) => void): T;
    /**
     *  On game_event ended.
     *  @param game_event.eventEntry
     */
    onGameEventEnd(game_eventeventEntry: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param State (0 - Not Ready, 1 - Ready, 2 - Activacted, 3 - Just deactivated)
     */
    onGoLootStateChanged(State: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param EventId
     */
    onGoEventInform(EventId: number, callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param EventId
     */
    onActionDone(EventId: number, callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onOnSpellclick(callback: (script: SmartScript) => void): T;
    /**
     *
     *  @param minHpPct
     *  @param maxHpPct
     *  @param repeatMin
     *  @param repeatMax
     */
    onFriendlyHealthPct(minHpPct: number, maxHpPct: number, repeatMin: number, repeatMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  On creature guid OR any instance of creature entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceCreature(database: number, database2: number, distance: number, repeat: number, callback: (script: SmartScript) => void): T;
    /**
     *  On gameobject guid OR any instance of gameobject entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceGameobject(database: number, database2: number, distance: number, repeat: number, callback: (script: SmartScript) => void): T;
    /**
     *  If the value of specified counterID is equal to a specified value
     *  @param counterID
     *  @param value
     *  @param cooldownMin
     *  @param cooldownMax
     */
    onCounterSet(counterID: number, value: number, cooldownMin: number, cooldownMax: number, callback: (script: SmartScript) => void): T;
    /**
     *  Master only
     */
    onSceneStart(callback: (script: SmartScript) => void): T;
    /**
     *  Master only
     *  @param param_string : triggerName
     */
    onSceneTrigger(param_string: number, callback: (script: SmartScript) => void): T;
    /**
     *  Master only
     */
    onSceneCancel(callback: (script: SmartScript) => void): T;
    /**
     *  Master only
     */
    onSceneComplete(callback: (script: SmartScript) => void): T;
    /**
     *
     */
    onSummonedUnitDies(callback: (script: SmartScript) => void): T;
    onCustom(id: number, params: {
        param1?: number;
        param2?: number;
        param3?: number;
        param4?: number;
    }, callback: (script: SmartScript) => void): T;
}

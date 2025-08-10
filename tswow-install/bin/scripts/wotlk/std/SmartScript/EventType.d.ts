import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { smart_scriptsRow } from "../../sql/smart_scripts";
import { SmartScript } from "./SmartScript";
export declare const EVENT_ARGS: {
    [key: string]: string[];
};
export declare class EventType<T> {
    protected row: smart_scriptsRow;
    protected main: SmartScript;
    constructor(main: SmartScript, row: smart_scriptsRow);
    getType(): string;
    getArguments(): {
        [key: string]: number;
    };
    objectify(options?: ObjectifyOptions): {
        type: string;
        arguments: {
            [key: string]: number;
        };
    };
    /**
     *  In combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdateIc(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  Out of combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdateOoc(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setHealthPct(HPMin: number, HPMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setManaPct(ManaMin: number, ManaMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Creature Aggro
     */
    setAggro(): SmartScript;
    /**
     *  On Creature Kill
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param Player only (0/1)
     *  @param Creature entry (if param3 is 0)
     */
    setKill(CooldownMin: number, CooldownMax: number, Player: number, Creature: number): SmartScript;
    /**
     *  On Creature Death
     */
    setDeath(): SmartScript;
    /**
     *  On Creature Evade Attack
     */
    setEvade(): SmartScript;
    /**
     *  On Creature/Gameobject Spell Hit
     *  @param SpellID
     *  @param School
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSpellhit(SpellID: number, School: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Target In Range
     *  @param MinDist
     *  @param MaxDist
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setRange(MinDist: number, MaxDist: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Target In Distance Out of Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    setOocLos(NoHostile: number, MaxRange: number, CooldownMin: number, CooldownMax: number, zo: number): SmartScript;
    /**
     *  On Creature/Gameobject Respawn
     *  @param type (None= 0, Map = 1, Area = 2)
     *  @param MapId
     *  @param ZoneId
     */
    setRespawn(type: number, MapId: number, ZoneId: number): SmartScript;
    /**
     *  On Target Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetHealthPct(HPMin: number, HPMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Target Casting Spell
     *  @param RepeatMin
     *  @param RepeatMax
     *  @param Spell id (0 any)
     */
    setVictimCasting(RepeatMin: number, RepeatMax: number, Spell: number): SmartScript;
    /**
     *  On Friendly Health Deficit
     *  @param HPDeficit
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyHealth(HPDeficit: number, Radius: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyIsCc(Radius: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Friendly Lost Buff
     *  @param SpellId
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyMissingBuff(SpellId: number, Radius: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Creature/Gameobject Summoned Unit
     *  @param CretureId (0 all)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSummonedUnit(CretureId: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Target Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetManaPct(ManaMin: number, ManaMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Target Accepted Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setAcceptedQuest(QuestID: number): SmartScript;
    /**
     *  On Target Rewarded Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setRewardQuest(QuestID: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Creature Reached Home
     */
    setReachedHome(): SmartScript;
    /**
     *  On Receive Emote.
     *  @param EmoteId
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setReceiveEmote(EmoteId: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Creature Has Aura
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setHasAura(SpellID: number, Stacks: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Target Buffed With Spell
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetBuffed(SpellID: number, Stacks: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  After Combat, On Respawn or Spawn
     */
    setReset(): SmartScript;
    /**
     *  On Target In Distance In Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    setIcLos(NoHostile: number, MaxRange: number, CooldownMin: number, CooldownMax: number, zo: number): SmartScript;
    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setPassengerBoarded(CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setPassengerRemoved(CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Creature Charmed
     *  @param 0 (on charm apply) / 1 (on charm remove)
     */
    setCharmed(ZERO: number): SmartScript;
    /**
     *  On Target Charmed
     */
    setCharmedTarget(): SmartScript;
    /**
     *  On Target Spell Hit
     *  @param SpellId
     *  @param School
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setSpellhitTarget(SpellId: number, School: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Creature Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setDamaged(MinDmg: number, MaxDmg: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  On Target Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setDamagedTarget(MinDmg: number, MaxDmg: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  MovementType
     *  @param MovementType (0=any)
     *  @param PointID
     */
    setMovementinform(MovementType: number, PointID: number): SmartScript;
    /**
     *  On Summoned Unit Despawned
     *  @param Entry
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSummonDespawned(Entry: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Creature Corpse Removed
     */
    setCorpseRemoved(): SmartScript;
    /**
     *
     */
    setAiInit(): SmartScript;
    /**
     *  On Creature/Gameobject Data Set, Can be used with SMART_ACTION_SET_DATA
     *  @param Field
     *  @param Value
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setDataSet(Field: number, Value: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Creature Waypoint ID Started
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    setWaypointStart(PointId: number, pathId: number): SmartScript;
    /**
     *  On Creature Waypoint ID Reached
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    setWaypointReached(PointId: number, pathId: number): SmartScript;
    /**
     *
     */
    setTransportAddplayer(): SmartScript;
    /**
     *
     *  @param Entry (0 any)
     */
    setTransportAddcreature(Entry: number): SmartScript;
    /**
     *
     */
    setTransportRemovePlayer(): SmartScript;
    /**
     *
     *  @param PointId
     */
    setTransportRelocate(PointId: number): SmartScript;
    /**
     *
     *  @param Team (0 any)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setInstancePlayerEnter(Team: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *
     *  @param TriggerId (0 any)
     */
    setAreatriggerOntrigger(TriggerId: number): SmartScript;
    /**
     *  On Target Quest Accepted
     */
    setQuestAccepted(questNo: number): SmartScript;
    /**
     *  On Target Quest Objective Completed
     */
    setQuestObjCompletion(): SmartScript;
    /**
     *  On Target Quest Completed
     */
    setQuestCompletion(): SmartScript;
    /**
     *  On Target Quest Rewarded
     */
    setQuestRewarded(): SmartScript;
    /**
     *  On Target Quest Field
     */
    setQuestFail(): SmartScript;
    /**
     *  On TEXT_OVER Event Triggered After SMART_ACTION_TALK
     *  @param GroupId (from creature_text)
     *  @param Creature.Id (0 any)
     */
    setTextOver(GroupId: number, CreatureId: number): SmartScript;
    /**
     *  On Creature Received Healing
     *  @param MinHeal
     *  @param MaxHeal
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setReceiveHeal(MinHeal: number, MaxHeal: number, CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On Creature Just spawned
     */
    setJustSummoned(): SmartScript;
    /**
     *  On Creature Paused at Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointPaused(PointId: number, pathID: number): SmartScript;
    /**
     *  On Creature Resumed after Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointResumed(PointId: number, pathID: number): SmartScript;
    /**
     *  On Creature Stopped On Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointStopped(PointId: number, pathID: number): SmartScript;
    /**
     *  On Creature Waypoint Path Ended
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointEnded(PointId: number, pathID: number): SmartScript;
    /**
     *
     *  @param Id
     */
    setTimedEventTriggered(Id: number): SmartScript;
    /**
     *
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdate(InitialMin: number, InitialMax: number, RepeatMin: number, RepeatMax: number): SmartScript;
    /**
     *  Used to link together multiple events as a chain of events.
     */
    setLink(): SmartScript;
    /**
     *  On gossip clicked (gossip_menu_option335).
     *  @param menu_id
     *  @param id
     */
    setGossipSelect(menu_id: number, id: number): SmartScript;
    /**
     *
     */
    setJustCreated(): SmartScript;
    /**
     *  On Right-Click Creature/Gameobject that have gossip enabled.
     *  @param 0/1/2 (For gameobject only) 0 = on gossip hello and on report use This might result in the action being executed twice when clicking the GameObject, 1 = on gossip hello only, 2 = on report use only
     */
    setGossipHello(zo: number): SmartScript;
    /**
     *
     */
    setFollowCompleted(): SmartScript;
    /**
     *  On event phase mask set
     *  @param event phase mask
     */
    setEventPhaseChange(event: number): SmartScript;
    /**
     *  On Creature is behind target.
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setIsBehindTarget(CooldownMin: number, CooldownMax: number): SmartScript;
    /**
     *  On game_event started.
     *  @param game_event.eventEntry
     */
    setGameEventStart(game_eventeventEntry: number): SmartScript;
    /**
     *  On game_event ended.
     *  @param game_event.eventEntry
     */
    setGameEventEnd(game_eventeventEntry: number): SmartScript;
    /**
     *
     *  @param State (0 - Not Ready, 1 - Ready, 2 - Activacted, 3 - Just deactivated)
     */
    setGoLootStateChanged(State: number): SmartScript;
    /**
     *
     *  @param EventId
     */
    setGoEventInform(EventId: number): SmartScript;
    /**
     *
     *  @param EventId
     */
    setActionDone(EventId: number): SmartScript;
    /**
     *
     */
    setOnSpellclick(): SmartScript;
    /**
     *
     *  @param minHpPct
     *  @param maxHpPct
     *  @param repeatMin
     *  @param repeatMax
     */
    setFriendlyHealthPct(minHpPct: number, maxHpPct: number, repeatMin: number, repeatMax: number): SmartScript;
    /**
     *  On creature guid OR any instance of creature entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    setDistanceCreature(database: number, database2: number, distance: number, repeat: number): SmartScript;
    /**
     *  On gameobject guid OR any instance of gameobject entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    setDistanceGameobject(database: number, database2: number, distance: number, repeat: number): SmartScript;
    /**
     *  If the value of specified counterID is equal to a specified value
     *  @param counterID
     *  @param value
     *  @param cooldownMin
     *  @param cooldownMax
     */
    setCounterSet(counterID: number, value: number, cooldownMin: number, cooldownMax: number): SmartScript;
    /**
     *  Master only
     */
    setSceneStart(): SmartScript;
    /**
     *  Master only
     *  @param param_string : triggerName
     */
    setSceneTrigger(param_string: number): SmartScript;
    /**
     *  Master only
     */
    setSceneCancel(): SmartScript;
    /**
     *  Master only
     */
    setSceneComplete(): SmartScript;
    /**
     *
     */
    setSummonedUnitDies(): SmartScript;
    setCustom(id: number, params: {
        param1?: number;
        param2?: number;
        param3?: number;
        param4?: number;
    }): SmartScript;
}

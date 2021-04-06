/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { SmartScript } from "./SmartScript";

export class AttachedScript<T> {
    protected create : () => SmartScript<T>;

    constructor(create: () => SmartScript<T>) {
        this.create = create;
    }

    /**
     *  In combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateIc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setUpdateIc(InitialMin,InitialMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  Out of combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateOoc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setUpdateOoc(InitialMin,InitialMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setHealthPct(HPMin,HPMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setManaPct(ManaMin,ManaMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Aggro
     */
    onAggro() {
        const row = this.create();
        row.Event.setAggro()
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Kill
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param Player only (0/1)
     *  @param Creature entry (if param3 is 0)
     */
    onKill(CooldownMin : number, CooldownMax : number, Player : number, Creature : number) {
        const row = this.create();
        row.Event.setKill(CooldownMin,CooldownMax,Player,Creature)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Death
     */
    onDeath() {
        const row = this.create();
        row.Event.setDeath()
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Evade Attack
     */
    onEvade() {
        const row = this.create();
        row.Event.setEvade()
        return row as SmartScript<T>;
    }

    /**
     *  On Creature/Gameobject Spell Hit
     *  @param SpellID
     *  @param School
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSpellhit(SpellID : number, School : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setSpellhit(SpellID,School,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target In Range
     *  @param MinDist
     *  @param MaxDist
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRange(MinDist : number, MaxDist : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setRange(MinDist,MaxDist,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target In Distance Out of Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onOocLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number) {
        const row = this.create();
        row.Event.setOocLos(NoHostile,MaxRange,CooldownMin,CooldownMax,zo)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature/Gameobject Respawn
     *  @param type (None= 0, Map = 1, Area = 2)
     *  @param MapId
     *  @param ZoneId
     */
    onRespawn(type : number, MapId : number, ZoneId : number) {
        const row = this.create();
        row.Event.setRespawn(type,MapId,ZoneId)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setTargetHealthPct(HPMin,HPMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Casting Spell
     *  @param RepeatMin
     *  @param RepeatMax
     *  @param Spell id (0 any)
     */
    onVictimCasting(RepeatMin : number, RepeatMax : number, Spell : number) {
        const row = this.create();
        row.Event.setVictimCasting(RepeatMin,RepeatMax,Spell)
        return row as SmartScript<T>;
    }

    /**
     *  On Friendly Health Deficit
     *  @param HPDeficit
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyHealth(HPDeficit : number, Radius : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setFriendlyHealth(HPDeficit,Radius,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyIsCc(Radius : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setFriendlyIsCc(Radius,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Friendly Lost Buff
     *  @param SpellId
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyMissingBuff(SpellId : number, Radius : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setFriendlyMissingBuff(SpellId,Radius,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature/Gameobject Summoned Unit
     *  @param CretureId (0 all)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonedUnit(CretureId : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setSummonedUnit(CretureId,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setTargetManaPct(ManaMin,ManaMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Accepted Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onAcceptedQuest(QuestID : number) {
        const row = this.create();
        row.Event.setAcceptedQuest(QuestID)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Rewarded Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRewardQuest(QuestID : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setRewardQuest(QuestID,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Reached Home
     */
    onReachedHome() {
        const row = this.create();
        row.Event.setReachedHome()
        return row as SmartScript<T>;
    }

    /**
     *  On Receive Emote.
     *  @param EmoteId
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveEmote(EmoteId : number, CooldownMin : number = 0, CooldownMax : number = 0) {
        const row = this.create();
        row.Event.setReceiveEmote(EmoteId,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Has Aura
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHasAura(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setHasAura(SpellID,Stacks,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Buffed With Spell
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetBuffed(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setTargetBuffed(SpellID,Stacks,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  After Combat, On Respawn or Spawn
     */
    onReset() {
        const row = this.create();
        row.Event.setReset()
        return row as SmartScript<T>;
    }

    /**
     *  On Target In Distance In Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onIcLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number) {
        const row = this.create();
        row.Event.setIcLos(NoHostile,MaxRange,CooldownMin,CooldownMax,zo)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerBoarded(CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setPassengerBoarded(CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerRemoved(CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setPassengerRemoved(CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Charmed
     *  @param 0 (on charm apply) / 1 (on charm remove)
     */
    onCharmed(ZERO : number) {
        const row = this.create();
        row.Event.setCharmed(ZERO)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Charmed
     */
    onCharmedTarget() {
        const row = this.create();
        row.Event.setCharmedTarget()
        return row as SmartScript<T>;
    }

    /**
     *  On Target Spell Hit
     *  @param SpellId
     *  @param School
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onSpellhitTarget(SpellId : number, School : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setSpellhitTarget(SpellId,School,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamaged(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setDamaged(MinDmg,MaxDmg,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamagedTarget(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setDamagedTarget(MinDmg,MaxDmg,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  MovementType
     *  @param MovementType (0=any)
     *  @param PointID
     */
    onMovementinform(MovementType : number, PointID : number) {
        const row = this.create();
        row.Event.setMovementinform(MovementType,PointID)
        return row as SmartScript<T>;
    }

    /**
     *  On Summoned Unit Despawned
     *  @param Entry
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonDespawned(Entry : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setSummonDespawned(Entry,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Corpse Removed
     */
    onCorpseRemoved() {
        const row = this.create();
        row.Event.setCorpseRemoved()
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onAiInit() {
        const row = this.create();
        row.Event.setAiInit()
        return row as SmartScript<T>;
    }

    /**
     *  On Creature/Gameobject Data Set, Can be used with SMART_ACTION_SET_DATA
     *  @param Field
     *  @param Value
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onDataSet(Field : number, Value : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setDataSet(Field,Value,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Waypoint ID Started
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointStart(PointId : number, pathId : number) {
        const row = this.create();
        row.Event.setWaypointStart(PointId,pathId)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Waypoint ID Reached
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointReached(PointId : number, pathId : number) {
        const row = this.create();
        row.Event.setWaypointReached(PointId,pathId)
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onTransportAddplayer() {
        const row = this.create();
        row.Event.setTransportAddplayer()
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param Entry (0 any)
     */
    onTransportAddcreature(Entry : number) {
        const row = this.create();
        row.Event.setTransportAddcreature(Entry)
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onTransportRemovePlayer() {
        const row = this.create();
        row.Event.setTransportRemovePlayer()
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param PointId
     */
    onTransportRelocate(PointId : number) {
        const row = this.create();
        row.Event.setTransportRelocate(PointId)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param Team (0 any)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onInstancePlayerEnter(Team : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setInstancePlayerEnter(Team,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param TriggerId (0 any)
     */
    onAreatriggerOntrigger(TriggerId : number) {
        const row = this.create();
        row.Event.setAreatriggerOntrigger(TriggerId)
        return row as SmartScript<T>;
    }

    /**
     *  On Target Quest Objective Completed
     */
    onQuestObjCompletion() {
        const row = this.create();
        row.Event.setQuestObjCompletion()
        return row as SmartScript<T>;
    }

    /**
     *  On Target Quest Completed
     */
    onQuestCompletion() {
        const row = this.create();
        row.Event.setQuestCompletion()
        return row as SmartScript<T>;
    }

    /**
     *  On Target Quest Rewarded
     */
    onQuestRewarded() {
        const row = this.create();
        row.Event.setQuestRewarded()
        return row as SmartScript<T>;
    }

    /**
     *  On Target Quest Field
     */
    onQuestFail() {
        const row = this.create();
        row.Event.setQuestFail()
        return row as SmartScript<T>;
    }

    /**
     *  On TEXT_OVER Event Triggered After SMART_ACTION_TALK
     *  @param GroupId (from creature_text)
     *  @param Creature.Id (0 any)
     */
    onTextOver(GroupId : number, CreatureId : number) {
        const row = this.create();
        row.Event.setTextOver(GroupId,CreatureId)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Received Healing
     *  @param MinHeal
     *  @param MaxHeal
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveHeal(MinHeal : number, MaxHeal : number, CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setReceiveHeal(MinHeal,MaxHeal,CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Just spawned
     */
    onJustSummoned() {
        const row = this.create();
        row.Event.setJustSummoned()
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Paused at Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointPaused(PointId : number, pathID : number) {
        const row = this.create();
        row.Event.setWaypointPaused(PointId,pathID)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Resumed after Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointResumed(PointId : number, pathID : number) {
        const row = this.create();
        row.Event.setWaypointResumed(PointId,pathID)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Stopped On Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointStopped(PointId : number, pathID : number) {
        const row = this.create();
        row.Event.setWaypointStopped(PointId,pathID)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature Waypoint Path Ended
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointEnded(PointId : number, pathID : number) {
        const row = this.create();
        row.Event.setWaypointEnded(PointId,pathID)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param Id
     */
    onTimedEventTriggered(Id : number) {
        const row = this.create();
        row.Event.setTimedEventTriggered(Id)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdate(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        const row = this.create();
        row.Event.setUpdate(InitialMin,InitialMax,RepeatMin,RepeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  Used to link together multiple events as a chain of events.
     */
    onLink() {
        const row = this.create();
        row.Event.setLink()
        return row as SmartScript<T>;
    }

    /**
     *  On gossip clicked (gossip_menu_option335).
     *  @param menu_id
     *  @param id
     */
    onGossipSelect(menu_id : number, id : number) {
        const row = this.create();
        row.Event.setGossipSelect(menu_id,id)
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onJustCreated() {
        const row = this.create();
        row.Event.setJustCreated()
        return row as SmartScript<T>;
    }

    /**
     *  On Right-Click Creature/Gameobject that have gossip enabled.
     *  @param 0/1/2 (For gameobject only) 0 = on gossip hello and on report use This might result in the action being executed twice when clicking the GameObject, 1 = on gossip hello only, 2 = on report use only
     */
    onGossipHello(zo : number) {
        const row = this.create();
        row.Event.setGossipHello(zo)
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onFollowCompleted() {
        const row = this.create();
        row.Event.setFollowCompleted()
        return row as SmartScript<T>;
    }

    /**
     *  On event phase mask set
     *  @param event phase mask
     */
    onEventPhaseChange(event : number) {
        const row = this.create();
        row.Event.setEventPhaseChange(event)
        return row as SmartScript<T>;
    }

    /**
     *  On Creature is behind target.
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onIsBehindTarget(CooldownMin : number, CooldownMax : number) {
        const row = this.create();
        row.Event.setIsBehindTarget(CooldownMin,CooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  On game_event started.
     *  @param game_event.eventEntry
     */
    onGameEventStart(game_eventeventEntry : number) {
        const row = this.create();
        row.Event.setGameEventStart(game_eventeventEntry)
        return row as SmartScript<T>;
    }

    /**
     *  On game_event ended.
     *  @param game_event.eventEntry
     */
    onGameEventEnd(game_eventeventEntry : number) {
        const row = this.create();
        row.Event.setGameEventEnd(game_eventeventEntry)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param State (0 - Not Ready, 1 - Ready, 2 - Activacted, 3 - Just deactivated)
     */
    onGoLootStateChanged(State : number) {
        const row = this.create();
        row.Event.setGoLootStateChanged(State)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param EventId
     */
    onGoEventInform(EventId : number) {
        const row = this.create();
        row.Event.setGoEventInform(EventId)
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param EventId
     */
    onActionDone(EventId : number) {
        const row = this.create();
        row.Event.setActionDone(EventId)
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onOnSpellclick() {
        const row = this.create();
        row.Event.setOnSpellclick()
        return row as SmartScript<T>;
    }

    /**
     *  
     *  @param minHpPct
     *  @param maxHpPct
     *  @param repeatMin
     *  @param repeatMax
     */
    onFriendlyHealthPct(minHpPct : number, maxHpPct : number, repeatMin : number, repeatMax : number) {
        const row = this.create();
        row.Event.setFriendlyHealthPct(minHpPct,maxHpPct,repeatMin,repeatMax)
        return row as SmartScript<T>;
    }

    /**
     *  On creature guid OR any instance of creature entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceCreature(database : number, database2 : number, distance : number, repeat : number) {
        const row = this.create();
        row.Event.setDistanceCreature(database,database2,distance,repeat)
        return row as SmartScript<T>;
    }

    /**
     *  On gameobject guid OR any instance of gameobject entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceGameobject(database : number, database2 : number, distance : number, repeat : number) {
        const row = this.create();
        row.Event.setDistanceGameobject(database,database2,distance,repeat)
        return row as SmartScript<T>;
    }

    /**
     *  If the value of specified counterID is equal to a specified value
     *  @param counterID
     *  @param value
     *  @param cooldownMin
     *  @param cooldownMax
     */
    onCounterSet(counterID : number, value : number, cooldownMin : number, cooldownMax : number) {
        const row = this.create();
        row.Event.setCounterSet(counterID,value,cooldownMin,cooldownMax)
        return row as SmartScript<T>;
    }

    /**
     *  Master only
     */
    onSceneStart() {
        const row = this.create();
        row.Event.setSceneStart()
        return row as SmartScript<T>;
    }

    /**
     *  Master only
     *  @param param_string : triggerName
     */
    onSceneTrigger(param_string : number) {
        const row = this.create();
        row.Event.setSceneTrigger(param_string)
        return row as SmartScript<T>;
    }

    /**
     *  Master only
     */
    onSceneCancel() {
        const row = this.create();
        row.Event.setSceneCancel()
        return row as SmartScript<T>;
    }

    /**
     *  Master only
     */
    onSceneComplete() {
        const row = this.create();
        row.Event.setSceneComplete()
        return row as SmartScript<T>;
    }

    /**
     *  
     */
    onSummonedUnitDies() {
        const row = this.create();
        row.Event.setSummonedUnitDies()
        return row as SmartScript<T>;
    }
}
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
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { SmartScript } from "./SmartScript";

export class AttachedScript<T> extends CellSystem<T> {
    protected create : () => SmartScript;

    constructor(owner: T, create: () => SmartScript) {
        super(owner);
        this.create = create;
    }

    /**
     *  In combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateIc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setUpdateIc(InitialMin,InitialMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  Out of combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdateOoc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setUpdateOoc(InitialMin,InitialMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setHealthPct(HPMin,HPMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setManaPct(ManaMin,ManaMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Aggro
     */
    onAggro(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setAggro()
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Kill
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param Player only (0/1)
     *  @param Creature entry (if param3 is 0)
     */
    onKill(CooldownMin : number, CooldownMax : number, Player : number, Creature : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setKill(CooldownMin,CooldownMax,Player,Creature)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Death
     */
    onDeath(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDeath()
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Evade Attack
     */
    onEvade(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setEvade()
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature/Gameobject Spell Hit
     *  @param SpellID
     *  @param School
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSpellhit(SpellID : number, School : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSpellhit(SpellID,School,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target In Range
     *  @param MinDist
     *  @param MaxDist
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRange(MinDist : number, MaxDist : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setRange(MinDist,MaxDist,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target In Distance Out of Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onOocLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setOocLos(NoHostile,MaxRange,CooldownMin,CooldownMax,zo)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature/Gameobject Respawn
     *  @param type (None= 0, Map = 1, Area = 2)
     *  @param MapId
     *  @param ZoneId
     */
    onRespawn(type : number, MapId : number, ZoneId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setRespawn(type,MapId,ZoneId)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTargetHealthPct(HPMin,HPMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Casting Spell
     *  @param RepeatMin
     *  @param RepeatMax
     *  @param Spell id (0 any)
     */
    onVictimCasting(RepeatMin : number, RepeatMax : number, Spell : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setVictimCasting(RepeatMin,RepeatMax,Spell)
        callback(row);
        return this.owner;
    }

    /**
     *  On Friendly Health Deficit
     *  @param HPDeficit
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyHealth(HPDeficit : number, Radius : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setFriendlyHealth(HPDeficit,Radius,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyIsCc(Radius : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setFriendlyIsCc(Radius,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Friendly Lost Buff
     *  @param SpellId
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onFriendlyMissingBuff(SpellId : number, Radius : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setFriendlyMissingBuff(SpellId,Radius,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature/Gameobject Summoned Unit
     *  @param CretureId (0 all)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonedUnit(CretureId : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSummonedUnit(CretureId,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTargetManaPct(ManaMin,ManaMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Accepted Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onAcceptedQuest(QuestID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setAcceptedQuest(QuestID)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Rewarded Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onRewardQuest(QuestID : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setRewardQuest(QuestID,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Reached Home
     */
    onReachedHome(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setReachedHome()
        callback(row);
        return this.owner;
    }

    /**
     *  On Receive Emote.
     *  @param EmoteId
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveEmote(EmoteId : number, CooldownMin : number = 0, CooldownMax : number = 0, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setReceiveEmote(EmoteId,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Has Aura
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onHasAura(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setHasAura(SpellID,Stacks,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Buffed With Spell
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onTargetBuffed(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTargetBuffed(SpellID,Stacks,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  After Combat, On Respawn or Spawn
     */
    onReset(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setReset()
        callback(row);
        return this.owner;
    }

    /**
     *  On Target In Distance In Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    onIcLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setIcLos(NoHostile,MaxRange,CooldownMin,CooldownMax,zo)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerBoarded(CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setPassengerBoarded(CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onPassengerRemoved(CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setPassengerRemoved(CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Charmed
     *  @param 0 (on charm apply) / 1 (on charm remove)
     */
    onCharmed(ZERO : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setCharmed(ZERO)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Charmed
     */
    onCharmedTarget(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setCharmedTarget()
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Spell Hit
     *  @param SpellId
     *  @param School
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onSpellhitTarget(SpellId : number, School : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSpellhitTarget(SpellId,School,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamaged(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDamaged(MinDmg,MaxDmg,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onDamagedTarget(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDamagedTarget(MinDmg,MaxDmg,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  MovementType
     *  @param MovementType (0=any)
     *  @param PointID
     */
    onMovementinform(MovementType : number, PointID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setMovementinform(MovementType,PointID)
        callback(row);
        return this.owner;
    }

    /**
     *  On Summoned Unit Despawned
     *  @param Entry
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onSummonDespawned(Entry : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSummonDespawned(Entry,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Corpse Removed
     */
    onCorpseRemoved(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setCorpseRemoved()
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onAiInit(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setAiInit()
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature/Gameobject Data Set, Can be used with SMART_ACTION_SET_DATA
     *  @param Field
     *  @param Value
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onDataSet(Field : number, Value : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDataSet(Field,Value,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Waypoint ID Started
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointStart(PointId : number, pathId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointStart(PointId,pathId)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Waypoint ID Reached
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    onWaypointReached(PointId : number, pathId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointReached(PointId,pathId)
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onTransportAddplayer(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTransportAddplayer()
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param Entry (0 any)
     */
    onTransportAddcreature(Entry : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTransportAddcreature(Entry)
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onTransportRemovePlayer(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTransportRemovePlayer()
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param PointId
     */
    onTransportRelocate(PointId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTransportRelocate(PointId)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param Team (0 any)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onInstancePlayerEnter(Team : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setInstancePlayerEnter(Team,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param TriggerId (0 any)
     */
    onAreatriggerOntrigger(TriggerId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setAreatriggerOntrigger(TriggerId)
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Quest Objective Completed
     */
    onQuestObjCompletion(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setQuestObjCompletion()
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Quest Completed
     */
    onQuestCompletion(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setQuestCompletion()
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Quest Rewarded
     */
    onQuestRewarded(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setQuestRewarded()
        callback(row);
        return this.owner;
    }

    /**
     *  On Target Quest Field
     */
    onQuestFail(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setQuestFail()
        callback(row);
        return this.owner;
    }

    /**
     *  On TEXT_OVER Event Triggered After SMART_ACTION_TALK
     *  @param GroupId (from creature_text)
     *  @param Creature.Id (0 any)
     */
    onTextOver(GroupId : number, CreatureId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTextOver(GroupId,CreatureId)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Received Healing
     *  @param MinHeal
     *  @param MaxHeal
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onReceiveHeal(MinHeal : number, MaxHeal : number, CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setReceiveHeal(MinHeal,MaxHeal,CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Just spawned
     */
    onJustSummoned(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setJustSummoned()
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Paused at Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointPaused(PointId : number, pathID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointPaused(PointId,pathID)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Resumed after Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointResumed(PointId : number, pathID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointResumed(PointId,pathID)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Stopped On Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointStopped(PointId : number, pathID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointStopped(PointId,pathID)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature Waypoint Path Ended
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    onWaypointEnded(PointId : number, pathID : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setWaypointEnded(PointId,pathID)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param Id
     */
    onTimedEventTriggered(Id : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setTimedEventTriggered(Id)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    onUpdate(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setUpdate(InitialMin,InitialMax,RepeatMin,RepeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  Used to link together multiple events as a chain of events.
     */
    onLink(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setLink()
        callback(row);
        return this.owner;
    }

    /**
     *  On gossip clicked (gossip_menu_option335).
     *  @param menu_id
     *  @param id
     */
    onGossipSelect(menu_id : number, id : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGossipSelect(menu_id,id)
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onJustCreated(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setJustCreated()
        callback(row);
        return this.owner;
    }

    /**
     *  On Right-Click Creature/Gameobject that have gossip enabled.
     *  @param 0/1/2 (For gameobject only) 0 = on gossip hello and on report use This might result in the action being executed twice when clicking the GameObject, 1 = on gossip hello only, 2 = on report use only
     */
    onGossipHello(zo : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGossipHello(zo)
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onFollowCompleted(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setFollowCompleted()
        callback(row);
        return this.owner;
    }

    /**
     *  On event phase mask set
     *  @param event phase mask
     */
    onEventPhaseChange(event : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setEventPhaseChange(event)
        callback(row);
        return this.owner;
    }

    /**
     *  On Creature is behind target.
     *  @param CooldownMin
     *  @param CooldownMax
     */
    onIsBehindTarget(CooldownMin : number, CooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setIsBehindTarget(CooldownMin,CooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On game_event started.
     *  @param game_event.eventEntry
     */
    onGameEventStart(game_eventeventEntry : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGameEventStart(game_eventeventEntry)
        callback(row);
        return this.owner;
    }

    /**
     *  On game_event ended.
     *  @param game_event.eventEntry
     */
    onGameEventEnd(game_eventeventEntry : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGameEventEnd(game_eventeventEntry)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param State (0 - Not Ready, 1 - Ready, 2 - Activacted, 3 - Just deactivated)
     */
    onGoLootStateChanged(State : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGoLootStateChanged(State)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param EventId
     */
    onGoEventInform(EventId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setGoEventInform(EventId)
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param EventId
     */
    onActionDone(EventId : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setActionDone(EventId)
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onOnSpellclick(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setOnSpellclick()
        callback(row);
        return this.owner;
    }

    /**
     *
     *  @param minHpPct
     *  @param maxHpPct
     *  @param repeatMin
     *  @param repeatMax
     */
    onFriendlyHealthPct(minHpPct : number, maxHpPct : number, repeatMin : number, repeatMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setFriendlyHealthPct(minHpPct,maxHpPct,repeatMin,repeatMax)
        callback(row);
        return this.owner;
    }

    /**
     *  On creature guid OR any instance of creature entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceCreature(database : number, database2 : number, distance : number, repeat : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDistanceCreature(database,database2,distance,repeat)
        callback(row);
        return this.owner;
    }

    /**
     *  On gameobject guid OR any instance of gameobject entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    onDistanceGameobject(database : number, database2 : number, distance : number, repeat : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setDistanceGameobject(database,database2,distance,repeat)
        callback(row);
        return this.owner;
    }

    /**
     *  If the value of specified counterID is equal to a specified value
     *  @param counterID
     *  @param value
     *  @param cooldownMin
     *  @param cooldownMax
     */
    onCounterSet(counterID : number, value : number, cooldownMin : number, cooldownMax : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setCounterSet(counterID,value,cooldownMin,cooldownMax)
        callback(row);
        return this.owner;
    }

    /**
     *  Master only
     */
    onSceneStart(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSceneStart()
        callback(row);
        return this.owner;
    }

    /**
     *  Master only
     *  @param param_string : triggerName
     */
    onSceneTrigger(param_string : number, callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSceneTrigger(param_string)
        callback(row);
        return this.owner;
    }

    /**
     *  Master only
     */
    onSceneCancel(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSceneCancel()
        callback(row);
        return this.owner;
    }

    /**
     *  Master only
     */
    onSceneComplete(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSceneComplete()
        callback(row);
        return this.owner;
    }

    /**
     *
     */
    onSummonedUnitDies(callback: (script: SmartScript)=>void) {
        const row = this.create();
        row.Event.setSummonedUnitDies()
        callback(row);
        return this.owner;
    }

    onCustom(
          id: number
          , params: {
              param1?: number
            , param2?: number
            , param3?: number
            , param4?: number
          }
          , callback: (script: SmartScript)=>void
    ) {
        const row = this.create();
        row.Event.setCustom(id,params);
        callback(row);
        return this.owner;
    }
}
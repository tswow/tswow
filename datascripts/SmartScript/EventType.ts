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
import { smart_scriptsRow } from "wotlkdata/wotlkdata/sql/types/smart_scripts"
import { SmartScript } from "./SmartScript"

const EVENT_TYPES : {[key:string]:string} = {
    '0': 'UpdateIc',
    '1': 'UpdateOoc',
    '2': 'HealthPct',
    '3': 'ManaPct',
    '4': 'Aggro',
    '5': 'Kill',
    '6': 'Death',
    '7': 'Evade',
    '8': 'Spellhit',
    '9': 'Range',
    '10': 'OocLos',
    '11': 'Respawn',
    '12': 'TargetHealthPct',
    '13': 'VictimCasting',
    '14': 'FriendlyHealth',
    '15': 'FriendlyIsCc',
    '16': 'FriendlyMissingBuff',
    '17': 'SummonedUnit',
    '18': 'TargetManaPct',
    '19': 'AcceptedQuest',
    '20': 'RewardQuest',
    '21': 'ReachedHome',
    '22': 'ReceiveEmote',
    '23': 'HasAura',
    '24': 'TargetBuffed',
    '25': 'Reset',
    '26': 'IcLos',
    '27': 'PassengerBoarded',
    '28': 'PassengerRemoved',
    '29': 'Charmed',
    '30': 'CharmedTarget',
    '31': 'SpellhitTarget',
    '32': 'Damaged',
    '33': 'DamagedTarget',
    '34': 'Movementinform',
    '35': 'SummonDespawned',
    '36': 'CorpseRemoved',
    '37': 'AiInit',
    '38': 'DataSet',
    '39': 'WaypointStart',
    '40': 'WaypointReached',
    '41': 'TransportAddplayer',
    '42': 'TransportAddcreature',
    '43': 'TransportRemovePlayer',
    '44': 'TransportRelocate',
    '45': 'InstancePlayerEnter',
    '46': 'AreatriggerOntrigger',
    '47': 'QuestAccepted',
    '48': 'QuestObjCompletion',
    '49': 'QuestCompletion',
    '50': 'QuestRewarded',
    '51': 'QuestFail',
    '52': 'TextOver',
    '53': 'ReceiveHeal',
    '54': 'JustSummoned',
    '55': 'WaypointPaused',
    '56': 'WaypointResumed',
    '57': 'WaypointStopped',
    '58': 'WaypointEnded',
    '59': 'TimedEventTriggered',
    '60': 'Update',
    '61': 'Link',
    '62': 'GossipSelect',
    '63': 'JustCreated',
    '64': 'GossipHello',
    '65': 'FollowCompleted',
    '66': 'EventPhaseChange',
    '67': 'IsBehindTarget',
    '68': 'GameEventStart',
    '69': 'GameEventEnd',
    '70': 'GoLootStateChanged',
    '71': 'GoEventInform',
    '72': 'ActionDone',
    '73': 'OnSpellclick',
    '74': 'FriendlyHealthPct',
    '75': 'DistanceCreature',
    '76': 'DistanceGameobject',
    '77': 'CounterSet',
    '78': 'SceneStart',
    '79': 'SceneTrigger',
    '80': 'SceneCancel',
    '81': 'SceneComplete',
    '82': 'SummonedUnitDies'
}

export const EVENT_ARGS : {[key:string]:string[]} = {
    '0': ['InitialMin','InitialMax','RepeatMin','RepeatMax',''],
    '1': ['InitialMin','InitialMax','RepeatMin','RepeatMax',''],
    '2': ['HPMin','HPMax','RepeatMin','RepeatMax',''],
    '3': ['ManaMin','ManaMax','RepeatMin','RepeatMax',''],
    '4': ['','','','',''],
    '5': ['CooldownMin','CooldownMax','isPlayerOnly','creatureEntry',''],
    '6': ['','','','',''],
    '7': ['','','','',''],
    '8': ['SpellID','School','CooldownMin','CooldownMax',''],
    '9': ['MinDist','MaxDist','RepeatMin','RepeatMax',''],
    '10': ['NoHostile','MaxRange','CooldownMin','CooldownMax','isPlayerOnly'],
    '11': ['type','MapId','ZoneId','',''],
    '12': ['HPMin','HPMax','RepeatMin','RepeatMax',''],
    '13': ['RepeatMin','RepeatMax','SpellId','',''],
    '14': ['HPDeficit','Radius','RepeatMin','RepeatMax',''],
    '15': ['Radius','RepeatMin','RepeatMax','',''],
    '16': ['SpellId','Radius','RepeatMin','RepeatMax',''],
    '17': ['CretureId','CooldownMin','CooldownMax','',''],
    '18': ['ManaMin','ManaMax','RepeatMin','RepeatMax',''],
    '19': ['QuestID','RepeatMin','RepeatMax','',''],
    '20': ['QuestID','RepeatMin','RepeatMax','',''],
    '21': ['','','','',''],
    '22': ['EmoteId','CooldownMin','CooldownMax','',''],
    '23': ['SpellID','Stacks','RepeatMin','RepeatMax',''],
    '24': ['SpellID','Stacks','RepeatMin','RepeatMax',''],
    '25': ['','','','',''],
    '26': ['NoHostile','MaxRange','CooldownMin','CooldownMax','isPlayerOnly'],
    '27': ['CooldownMin','CooldownMax','','',''],
    '28': ['CooldownMin','CooldownMax','','',''],
    '29': ['0','','','',''],
    '30': ['','','','',''],
    '31': ['SpellId','School','RepeatMin','RepeatMax',''],
    '32': ['MinDmg','MaxDmg','RepeatMin','RepeatMax',''],
    '33': ['MinDmg','MaxDmg','RepeatMin','RepeatMax',''],
    '34': ['MovementType','PointID','','',''],
    '35': ['Entry','CooldownMin','CooldownMax','',''],
    '36': ['','','','',''],
    '37': ['','','','',''],
    '38': ['Field','Value','CooldownMin','CooldownMax',''],
    '39': ['pointId','pathId','','',''],
    '40': ['pointId','pathId','','',''],
    '41': ['','','','',''],
    '42': ['entry','','','',''],
    '43': ['','','','',''],
    '44': ['pointId','','','',''],
    '45': ['team','cooldownMin','cooldownMax','',''],
    '46': ['triggerId','','','',''],
    '47': ['','','','',''],
    '48': ['','','','',''],
    '49': ['','','','',''],
    '50': ['','','','',''],
    '51': ['','','','',''],
    '52': ['groupId','creatureId','','',''],
    '53': ['minHeal','maxHeal','cooldownMin','cooldownMax',''],
    '54': ['','','','',''],
    '55': ['PointId','pathID','','',''],
    '56': ['PointId','pathID','','',''],
    '57': ['PointId','pathID','','',''],
    '58': ['PointId','pathID','','',''],
    '59': ['Id','','','',''],
    '60': ['InitialMin','InitialMax','RepeatMin','RepeatMax',''],
    '61': ['','','','',''],
    '62': ['menu_id','id','','',''],
    '63': ['','','','',''],
    '64': ['arg0','','','',''],
    '65': ['','','','',''],
    '66': ['phasemask','','','',''],
    '67': ['CooldownMin','CooldownMax','','',''],
    '68': ['eventEntry','','','',''],
    '69': ['eventEntry','','','',''],
    '70': ['state','','','',''],
    '71': ['EventId','','','',''],
    '72': ['EventId','','','',''],
    '73': ['','','','',''],
    '74': ['minHpPct','maxHpPct','repeatMin','repeatMax',''],
    '75': ['database guid','database entry','distance','interval',''],
    '76': ['database guid','database entry','distance','interval',''],
    '77': ['counterID','value','cooldownMin','cooldownMax',''],
    '78': ['none','','','',''],
    '79': ['triggerName','','','',''],
    '80': ['none','','','',''],
    '81': ['none','','','',''],
    '82': ['none','','','','']
}

export class EventType<T> {
    protected row : smart_scriptsRow
    protected main : SmartScript

    constructor(main: SmartScript, row: smart_scriptsRow) {
        this.row = row
        this.main = main
    }

    getType() {
        return EVENT_TYPES[this.row.event_type.get()]
    }

    getArguments() {
        const argmap : {[key:string]:number}= {}
        const arglist = EVENT_ARGS[this.row.event_type.get()]
        if(arglist[0].length>0) argmap[arglist[0]] = this.row.event_param1.get()
        if(arglist[1].length>0) argmap[arglist[1]] = this.row.event_param2.get()
        if(arglist[2].length>0) argmap[arglist[2]] = this.row.event_param3.get()
        if(arglist[3].length>0) argmap[arglist[3]] = this.row.event_param4.get()
        if(arglist[4].length>0) argmap[arglist[4]] = this.row.event_param5.get()
        return argmap
    }

    objectify() {
        return {type: this.getType(), arguments: this.getArguments()}
    }

    /**
     *  In combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdateIc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(0)
        this.row.event_param1.set(InitialMin)
        this.row.event_param2.set(InitialMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  Out of combat.
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdateOoc(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(1)
        this.row.event_param1.set(InitialMin)
        this.row.event_param2.set(InitialMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(2)
        this.row.event_param1.set(HPMin)
        this.row.event_param2.set(HPMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(3)
        this.row.event_param1.set(ManaMin)
        this.row.event_param2.set(ManaMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Creature Aggro
     */
    setAggro() {
        this.row.event_type.set(4)
        return this.main
    }

    /**
     *  On Creature Kill
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param Player only (0/1)
     *  @param Creature entry (if param3 is 0)
     */
    setKill(CooldownMin : number, CooldownMax : number, Player : number, Creature : number) {
        this.row.event_type.set(5)
        this.row.event_param1.set(CooldownMin)
        this.row.event_param2.set(CooldownMax)
        this.row.event_param3.set(Player)
        this.row.event_param4.set(Creature)
        return this.main
    }

    /**
     *  On Creature Death
     */
    setDeath() {
        this.row.event_type.set(6)
        return this.main
    }

    /**
     *  On Creature Evade Attack
     */
    setEvade() {
        this.row.event_type.set(7)
        return this.main
    }

    /**
     *  On Creature/Gameobject Spell Hit
     *  @param SpellID
     *  @param School
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSpellhit(SpellID : number, School : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(8)
        this.row.event_param1.set(SpellID)
        this.row.event_param2.set(School)
        this.row.event_param3.set(CooldownMin)
        this.row.event_param4.set(CooldownMax)
        return this.main
    }

    /**
     *  On Target In Range
     *  @param MinDist
     *  @param MaxDist
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setRange(MinDist : number, MaxDist : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(9)
        this.row.event_param1.set(MinDist)
        this.row.event_param2.set(MaxDist)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Target In Distance Out of Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    setOocLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number) {
        this.row.event_type.set(10)
        this.row.event_param1.set(NoHostile)
        this.row.event_param2.set(MaxRange)
        this.row.event_param3.set(CooldownMin)
        this.row.event_param4.set(CooldownMax)
        this.row.event_param5.set(zo)
        return this.main
    }

    /**
     *  On Creature/Gameobject Respawn
     *  @param type (None= 0, Map = 1, Area = 2)
     *  @param MapId
     *  @param ZoneId
     */
    setRespawn(type : number, MapId : number, ZoneId : number) {
        this.row.event_type.set(11)
        this.row.event_param1.set(type)
        this.row.event_param2.set(MapId)
        this.row.event_param3.set(ZoneId)
        return this.main
    }

    /**
     *  On Target Health Percentage
     *  @param HPMin%
     *  @param HPMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetHealthPct(HPMin : number, HPMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(12)
        this.row.event_param1.set(HPMin)
        this.row.event_param2.set(HPMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Target Casting Spell
     *  @param RepeatMin
     *  @param RepeatMax
     *  @param Spell id (0 any)
     */
    setVictimCasting(RepeatMin : number, RepeatMax : number, Spell : number) {
        this.row.event_type.set(13)
        this.row.event_param1.set(RepeatMin)
        this.row.event_param2.set(RepeatMax)
        this.row.event_param3.set(Spell)
        return this.main
    }

    /**
     *  On Friendly Health Deficit
     *  @param HPDeficit
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyHealth(HPDeficit : number, Radius : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(14)
        this.row.event_param1.set(HPDeficit)
        this.row.event_param2.set(Radius)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyIsCc(Radius : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(15)
        this.row.event_param1.set(Radius)
        this.row.event_param2.set(RepeatMin)
        this.row.event_param3.set(RepeatMax)
        return this.main
    }

    /**
     *  On Friendly Lost Buff
     *  @param SpellId
     *  @param Radius
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setFriendlyMissingBuff(SpellId : number, Radius : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(16)
        this.row.event_param1.set(SpellId)
        this.row.event_param2.set(Radius)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Creature/Gameobject Summoned Unit
     *  @param CretureId (0 all)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSummonedUnit(CretureId : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(17)
        this.row.event_param1.set(CretureId)
        this.row.event_param2.set(CooldownMin)
        this.row.event_param3.set(CooldownMax)
        return this.main
    }

    /**
     *  On Target Mana Percentage
     *  @param ManaMin%
     *  @param ManaMax%
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetManaPct(ManaMin : number, ManaMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(18)
        this.row.event_param1.set(ManaMin)
        this.row.event_param2.set(ManaMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Target Accepted Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setAcceptedQuest(QuestID : number) {
        this.row.event_type.set(19)
        this.row.event_param1.set(QuestID)
        return this.main
    }

    /**
     *  On Target Rewarded Quest
     *  @param QuestID (0 any)
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setRewardQuest(QuestID : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(20)
        this.row.event_param1.set(QuestID)
        this.row.event_param2.set(RepeatMin)
        this.row.event_param3.set(RepeatMax)
        return this.main
    }

    /**
     *  On Creature Reached Home
     */
    setReachedHome() {
        this.row.event_type.set(21)
        return this.main
    }

    /**
     *  On Receive Emote.
     *  @param EmoteId
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setReceiveEmote(EmoteId : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(22)
        this.row.event_param1.set(EmoteId)
        this.row.event_param2.set(CooldownMin)
        this.row.event_param3.set(CooldownMax)
        return this.main
    }

    /**
     *  On Creature Has Aura
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setHasAura(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(23)
        this.row.event_param1.set(SpellID)
        this.row.event_param2.set(Stacks)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Target Buffed With Spell
     *  @param SpellID
     *  @param Stacks
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setTargetBuffed(SpellID : number, Stacks : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(24)
        this.row.event_param1.set(SpellID)
        this.row.event_param2.set(Stacks)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  After Combat, On Respawn or Spawn
     */
    setReset() {
        this.row.event_type.set(25)
        return this.main
    }

    /**
     *  On Target In Distance In Combat
     *  @param NoHostile
     *  @param MaxRange
     *  @param CooldownMin
     *  @param CooldownMax
     *  @param 0/1 Player Only
     */
    setIcLos(NoHostile : number, MaxRange : number, CooldownMin : number, CooldownMax : number, zo : number) {
        this.row.event_type.set(26)
        this.row.event_param1.set(NoHostile)
        this.row.event_param2.set(MaxRange)
        this.row.event_param3.set(CooldownMin)
        this.row.event_param4.set(CooldownMax)
        this.row.event_param5.set(zo)
        return this.main
    }

    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setPassengerBoarded(CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(27)
        this.row.event_param1.set(CooldownMin)
        this.row.event_param2.set(CooldownMax)
        return this.main
    }

    /**
     *
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setPassengerRemoved(CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(28)
        this.row.event_param1.set(CooldownMin)
        this.row.event_param2.set(CooldownMax)
        return this.main
    }

    /**
     *  On Creature Charmed
     *  @param 0 (on charm apply) / 1 (on charm remove)
     */
    setCharmed(ZERO : number) {
        this.row.event_type.set(29)
        this.row.event_param1.set(ZERO)
        return this.main
    }

    /**
     *  On Target Charmed
     */
    setCharmedTarget() {
        this.row.event_type.set(30)
        return this.main
    }

    /**
     *  On Target Spell Hit
     *  @param SpellId
     *  @param School
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setSpellhitTarget(SpellId : number, School : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(31)
        this.row.event_param1.set(SpellId)
        this.row.event_param2.set(School)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Creature Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setDamaged(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(32)
        this.row.event_param1.set(MinDmg)
        this.row.event_param2.set(MaxDmg)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  On Target Damaged
     *  @param MinDmg
     *  @param MaxDmg
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setDamagedTarget(MinDmg : number, MaxDmg : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(33)
        this.row.event_param1.set(MinDmg)
        this.row.event_param2.set(MaxDmg)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  MovementType
     *  @param MovementType (0=any)
     *  @param PointID
     */
    setMovementinform(MovementType : number, PointID : number) {
        this.row.event_type.set(34)
        this.row.event_param1.set(MovementType)
        this.row.event_param2.set(PointID)
        return this.main
    }

    /**
     *  On Summoned Unit Despawned
     *  @param Entry
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setSummonDespawned(Entry : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(35)
        this.row.event_param1.set(Entry)
        this.row.event_param2.set(CooldownMin)
        this.row.event_param3.set(CooldownMax)
        return this.main
    }

    /**
     *  On Creature Corpse Removed
     */
    setCorpseRemoved() {
        this.row.event_type.set(36)
        return this.main
    }

    /**
     *
     */
    setAiInit() {
        this.row.event_type.set(37)
        return this.main
    }

    /**
     *  On Creature/Gameobject Data Set, Can be used with SMART_ACTION_SET_DATA
     *  @param Field
     *  @param Value
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setDataSet(Field : number, Value : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(38)
        this.row.event_param1.set(Field)
        this.row.event_param2.set(Value)
        this.row.event_param3.set(CooldownMin)
        this.row.event_param4.set(CooldownMax)
        return this.main
    }

    /**
     *  On Creature Waypoint ID Started
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    setWaypointStart(PointId : number, pathId : number) {
        this.row.event_type.set(39)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathId)
        return this.main
    }

    /**
     *  On Creature Waypoint ID Reached
     *  @param PointId (0 any)
     *  @param pathId (0 any)
     */
    setWaypointReached(PointId : number, pathId : number) {
        this.row.event_type.set(40)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathId)
        return this.main
    }

    /**
     *
     */
    setTransportAddplayer() {
        this.row.event_type.set(41)
        return this.main
    }

    /**
     *
     *  @param Entry (0 any)
     */
    setTransportAddcreature(Entry : number) {
        this.row.event_type.set(42)
        this.row.event_param1.set(Entry)
        return this.main
    }

    /**
     *
     */
    setTransportRemovePlayer() {
        this.row.event_type.set(43)
        return this.main
    }

    /**
     *
     *  @param PointId
     */
    setTransportRelocate(PointId : number) {
        this.row.event_type.set(44)
        this.row.event_param1.set(PointId)
        return this.main
    }

    /**
     *
     *  @param Team (0 any)
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setInstancePlayerEnter(Team : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(45)
        this.row.event_param1.set(Team)
        this.row.event_param2.set(CooldownMin)
        this.row.event_param3.set(CooldownMax)
        return this.main
    }

    /**
     *
     *  @param TriggerId (0 any)
     */
    setAreatriggerOntrigger(TriggerId : number) {
        this.row.event_type.set(46)
        this.row.event_param1.set(TriggerId)
        return this.main
    }

    /**
     *  On Target Quest Accepted
     */
    setQuestAccepted(questNo: number) {
        this.row.event_type.set(47)
        this.row.event_param1.set(questNo)
        return this.main
    }

    /**
     *  On Target Quest Objective Completed
     */
    setQuestObjCompletion() {
        this.row.event_type.set(48)
        return this.main
    }

    /**
     *  On Target Quest Completed
     */
    setQuestCompletion() {
        this.row.event_type.set(49)
        return this.main
    }

    /**
     *  On Target Quest Rewarded
     */
    setQuestRewarded() {
        this.row.event_type.set(50)
        return this.main
    }

    /**
     *  On Target Quest Field
     */
    setQuestFail() {
        this.row.event_type.set(51)
        return this.main
    }

    /**
     *  On TEXT_OVER Event Triggered After SMART_ACTION_TALK
     *  @param GroupId (from creature_text)
     *  @param Creature.Id (0 any)
     */
    setTextOver(GroupId : number, CreatureId : number) {
        this.row.event_type.set(52)
        this.row.event_param1.set(GroupId)
        this.row.event_param2.set(CreatureId)
        return this.main
    }

    /**
     *  On Creature Received Healing
     *  @param MinHeal
     *  @param MaxHeal
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setReceiveHeal(MinHeal : number, MaxHeal : number, CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(53)
        this.row.event_param1.set(MinHeal)
        this.row.event_param2.set(MaxHeal)
        this.row.event_param3.set(CooldownMin)
        this.row.event_param4.set(CooldownMax)
        return this.main
    }

    /**
     *  On Creature Just spawned
     */
    setJustSummoned() {
        this.row.event_type.set(54)
        return this.main
    }

    /**
     *  On Creature Paused at Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointPaused(PointId : number, pathID : number) {
        this.row.event_type.set(55)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathID)
        return this.main
    }

    /**
     *  On Creature Resumed after Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointResumed(PointId : number, pathID : number) {
        this.row.event_type.set(56)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathID)
        return this.main
    }

    /**
     *  On Creature Stopped On Waypoint ID
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointStopped(PointId : number, pathID : number) {
        this.row.event_type.set(57)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathID)
        return this.main
    }

    /**
     *  On Creature Waypoint Path Ended
     *  @param PointId (0 any)
     *  @param pathID (0 any)
     */
    setWaypointEnded(PointId : number, pathID : number) {
        this.row.event_type.set(58)
        this.row.event_param1.set(PointId)
        this.row.event_param2.set(pathID)
        return this.main
    }

    /**
     *
     *  @param Id
     */
    setTimedEventTriggered(Id : number) {
        this.row.event_type.set(59)
        this.row.event_param1.set(Id)
        return this.main
    }

    /**
     *
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin
     *  @param RepeatMax
     */
    setUpdate(InitialMin : number, InitialMax : number, RepeatMin : number, RepeatMax : number) {
        this.row.event_type.set(60)
        this.row.event_param1.set(InitialMin)
        this.row.event_param2.set(InitialMax)
        this.row.event_param3.set(RepeatMin)
        this.row.event_param4.set(RepeatMax)
        return this.main
    }

    /**
     *  Used to link together multiple events as a chain of events.
     */
    setLink() {
        this.row.event_type.set(61)
        return this.main
    }

    /**
     *  On gossip clicked (gossip_menu_option335).
     *  @param menu_id
     *  @param id
     */
    setGossipSelect(menu_id : number, id : number) {
        this.row.event_type.set(62)
        this.row.event_param1.set(menu_id)
        this.row.event_param2.set(id)
        return this.main
    }

    /**
     *
     */
    setJustCreated() {
        this.row.event_type.set(63)
        return this.main
    }

    /**
     *  On Right-Click Creature/Gameobject that have gossip enabled.
     *  @param 0/1/2 (For gameobject only) 0 = on gossip hello and on report use This might result in the action being executed twice when clicking the GameObject, 1 = on gossip hello only, 2 = on report use only
     */
    setGossipHello(zo : number) {
        this.row.event_type.set(64)
        this.row.event_param1.set(zo)
        return this.main
    }

    /**
     *
     */
    setFollowCompleted() {
        this.row.event_type.set(65)
        return this.main
    }

    /**
     *  On event phase mask set
     *  @param event phase mask
     */
    setEventPhaseChange(event : number) {
        this.row.event_type.set(66)
        this.row.event_param1.set(event)
        return this.main
    }

    /**
     *  On Creature is behind target.
     *  @param CooldownMin
     *  @param CooldownMax
     */
    setIsBehindTarget(CooldownMin : number, CooldownMax : number) {
        this.row.event_type.set(67)
        this.row.event_param1.set(CooldownMin)
        this.row.event_param2.set(CooldownMax)
        return this.main
    }

    /**
     *  On game_event started.
     *  @param game_event.eventEntry
     */
    setGameEventStart(game_eventeventEntry : number) {
        this.row.event_type.set(68)
        this.row.event_param1.set(game_eventeventEntry)
        return this.main
    }

    /**
     *  On game_event ended.
     *  @param game_event.eventEntry
     */
    setGameEventEnd(game_eventeventEntry : number) {
        this.row.event_type.set(69)
        this.row.event_param1.set(game_eventeventEntry)
        return this.main
    }

    /**
     *
     *  @param State (0 - Not Ready, 1 - Ready, 2 - Activacted, 3 - Just deactivated)
     */
    setGoLootStateChanged(State : number) {
        this.row.event_type.set(70)
        this.row.event_param1.set(State)
        return this.main
    }

    /**
     *
     *  @param EventId
     */
    setGoEventInform(EventId : number) {
        this.row.event_type.set(71)
        this.row.event_param1.set(EventId)
        return this.main
    }

    /**
     *
     *  @param EventId
     */
    setActionDone(EventId : number) {
        this.row.event_type.set(72)
        this.row.event_param1.set(EventId)
        return this.main
    }

    /**
     *
     */
    setOnSpellclick() {
        this.row.event_type.set(73)
        return this.main
    }

    /**
     *
     *  @param minHpPct
     *  @param maxHpPct
     *  @param repeatMin
     *  @param repeatMax
     */
    setFriendlyHealthPct(minHpPct : number, maxHpPct : number, repeatMin : number, repeatMax : number) {
        this.row.event_type.set(74)
        this.row.event_param1.set(minHpPct)
        this.row.event_param2.set(maxHpPct)
        this.row.event_param3.set(repeatMin)
        this.row.event_param4.set(repeatMax)
        return this.main
    }

    /**
     *  On creature guid OR any instance of creature entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    setDistanceCreature(database : number, database2 : number, distance : number, repeat : number) {
        this.row.event_type.set(75)
        this.row.event_param1.set(database)
        this.row.event_param2.set(database2)
        this.row.event_param3.set(distance)
        this.row.event_param4.set(repeat)
        return this.main
    }

    /**
     *  On gameobject guid OR any instance of gameobject entry is within distance.
     *  @param database guid
     *  @param database entry
     *  @param distance
     *  @param repeat interval (ms)
     */
    setDistanceGameobject(database : number, database2 : number, distance : number, repeat : number) {
        this.row.event_type.set(76)
        this.row.event_param1.set(database)
        this.row.event_param2.set(database2)
        this.row.event_param3.set(distance)
        this.row.event_param4.set(repeat)
        return this.main
    }

    /**
     *  If the value of specified counterID is equal to a specified value
     *  @param counterID
     *  @param value
     *  @param cooldownMin
     *  @param cooldownMax
     */
    setCounterSet(counterID : number, value : number, cooldownMin : number, cooldownMax : number) {
        this.row.event_type.set(77)
        this.row.event_param1.set(counterID)
        this.row.event_param2.set(value)
        this.row.event_param3.set(cooldownMin)
        this.row.event_param4.set(cooldownMax)
        return this.main
    }

    /**
     *  Master only
     */
    setSceneStart() {
        this.row.event_type.set(78)
        return this.main
    }

    /**
     *  Master only
     *  @param param_string : triggerName
     */
    setSceneTrigger(param_string : number) {
        this.row.event_type.set(79)
        this.row.event_param1.set(param_string)
        return this.main
    }

    /**
     *  Master only
     */
    setSceneCancel() {
        this.row.event_type.set(80)
        return this.main
    }

    /**
     *  Master only
     */
    setSceneComplete() {
        this.row.event_type.set(81)
        return this.main
    }

    /**
     *
     */
    setSummonedUnitDies() {
        this.row.event_type.set(82)
        return this.main
    }

    setCustom(
          id: number
        , params: {
              param1?: number
            , param2?: number
            , param3?: number
            , param4?: number
            }
        ) {
            this.row.event_type.set(id);
            this.row.event_param1.set(params.param1||0);
            this.row.event_param2.set(params.param2||0);
            this.row.event_param3.set(params.param3||0);
            this.row.event_param4.set(params.param4||0);
            return this.main;
    }
}

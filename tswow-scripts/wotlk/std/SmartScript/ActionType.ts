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
import { Cell } from "../../../data/cell/cells/Cell"
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration"
import { iterLocConstructor, loc_constructor } from "../../../data/primitives"
import { smart_scriptsRow } from "../../sql/smart_scripts"
import { SQL } from "../../SQLFiles"
import { CreatureTextGroup, CreatureTextRegistry } from "../BroadcastText/CreatureText"
import { b2i } from "../Misc/BasicConversion"
import { ReactState, resolveReactState } from "../Misc/ReactState"
import { getRealEntryOrGuid, SmartScript } from "./SmartScript"
import { resolveSummonType, SummonType } from "./SummonType"

export const ACTION_TYPES : {[key:string]:string} = {
    '0': 'None',
    '1': 'Talk',
    '2': 'SetFaction',
    '3': 'MorphToEntryOrModel',
    '4': 'Sound',
    '5': 'PlayEmote',
    '6': 'FailQuest',
    '7': 'OfferQuest',
    '8': 'SetReactState',
    '9': 'ActivateGobject',
    '10': 'RandomEmote',
    '11': 'Cast',
    '12': 'SummonCreature',
    '13': 'ThreatSinglePct',
    '14': 'ThreatAllPct',
    '15': 'CallAreaexploredoreventhappens',
    '16': 'SetIngamePhaseId',
    '17': 'SetEmoteState',
    '18': 'SetUnitFlag',
    '19': 'RemoveUnitFlag',
    '20': 'AutoAttack',
    '21': 'AllowCombatMovement',
    '22': 'SetEventPhase',
    '23': 'IncEventPhase',
    '24': 'Evade',
    '25': 'FleeForAssist',
    '26': 'CallGroupeventhappens',
    '27': 'CombatStop',
    '28': 'Removeaurasfromspell',
    '29': 'Follow',
    '30': 'RandomPhase',
    '31': 'RandomPhaseRange',
    '32': 'ResetGobject',
    '33': 'CallKilledmonster',
    '34': 'SetInstData',
    '35': 'SetInstData64',
    '36': 'UpdateTemplate',
    '37': 'Die',
    '38': 'SetInCombatWithZone',
    '39': 'CallForHelp',
    '40': 'SetSheath',
    '41': 'ForceDespawn',
    '42': 'SetInvincibilityHpLevel',
    '43': 'MountToEntryOrModel',
    '44': 'SetIngamePhaseMask',
    '45': 'SetData',
    '46': 'AttackStop',
    '47': 'SetVisibility',
    '48': 'SetActive',
    '49': 'AttackStart',
    '50': 'SummonGo',
    '51': 'KillUnit',
    '52': 'ActivateTaxi',
    '53': 'WpStart',
    '54': 'WpPause',
    '55': 'WpStop',
    '56': 'AddItem',
    '57': 'RemoveItem',
    '58': 'InstallAiTemplate',
    '59': 'SetRun',
    '60': 'SetDisableGravity',
    '61': 'SetSwim',
    '62': 'Teleport',
    '63': 'SetCounter',
    '64': 'StoreTargetList',
    '65': 'WpResume',
    '66': 'SetOrientation',
    '67': 'CreateTimedEvent',
    '68': 'Playmovie',
    '69': 'MoveToPos',
    '70': 'EnableTempGobj',
    '71': 'Equip',
    '72': 'CloseGossip',
    '73': 'TriggerTimedEvent',
    '74': 'RemoveTimedEvent',
    '75': 'AddAura',
    '76': 'OverrideScriptBaseObject',
    '77': 'ResetScriptBaseObject',
    '78': 'CallScriptReset',
    '79': 'SetRangedMovement',
    '80': 'CallTimedActionlist',
    '81': 'SetNpcFlag',
    '82': 'AddNpcFlag',
    '83': 'RemoveNpcFlag',
    '84': 'SimpleTalk',
    '85': 'SelfCast',
    '86': 'CrossCast',
    '87': 'CallRandomTimedActionlist',
    '88': 'CallRandomRangeTimedActionlist',
    '89': 'RandomMove',
    '90': 'SetUnitFieldBytes1',
    '91': 'RemoveUnitFieldBytes1',
    '92': 'InterruptSpell',
    '93': 'SendGoCustomAnim',
    '94': 'SetDynamicFlag',
    '95': 'AddDynamicFlag',
    '96': 'RemoveDynamicFlag',
    '97': 'JumpToPos',
    '98': 'SendGossipMenu',
    '99': 'GoSetLootState',
    '100': 'SendTargetToTarget',
    '101': 'SetHomePos',
    '102': 'SetHealthRegen',
    '103': 'SetRoot',
    '104': 'SetGoFlag',
    '105': 'AddGoFlag',
    '106': 'RemoveGoFlag',
    '107': 'SummonCreatureGroup',
    '108': 'SetPower',
    '109': 'AddPower',
    '110': 'RemovePower',
    '111': 'GameEventStop',
    '112': 'GameEventStart',
    '113': 'StartClosestWaypoint',
    '114': 'MoveOffset',
    '115': 'RandomSound',
    '116': 'SetCorpseDelay',
    '117': 'DisableEvade',
    '118': 'GoSetGoState',
    '119': 'SetCanFly',
    '120': 'RemoveAurasByType',
    '121': 'SetSightDist',
    '122': 'Flee',
    '123': 'AddThreat',
    '124': 'LoadEquipment',
    '125': 'TriggerRandomTimedEvent',
    '126': 'RemoveAllGameobjects',
    '127': 'PauseMovement',
    '128': 'PlayAnimkit',
    '129': 'ScenePlay',
    '130': 'SceneCancel',
    '131': 'SpawnSpawngroup',
    '132': 'DespawnSpawngroup',
    '133': 'RespawnBySpawnid',
    '134': 'InvokerCast',
    '135': 'PlayCinematic',
    '136': 'SetMovementSpeed',
    '137': 'PlaySpellVisualKit',
    '138': 'OverrideLight',
    '139': 'OverrideWeather'
}

export const ACTION_ARGS : {[key:string]:string[]} = {
    '0': ['','','','','',''],
    '1': ['groupId','waitTime','triggerTalk','','',''],
    '2': ['FactionID','','','','',''],
    '3': ['entry','modelID','','','',''],
    '4': ['SoundId','onlySelf','isDistant','','',''],
    '5': ['EmoteId','','','','',''],
    '6': ['QuestID','','','','',''],
    '7': ['QuestID','directAdd','','',''],
    '8': ['State','','','','',''],
    '9': ['','','','','',''],
    '10': ['EmoteId1','EmoteId2','EmoteId3','Emote4','Emote5','Emote6'],
    '11': ['SpellId','castFlags','triggeredFlags','','',''],
    '12': ['entry','summonType','duration','attackInvoker','',''],
    '13': ['threatInc','threatDec','','','',''],
    '14': ['threatInc','threatDec','','','',''],
    '15': ['QuestID','','','','',''],
    '16': ['phaseId','apply','','','',''],
    '17': ['EmoteId','','','','',''],
    '18': ['fields','flagNo','','','',''],
    '19': ['fields','flagNo','','','',''],
    '20': ['AllowAttackState','','','','',''],
    '21': ['AllowCombatMovement','','','','',''],
    '22': ['phaseMask','','','','',''],
    '23': ['Increment','Decrement','','','',''],
    '24': ['','','','','',''],
    '25': ['hasFleeMessage','','','','',''],
    '26': ['QuestID','','','','',''],
    '27': ['','','','','',''],
    '28': ['Spellid','onlyOwnedAuras','','','',''],
    '29': ['Distance','Angle','End','credit','creditType',''],
    '30': ['phaseMask1','phaseMask2','phaseMask3','phaseMask4','phaseMask5','phaseMask6'],
    '31': ['minimum','maximum','','','',''],
    '32': ['','','','','',''],
    '33': ['entry','','','','',''],
    '34': ['Field','Data','Type','','',''],
    '35': ['Field','','','','',''],
    '36': ['entry','updateLevel','','','',''],
    '37': ['','','','','',''],
    '38': ['','','','','',''],
    '39': ['Radius','displayText','','','',''],
    '40': ['Sheath','','','','',''],
    '41': ['despawnTime','respawnTime','','','',''],
    '42': ['hpFlat','hpPercent','','','',''],
    '43': ['entry','modelID','','','',''],
    '44': ['phaseMask','shouldAdd','','','',''],
    '45': ['Field','Data','','','',''],
    '46': ['','','','','',''],
    '47': ['isTrue','','','','',''],
    '48': ['isTrue','','','','',''],
    '49': ['','','','','',''],
    '50': ['entry','despawnTime','onTimeRunsOut','','',''],
    '51': ['','','','','',''],
    '52': ['TaxiID','','','','',''],
    '53': ['shouldRun','waypoint','canRepeat','questId','despawntime','reactState'],
    '54': ['time','','','','',''],
    '55': ['despawnTime','questId','shouldFail','','',''],
    '56': ['item','count','','','',''],
    '57': ['item','count','','','',''],
    '58': ['TemplateID','','','','',''],
    '59': ['isOn','','','','',''],
    '60': ['gravityEnabled','','','','',''],
    '61': ['isOn','','','','',''],
    '62': ['MapID','','','','',''],
    '63': ['counterID','value','reset','','',''],
    '64': ['varID','','','','',''],
    '65': ['','','','','',''],
    '66': ['facing','','','','',''],
    '67': ['id','InitialMin','InitialMax','RepeatMin','RepeatMax','chance'],
    '68': ['entry','','','','',''],
    '69': ['PointId','isTransport','disablePathfinding','ContactDistance','',''],
    '70': ['respawnTime','','','','',''],
    '71': ['creature','slotmask','item1','item2','item3',''],
    '72': ['','','','','',''],
    '73': ['id','','','','',''],
    '74': ['id','','','','',''],
    '75': ['spell','','','','',''],
    '76': ['','','','','',''],
    '77': ['','','','','',''],
    '78': ['','','','','',''],
    '79': ['attackDistance','attackAngle','','','',''],
    '80': ['EntryOrGuid','timerType','overrideActionList','','',''],
    '81': ['npcflag','','','','',''],
    '82': ['npcflag','','','','',''],
    '83': ['npcflag','','','','',''],
    '84': ['groupid','','','','',''],
    '85': ['SpellID','castFlags','triggeredFlags','','',''],
    '86': ['SpellID','castFlags','CasterTargetType','CasterTarget','CasterTarget','CasterTarget'],
    '87': ['EntryOrGuid1','EntryOrGuid2','EntryOrGuid 3','EntryOrGuid4','EntryOrGuid5','EntryOrGuid6'],
    '88': ['EntryOrGuid1','EntryOrGuid2','','','',''],
    '89': ['Radius','','','','',''],
    '90': ['Value','Type','','','',''],
    '91': ['Value','Type','','','',''],
    '92': ['With delay','SpellId','Instant','','',''],
    '93': ['animprogress','','','','',''],
    '94': ['dynamicflags','','','','',''],
    '95': ['dynamicflags','','','','',''],
    '96': ['dynamicflags','','','','',''],
    '97': ['SpeedXY','SpeedZ','','','',''],
    '98': ['menu','text_id','','','',''],
    '99': ['LootState','','','','',''],
    '100': ['Id','','','','',''],
    '101': ['','','','','',''],
    '102': ['isTrue','','','','',''],
    '103': ['isTrue','','','','',''],
    '104': ['flags','','','','',''],
    '105': ['flags','','','','',''],
    '106': ['flags','','','','',''],
    '107': ['groupId','invoker','','','',''],
    '108': ['powerType','newPower','','','',''],
    '109': ['powerType','addedPower','','','',''],
    '110': ['powerType','removedPower','','','',''],
    '111': ['gameEventId','','','','',''],
    '112': ['gameEventId','','','','',''],
    '113': ['wp1','wp2','wp3','wp4','wp5','wp6'],
    '114': ['','','','','',''],
    '115': ['soundId1','soundId2','soundId3','soundId4','onlySelf','distantSound'],
    '116': ['timer','','','','',''],
    '117': ['shouldDisable','','','','',''],
    '118': ['state','','','','',''],
    '119': ['isTrue','','','','',''],
    '120': ['type','','','','',''],
    '121': ['sightDistance','','','','',''],
    '122': ['fleeTime','','','','',''],
    '123': ['name','threat','','','',''],
    '124': ['id','','','','',''],
    '125': ['idMinRange','idMaxRange','','','',''],
    '126': ['','','','','',''],
    '127': ['MovementSlot','PauseTime','Forced','','',''],
    '128': ['AnimKitID','type','','','',''],
    '129': ['SceneId','','','','',''],
    '130': ['SceneId','','','','',''],
    '131': ['groupId','minDelay','maxDelay','spawnflags','',''],
    '132': ['groupId','minDelay','maxDelay','spawnflags','',''],
    '133': ['spawnType','spawnId','','','',''],
    '134': ['SpellID','castFlags','triggeredFlags','','',''],
    '135': ['entry','cinematic','','','',''],
    '136': ['movementType','speedInteger','speedFraction','','',''],
    '137': ['spellVisualKitId','','','','',''],
    '138': ['zoneId','areaLightId','lightId','fadeInTime','',''],
    '139': ['zoneId','weatherId','weatherGrade','','','']
}

export class ActionType {
    protected row: smart_scriptsRow
    protected main: SmartScript

    constructor(main: SmartScript, row: smart_scriptsRow) {
        this.row = row
        this.main = main
    }

    getType() {
        return ACTION_TYPES[this.row.action_type.get()]
    }

    getArguments() {
        const argmap : {[key:string]:number}= {}
        const arglist = ACTION_ARGS[this.row.action_type.get()]
        if(arglist[0].length>0) argmap[arglist[0]] = this.row.action_param1.get()
        if(arglist[1].length>0) argmap[arglist[1]] = this.row.action_param2.get()
        if(arglist[2].length>0) argmap[arglist[2]] = this.row.action_param3.get()
        if(arglist[3].length>0) argmap[arglist[3]] = this.row.action_param4.get()
        if(arglist[4].length>0) argmap[arglist[4]] = this.row.action_param5.get()
        if(arglist[5].length>0) argmap[arglist[5]] = this.row.action_param6.get()
        return argmap
    }

    objectify(options?: ObjectifyOptions) {
        return {type: this.getType(), arguments: this.getArguments()}
    }

    /**
     *  Do nothing
     */
    setNone() {
        this.row.action_type.set(0)
        return this.main
    }

    /**
     * More configurable version of setTalk
     *
     * @param duration how long to wait before SMART_EVENT_TEXT_OVER is triggered
     * @param callback creature_text constructor
     * @param unk
     */
    setTalkGroup(callback: (group: CreatureTextGroup,duration: Cell<number,any>, unk: Cell<number,any>)=>void) {
        this.row.action_type.set(1)
        const group = CreatureTextRegistry.load(getRealEntryOrGuid(this.row))
            .Texts.addGet();
        callback(group,this.row.action_param2,this.row.action_param3);
        this.row.action_param1.set(group.Group)
        return this.main
    }

    /**
     *  Param2 in Milliseconds.
     *  @param Creature_text.groupid
     *  @param Duration to wait before SMART_EVENT_TEXT_OVER is triggered.
     *  @param 0 It will try to trigger talk of the target1 Set target as talk target (used for $vars in texts and whisper target)
     */
    setTalk(textsOrGroupId: number|loc_constructor|loc_constructor[], Duration : number, unk : number = 0) {
        this.row.action_type.set(1)
        this.row.action_param2.set(Duration)
        this.row.action_param3.set(unk)
        if(typeof(textsOrGroupId) === 'number') {
            this.row.action_param1.set(textsOrGroupId)
            return this.main;
        }
        const rows = SQL.creature_text.queryAll({CreatureID:getRealEntryOrGuid(this.row)})
        const id = rows.length===0 ? 0 :
            rows.sort((a,b)=>b.GroupID>a.GroupID?1:-1)[0].GroupID.get()+1

        if(!Array.isArray(textsOrGroupId)) {
            textsOrGroupId = [textsOrGroupId]
        }

        for(let i=0;i<textsOrGroupId.length;++i) {
            iterLocConstructor(textsOrGroupId[i],(lang, value) => {
                if(lang === 'enGB' || lang === 'enCN' || lang === 'enTW') {
                    SQL.creature_text.add(getRealEntryOrGuid(this.row),id,i,
                        {
                            Duration:Duration,
                            Text: value,
                            BroadcastTextId: 0,
                            Emote: 0,
                            comment: 'tswow'
                        })
                } else {
                    SQL.creature_text_locale.add(getRealEntryOrGuid(this.row),id,i,lang,{
                        Text: value,
                    })
                }
            })
        }
        this.row.action_param1.set(id)
        return this.main
    }

    /**
     *  Sets faction to creature.
     *  @param FactionID (or 0 for default)
     */
    setSetFaction(FactionID : number) {
        this.row.action_type.set(2)
        this.row.action_param1.set(FactionID)
        return this.main
    }

    /**
     *  Take DisplayID of creature (param1) OR Turn to DisplayID (param2) OR Both = 0 for Demorph
     *  @param Creature_template.entry(param1)
     *  @param Creature_template.modelID(param2)
     */
    setMorphToEntryOrModel(Creature_templateentryparam1 : number, Creature_templatemodelIDparam2 : number) {
        this.row.action_type.set(3)
        this.row.action_param1.set(Creature_templateentryparam1)
        this.row.action_param2.set(Creature_templatemodelIDparam2)
        return this.main
    }

    /**
     *  Play Sound; TextRange = 0 only sends sound to self, TextRange = 1 sends sound to everyone in visibility range
     *  @param SoundId
     *  @param onlySelf (0/1)
     *  @param Distant Sound (0/1)
     */
    setSound(SoundId : number, onlySelf : number, Distant : number) {
        this.row.action_type.set(4)
        this.row.action_param1.set(SoundId)
        this.row.action_param2.set(onlySelf)
        this.row.action_param3.set(Distant)
        return this.main
    }

    /**
     *  Play Emote
     *  @param EmoteId
     */
    setPlayEmote(EmoteId : number) {
        this.row.action_type.set(5)
        this.row.action_param1.set(EmoteId)
        return this.main
    }

    /**
     *  Fail Quest of Target
     *  @param QuestID
     */
    setFailQuest(QuestID : number) {
        this.row.action_type.set(6)
        this.row.action_param1.set(QuestID)
        return this.main
    }

    /**
     *  Add Quest to Target
     *  @param QuestID
     *  @param directAdd (0/1)
     */
    setOfferQuest(QuestID : number, directAdd : number) {
        this.row.action_type.set(7)
        this.row.action_param1.set(QuestID)
        this.row.action_param2.set(directAdd)
        return this.main
    }

    /**
     *  React State. Can be Passive (0), Defensive (1), Aggressive (2), Assist (3).
     *  @param State
     */
    setSetReactState(State : ReactState) {
        this.row.action_type.set(8)
        this.row.action_param1.set(resolveReactState(State))
        return this.main
    }

    /**
     *  Activate Object
     */
    setActivateGobject() {
        this.row.action_type.set(9)
        return this.main
    }

    /**
     *  Play Random Emote
     *  @param EmoteId1
     *  @param EmoteId2
     *  @param EmoteId3
     *  @param Emote4
     *  @param Emote5
     *  @param Emote6
     */
    setRandomEmote(EmoteId1 : number, EmoteId2 : number, EmoteId3 : number, Emote4 : number, Emote5 : number, Emote6 : number) {
        this.row.action_type.set(10)
        this.row.action_param1.set(EmoteId1)
        this.row.action_param2.set(EmoteId2)
        this.row.action_param3.set(EmoteId3)
        this.row.action_param4.set(Emote4)
        this.row.action_param5.set(Emote5)
        this.row.action_param6.set(Emote6)
        return this.main
    }

    /**
     *  Cast Spell ID at Target
     *  @param SpellId
     *  @param castFlags
     *  @param triggeredFlags
     */
    setCast(SpellId : number, castFlags : number, triggeredFlags : number) {
        this.row.action_type.set(11)
        this.row.action_param1.set(SpellId)
        this.row.action_param2.set(castFlags)
        this.row.action_param3.set(triggeredFlags)
        return this.main
    }

    /**
     *  Summon Unit
     *  @note To spawn multiple creatures, use target.pointAround* and specify 'amount'. Otherwise you must use multiple separate events and specify targets for each.
     *  @param creature_template.entry
     *  @param summonType type
     *  @param duration in ms
     *  @param attackInvoker
     */
    setSummonCreature(creature_templateentry : number, summonType : SummonType, duration : number, attackInvoker : number) {
        this.row.action_type.set(12)
        this.row.action_param1.set(creature_templateentry)
        this.row.action_param2.set(resolveSummonType(summonType))
        this.row.action_param3.set(duration)
        this.row.action_param4.set(attackInvoker)
        return this.main
    }

    /**
     *  Change Threat Percentage for Single Target
     *  @param Threat% inc
     *  @param Threat% dec
     */
    setThreatSinglePct(Threat : number, Threat2 : number) {
        this.row.action_type.set(13)
        this.row.action_param1.set(Threat)
        this.row.action_param2.set(Threat2)
        return this.main
    }

    /**
     *  Change Threat Percentage for All Enemies
     *  @param Threat% inc
     *  @param Threat% dec
     */
    setThreatAllPct(Threat : number, Threat2 : number) {
        this.row.action_type.set(14)
        this.row.action_param1.set(Threat)
        this.row.action_param2.set(Threat2)
        return this.main
    }

    /**
     *
     *  @param QuestID
     */
    setFinishQuestScript(QuestID : number) {
        this.row.action_type.set(15)
        this.row.action_param1.set(QuestID)
        return this.main
    }

    /**
     *  For 4.3.4 + only
     *  @param phaseId
     *  @param apply/remove (1/0)
     */
    setSetIngamePhaseId(phaseId : number, applyremove : number) {
        this.row.action_type.set(16)
        this.row.action_param1.set(phaseId)
        this.row.action_param2.set(applyremove)
        return this.main
    }

    /**
     *  Play Emote Continuously
     *  @param EmoteId
     */
    setSetEmoteState(EmoteId : number) {
        this.row.action_type.set(17)
        this.row.action_param1.set(EmoteId)
        return this.main
    }

    /**
     *  Can set Multi-able flags at once
     *  @param (may be more than one field OR'd together)
     *  @param type If false set creature_template.unit_flags If true set creature_template.unit_flags2
     */
    setSetUnitFlag(may : number, type : number) {
        this.row.action_type.set(18)
        this.row.action_param1.set(may)
        this.row.action_param2.set(type)
        return this.main
    }

    /**
     *  Can Remove Multi-able flags at once
     *  @param (may be more than one field OR'd together)
     *  @param type If false set  creature_template.unit_flags If true set creature_template.unit_flags2
     */
    setRemoveUnitFlag(may : number, type : number) {
        this.row.action_type.set(19)
        this.row.action_param1.set(may)
        this.row.action_param2.set(type)
        return this.main
    }

    /**
     *  Stop or Continue Automatic Attack.
     *  @param AllowAttackState (0 = Stop attack, anything else means continue attacking)
     */
    setAutoAttack(AllowAttackState : number) {
        this.row.action_type.set(20)
        this.row.action_param1.set(AllowAttackState)
        return this.main
    }

    /**
     *  Allow or Disable Combat Movement
     *  @param AllowCombatMovement (0 = Stop combat based movement, anything else continue attacking)
     */
    setAllowCombatMovement(AllowCombatMovement : number) {
        this.row.action_type.set(21)
        this.row.action_param1.set(AllowCombatMovement)
        return this.main
    }

    /**
     *
     *  @param smart_scripts.event_phase_mask
     */
    setSetEventPhase(smart_scriptsevent_phase_mask : number) {
        this.row.action_type.set(22)
        this.row.action_param1.set(smart_scriptsevent_phase_mask)
        return this.main
    }

    /**
     *  Set param1 OR param2 (not both). Value 0 has no effect.
     *  @param Increment
     *  @param Decrement
     */
    setIncEventPhase(Increment : number, Decrement : number) {
        this.row.action_type.set(23)
        this.row.action_param1.set(Increment)
        this.row.action_param2.set(Decrement)
        return this.main
    }

    /**
     *  Evade Incoming Attack
     */
    setEvade() {
        this.row.action_type.set(24)
        return this.main
    }

    /**
     *  If you want the fleeing NPC to say '%s attempts to run away in fear' on flee, use 1 on param1. 0 for no message.
     *  @param 0/1 (If you want the fleeing NPC to say attempts to flee text on flee, use 1 on param1. For no message use 0.)
     */
    setFleeForAssist(zo : number) {
        this.row.action_type.set(25)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *
     *  @param QuestID
     */
    setCallGroupeventhappens(QuestID : number) {
        this.row.action_type.set(26)
        this.row.action_param1.set(QuestID)
        return this.main
    }

    /**
     *
     */
    setCombatStop() {
        this.row.action_type.set(27)
        return this.main
    }

    /**
     *  0 removes all auras
     *  @param Spellid
     *  @param 0/1 onlyOwnedAuras
     */
    setRemoveaurasfromspell(Spellid : number, zo : number) {
        this.row.action_type.set(28)
        this.row.action_param1.set(Spellid)
        this.row.action_param2.set(zo)
        return this.main
    }

    /**
     *  Follow Target
     *  @param Distance (0 = Default value)
     *  @param Angle (0 = Default value)
     *  @param End creature_template.entry
     *  @param credit
     *  @param creditType (0monsterkill, 1event)
     */
    setFollow(Distance : number, Angle : number, End : number, credit : number, creditType : number) {
        this.row.action_type.set(29)
        this.row.action_param1.set(Distance)
        this.row.action_param2.set(Angle)
        this.row.action_param3.set(End)
        this.row.action_param4.set(credit)
        this.row.action_param5.set(creditType)
        return this.main
    }

    /**
     *
     *  @param smart_scripts.event_phase_mask 1
     *  @param smart_scripts.event_phase_mask 2
     *  @param smart_scripts.event_phase_mask 3
     *  @param smart_scripts.event_phase_mask 4
     *  @param smart_scripts.event_phase_mask 5
     *  @param smart_scripts.event_phase_mask 6
     */
    setRandomPhase(smart_scriptsevent_phase_mask : number, smart_scriptsevent_phase_mask2 : number, smart_scriptsevent_phase_mask3 : number, smart_scriptsevent_phase_mask4 : number, smart_scriptsevent_phase_mask5 : number, smart_scriptsevent_phase_mask6 : number) {
        this.row.action_type.set(30)
        this.row.action_param1.set(smart_scriptsevent_phase_mask)
        this.row.action_param2.set(smart_scriptsevent_phase_mask2)
        this.row.action_param3.set(smart_scriptsevent_phase_mask3)
        this.row.action_param4.set(smart_scriptsevent_phase_mask4)
        this.row.action_param5.set(smart_scriptsevent_phase_mask5)
        this.row.action_param6.set(smart_scriptsevent_phase_mask6)
        return this.main
    }

    /**
     *
     *  @param smart_scripts.event_phase_mask minimum
     *  @param smart_scripts.event_phase_mask maximum
     */
    setRandomPhaseRange(smart_scriptsevent_phase_mask : number, smart_scriptsevent_phase_mask2 : number) {
        this.row.action_type.set(31)
        this.row.action_param1.set(smart_scriptsevent_phase_mask)
        this.row.action_param2.set(smart_scriptsevent_phase_mask2)
        return this.main
    }

    /**
     *  Reset Gameobject
     */
    setResetGobject() {
        this.row.action_type.set(32)
        return this.main
    }

    /**
     *  This is the ID from quest_template.RequiredNpcOrGo
     *  @param Creature_template.entry
     */
    setCallKilledmonster(Creature_templateentry : number) {
        this.row.action_type.set(33)
        this.row.action_param1.set(Creature_templateentry)
        return this.main
    }

    /**
     *  Set Instance Data
     *  @param Field
     *  @param Data
     *  @param Type (0 = SetData, 1 = SetBossState)
     */
    setSetInstData(Field : number, Data : number, Type : number) {
        this.row.action_type.set(34)
        this.row.action_param1.set(Field)
        this.row.action_param2.set(Data)
        this.row.action_param3.set(Type)
        return this.main
    }

    /**
     *  Set Instance Data uint64
     *  @param Field
     */
    setSetInstData64(Field : number) {
        this.row.action_type.set(35)
        this.row.action_param1.set(Field)
        return this.main
    }

    /**
     *  Updates creature_template to given entry
     *  @param Creature_template.entry
     *  @param Update Level
     */
    setUpdateTemplate(Creature_templateentry : number, Update : number) {
        this.row.action_type.set(36)
        this.row.action_param1.set(Creature_templateentry)
        this.row.action_param2.set(Update)
        return this.main
    }

    /**
     *  Kill Target
     */
    setDie() {
        this.row.action_type.set(37)
        return this.main
    }

    /**
     *
     */
    setSetInCombatWithZone() {
        this.row.action_type.set(38)
        return this.main
    }

    /**
     *  If you want the NPC to say '%s calls for help!'. Use 1 on param1, 0 for no message.
     *  @param Radius in yards that other creatures must be to acknowledge the cry for help.
     *  @param 0/1 (say calls for help text)
     */
    setCallForHelp(Radius : number, zo : number) {
        this.row.action_type.set(39)
        this.row.action_param1.set(Radius)
        this.row.action_param2.set(zo)
        return this.main
    }

    /**
     *
     *  @param Sheath (0-unarmed, 1-melee, 2-ranged)
     */
    setSetSheath(Sheath : number) {
        this.row.action_type.set(40)
        this.row.action_param1.set(Sheath)
        return this.main
    }

    /**
     *  Despawn Target after param1 in Milliseconds. If you want to set respawn time set param2 in seconds.
     *  @param Despawn timer "ms"
     *  @param Respawn timer "sec"
     */
    setForceDespawn(Despawn : number, Respawn : number) {
        this.row.action_type.set(41)
        this.row.action_param1.set(Despawn)
        this.row.action_param2.set(Respawn)
        return this.main
    }

    /**
     *  If you use both params, only percent will be used.
     *  @param flat hp value
     *  @param percent hp value
     */
    setSetInvincibilityHpLevel(flat : number, percent : number) {
        this.row.action_type.set(42)
        this.row.action_param1.set(flat)
        this.row.action_param2.set(percent)
        return this.main
    }

    /**
     *  Mount to Creature Entry (param1) OR Mount to Creature Display (param2) Or both = 0 for Unmount
     *  @param creature_template.entry
     *  @param creature_template.modelID
     */
    setMountToEntryOrModel(creature_templateentry : number, creature_templatemodelID : number) {
        this.row.action_type.set(43)
        this.row.action_param1.set(creature_templateentry)
        this.row.action_param2.set(creature_templatemodelID)
        return this.main
    }

    /**
     *
     *  @param creature.phasemask (3.3.5) creature.phasegroup (4.3.4 +)
     *  @param 0 = remove / 1 = add (4.3.4+ only)
     */
    setSetIngamePhaseMask(creaturephasemask : number, ZERO : number) {
        this.row.action_type.set(44)
        this.row.action_param1.set(creaturephasemask)
        this.row.action_param2.set(ZERO)
        return this.main
    }

    /**
     *  Set Data For Target, can be used with SMART_EVENT_DATA_SET
     *  @param Field
     *  @param Data
     */
    setSetData(Field : number, Data : number) {
        this.row.action_type.set(45)
        this.row.action_param1.set(Field)
        this.row.action_param2.set(Data)
        return this.main
    }

    /**
     *  Stop melee, spell casting during combat, chasing the target and facing
     */
    setAttackStop() {
        this.row.action_type.set(46)
        return this.main
    }

    /**
     *  Makes creature Visible = 1 or Invisible = 0
     *  @param 0/1
     */
    setSetVisibility(zo : number) {
        this.row.action_type.set(47)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *
     *  @param 0/1
     */
    setSetActive(zo : number) {
        this.row.action_type.set(48)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *  Allows basic melee swings to creature.
     */
    setAttackStart() {
        this.row.action_type.set(49)
        return this.main
    }

    /**
     *  Spawns Gameobject, use target_type to set spawn position.
     *  @param gameobject_template.entry
     *  @param De-spawn time in seconds. If 0 and Param2=0 the gob will despawns only with the summoner
     *  @param 0 - For despawn when the summoner despawn or time runs out 1 - For despawn when time runs out
     */
    setSummonGo(gameobject_templateentry : number, Despawn : number, ZERO : number) {
        this.row.action_type.set(50)
        this.row.action_param1.set(gameobject_templateentry)
        this.row.action_param2.set(Despawn)
        this.row.action_param3.set(ZERO)
        return this.main
    }

    /**
     *  Kills Creature.
     */
    setKillUnit() {
        this.row.action_type.set(51)
        return this.main
    }

    /**
     *  Sends player to flight path. You have to be close to Flight Master, which gives Taxi ID you need.
     *  @param TaxiID
     */
    setActivateTaxi(TaxiID : number) {
        this.row.action_type.set(52)
        this.row.action_param1.set(TaxiID)
        return this.main
    }

    /**
     *  Creature starts Waypoint Movement. Use waypoints table to create movement.
     *  @param 0 = walk / 1 = run
     *  @param waypoints.entry
     *  @param canRepeat
     *  @param quest_template.id
     *  @param despawntime
     *  @param reactState
     */
    setWpStart(shouldRun: boolean, id: number, canRepeat : boolean, quest_templateid : number, despawntime : number, reactState : ReactState) {
        this.row.action_type.set(53)
        this.row.action_param1.set(b2i(shouldRun))
        this.row.action_param2.set(id)
        this.row.action_param3.set(canRepeat ? 1 : 0)
        this.row.action_param4.set(quest_templateid)
        this.row.action_param5.set(despawntime)
        this.row.action_param6.set(resolveReactState(reactState))
        return this.main
    }

    /**
     * Creature stores invoker party and starts walking. Use together with 'finishQuestWalk'.
     * @param walkOrRun
     * @param id
     * @param canRepeat
     * @param quest_template
     * @param despawnTime
     * @param reactState
     */
    setQuestWalk(questId: number, path: number, reactState: ReactState = 'DEFENSIVE', shouldRun: boolean = true, canRepeat: boolean = false, despawnTime: number = 1) {
        return this.main
            .Target.setInvokerParty()
            .Action.setStoreTargetList(0)
            .then()
            .Target.setActionInvoker()
            .Action.setStoreTargetList(1)
            .then()
            .Target.setSelf()
            .Action.setWpStart(shouldRun,path,canRepeat,questId,despawnTime,reactState)
            .then()
            .Target.setSelf()
            .Action.setRemoveNpcFlag(2)
    }

    /**
     * Fails a quest walk started with "setQuestWalk"
     * @param questId
     */
    setFailQuestWalk(questId: number) {
        return this.main
            .Action.setFailQuest(questId)
            .Target.setStored(0)
            .then()
            .Action.setFailQuest(questId)
            .Target.setStored(1)
            .then()
            .Action.setStoreTargetList(0)
            .Target.setNone()
            .then()
            .Action.setStoreTargetList(1)
            .Target.setNone()
    }

    /**
     * Completes a quest walk started with "setQuestWalk",
     * which rewards the group that started it
     * @param questId
     */
    setFinishQuestWalk(questId: number) {
        return this.main
            .Action.setFinishQuestScript(questId)
            .Target.setStored(0)
            .then()
            .Action.setFinishQuestScript(questId)
            .Target.setStored(1)
            .then()
            .Action.setStoreTargetList(0)
            .Target.setNone()
            .then()
            .Action.setStoreTargetList(1)
            .Target.setNone()
    }

    /**
     *  Creature pauses its Waypoint Movement for given time.
     *  @param time (in ms)
     */
    setWpPause(time : number) {
        this.row.action_type.set(54)
        this.row.action_param1.set(time)
        return this.main
    }

    /**
     *  Creature stops its Waypoint Movement.
     *  @param despawnTime
     *  @param quest_template.id
     *  @param fail (0/1)
     */
    setWpStop(despawnTime : number, quest_templateid : number, fail : number) {
        this.row.action_type.set(55)
        this.row.action_param1.set(despawnTime)
        this.row.action_param2.set(quest_templateid)
        this.row.action_param3.set(fail)
        return this.main
    }

    /**
     *  Adds item(s) to player.
     *  @param item_template.entry
     *  @param count
     */
    setAddItem(item_templateentry : number, count : number) {
        this.row.action_type.set(56)
        this.row.action_param1.set(item_templateentry)
        this.row.action_param2.set(count)
        return this.main
    }

    /**
     *  Removes item(s) from player.
     *  @param item_template.entry
     *  @param count
     */
    setRemoveItem(item_templateentry : number, count : number) {
        this.row.action_type.set(57)
        this.row.action_param1.set(item_templateentry)
        this.row.action_param2.set(count)
        return this.main
    }

    /**
     *
     *  @param TemplateID (see Predefined SAI templates below)
     */
    setInstallAiTemplate(TemplateID : number) {
        this.row.action_type.set(58)
        this.row.action_param1.set(TemplateID)
        return this.main
    }

    /**
     *
     *  @param 0 = Off / 1 = On
     */
    setSetRun(ZERO : number) {
        this.row.action_type.set(59)
        this.row.action_param1.set(ZERO)
        return this.main
    }

    /**
     *  Only works for creatures with inhabit air.
     *  @param 0 = gravity On / 1 = gravity Off
     */
    setSetDisableGravity(ZERO : number) {
        this.row.action_type.set(60)
        this.row.action_param1.set(ZERO)
        return this.main
    }

    /**
     *
     *  @param 0 = Off / 1 = On
     */
    setSetSwim(ZERO : number) {
        this.row.action_type.set(61)
        this.row.action_param1.set(ZERO)
        return this.main
    }

    /**
     *  Continue this action with the TARGET_TYPE column. Use any target_type (except 0), and use target_x, target_y, target_z, target_o as the coordinates
     *  @param MapID
     */
    setTeleport(MapID : number) {
        this.row.action_type.set(62)
        this.row.action_param1.set(MapID)
        return this.main
    }

    /**
     *
     *  @param counterID
     *  @param value
     *  @param reset (0/1)
     */
    setSetCounter(counterID : number, value : number, reset : number) {
        this.row.action_type.set(63)
        this.row.action_param1.set(counterID)
        this.row.action_param2.set(value)
        this.row.action_param3.set(reset)
        return this.main
    }

    /**
     *  @param varID
     */
    setStoreTargetList(varID : number) {
        this.row.action_type.set(64)
        this.row.action_param1.set(varID)
        return this.main
    }

    /**
     *  Creature continues in its Waypoint Movement.
     */
    setWpResume() {
        this.row.action_type.set(65)
        return this.main
    }

    /**
     *
     *  @param Depends on the script target. if SMART_TARGET_SELF, facing will be the same as in HomePosition, For SMART_TARGET_POSITION you need to set target_o : 0 = North, West = 1.5, South = 3, East = 4.5
     */
    setSetOrientation(Depends : number) {
        this.row.action_type.set(66)
        this.row.action_param1.set(Depends)
        return this.main
    }

    /**
     *
     *  @param id
     *  @param InitialMin
     *  @param InitialMax
     *  @param RepeatMin(only if it repeats)
     *  @param RepeatMax(only if it repeats)
     *  @param chance
     */
    setCreateTimedEvent(id : number, InitialMin : number, InitialMax : number, RepeatMinonly : number, RepeatMaxonly : number, chance : number) {
        this.row.action_type.set(67)
        this.row.action_param1.set(id)
        this.row.action_param2.set(InitialMin)
        this.row.action_param3.set(InitialMax)
        this.row.action_param4.set(RepeatMinonly)
        this.row.action_param5.set(RepeatMaxonly)
        this.row.action_param6.set(chance)
        return this.main
    }

    /**
     *
     *  @param entry
     */
    setPlaymovie(entry : number) {
        this.row.action_type.set(68)
        this.row.action_param1.set(entry)
        return this.main
    }

    /**
     *  PointId is called by SMART_EVENT_MOVEMENTINFORM. Continue this action with the TARGET_TYPE column. Use any target_type, and use target_x, target_y, target_z, target_o as the coordinates
     *  @param PointId
     *  @param isTransport (0 or 1)
     *  @param disablePathfinding (0 or 1)
     *  @param ContactDistance
     */
    setMoveToPos(PointId : number, isTransport : number, disablePathfinding : number, ContactDistance : number) {
        this.row.action_type.set(69)
        this.row.action_param1.set(PointId)
        this.row.action_param2.set(isTransport)
        this.row.action_param3.set(disablePathfinding)
        this.row.action_param4.set(ContactDistance)
        return this.main
    }

    /**
     *  Always action_param1>0 For npcs use action_type=133
     *  @param Respawntime in seconds (The time which the gob remains spawned)
     */
    setEnableTempGobj(Respawntime : number) {
        this.row.action_type.set(70)
        this.row.action_param1.set(Respawntime)
        return this.main
    }

    /**
     *  only slots with mask set will be sent to client, bits are 1, 2, 4, leaving mask 0 is defaulted to mask 7 (send all), Slots1-3 are only used if no Param1 is set
     *  @param creature_equip_template.CreatureID
     *  @param Slotmask
     *  @param Slot1 (item_template.entry)
     *  @param Slot2 (item_template.entry)
     *  @param Slot3 (item_template.entry)
     */
    setEquip(creature_equip_templateCreatureID : number, Slotmask : number, Slot1 : number, Slot2 : number, Slot3 : number) {
        this.row.action_type.set(71)
        this.row.action_param1.set(creature_equip_templateCreatureID)
        this.row.action_param2.set(Slotmask)
        this.row.action_param3.set(Slot1)
        this.row.action_param4.set(Slot2)
        this.row.action_param5.set(Slot3)
        return this.main
    }

    /**
     *  Closes gossip window.
     */
    setCloseGossip() {
        this.row.action_type.set(72)
        return this.main
    }

    /**
     *
     *  @param id(>1)
     */
    setTriggerTimedEvent(id : number) {
        this.row.action_type.set(73)
        this.row.action_param1.set(id)
        return this.main
    }

    /**
     *
     *  @param id(>1)
     */
    setRemoveTimedEvent(id : number) {
        this.row.action_type.set(74)
        this.row.action_param1.set(id)
        return this.main
    }

    /**
     *  Adds aura to player(s). Use target_type 17 to make AoE aura.
     *  @param SpellId
     */
    setAddAura(SpellId : number) {
        this.row.action_type.set(75)
        this.row.action_param1.set(SpellId)
        return this.main
    }

    /**
     *  WARNING: CAN CRASH CORE, do not use if you dont know what you are doing
     */
    setOverrideScriptBaseObject() {
        this.row.action_type.set(76)
        return this.main
    }

    /**
     *
     */
    setResetScriptBaseObject() {
        this.row.action_type.set(77)
        return this.main
    }

    /**
     *
     */
    setCallScriptReset() {
        this.row.action_type.set(78)
        return this.main
    }

    /**
     *  Sets movement to follow at a specific range to the target.
     *  @param attackDistance
     *  @param attackAngle
     */
    setSetRangedMovement(attackDistance : number, attackAngle : number) {
        this.row.action_type.set(79)
        this.row.action_param1.set(attackDistance)
        this.row.action_param2.set(attackAngle)
        return this.main
    }

    /**
     *
     *  @param EntryOrGuid * 100 (smart_scripts.entryorguid with 00 added after the entry, or 01, 02, 03 etc. for multiple action lists)
     *  @param timer update type(0 OOC, 1 IC, 2 ALWAYS)
     *  @param Can override in going action list 0/1 This will to stop an action list and start an other
     */
    setCallTimedActionlist(EntryOrGuid : number, timer : number, Can : number) {
        this.row.action_type.set(80)
        this.row.action_param1.set(EntryOrGuid)
        this.row.action_param2.set(timer)
        this.row.action_param3.set(Can)
        return this.main
    }

    /**
     *
     *  @param Creature_template.npcflag
     */
    setSetNpcFlag(Creature_templatenpcflag : number) {
        this.row.action_type.set(81)
        this.row.action_param1.set(Creature_templatenpcflag)
        return this.main
    }

    /**
     *
     *  @param Creature_template.npcflag
     */
    setAddNpcFlag(Creature_templatenpcflag : number) {
        this.row.action_type.set(82)
        this.row.action_param1.set(Creature_templatenpcflag)
        return this.main
    }

    /**
     *
     *  @param Creature_template.npcflag
     */
    setRemoveNpcFlag(Creature_templatenpcflag : number) {
        this.row.action_type.set(83)
        this.row.action_param1.set(Creature_templatenpcflag)
        return this.main
    }

    /**
     *  Makes a player say text. SMART_EVENT_TEXT_OVER is not triggered and whispers can not be used.
     *  @param creature_text.groupid
     */
    setSimpleTalk(creature_textgroupid : number) {
        this.row.action_type.set(84)
        this.row.action_param1.set(creature_textgroupid)
        return this.main
    }

    /**
     *  The target will cast the spell on it self
     *  @param SpellID
     *  @param castFlags
     *  @param triggeredFlags
     */
    setSelfCast(SpellID : number, castFlags : number, triggeredFlags : number) {
        this.row.action_type.set(85)
        this.row.action_param1.set(SpellID)
        this.row.action_param2.set(castFlags)
        this.row.action_param3.set(triggeredFlags)
        return this.main
    }

    /**
     *  This action is used to make selected caster (in CasterTargetType) to cast spell. Actual target is entered in target_type as normally.
     *  @param SpellID
     *  @param castFlags
     *  @param CasterTargetType (caster is selected here, use it as target_type)
     *  @param CasterTarget (target_param1)
     *  @param CasterTarget (target_param2)
     *  @param CasterTarget (target_param3)
     */
    setCrossCast(SpellID : number, castFlags : number, CasterTargetType : number, CasterTarget : number, CasterTarget2 : number, CasterTarget3 : number) {
        this.row.action_type.set(86)
        this.row.action_param1.set(SpellID)
        this.row.action_param2.set(castFlags)
        this.row.action_param3.set(CasterTargetType)
        this.row.action_param4.set(CasterTarget)
        this.row.action_param5.set(CasterTarget2)
        this.row.action_param6.set(CasterTarget3)
        return this.main
    }

    /**
     *  Will select one entry from the ones provided. 0 is ignored.
     *  @param EntryOrGuid 1 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 2 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 3 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 4 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 5 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 6 (smart_scripts.entryorguid * 100 + n)
     */
    setCallRandomTimedActionlist(EntryOrGuid : number, EntryOrGuid2 : number, EntryOrGuid3 : number, EntryOrGuid4 : number, EntryOrGuid5 : number, EntryOrGuid6 : number) {
        this.row.action_type.set(87)
        this.row.action_param1.set(EntryOrGuid)
        this.row.action_param2.set(EntryOrGuid2)
        this.row.action_param3.set(EntryOrGuid3)
        this.row.action_param4.set(EntryOrGuid4)
        this.row.action_param5.set(EntryOrGuid5)
        this.row.action_param6.set(EntryOrGuid6)
        return this.main
    }

    /**
     *  0 is ignored.
     *  @param EntryOrGuid 1 (smart_scripts.entryorguid * 100 + n)
     *  @param EntryOrGuid 2 (smart_scripts.entryorguid * 100 + n)
     */
    setCallRandomRangeTimedActionlist(EntryOrGuid : number, EntryOrGuid2 : number) {
        this.row.action_type.set(88)
        this.row.action_param1.set(EntryOrGuid)
        this.row.action_param2.set(EntryOrGuid2)
        return this.main
    }

    /**
     *  Creature moves to random position in given radius.
     *  @param Radius
     */
    setRandomMove(Radius : number) {
        this.row.action_type.set(89)
        this.row.action_param1.set(Radius)
        return this.main
    }

    /**
     *
     *  @param Value
     *  @param Type
     */
    setSetUnitFieldBytes1(Value : number, Type : number) {
        this.row.action_type.set(90)
        this.row.action_param1.set(Value)
        this.row.action_param2.set(Type)
        return this.main
    }

    /**
     *
     *  @param Value
     *  @param Type
     */
    setRemoveUnitFieldBytes1(Value : number, Type : number) {
        this.row.action_type.set(91)
        this.row.action_param1.set(Value)
        this.row.action_param2.set(Type)
        return this.main
    }

    /**
     *  This action allows you to interrupt the current spell being cast. If you do not set the spellId, the core will find the current spell depending on the withDelay and the withInstant values.
     *  @param With delay (0/1)
     *  @param SpellId
     *  @param Instant (0/1)
     */
    setInterruptSpell(With : number, SpellId : number, Instant : number) {
        this.row.action_type.set(92)
        this.row.action_param1.set(With)
        this.row.action_param2.set(SpellId)
        this.row.action_param3.set(Instant)
        return this.main
    }

    /**
     *
     *  @param animprogress (0-255)
     */
    setSendGoCustomAnim(animprogress : number) {
        this.row.action_type.set(93)
        this.row.action_param1.set(animprogress)
        return this.main
    }

    /**
     *
     *  @param creature.dynamicflags
     */
    setSetDynamicFlag(creaturedynamicflags : number) {
        this.row.action_type.set(94)
        this.row.action_param1.set(creaturedynamicflags)
        return this.main
    }

    /**
     *
     *  @param creature.dynamicflags
     */
    setAddDynamicFlag(creaturedynamicflags : number) {
        this.row.action_type.set(95)
        this.row.action_param1.set(creaturedynamicflags)
        return this.main
    }

    /**
     *
     *  @param creature.dynamicflags
     */
    setRemoveDynamicFlag(creaturedynamicflags : number) {
        this.row.action_type.set(96)
        this.row.action_param1.set(creaturedynamicflags)
        return this.main
    }

    /**
     *
     *  @param Speed XY
     *  @param Speed Z
     */
    setJumpToPos(Speed : number, Speed2 : number) {
        this.row.action_type.set(97)
        this.row.action_param1.set(Speed)
        this.row.action_param2.set(Speed2)
        return this.main
    }

    /**
     *  Can be used together with 'SMART_EVENT_GOSSIP_HELLO' to set custom gossip.
     *  @param gossip_menu.entry
     *  @param gossip_menu.text_id (same value as npc_text.ID)
     */
    setSendGossipMenu(gossip_menuentry : number, gossip_menutext_id : number) {
        this.row.action_type.set(98)
        this.row.action_param1.set(gossip_menuentry)
        this.row.action_param2.set(gossip_menutext_id)
        return this.main
    }

    /**
     *
     *  @param LootState (0 - Not ready, 1 - Ready, 2 - Activated, 3 - Just deactivated)
     */
    setGoSetLootState(LootState : number) {
        this.row.action_type.set(99)
        this.row.action_param1.set(LootState)
        return this.main
    }

    /**
     *  Send targets previously stored with SMART_ACTION_STORE_TARGET, to another npc/go, the other npc/go can then access them as if it was its own stored list
     *  @param Id
     */
    setSendTargetToTarget(Id : number) {
        this.row.action_type.set(100)
        this.row.action_param1.set(Id)
        return this.main
    }

    /**
     *  Use with SMART_TARGET_SELF or SMART_TARGET_POSITION
     */
    setSetHomePos() {
        this.row.action_type.set(101)
        return this.main
    }

    /**
     *  Sets the current creatures health regen on or off.
     *  @param 0/1
     */
    setSetHealthRegen(zo : number) {
        this.row.action_type.set(102)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *  Enables or disables creature movement
     *  @param 0/1
     */
    setSetRoot(zo : number) {
        this.row.action_type.set(103)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *  oldFlag = newFlag
     *  @param gameobject_template_addon.flags
     */
    setSetGoFlag(gameobject_template_addonflags : number) {
        this.row.action_type.set(104)
        this.row.action_param1.set(gameobject_template_addonflags)
        return this.main
    }

    /**
     *  oldFlag |= newFlag
     *  @param gameobject_template_addon.flags
     */
    setAddGoFlag(gameobject_template_addonflags : number) {
        this.row.action_type.set(105)
        this.row.action_param1.set(gameobject_template_addonflags)
        return this.main
    }

    /**
     *  oldFlag &= ~newFlag
     *  @param gameobject_template_addon.flags
     */
    setRemoveGoFlag(gameobject_template_addonflags : number) {
        this.row.action_type.set(106)
        this.row.action_param1.set(gameobject_template_addonflags)
        return this.main
    }

    /**
     *  Use creature_summon_groups table. SAI target has no effect, use 0
     *  @param creature_summon_groups.groupId
     *  @param Attack invoker (0/1)
     */
    setSummonCreatureGroup(creature_summon_groupsgroupId : number, Attack : number) {
        this.row.action_type.set(107)
        this.row.action_param1.set(creature_summon_groupsgroupId)
        this.row.action_param2.set(Attack)
        return this.main
    }

    /**
     *
     *  @param Power type
     *  @param New power
     */
    setSetPower(Power : number, New : number) {
        this.row.action_type.set(108)
        this.row.action_param1.set(Power)
        this.row.action_param2.set(New)
        return this.main
    }

    /**
     *
     *  @param Power type
     *  @param Power to add
     */
    setAddPower(Power : number, Power2 : number) {
        this.row.action_type.set(109)
        this.row.action_param1.set(Power)
        this.row.action_param2.set(Power2)
        return this.main
    }

    /**
     *
     *  @param Power type
     *  @param Power to remove
     */
    setRemovePower(Power : number, Power2 : number) {
        this.row.action_type.set(110)
        this.row.action_param1.set(Power)
        this.row.action_param2.set(Power2)
        return this.main
    }

    /**
     *
     *  @param GameEventId
     */
    setGameEventStop(GameEventId : number) {
        this.row.action_type.set(111)
        this.row.action_param1.set(GameEventId)
        return this.main
    }

    /**
     *
     *  @param GameEventId
     */
    setGameEventStart(GameEventId : number) {
        this.row.action_type.set(112)
        this.row.action_param1.set(GameEventId)
        return this.main
    }

    /**
     *  Make target follow closest waypoint to its location
     *  @param wp1
     *  @param wp2
     *  @param wp3
     *  @param wp4
     *  @param wp5
     *  @param wp6
     */
    setStartClosestWaypoint(wp1 : number, wp2 : number, wp3 : number, wp4 : number, wp5 : number, wp6 : number) {
        this.row.action_type.set(113)
        this.row.action_param1.set(wp1)
        this.row.action_param2.set(wp2)
        this.row.action_param3.set(wp3)
        this.row.action_param4.set(wp4)
        this.row.action_param5.set(wp5)
        this.row.action_param6.set(wp6)
        return this.main
    }

    /**
     *  Use target_x, target_y, target_z With target_type=1
     */
    setMoveOffset() {
        this.row.action_type.set(114)
        return this.main
    }

    /**
     *
     *  @param soundId1
     *  @param soundId2
     *  @param soundId3
     *  @param soundId4
     *  @param onlySelf (0/1)
     *  @param Distant Sound (0/1)
     */
    setRandomSound(soundId1 : number, soundId2 : number, soundId3 : number, soundId4 : number, onlySelf : number, Distant : number) {
        this.row.action_type.set(115)
        this.row.action_param1.set(soundId1)
        this.row.action_param2.set(soundId2)
        this.row.action_param3.set(soundId3)
        this.row.action_param4.set(soundId4)
        this.row.action_param5.set(onlySelf)
        this.row.action_param6.set(Distant)
        return this.main
    }

    /**
     *
     *  @param timer
     */
    setSetCorpseDelay(timer : number) {
        this.row.action_type.set(116)
        this.row.action_param1.set(timer)
        return this.main
    }

    /**
     *
     *  @param disable evade (1) / re-enable (0)
     */
    setDisableEvade(disable : number) {
        this.row.action_type.set(117)
        this.row.action_param1.set(disable)
        return this.main
    }

    /**
     *
     *  @param state
     */
    setGoSetGoState(state : number) {
        this.row.action_type.set(118)
        this.row.action_param1.set(state)
        return this.main
    }

    /**
     *
     *  @param 0/1
     */
    setSetCanFly(zo : number) {
        this.row.action_type.set(119)
        this.row.action_param1.set(zo)
        return this.main
    }

    /**
     *
     *  @param Type
     */
    setRemoveAurasByType(Type : number) {
        this.row.action_type.set(120)
        this.row.action_param1.set(Type)
        return this.main
    }

    /**
     *
     *  @param SightDistance
     */
    setSetSightDist(SightDistance : number) {
        this.row.action_type.set(121)
        this.row.action_param1.set(SightDistance)
        return this.main
    }

    /**
     *
     *  @param FleeTime
     */
    setFlee(FleeTime : number) {
        this.row.action_type.set(122)
        this.row.action_param1.set(FleeTime)
        return this.main
    }

    /**
     *
     *  @param #NAME?
     *  @param -threat
     */
    setAddThreat(NAME : number, threat : number) {
        this.row.action_type.set(123)
        this.row.action_param1.set(NAME)
        this.row.action_param2.set(threat)
        return this.main
    }

    /**
     *
     *  @param Id
     */
    setLoadEquipment(Id : number) {
        this.row.action_type.set(124)
        this.row.action_param1.set(Id)
        return this.main
    }

    /**
     *
     *  @param id min range
     *  @param id max range
     */
    setTriggerRandomTimedEvent(id : number, id2 : number) {
        this.row.action_type.set(125)
        this.row.action_param1.set(id)
        this.row.action_param2.set(id2)
        return this.main
    }

    /**
     *
     */
    setRemoveAllGameobjects() {
        this.row.action_type.set(126)
        return this.main
    }

    /**
     *  default --> waypoint, random etc active --> point movement controlled --> mindcontrol etc
     *  @param MovementSlot (default = 0, active = 1, controlled = 2)
     *  @param PauseTime (ms)
     *  @param Forced (depends on the movement generator. some will stop automatically, other will let the current spline finish first)
     */
    setPauseMovement(MovementSlot : number, PauseTime : number, Forced : boolean) {
        this.row.action_type.set(127)
        this.row.action_param1.set(MovementSlot)
        this.row.action_param2.set(PauseTime)
        this.row.action_param3.set(Forced ? 1 : 0)
        return this.main
    }

    /**
     *  // don't use on 3.3.5a
     *  @param AnimKit ID
     *  @param type: 1- PlayOneShotAnimKitId 2- SetAIAnimKitId 3- SetMeleeAnimKitId 4- SetMovementAnimKitId
     */
    setPlayAnimkit(AnimKit : number, type : number) {
        this.row.action_type.set(128)
        this.row.action_param1.set(AnimKit)
        this.row.action_param2.set(type)
        return this.main
    }

    /**
     *  // don't use on 3.3.5a
     *  @param SceneId
     */
    setScenePlay(SceneId : number) {
        this.row.action_type.set(129)
        this.row.action_param1.set(SceneId)
        return this.main
    }

    /**
     *  // don't use on 3.3.5a
     *  @param SceneId
     */
    setSceneCancel(SceneId : number) {
        this.row.action_type.set(130)
        this.row.action_param1.set(SceneId)
        return this.main
    }

    /**
     *
     *  @param groupId
     *  @param minDelay
     *  @param maxDelay
     *  @param spawnflags
     */
    setSpawnSpawngroup(groupId : number, minDelay : number, maxDelay : number, spawnflags : number) {
        this.row.action_type.set(131)
        this.row.action_param1.set(groupId)
        this.row.action_param2.set(minDelay)
        this.row.action_param3.set(maxDelay)
        this.row.action_param4.set(spawnflags)
        return this.main
    }

    /**
     *
     *  @param groupId
     *  @param minDelay
     *  @param maxDelay
     *  @param spawnflags
     */
    setDespawnSpawngroup(groupId : number, minDelay : number, maxDelay : number, spawnflags : number) {
        this.row.action_type.set(132)
        this.row.action_param1.set(groupId)
        this.row.action_param2.set(minDelay)
        this.row.action_param3.set(maxDelay)
        this.row.action_param4.set(spawnflags)
        return this.main
    }

    /**
     *  Use to respawn npcs and gobs, the target in this case is always=1 and only a single unit could be a target via the spawnId (action_param1, action_param2)
     *  @param spawnType (0 npc/ 1 gob)
     *  @param spawnId (DB Guid)
     */
    setRespawnBySpawnid(spawnType : number, spawnId : number) {
        this.row.action_type.set(133)
        this.row.action_param1.set(spawnType)
        this.row.action_param2.set(spawnId)
        return this.main
    }

    /**
     *  if avaliable, last used invoker will cast spellId with castFlags on targets
     *  @param SpellID
     *  @param castFlags
     *  @param triggeredFlags
     */
    setInvokerCast(SpellID : number, castFlags : number, triggeredFlags : number) {
        this.row.action_type.set(134)
        this.row.action_param1.set(SpellID)
        this.row.action_param2.set(castFlags)
        this.row.action_param3.set(triggeredFlags)
        return this.main
    }

    /**
     *
     *  @param entry
     *  @param cinematic
     */
    setPlayCinematic(entry : number, cinematic : number) {
        this.row.action_type.set(135)
        this.row.action_param1.set(entry)
        this.row.action_param2.set(cinematic)
        return this.main
    }

    /**
     *
     *  @param movementType
     *  @param speedInteger
     *  @param speedFraction
     */
    setSetMovementSpeed(movementType : number, speedInteger : number, speedFraction : number) {
        this.row.action_type.set(136)
        this.row.action_param1.set(movementType)
        this.row.action_param2.set(speedInteger)
        this.row.action_param3.set(speedFraction)
        return this.main
    }

    /**
     *  (RESERVED, PENDING CHERRYPICK)
     *  @param spellVisualKitId
     */
    setPlaySpellVisualKit(spellVisualKitId : number) {
        this.row.action_type.set(137)
        this.row.action_param1.set(spellVisualKitId)
        return this.main
    }

    /**
     *
     *  @param zoneId
     *  @param areaLightId
     *  @param lightId (overrideLightId)
     *  @param fadeInTime (transition Milliseconds)
     */
    setOverrideLight(zoneId : number, areaLightId : number, lightId : number, fadeInTime : number) {
        this.row.action_type.set(138)
        this.row.action_param1.set(zoneId)
        this.row.action_param2.set(areaLightId)
        this.row.action_param3.set(lightId)
        this.row.action_param4.set(fadeInTime)
        return this.main
    }

    /**
     *
     *  @param zoneId
     *  @param weatherId
     *  @param weatherGrade (intensity)
     */
    setOverrideWeather(zoneId : number, weatherId : number, weatherGrade : number) {
        this.row.action_type.set(139)
        this.row.action_param1.set(zoneId)
        this.row.action_param2.set(weatherId)
        this.row.action_param3.set(weatherGrade)
        return this.main
    }


    // CUSTOM TSWOW EVENTS BELOW

    /**
     * @param worldStateId
     * @param value
     */
    setSendWorldState(worldStateId: number, value: number) {
        this.row.action_type.set(270)
                .action_param1.set(worldStateId)
                .action_param2.set(value)
        return this.main;
    }

    setSendEventState(gameEvent: number) {
        this.row.action_type.set(271)
                .action_param1.set(gameEvent)
        return this.main;
    }

    setCustom(
          entry: number
        , param1 = 0
        , param2 = 0
        , param3 = 0
        , param4 = 0
        , param5 = 0
        , param6 = 0
        ) {
        this.row
            .action_type.set(entry)
            .action_param1.set(param1)
            .action_param2.set(param2)
            .action_param3.set(param3)
            .action_param4.set(param4)
            .action_param5.set(param5)
            .action_param6.set(param6)
        return this.main;
    }
}
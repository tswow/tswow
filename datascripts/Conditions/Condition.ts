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
import { SQL } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { conditionsCreator, conditionsQuery } from "wotlkdata/sql/types/conditions";
import { ClassType, resolveClassType } from "../Class/ClassType";
import { getRanks, ReputationRanks, reputationRanksToMask } from "../Faction/ReputationRanks";
import { DrunkState, idToDrunkState, resolveDrunkState } from "../Misc/DrunkState";
import { GenderAllowNone, getGender, resolveGender } from "../Misc/Gender";
import { RaceType, resolveRaceType } from "../Race/RaceType";
import { ComparisonType, getComparison, resolveComparison } from "./ConditionComparisonType";
import { ConditionRow } from "./ConditionRow";
import { ConditionType } from "./ConditionType";
import { ConditionTypeID, getConditionTypeID, resolveConditionTypeID } from "./ConditionTypeID";
import { ConditionTypeMask, getConditionTypeMask, resolveConditionTypeMask } from "./ConditionTypeMask";
import { getQuestStates, QuestStateMask, resolveQuestStates } from "./QuestStateMask";
import { getRelation, RelationType, resolveRelation } from "./RelationType";
import { getStandState, resolveStandState, StandState } from "./StandState";

/**
 * TODO: Add missing type transforms
 */
export class Condition<T> extends CellSystem<T> {
    protected state: conditionsCreator = {};

    protected addRow(type: number, group: number, value1: number = 0, value2: number = 0, value3: number = 0) {
        SQL.conditions.add(this.sourceType, this.sourceGroup||0,
            this.sourceEntry||0, this.sourceId||0, group,
            type, 0, value1, value2, value3).Comment.set('tswow')
        return this.owner;
    }

    protected sourceType: number;
    protected sourceGroup?: number;
    protected sourceEntry?: number;
    protected sourceId?: number;
    protected sourceTarget?: number;

    constructor(
        owner: T,
        sourceType: number,
        sourceGroup?: number,
        sourceEntry?: number,
        sourceId?: number,
        sourceTarget?: number) {

        super(owner);
        this.sourceType = sourceType;
        this.sourceGroup = sourceGroup;
        this.sourceEntry = sourceEntry;
        this.sourceId = sourceId;
        this.sourceTarget = sourceTarget;
    }

    protected sourceNames(eventName: string, names: (string|undefined)[], conditionTransform: {[key:number]:any} = {}) {
        const values = [this.sourceGroup, this.sourceEntry, this.sourceId]
        const obj : {[key:string]: any}= {};
        obj['SourceType'] = eventName;
        for(let i=0;i<names.length;++i) {
            const name = names[i];
            const value = values[i];
            if(name===undefined||value===undefined) {
                continue;
            } else {
                if(conditionTransform[value]!==undefined) {
                    obj[name] = conditionTransform[value];
                } else {
                    obj[name] = value;
                }
            }
        }
        return obj;
    }

    protected objectifySource() {
        switch (this.sourceType) {
            case 0: return this.sourceNames("None",[]);
            case 1: return this.sourceNames("CreatureLoot",["LootID","ItemID"])
            case 2: return this.sourceNames("DisenchantLoot",["LootID","ItemID"])
            case 3: return this.sourceNames("FishingLoot",["LootID","ItemID"])
            case 4: return this.sourceNames("GameObjectLoot",["LootID","ItemID"])
            case 5: return this.sourceNames("ItemLoot",["LootID","ItemID"])
            case 6: return this.sourceNames("MailLoot",["LootID","ItemID"])
            case 7: return this.sourceNames("MillingLoot",["LootID","ItemID"])
            case 8: return this.sourceNames("PickpocketingLoot",["LootID","ItemID"])
            case 9: return this.sourceNames("ProspectingLoot",["LootID","ItemID"])
            case 10: return this.sourceNames("ReferenceLoot",["LootID","ItemID"])
            case 11: return this.sourceNames("SkinningLoot",["LootID","ItemID"])
            case 12: return this.sourceNames("SpellLoot",["LootID","ItemID"])
            case 13: return this.sourceNames("SpellImplicitTarget",["TargetMask","SpellID"], {0:"SpellTarget",1:"Caster"})
            case 14: return this.sourceNames("GossipMenu",["MenuID","TextID"],{0:"Player",1:"Self"})
            case 15: return this.sourceNames("GossipMenuOption",["MenuID","OptionID"],{0:"Player",1:"Self"})
            case 16: return this.sourceNames("TemplateVehicle",[undefined,"CreatureID"],{0:"RidingPlayer",1:"Vehicle"})
            case 17: return this.sourceNames("Spell",[undefined,"SpellID"],{0:"Caster",1:"Target"})
            case 18: return this.sourceNames("SpellClickEvent",["CreatureID","Spell"],{0:"Clicker",1:"Target"})
            case 19: return this.sourceNames("QuestAvailable",[undefined,"QuestID"])
            case 20: return this.sourceNames("Unused",[])
            case 21: return this.sourceNames("VehicleSpell",["CreatureID","Spell"],{0:"Player",1:"Vehicle"})
            case 22: return this.sourceNames("SmartEvent",["ScriptID","ID","SourceType"],{0:"Invoker",1:"Object"})
            case 23: return this.sourceNames("NPCVendor",["VendorID","ItemID"])
            case 24: return this.sourceNames("SpellProc",[undefined,"SpellID"],{0:"Actor",1:"Target"})
            default: return {SourceType: `Invalid: (${this.sourceType})`}
        }
    }

    rows() {
        let searchObj : conditionsQuery = {
            SourceTypeOrReferenceId: this.sourceType
        };

        if(this.sourceGroup!==undefined) {
            searchObj.SourceGroup = this.sourceGroup;
        }

        if(this.sourceEntry!==undefined) {
            searchObj.SourceEntry = this.sourceEntry;
        }

        if(this.sourceId!==undefined) {
            searchObj.SourceId = this.sourceId;
        }

        return SQL.conditions
            .filter(searchObj)
            .map(x=>new ConditionRow(this.owner, x));
    }

    objectify() {
        return Object.assign(
            this.objectifySource(),
            {Conditions: this.rows()}
        );
    }

    @ConditionType(1,["SpellID","EffectIndex"])
    addHasAura(spellId: number, effectIndex: number, group = 0) {
        return this.addRow(1,group,spellId,effectIndex);
    }

    @ConditionType(2,["Item","Count","InBank"])
    addHasItem(item: number, count: number, inBank: boolean = false, group = 0) {
        return this.addRow(2,group,item,count,inBank ? 1 : 0);
    }

    @ConditionType(3,["Item"])
    addHasItemEquipped(item: number, group = 0) {
        return this.addRow(3,group,item);
    }

    @ConditionType(4,["Zone"])
    addZoneId(zone: number, group = 0) {
        return this.addRow(4,group,zone);
    }

    @ConditionType(5,["FactionTemplate","RankMask"],[null,getRanks])
    addReputationRank(factionTemplate: number, ranks: ReputationRanks[], group = 0) {
        return this.addRow(5, group, factionTemplate, reputationRanksToMask(ranks));
    }

    @ConditionType(6,["Team"])
    addIsTeam(team: 'HORDE'|'ALLIANCE', group = 0) {
        return this.addRow(6, group, team === 'HORDE' ? 67 : 469);
    }

    /**
     * @param skillLine DBC.SkillLine#ID
     * @param rankValue 1-450
     */
    @ConditionType(7,["SkillLine","RankValue"])
    addSkill(skillLine: number, rankValue: number, group = 0) {
        this.addRow(7, group, skillLine, rankValue);
    }

    @ConditionType(8,["QuestID"])
    addFinishedQuest(questId: number, group = 0) {
        return this.addRow(8, group, questId);
    }

    @ConditionType(9,["QuestID"])
    addStartedQuest(questId: number, group = 0) {
        return this.addRow(9, group, questId);
    }

    @ConditionType(10,["DrunkState"],[idToDrunkState])
    addIsDrunk(state : DrunkState, group = 0) {
        return this.addRow(10,group,resolveDrunkState(state));
    }

    @ConditionType(11,["Index","Value"])
    addWorldState(index: number, value: number, group = 0) {
        return this.addRow(11, group,index, value);
    }

    /**
     * @param entry SQL.game_event#entry
     */
    @ConditionType(12,["Entry"])
    addActiveEvent(entry: number, group = 0) {
        return this.addRow(12, group,entry);
    }

    @ConditionType(13,["Data"])
    addInstanceInfo(entry: number, data: number, group = 0) {
        return this.addRow(13, group, entry, data);
    }

    @ConditionType(14,["QuestID"])
    addQuestNone(quest: number, group = 0) {
        return this.addRow(14, group, quest);
    }

    @ConditionType(15,["ClassMask"])
    addIsClass(cls: ClassType, group = 0) {
        return this.addRow(15, group, 1<<(resolveClassType(cls)-1));
    }

    @ConditionType(16,["RaceMask"])
    addIsRace(race: RaceType, group = 0) {
        return this.addRow(16, group, resolveRaceType(race));
    }

    /**
     * @param id DBC.Achievement#ID
     */
    @ConditionType(17,["AchievementID"])
    addHasAchievement(id: number, group = 0) {
        return this.addRow(17, group, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    @ConditionType(18,["Title"])
    addHasTitle(id: number, group = 0) {
        return this.addRow(18, group, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    @ConditionType(18,["SpawnMask"])
    addSpawnMask(spawnMask: number, group = 0) {
        return this.addRow(18, group, spawnMask);
    }

    @ConditionType(20,["Gender"],[getGender])
    addGender(gender: GenderAllowNone, group = 0) {
        return this.addRow(20, group, resolveGender(gender));
    }

    /**
     * @param state enum from Unit.h
     */
    @ConditionType(20,["State"])
    addUnitState(state: number, group = 0) {
        return this.addRow(21, group, state);
    }

    @ConditionType(21,["MapID"])
    addMapId(mapid: number, group = 0) {
        return this.addRow(22, group, mapid);
    }

    @ConditionType(22,["AreaID"])
    addAreaId(areaId: number, group = 0) {
        return this.addRow(23, group, areaId);
    }

    @ConditionType(23,["CreatureType"])
    addCreatureType(type: number, group = 0) {
        return this.addRow(24, group, type);
    }

    @ConditionType(24,["SpellID"])
    addHasSpell(id: number, group = 0) {
        return this.addRow(25, group, id);
    }

    @ConditionType(25,["Phasemask"])
    addInPhase(phasemask: number, group = 0) {
        return this.addRow(26, group, phasemask);
    }

    @ConditionType(26,["Phasemask"])
    addPhasemask(phaseMask: number, group = 0) {
        return this.addRow(26, group, phaseMask);
    }

    @ConditionType(27,["Level"])
    addLevel(level: number, group = 0) {
        return this.addRow(27, group, level);
    }

    @ConditionType(28,["QuestID"])
    addQuestComplete(questId: number, group = 0) {
        return this.addRow(28, group, questId);
    }

    @ConditionType(29,["CreatureID"])
    addNearCreature(creatureId: number, group = 0) {
        return this.addRow(29, group, creatureId);
    }

    @ConditionType(30,["GameObjectID"])
    addNearGameObject(gameObjectId: number, group = 0) {
        return this.addRow(30, group, gameObjectId);
    }

    @ConditionType(31,["TypeID","ID"],[getConditionTypeID])
    addObjectEntry(typeId:ConditionTypeID, id: number, group = 0) {
        return this.addRow(31, group, resolveConditionTypeID(typeId), id);
    }

    @ConditionType(32,["TypeMask"],[getConditionTypeMask])
    addTypeMask(typeMask: ConditionTypeMask, group = 0) {
        return this.addRow(32, group, resolveConditionTypeMask(typeMask));
    }

    @ConditionType(33,["Target","RelationType"],[null,getRelation])
    addRelationTo(target: number, relationType: RelationType, group = 0) {
        return this.addRow(33, group, target, resolveRelation(relationType));
    }

    @ConditionType(34,["Target","RankMask"],[null,getRanks])
    addReactionTo(target: number, rankMask: ReputationRanks[], group = 0) {
        return this.addRow(34, group, target, reputationRanksToMask(rankMask));
    }

    @ConditionType(35,["Target","Distance","ComparisonType"],[null,null,getComparison])
    addDistanceTo(target: number, distance: number, comparison: ComparisonType,group = 0) {
        return this.addRow(35, group, target, distance, resolveComparison(comparison));
    }

    @ConditionType(36,[])
    addAlive(group = 0) {
        return this.addRow(36, group);
    }

    @ConditionType(37,["HPValue","ComparisonType"],[null,getComparison])
    addHpValue(hpValue: number, comparison: ComparisonType, group = 0) {
        return this.addRow(37, group, hpValue, resolveComparison(comparison));
    }

    @ConditionType(38,["HPPercentage","ComparisonType"], [null,getComparison])
    addHpPercentage(hpPercentage: number, comparison: ComparisonType, group = 0) {
        return this.addRow(38, group, hpPercentage, resolveComparison(comparison));
    }

    @ConditionType(39,["AchievementID"])
    addRealmAchievement(achievementID: number, group = 0) {
        return this.addRow(39, group, achievementID);
    }

    @ConditionType(40,[])
    addInWater(group = 0) {
        return this.addRow(40, group);
    }

    @ConditionType(42,["StateType","StandState"],[null,getStandState])
    addStandState(group = 0, stateType: number, standState: StandState) {
        return this.addRow(42, group, stateType, resolveStandState(standState));
    }

    @ConditionType(43,["QuestID"])
    addDailyQuestDone(questId: number, group = 0) {
        return this.addRow(43, group, questId);
    }

    @ConditionType(44,[])
    addCharmed(group = 0) {
        return this.addRow(44, group);
    }

    @ConditionType(45,["PetType"])
    addPetType(petTypeMask: number,group = 0) {
        return this.addRow(45, group, petTypeMask);
    }

    @ConditionType(46,[])
    addTaxi(group = 0) {
        return this.addRow(46, group);
    }

    @ConditionType(47,["QuestID","StateMask"],[getQuestStates])
    addQuestState(questId: number, stateMask: QuestStateMask[], group = 0) {
        return this.addRow(47, group, questId, resolveQuestStates(stateMask));
    }

    @ConditionType(48,["QuestID","ObjectiveIndex"])
    addQuestObjective(questId: number, objectiveIndex: number, group = 0) {
        return this.addRow(47, group, questId, objectiveIndex);
    }
}
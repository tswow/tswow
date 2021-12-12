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
import { EnumCon, makeEnum } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { makeMask, MaskCon } from "wotlkdata/wotlkdata/cell/cells/MaskCell";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { conditionsCreator, conditionsQuery } from "wotlkdata/wotlkdata/sql/types/conditions";
import { ClassMask } from "../Class/ClassRegistry";
import { DrunkState, resolveDrunkState } from "../Misc/DrunkState";
import { ReputationRank, ReputationRankMask } from "../Misc/ReputationRank";
import { RaceMask } from "../Race/RaceType";
import { ConditionPlain } from "./ConditionTypes";
import { ComparisonTypes } from "./Settings/ComparisonType";
import { GendersAllowNone } from "./Settings/Gender";
import { makeQuestStateMask, QuestState } from "./Settings/QuestState";
import { RelationTypes } from "./Settings/RelationType";
import { StandStates } from "./Settings/StandState";
import { WorldObjectTypes, WorldObjectTypesMask } from "./Settings/WorldObjectType";

/**
 * TODO: Add missing type transforms
 */
export class Condition<T> extends MultiRowSystem<ConditionPlain, T> {
    private defElse: number;

    else(elseGroup: number, callback: (condition: ConditionElse)=>void){
        let condition = new Condition<any>(
              undefined
            , this.sourceType
            , this.sourceGroup
            , this.sourceEntry
            , this.sourceId
            , this.sourceTarget
            , elseGroup
            )
        // @ts-ignore hack
        condition.owner = condition;
        callback(condition as any);
        return this.owner;
    }

    protected getAllRows(): ConditionPlain[] {
        let condition: conditionsQuery = {
              SourceTypeOrReferenceId: this.sourceType
        }
        if(this.sourceGroup)  condition.SourceGroup     = this.sourceGroup;
        if(this.sourceEntry)  condition.SourceEntry     = this.sourceEntry;
        if(this.sourceId)     condition.SourceId        = this.sourceId;
        if(this.sourceTarget) condition.ConditionTarget = this.sourceTarget;
        return SQL.conditions.queryAll(condition)
            .map(x=>new ConditionPlain(x))
    }

    protected isDeleted(value: ConditionPlain): boolean {
        return value.isDeleted();
    }

    protected state: conditionsCreator = {};

    protected addRow(type: number, group: number|undefined, value1: number = 0, value2: number = 0, value3: number = 0) {
        SQL.conditions.add(
              this.sourceType
            , this.sourceGroup  || 0
            , this.sourceEntry  || 0
            , this.sourceId     || 0
            , group             || 0
            , type
            , this.sourceTarget || 0
            , value1
            , value2
            , value3
            ).Comment.set('tswow')
        return this.owner;
    }

    protected sourceType: number;
    protected sourceGroup?: number;
    protected sourceEntry?: number;
    protected sourceId?: number;
    protected sourceTarget?: number;

    constructor(
          owner: T
        , sourceType: number
        , sourceGroup?: number
        , sourceEntry?: number
        , sourceId?: number
        , sourceTarget?: number
        , defaultElseGroup?: number
    ) {
        super(owner);
        this.sourceType = sourceType;
        this.sourceGroup = sourceGroup;
        this.sourceEntry = sourceEntry;
        this.sourceId = sourceId;
        this.sourceTarget = sourceTarget;
        this.defElse = defaultElseGroup || 0;
    }


    addHasAura(spellId: number, effectIndex: number, elseGroup: number) {
        return this.addRow(1,elseGroup,spellId,effectIndex);
    }

    addHasItem(item: number, count: number, inBank: boolean = false, group = this.defElse) {
        return this.addRow(2,group,item,count,inBank ? 1 : 0);
    }

    addHasItemEquipped(item: number, group = this.defElse) {
        return this.addRow(3,group,item);
    }

    addZoneId(zone: number, group = this.defElse) {
        return this.addRow(4,group,zone);
    }

    addReputationRank(factionTemplate: number, ranks: MaskCon<keyof typeof ReputationRank>, group = this.defElse) {
        return this.addRow(5, group, factionTemplate, makeMask(ReputationRank,ranks));
    }

    addIsTeam(team: 'HORDE'|'ALLIANCE', group = this.defElse) {
        return this.addRow(6, group, team === 'HORDE' ? 67 : 469);
    }

    /**
     * @param skillLine DBC.SkillLine#ID
     * @param rankValue 1-450
     */
    addSkill(skillLine: number, rankValue: number, group = this.defElse) {
        this.addRow(7, group, skillLine, rankValue);
    }

    addFinishedQuest(questId: number, group = this.defElse) {
        return this.addRow(8, group, questId);
    }

    addStartedQuest(questId: number, group = this.defElse) {
        return this.addRow(9, group, questId);
    }

    addIsDrunk(state : DrunkState, group = this.defElse) {
        return this.addRow(10,group,resolveDrunkState(state));
    }

    addWorldState(index: number, value: number, group = this.defElse) {
        return this.addRow(11, group,index, value);
    }

    /**
     * @param entry SQL.game_event#entry
     */
    addActiveEvent(entry: number, group = this.defElse) {
        return this.addRow(12, group,entry);
    }

    addInstanceInfo(entry: number, data: number, group = this.defElse) {
        return this.addRow(13, group, entry, data);
    }

    addQuestNone(quest: number, group = this.defElse) {
        return this.addRow(14, group, quest);
    }

    addIsClass(cls: MaskCon<keyof typeof ClassMask>, group = this.defElse) {
        return this.addRow(15, group, makeMask(ClassMask,cls))
    }

    addIsRace(races: MaskCon<keyof typeof RaceMask>, group = this.defElse) {
        return this.addRow(16, group, makeMask(ClassMask,races));
    }

    /**
     * @param id DBC.Achievement#ID
     */
    addHasAchievement(id: number, group = this.defElse) {
        return this.addRow(17, group, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    addHasTitle(id: number, group = this.defElse) {
        return this.addRow(18, group, id);
    }

    /**
     * @param id DBC.CharTitles#ID
     */
    addSpawnMask(spawnMask: number, group = this.defElse) {
        return this.addRow(18, group, spawnMask);
    }

    addGender(gender: EnumCon<GendersAllowNone>, group = this.defElse) {
        return this.addRow(20, group, makeEnum(GendersAllowNone,gender));
    }

    /**
     * @param state enum from Unit.h
     */
    addUnitState(state: number, group = this.defElse) {
        return this.addRow(21, group, state);
    }

    addMapId(mapid: number, group = this.defElse) {
        return this.addRow(22, group, mapid);
    }

    addAreaId(areaId: number, group = this.defElse) {
        return this.addRow(23, group, areaId);
    }

    addCreatureType(type: number, group = this.defElse) {
        return this.addRow(24, group, type);
    }

    addHasSpell(id: number, group = this.defElse) {
        return this.addRow(25, group, id);
    }

    addInPhase(phasemask: number, group = this.defElse) {
        return this.addRow(26, group, phasemask);
    }

    addPhasemask(phaseMask: number, group = this.defElse) {
        return this.addRow(26, group, phaseMask);
    }

    addLevel(level: number, comparison: EnumCon<ComparisonTypes>, group = this.defElse) {
        return this.addRow(27, group, level, makeEnum(ComparisonTypes,comparison));
    }

    addQuestComplete(questId: number, group = this.defElse) {
        return this.addRow(28, group, questId);
    }

    addNearCreature(creatureId: number, group = this.defElse) {
        return this.addRow(29, group, creatureId);
    }

    addNearGameObject(gameObjectId: number, group = this.defElse) {
        return this.addRow(30, group, gameObjectId);
    }

    addObjectEntry(typeId:EnumCon<WorldObjectTypes>, id: number, group = this.defElse) {
        return this.addRow(31, group, makeEnum(WorldObjectTypes,typeId), id);
    }

    addTypeMask(typeMask: MaskCon<WorldObjectTypesMask>, group = this.defElse) {
        return this.addRow(32, group, makeMask(WorldObjectTypesMask,typeMask));
    }

    addRelationTo(target: number, relationType: EnumCon<RelationTypes>, group = this.defElse) {
        return this.addRow(33, group, target, makeEnum(RelationTypes,relationType));
    }

    addReactionTo(target: number, rankMask: MaskCon<keyof typeof ReputationRankMask>, group = this.defElse) {
        return this.addRow(34, group, target, makeMask(ReputationRankMask,rankMask));
    }

    addDistanceTo(target: number, distance: number, comparison: EnumCon<ComparisonTypes>,group = this.defElse) {
        return this.addRow(35, group, target, distance, makeEnum(ComparisonTypes,comparison));
    }

    addAlive(group = this.defElse) {
        return this.addRow(36, group);
    }

    addHpValue(hpValue: number, comparison: EnumCon<ComparisonTypes>, group = this.defElse) {
        return this.addRow(37, group, hpValue, makeEnum(ComparisonTypes,comparison));
    }

    addHpPercentage(hpPercentage: number, comparison: EnumCon<ComparisonTypes>, group = this.defElse) {
        return this.addRow(38, group, hpPercentage, makeEnum(ComparisonTypes,comparison));
    }

    addRealmAchievement(achievementID: number, group = this.defElse) {
        return this.addRow(39, group, achievementID);
    }

    addInWater(group = this.defElse) {
        return this.addRow(40, group);
    }

    addStandState(stateType: number, standState: EnumCon<StandStates>, group = this.defElse) {
        return this.addRow(42, group, stateType, makeEnum(StandStates,standState));
    }

    addDailyQuestDone(questId: number, group = this.defElse) {
        return this.addRow(43, group, questId);
    }

    addCharmed(group = this.defElse) {
        return this.addRow(44, group);
    }

    addPetType(petTypeMask: number,group = this.defElse) {
        return this.addRow(45, group, petTypeMask);
    }

    addTaxi(group = this.defElse) {
        return this.addRow(46, group);
    }

    addQuestState(questId: number, stateMask: QuestState[], group = this.defElse) {
        return this.addRow(47, group, questId, makeQuestStateMask(stateMask));
    }

    addQuestObjective(questId: number, objectiveIndex: number, group = this.defElse) {
        return this.addRow(47, group, questId, objectiveIndex);
    }

    addCustom(entry: number, value1 = 0, value2 = 0, value3 = 0, group = this.defElse) {
        return this.addRow(entry,group,value1,value2,value3)
    }
}

export class ConditionElse extends Condition<ConditionElse> {}
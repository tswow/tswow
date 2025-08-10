import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { MaskCon } from "../../../data/cell/cells/MaskCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { conditionsCreator } from "../../sql/conditions";
import { ClassMask } from "../Class/ClassRegistry";
import { DrunkState } from "../Misc/DrunkState";
import { ReputationRank, ReputationRankMask } from "../Misc/ReputationRank";
import { RaceMask } from "../Race/RaceType";
import { ConditionPlain } from "./ConditionTypes";
import { ComparisonTypes } from "./Settings/ComparisonType";
import { GendersAllowNone } from "./Settings/Gender";
import { QuestState } from "./Settings/QuestState";
import { RelationTypes } from "./Settings/RelationType";
import { StandStates } from "./Settings/StandState";
import { WorldObjectTypes, WorldObjectTypesMask } from "./Settings/WorldObjectType";
/**
 * TODO: Add missing type transforms
 */
export declare class Condition<T> extends MultiRowSystem<ConditionPlain, T> {
    private defElse;
    else(elseGroup: number, callback: (condition: ConditionElse) => void): T;
    protected getAllRows(): ConditionPlain[];
    protected isDeleted(value: ConditionPlain): boolean;
    protected state: conditionsCreator;
    protected addRow(type: number, group: number | undefined, value1?: number, value2?: number, value3?: number): T;
    protected sourceType: number;
    protected sourceGroup?: number;
    protected sourceEntry?: number;
    protected sourceId?: number;
    protected sourceTarget?: number;
    constructor(owner: T, sourceType: number, sourceGroup?: number, sourceEntry?: number, sourceId?: number, sourceTarget?: number, defaultElseGroup?: number);
    addHasAura(spellId: number, effectIndex: number, elseGroup: number): T;
    addHasItem(item: number, count: number, inBank?: boolean, group?: number): T;
    addHasItemEquipped(item: number, group?: number): T;
    addZoneId(zone: number, group?: number): T;
    addReputationRank(factionTemplate: number, ranks: MaskCon<keyof typeof ReputationRank>, group?: number): T;
    addIsTeam(team: 'HORDE' | 'ALLIANCE', group?: number): T;
    /**
     * @param skillLine DBC.SkillLine#ID
     * @param rankValue 1-450
     */
    addSkill(skillLine: number, rankValue: number, group?: number): void;
    addFinishedQuest(questId: number, group?: number): T;
    addStartedQuest(questId: number, group?: number): T;
    addIsDrunk(state: DrunkState, group?: number): T;
    addWorldState(index: number, value: number, group?: number): T;
    /**
     * @param entry SQL.game_event#entry
     */
    addActiveEvent(entry: number, group?: number): T;
    addInstanceInfo(entry: number, data: number, group?: number): T;
    addQuestNone(quest: number, group?: number): T;
    addIsClass(cls: MaskCon<keyof typeof ClassMask>, group?: number): T;
    addIsRace(races: MaskCon<keyof typeof RaceMask>, group?: number): T;
    /**
     * @param id DBC.Achievement#ID
     */
    addHasAchievement(id: number, group?: number): T;
    /**
     * @param id DBC.CharTitles#ID
     */
    addHasTitle(id: number, group?: number): T;
    /**
     * @param id DBC.CharTitles#ID
     */
    addSpawnMask(spawnMask: number, group?: number): T;
    addGender(gender: EnumCon<GendersAllowNone>, group?: number): T;
    /**
     * @param state enum from Unit.h
     */
    addUnitState(state: number, group?: number): T;
    addMapId(mapid: number, group?: number): T;
    addAreaId(areaId: number, group?: number): T;
    addCreatureType(type: number, group?: number): T;
    addHasSpell(id: number, group?: number): T;
    addInPhase(phasemask: number, group?: number): T;
    addPhasemask(phaseMask: number, group?: number): T;
    addLevel(level: number, comparison: EnumCon<ComparisonTypes>, group?: number): T;
    addQuestComplete(questId: number, group?: number): T;
    addNearCreature(creatureId: number, group?: number): T;
    addNearGameObject(gameObjectId: number, group?: number): T;
    addObjectEntry(typeId: EnumCon<WorldObjectTypes>, id: number, group?: number): T;
    addTypeMask(typeMask: MaskCon<WorldObjectTypesMask>, group?: number): T;
    addRelationTo(target: number, relationType: EnumCon<RelationTypes>, group?: number): T;
    addReactionTo(target: number, rankMask: MaskCon<keyof typeof ReputationRankMask>, group?: number): T;
    addDistanceTo(target: number, distance: number, comparison: EnumCon<ComparisonTypes>, group?: number): T;
    addAlive(group?: number): T;
    addHpValue(hpValue: number, comparison: EnumCon<ComparisonTypes>, group?: number): T;
    addHpPercentage(hpPercentage: number, comparison: EnumCon<ComparisonTypes>, group?: number): T;
    addRealmAchievement(achievementID: number, group?: number): T;
    addInWater(group?: number): T;
    addStandState(stateType: number, standState: EnumCon<StandStates>, group?: number): T;
    addDailyQuestDone(questId: number, group?: number): T;
    addCharmed(group?: number): T;
    addPetType(petTypeMask: number, group?: number): T;
    addTaxi(group?: number): T;
    addQuestState(questId: number, stateMask: QuestState[], group?: number): T;
    addQuestObjective(questId: number, objectiveIndex: number, group?: number): T;
    addCustom(entry: number, value1?: number, value2?: number, value3?: number, group?: number): T;
}
export declare class ConditionElse extends Condition<ConditionElse> {
}

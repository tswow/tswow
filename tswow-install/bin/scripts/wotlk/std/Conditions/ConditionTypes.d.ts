import { EnumCellReadOnly, EnumCellTransformReadOnly } from "../../../data/cell/cells/EnumCell";
import { MaskCell32ReadOnly } from "../../../data/cell/cells/MaskCell";
import { conditionsRow } from "../../sql/conditions";
import { ClassMask } from "../Class/ClassRegistry";
import { CreatureType } from "../Creature/CreatureType";
import { TransformedEntityReadOnly } from "../Misc/Entity";
import { ReputationRankMask } from "../Misc/ReputationRank";
import { Team } from "../Misc/TeamEnum";
import { RaceMask } from "../Race/RaceType";
import { ComparisonTypes } from "./Settings/ComparisonType";
import { DrunkenStates } from "./Settings/DrunkenState";
import { GendersAllowNone } from "./Settings/Gender";
import { PetTypeEnumReadOnly } from "./Settings/PetType";
import { QuestStateMaskReadOnly } from "./Settings/QuestState";
import { RelationTypes } from "./Settings/RelationType";
import { StandStates } from "./Settings/StandState";
import { StateTypes } from "./Settings/StateType";
import { UnitStates } from "./Settings/UnitState";
import { WorldObjectTypes, WorldObjectTypesMask } from "./Settings/WorldObjectType";
export declare class ConditionBase extends TransformedEntityReadOnly<conditionsRow, ConditionPlain> {
    protected default(): ConditionPlain;
    protected transformer(): EnumCellTransformReadOnly<any>;
    protected get v1(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
    protected get v2(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
    protected get v3(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
    get IsNegative(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ErrorType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ErrorText(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Type(): ConditionTypeCell;
}
export declare class ConditionPlain extends ConditionBase {
    get ConditionValue1(): number;
    get ConditionValue2(): number;
    get ConditionValue3(): number;
}
export declare class ConditionAura extends ConditionBase {
    get Spell(): import("../Refs/Ref").RefReadOnly<this, import("../Spell/Spell").Spell>;
    get EffectIndex(): number;
}
export declare class ConditionItem extends ConditionBase {
    get Item(): import("../Refs/Ref").RefReadOnly<this, import("../Item/ItemTemplate").ItemTemplate>;
    get Count(): number;
    get InBank(): boolean;
}
export declare class ConditionItemEquipped extends ConditionBase {
    get Item(): import("../Refs/Ref").RefReadOnly<this, import("../Item/ItemTemplate").ItemTemplate>;
}
export declare class ConditionZone extends ConditionBase {
    get Area(): import("../Refs/Ref").RefReadOnly<this, import("../Area/Area").Area>;
}
export declare class ConditionReputationRank extends ConditionBase {
    get Faction(): import("../Refs/Ref").RefReadOnly<this, import("../Faction/Faction").Faction>;
    get Reputation(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof ReputationRankMask>;
}
export declare class ConditionTeam extends ConditionBase {
    get Reputation(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof Team>;
}
export declare class ConditionSkill extends ConditionBase {
    get Skill(): import("../Refs/Ref").RefReadOnly<this, import("../SkillLines/SkillLine").SkillLine>;
    get RankValue(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ConditionQuestRewarded extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
}
export declare class ConditionQuestTaken extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
}
export declare class ConditionDrunkenState extends ConditionBase {
    get DrunkenState(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof DrunkenStates>;
}
export declare class ConditionWorldState extends ConditionBase {
    get WorldState(): number;
    get Value(): number;
}
export declare class ConditionActiveEvent extends ConditionBase {
    get Event(): import("../Refs/Ref").RefReadOnly<this, import("../GameEvent/GameEvent").GameEvent>;
}
export declare class ConditionInstanceInfoType extends EnumCellReadOnly<ConditionInstanceInfo> {
    get DATA(): import("../../../data/cell/cells/EnumCell").EnumValueReadOnly<ConditionInstanceInfo>;
    get GUID_DATA(): import("../../../data/cell/cells/EnumCell").EnumValueReadOnly<ConditionInstanceInfo>;
    get BOSS_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueReadOnly<ConditionInstanceInfo>;
    get DATA_64(): import("../../../data/cell/cells/EnumCell").EnumValueReadOnly<ConditionInstanceInfo>;
}
export declare class ConditionInstanceInfo extends ConditionBase {
    get Entry(): number;
    get Data(): number;
    get DataType(): ConditionInstanceInfoType;
}
export declare class ConditionQuestNone extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
}
export declare class ConditionClass extends ConditionBase {
    get ClassMask(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof ClassMask>;
}
export declare class ConditionRace extends ConditionBase {
    get RaceMask(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof RaceMask>;
}
export declare class ConditionAchievement extends ConditionBase {
    get Achievement(): import("../Refs/Ref").RefReadOnly<this, import("../Achievement/Achievement").Achievement>;
}
export declare class ConditionTitle extends ConditionBase {
    get Title(): import("../Refs/Ref").RefReadOnly<this, import("../Title/Titles").Title>;
}
export declare class ConditionSpawnMask extends ConditionBase {
    get SpawnMask(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
}
export declare class ConditionGender extends ConditionBase {
    get Reputation(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof GendersAllowNone>;
}
export declare class ConditionUnitState extends ConditionBase {
    get UnitState(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof UnitStates>;
}
export declare class ConditionMap extends ConditionBase {
    get Map(): import("../Refs/Ref").RefReadOnly<this, import("../Map/Map").Map>;
}
export declare class ConditionArea extends ConditionBase {
    get Area(): import("../Refs/Ref").RefReadOnly<this, import("../Area/Area").Area>;
}
export declare class ConditionCreatureType extends ConditionBase {
    get CreatureType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof CreatureType>;
}
export declare class ConditionSpell extends ConditionBase {
    get Spell(): import("../Refs/Ref").RefReadOnly<this, import("../Spell/Spell").Spell>;
}
export declare class ConditionPhaseMask extends ConditionBase {
    get PhaseMask(): MaskCell32ReadOnly<this>;
}
export declare class ConditionLevel extends ConditionBase {
    get Level(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
    get ComparisonType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof ComparisonTypes>;
}
export declare class ConditionQuestComplete extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
}
export declare class ConditionNearCreature extends ConditionBase {
    get CreatureTemplate(): import("../Refs/Ref").RefReadOnly<this, import("../Creature/CreatureTemplate").CreatureTemplate>;
    get Distance(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
}
export declare class ConditionNearGameObject extends ConditionBase {
    get GOTemplate(): import("../Refs/Ref").RefReadOnly<this, import("../GameObject/GameObjectTemplate").GameObjectPlain>;
    get Distance(): import("../../../data/sql/SQLCell").SQLCellReadOnly<number, conditionsRow>;
}
export declare class ConditionWorldObjectType extends ConditionBase {
    get WorldObjectType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof WorldObjectTypes>;
    get Template(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ConditionTypeMask extends ConditionBase {
    get WorldObjectTypes(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof WorldObjectTypesMask>;
}
export declare class ConditionRelation extends ConditionBase {
    get Target(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get RelationType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof RelationTypes>;
}
export declare class ConditionReaction extends ConditionBase {
    get Target(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Ranks(): import("../../../data/cell/cells/MaskCell").MaskCellRead<this, typeof ReputationRankMask>;
}
export declare class ConditionDistanceTo extends ConditionBase {
    get Target(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Distance(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get ComparisonType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof ComparisonTypes>;
}
export declare class ConditionAlive extends ConditionBase {
}
export declare class ConditionHPValue extends ConditionBase {
    get HPValue(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get ComparisonType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof ComparisonTypes>;
}
export declare class ConditionHPPercent extends ConditionBase {
    get HPPercent(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get ComparisonType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof ComparisonTypes>;
}
export declare class ConditionRealmAchievement extends ConditionBase {
    get Achievement(): import("../Refs/Ref").RefReadOnly<this, import("../Achievement/Achievement").Achievement>;
}
export declare class ConditionInWater extends ConditionBase {
}
export declare class ConditionStandState extends ConditionBase {
    get StateType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof StateTypes>;
    get StandState(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof StandStates>;
}
export declare class ConditionDailyQuestDone extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
}
export declare class ConditionCharmed extends ConditionBase {
}
export declare class ConditionPetType extends ConditionBase {
    get PetType(): PetTypeEnumReadOnly<this>;
}
export declare class ConditionTaxi extends ConditionBase {
}
export declare class ConditionQuestStateMask extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
    get State(): QuestStateMaskReadOnly<this>;
}
export declare class ConditionQuestObjective extends ConditionBase {
    get Quest(): import("../Refs/Ref").RefReadOnly<this, import("../Quest/Quest").Quest>;
    get Objective(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get Counter(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ConditionDifficulty extends ConditionBase {
    get Difficulty(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ConditionObjectEntryOrGUID extends ConditionBase {
    get WorldObjectType(): import("../../../data/cell/cells/EnumCell").EnumCellRead<this, typeof WorldObjectTypes>;
    get Template(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
    get GUID(): import("../../../data/cell/cells/CellReadOnly").CellWrapperReadOnly<number, this>;
}
export declare class ConditionTypeCell extends EnumCellTransformReadOnly<ConditionBase> {
    get AURA(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionAura>;
    get ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionItem>;
    get ITEM_EQUIPPED(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionItemEquipped>;
    get ZONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionZone>;
    get REPUTATION_RANK(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionReputationRank>;
    get TEAM(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionTeam>;
    get SKILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionSkill>;
    get QUEST_REWARDED(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestRewarded>;
    get QUEST_TAKEN(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestTaken>;
    get DRUNKEN_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionDrunkenState>;
    get WORLD_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionWorldState>;
    get ACTIVE_EVENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionActiveEvent>;
    get INSTANCE_INFO(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionInstanceInfo>;
    get QUEST_NONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestNone>;
    get CLASS(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionClass>;
    get RACE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionRace>;
    get ACHIEVEMENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionAchievement>;
    get TITLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionTitle>;
    get SPAWN_MASK(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionSpawnMask>;
    get GENDER(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionGender>;
    get UNIT_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionUnitState>;
    get MAP(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionMap>;
    get AREA(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionArea>;
    get CREATURE_TYPE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionCreatureType>;
    get SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionSpell>;
    get PHASE_MASK(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionPhaseMask>;
    get LEVEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionLevel>;
    get QUEST_COMPLETE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestComplete>;
    get NEAR_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionNearCreature>;
    get NEAR_GAME_OBJECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionNearGameObject>;
    get WORLD_OBJECT_TYPE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionWorldObjectType>;
    get TYPE_MASK(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionTypeMask>;
    get RELATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionRelation>;
    get REACTION(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionReaction>;
    get DISTANCE_TO(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionDistanceTo>;
    get ALIVE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionAlive>;
    get HP_VALUE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionHPValue>;
    get HP_PERCENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionHPPercent>;
    get REALM_ACHIEVEMENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionRealmAchievement>;
    get IN_WATER(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionInWater>;
    get STAND_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionStandState>;
    get DAILY_QUEST_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionDailyQuestDone>;
    get CHARMED(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionCharmed>;
    get PET_TYPE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionPetType>;
    get TAXI(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionTaxi>;
    get QUEST_STATE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestStateMask>;
    get QUEST_OBJECTIVE(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionQuestObjective>;
    get DIFFICULTY(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionDifficulty>;
    get OBJECT_ENTRY_OR_GUID(): import("../../../data/cell/cells/EnumCell").EnumValueTransformReadOnly<ConditionBase, ConditionObjectEntryOrGUID>;
}

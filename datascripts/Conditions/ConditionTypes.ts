import { EnumCellReadOnly, EnumCellTransformReadOnly } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";
import { conditionsRow } from "wotlkdata/sql/types/conditions";
import { AchievementRegistry } from "../Achievement/Achievement";
import { AreaRegistry } from "../Area/Area";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { CreatureTypeEnumReadOnly } from "../Creature/CreatureType";
import { FactionRegistry } from "../Faction/Faction";
import { GameEventRegistry } from "../GameEvent/GameEvent";
import { GORegistry } from "../GameObject/GameObjectRegistries";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MapRegistry } from "../Map/Maps";
import { ClassMaskReadOnly } from "../Misc/ClassMask";
import { TransformedEntityReadOnly } from "../Misc/Entity";
import { RaceMaskReadOnly } from "../Misc/RaceMask";
import { ReputationRankMaskReadOnly } from "../Misc/ReputationRank";
import { TeamEnumReadOnly } from "../Misc/TeamEnum";
import { QuestRegistry } from "../Quest/Quests";
import { SkillLineRegistry } from "../SkillLines/SkillLines";
import { SpellRegistry } from "../Spell/Spells";
import { TitleRegistry } from "../Title/Titles";
import { ComparisonEnumReadOnly } from "./Settings/ComparisonType";
import { DrunkenStateEnumReadOnly } from "./Settings/DrunkenState";
import { GenderAllowNoneEnumReadOnly } from "./Settings/Gender";
import { PetTypeEnumReadOnly } from "./Settings/PetType";
import { QuestStateMaskReadOnly } from "./Settings/QuestState";
import { RelationTypeEnumReadOnly } from "./Settings/RelationType";
import { StandStateEnumReadOnly } from "./Settings/StandState";
import { StateTypeEnumReadOnly } from "./Settings/StateType";
import { UnitStateMaskReadOnly } from "./Settings/UnitState";
import { WorldObjectTypeEnumReadOnly, WorldObjectTypeMaskReadOnly } from "./Settings/WorldObjectType";

export class ConditionBase extends TransformedEntityReadOnly<conditionsRow, ConditionPlain> {
    protected default(): ConditionPlain {
        return new ConditionPlain(this.row);
    }

    protected transformer(): EnumCellTransformReadOnly<any> {
        return this.Type;
    }

    protected get v1() { return this.row.ConditionValue1}
    protected get v2() { return this.row.ConditionValue2}
    protected get v3() { return this.row.ConditionValue3}

    get IsNegative() { return this.wrap(this.row.NegativeCondition); }
    get ErrorType() { return this.wrap(this.row.ErrorType); }
    get ErrorText() { return this.wrap(this.row.ErrorTextId); }
    get Type() { return new ConditionType(this, this.row.ConditionTypeOrReference); }

    delete() {
        this.row.delete();
        return this;
    }

    isDeleted() {
        return this.row.isDeleted();
    }
}

export class ConditionPlain extends ConditionBase {
    get ConditionValue1() { return this.row.ConditionValue1.get(); }
    get ConditionValue2() { return this.row.ConditionValue1.get(); }
    get ConditionValue3() { return this.row.ConditionValue1.get(); }
}

export class ConditionAura extends ConditionBase {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.v1); }
    get EffectIndex() { return this.v2.get() }
}

export class ConditionItem extends ConditionBase {
    get Item() { return ItemTemplateRegistry.readOnlyRef(this, this.v1); }
    get Count() { return this.v2.get(); }
    get InBank() { return this.v3.get() === 0 ? false : true; }
}

export class ConditionItemEquipped extends ConditionBase {
    get Item() { return ItemTemplateRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionZone extends ConditionBase {
    get Area() { return AreaRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionReputationRank extends ConditionBase {
    get Faction() {
        return FactionRegistry.readOnlyRef(this, this.v1);
    }
    get Reputation() {
        return new ReputationRankMaskReadOnly(this, this.v2);
    }
}

export class ConditionTeam extends ConditionBase {
    get Team() { return new TeamEnumReadOnly(this, this.v1); }
}

export class ConditionSkill extends ConditionBase {
    get Skill() { return SkillLineRegistry.readOnlyRef(this, this.v1); }
    get RankValue() { return this.wrapReadOnly(this.v2); }
}

export class ConditionQuestRewarded extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionQuestTaken extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionDrunkenState extends ConditionBase {
    get DrunkenState() {return new DrunkenStateEnumReadOnly(this, this.v1); }
}

export class ConditionWorldState extends ConditionBase {
    get WorldState() { return this.v1.get(); }
    get Value() { return this.v2.get(); }
}

export class ConditionActiveEvent extends ConditionBase {
    get Event() { return GameEventRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionInstanceInfoType extends EnumCellReadOnly<ConditionInstanceInfo> {
    get Data()      { return this.value(0) }
    get GUIDData()  { return this.value(1) }
    get BossState() { return this.value(2) }
    get Data64()    { return this.value(3) }
}

export class ConditionInstanceInfo extends ConditionBase {
    get Entry() { return this.v1.get(); }
    get Data() { return this.v2.get(); }
    get DataType() { return new ConditionInstanceInfoType(this, this.v3); }
}

export class ConditionQuestNone extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionClass extends ConditionBase {
    get ClassMask() { return new ClassMaskReadOnly(this, this.v1) }
}

export class ConditionRace extends ConditionBase {
    get RaceMask() { return new RaceMaskReadOnly(this, this.v1) }
}

export class ConditionAchievement extends ConditionBase {
    get Achievement() {
        return AchievementRegistry.readOnlyRef(this, this.v1)
    }
}

export class ConditionTitle extends ConditionBase {
    get Title() { return TitleRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionSpawnMask extends ConditionBase {
    get SpawnMask() { return this.v1; }
}

export class ConditionGender extends ConditionBase {
    get Gender() { return new GenderAllowNoneEnumReadOnly(this, this.v1) }
}

export class ConditionUnitState extends ConditionBase {
    get UnitState() { return new UnitStateMaskReadOnly(this, this.v1) }
}

export class ConditionMap extends ConditionBase {
    get Map() { return MapRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionArea extends ConditionBase {
    get Area() { return AreaRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionCreatureType extends ConditionBase {
    get CreatureType() { return new CreatureTypeEnumReadOnly(this, this.v1); }
}

export class ConditionSpell extends ConditionBase {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionPhaseMask extends ConditionBase {
    get PhaseMask() { return new MaskCell32ReadOnly(this, this.v1); }
}

export class ConditionLevel extends ConditionBase {
    get Level() { return this.v1; }
    get ComparisonType() { return new ComparisonEnumReadOnly(this, this.v2); }
}

export class ConditionQuestComplete extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionNearCreature extends ConditionBase {
    get CreatureTemplate() { return CreatureTemplateRegistry.readOnlyRef(this, this.v1); }
    get Distance() { return this.v2; }
}

export class ConditionNearGameObject extends ConditionBase {
    get GOTemplate() {
        return GORegistry.Plain.readOnlyRef(this, this.v1);
    }
    get Distance() { return this.v2; }
}

export class ConditionWorldObjectType extends ConditionBase {
    get WorldObjectType() {
        return new WorldObjectTypeEnumReadOnly(this, this.v1);
    }
    get Template() { return this.wrapReadOnly(this.v2); }
}

export class ConditionTypeMask extends ConditionBase {
    get WorldObjectTypes() {
        return new WorldObjectTypeMaskReadOnly(this, this.v1)
    }
}

export class ConditionRelation extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get RelationType() { return new RelationTypeEnumReadOnly(this, this.v2)}
}

export class ConditionReaction extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get Ranks() { return new ReputationRankMaskReadOnly(this, this.v1); }
}

export class ConditionDistanceTo extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get Distance() { return this.wrapReadOnly(this.v2); }
    get ComparisonType() { return new ComparisonEnumReadOnly(this, this.v3); }
}

export class ConditionAlive extends ConditionBase {
}

export class ConditionHPValue extends ConditionBase {
    get HPValue() { return this.wrapReadOnly(this.v1); }
    get ComparisonType() { return new ComparisonEnumReadOnly(this, this.v2); }
}

export class ConditionHPPercent extends ConditionBase {
    get HPPercent() { return this.wrapReadOnly(this.v1); }
    get ComparisonType() { return new ComparisonEnumReadOnly(this, this.v2); }
}

export class ConditionRealmAchievement extends ConditionBase {
    get Achievement() {
        return AchievementRegistry.readOnlyRef(this, this.v1);
    }
}

export class ConditionInWater extends ConditionBase {}

export class ConditionStandState extends ConditionBase {
    get StateType() { return new StateTypeEnumReadOnly(this, this.v1); }
    get StandState() { return new StandStateEnumReadOnly(this, this.v1); }
}

export class ConditionDailyQuestDone extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionCharmed extends ConditionBase {
}

export class ConditionPetType extends ConditionBase {
    get PetType() { return new PetTypeEnumReadOnly(this, this.v1); }
}

export class ConditionTaxi extends ConditionBase {}

export class ConditionQuestStateMask extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
    get State() { return new QuestStateMaskReadOnly(this, this.v2); }
}

export class ConditionQuestObjective extends ConditionBase {
    get Quest() { return QuestRegistry.readOnlyRef(this, this.v1); }
    get Objective() { return this.wrapReadOnly(this.v2); }
    get Counter() { return this.wrapReadOnly(this.v3); }
}

export class ConditionDifficulty extends ConditionBase {
    get Difficulty() { return this.wrapReadOnly(this.v1); }
}

export class ConditionObjectEntryOrGUID extends ConditionBase {
    get WorldObjectType() {
        return new WorldObjectTypeEnumReadOnly(this, this.v1);
    }

    get Template() { return this.wrapReadOnly(this.v2); }
    get GUID() { return this.wrapReadOnly(this.v3); }
}

export class ConditionType extends EnumCellTransformReadOnly<ConditionBase> {
    get Aura()               { return this.value(1, x=>new ConditionAura(x.row))}
    get Item()               { return this.value(2, x=>new ConditionItem(x.row))}
    get ItemEquipped()       { return this.value(3, x=>new ConditionItemEquipped(x.row))}
    get Zone()               { return this.value(4, x=>new ConditionZone(x.row))}
    get ReputationRank()     { return this.value(5, x=>new ConditionReputationRank(x.row))}
    get Team()               { return this.value(6, x=>new ConditionTeam(x.row))}
    get Skill()              { return this.value(7, x=>new ConditionSkill(x.row))}
    get QuestRewarded()      { return this.value(8, x=>new ConditionQuestRewarded(x.row))}
    get QuestTaken()         { return this.value(9, x=>new ConditionQuestTaken(x.row))}
    get DrunkenState()       { return this.value(10, x=>new ConditionDrunkenState(x.row))}
    get WorldState()         { return this.value(11, x=>new ConditionWorldState(x.row))}
    get ActiveEvent()        { return this.value(12, x=>new ConditionActiveEvent(x.row))}
    get InstanceInfo()       { return this.value(13, x=>new ConditionInstanceInfo(x.row))}
    get QuestNone()          { return this.value(14, x=>new ConditionQuestNone(x.row))}
    get Class()              { return this.value(15, x=>new ConditionClass(x.row))}
    get Race()               { return this.value(16, x=>new ConditionRace(x.row))}
    get Achievement()        { return this.value(17, x=>new ConditionAchievement(x.row))}
    get Title()              { return this.value(18, x=>new ConditionTitle(x.row))}
    get SpawnMask()          { return this.value(19, x=>new ConditionSpawnMask(x.row))}
    get Gender()             { return this.value(20, x=>new ConditionGender(x.row))}
    get UnitState()          { return this.value(21, x=>new ConditionUnitState(x.row))}
    get Map()                { return this.value(22, x=>new ConditionMap(x.row))}
    get Area()               { return this.value(23, x=>new ConditionArea(x.row))}
    get CreatureType()       { return this.value(24, x=>new ConditionCreatureType(x.row))}
    get Spell()              { return this.value(25, x=>new ConditionSpell(x.row))}
    get PhaseMask()          { return this.value(26, x=>new ConditionPhaseMask(x.row))}
    get Level()              { return this.value(27, x=>new ConditionLevel(x.row))}
    get QuestComplete()      { return this.value(28, x=>new ConditionQuestComplete(x.row))}
    get NearCreature()       { return this.value(29, x=>new ConditionNearCreature(x.row))}
    get NearGameObject()     { return this.value(30, x=>new ConditionNearGameObject(x.row))}
    get WorldObjectType()    { return this.value(31, x=>new ConditionWorldObjectType(x.row))}
    get TypeMask()           { return this.value(32, x=>new ConditionTypeMask(x.row))}
    get Relation()           { return this.value(33, x=>new ConditionRelation(x.row))}
    get Reaction()           { return this.value(34, x=>new ConditionReaction(x.row))}
    get DistanceTo()         { return this.value(35, x=>new ConditionDistanceTo(x.row))}
    get Alive()              { return this.value(36, x=>new ConditionAlive(x.row))}
    get HPValue()            { return this.value(37, x=>new ConditionHPValue(x.row))}
    get HPPercent()          { return this.value(38, x=>new ConditionHPPercent(x.row))}
    get RealmAchievement()   { return this.value(39, x=>new ConditionRealmAchievement(x.row))}
    get InWater()            { return this.value(40, x=>new ConditionInWater(x.row))}
    get StandState()         { return this.value(42, x=>new ConditionStandState(x.row))}
    get DailyQuestDone()     { return this.value(43, x=>new ConditionDailyQuestDone(x.row))}
    get Charmed()            { return this.value(44, x=>new ConditionCharmed(x.row))}
    get PetType()            { return this.value(45, x=>new ConditionPetType(x.row))}
    get Taxi()               { return this.value(46, x=>new ConditionTaxi(x.row))}
    get QuestState()         { return this.value(47, x=>new ConditionQuestStateMask(x.row))}
    get QuestObjective()     { return this.value(48, x=>new ConditionQuestObjective(x.row))}
    get Difficulty()         { return this.value(49, x=>new ConditionDifficulty(x.row))}
    get ObjectEntryOrGUID()  { return this.value(51, x=>new ConditionObjectEntryOrGUID(x.row))}
}
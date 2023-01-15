import { EnumCellReadOnly, EnumCellTransformReadOnly, makeEnumCellReadOnly } from "../../../data/cell/cells/EnumCell";
import { makeMaskCell32ReadOnly, MaskCell32ReadOnly } from "../../../data/cell/cells/MaskCell";
import { conditionsRow } from "../../sql/conditions";
import { AchievementRegistry } from "../Achievement/Achievement";
import { AreaRegistry } from "../Area/Area";
import { ClassMask } from "../Class/ClassRegistry";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { CreatureType } from "../Creature/CreatureType";
import { FactionRegistry } from "../Faction/Faction";
import { GameEventRegistry } from "../GameEvent/GameEvent";
import { GORegistry } from "../GameObject/GameObjectRegistries";
import { ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MapRegistry } from "../Map/Maps";
import { TransformedEntityReadOnly } from "../Misc/Entity";
import { ReputationRankMask } from "../Misc/ReputationRank";
import { Team } from "../Misc/TeamEnum";
import { QuestRegistry } from "../Quest/Quests";
import { RaceMask } from "../Race/RaceType";
import { SkillLineRegistry } from "../SkillLines/SkillLines";
import { SpellRegistry } from "../Spell/Spells";
import { TitleRegistry } from "../Title/Titles";
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
    get Type() { return new ConditionTypeCell(this, this.row.ConditionTypeOrReference); }
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
        return makeMaskCell32ReadOnly(ReputationRankMask,this,this.v2);
    }
}

export class ConditionTeam extends ConditionBase {
    get Reputation() {
        return makeEnumCellReadOnly(Team,this,this.v1);
    }
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
    get DrunkenState() {
        return makeEnumCellReadOnly(DrunkenStates,this,this.v1);
    }
}

export class ConditionWorldState extends ConditionBase {
    get WorldState() { return this.v1.get(); }
    get Value() { return this.v2.get(); }
}

export class ConditionActiveEvent extends ConditionBase {
    get Event() { return GameEventRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionInstanceInfoType extends EnumCellReadOnly<ConditionInstanceInfo> {
    get DATA()       { return this.value(0) }
    get GUID_DATA()  { return this.value(1) }
    get BOSS_STATE() { return this.value(2) }
    get DATA_64()    { return this.value(3) }
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
    get ClassMask() { return makeMaskCell32ReadOnly(ClassMask, this, this.v1) }
}

export class ConditionRace extends ConditionBase {
    get RaceMask() { return makeMaskCell32ReadOnly(RaceMask, this, this.v1) }
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
    get Reputation() {
        return makeEnumCellReadOnly(GendersAllowNone,this,this.v1);
    }
}

export class ConditionUnitState extends ConditionBase {
    get UnitState() {
        return makeMaskCell32ReadOnly(UnitStates,this,this.v1);
    }
}

export class ConditionMap extends ConditionBase {
    get Map() { return MapRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionArea extends ConditionBase {
    get Area() { return AreaRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionCreatureType extends ConditionBase {
    get CreatureType() {
        return makeEnumCellReadOnly(CreatureType,this,this.v1);
    }
}

export class ConditionSpell extends ConditionBase {
    get Spell() { return SpellRegistry.readOnlyRef(this, this.v1); }
}

export class ConditionPhaseMask extends ConditionBase {
    get PhaseMask() { return new MaskCell32ReadOnly(this, this.v1); }
}

export class ConditionLevel extends ConditionBase {
    get Level() { return this.v1; }
    get ComparisonType() {
        return makeEnumCellReadOnly(ComparisonTypes,this,this.v2);
    }
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
        return GORegistry.Generic.readOnlyRef(this, this.v1);
    }
    get Distance() { return this.v2; }
}

export class ConditionWorldObjectType extends ConditionBase {
    get WorldObjectType() {
        return makeEnumCellReadOnly(WorldObjectTypes,this, this.v1);
    }
    get Template() { return this.wrapReadOnly(this.v2); }
}

export class ConditionTypeMask extends ConditionBase {
    get WorldObjectTypes() {
        return makeMaskCell32ReadOnly(WorldObjectTypesMask, this, this.v1)
    }
}

export class ConditionRelation extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get RelationType() {
        return makeEnumCellReadOnly(RelationTypes,this, this.v2)
    }
}

export class ConditionReaction extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get Ranks() {
        return makeMaskCell32ReadOnly(ReputationRankMask,this,this.v2);
    }
}

export class ConditionDistanceTo extends ConditionBase {
    get Target() { return this.wrapReadOnly(this.v1); }
    get Distance() { return this.wrapReadOnly(this.v2); }
    get ComparisonType() {
        return makeEnumCellReadOnly(ComparisonTypes,this,this.v3);
    }
}

export class ConditionAlive extends ConditionBase {
}

export class ConditionHPValue extends ConditionBase {
    get HPValue() { return this.wrapReadOnly(this.v1); }
    get ComparisonType() {
        return makeEnumCellReadOnly(ComparisonTypes,this,this.v2);
    }
}

export class ConditionHPPercent extends ConditionBase {
    get HPPercent() { return this.wrapReadOnly(this.v1); }
    get ComparisonType() {
        return makeEnumCellReadOnly(ComparisonTypes,this,this.v2);
    }
}

export class ConditionRealmAchievement extends ConditionBase {
    get Achievement() {
        return AchievementRegistry.readOnlyRef(this, this.v1);
    }
}

export class ConditionInWater extends ConditionBase {}

export class ConditionStandState extends ConditionBase {
    get StateType() { return makeEnumCellReadOnly(StateTypes,this, this.v1); }
    get StandState() { return makeEnumCellReadOnly(StandStates,this, this.v1); }
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
        return makeEnumCellReadOnly(WorldObjectTypes,this, this.v1);
    }

    get Template() { return this.wrapReadOnly(this.v2); }
    get GUID() { return this.wrapReadOnly(this.v3); }
}


export class ConditionTypeCell extends EnumCellTransformReadOnly<ConditionBase> {
    get AURA()                  { return this.value(1, x=>new ConditionAura(x.row))}
    get ITEM()                  { return this.value(2, x=>new ConditionItem(x.row))}
    get ITEM_EQUIPPED()         { return this.value(3, x=>new ConditionItemEquipped(x.row))}
    get ZONE()                  { return this.value(4, x=>new ConditionZone(x.row))}
    get REPUTATION_RANK()       { return this.value(5, x=>new ConditionReputationRank(x.row))}
    get TEAM()                  { return this.value(6, x=>new ConditionTeam(x.row))}
    get SKILL()                 { return this.value(7, x=>new ConditionSkill(x.row))}
    get QUEST_REWARDED()        { return this.value(8, x=>new ConditionQuestRewarded(x.row))}
    get QUEST_TAKEN()           { return this.value(9, x=>new ConditionQuestTaken(x.row))}
    get DRUNKEN_STATE()         { return this.value(10, x=>new ConditionDrunkenState(x.row))}
    get WORLD_STATE()           { return this.value(11, x=>new ConditionWorldState(x.row))}
    get ACTIVE_EVENT()          { return this.value(12, x=>new ConditionActiveEvent(x.row))}
    get INSTANCE_INFO()         { return this.value(13, x=>new ConditionInstanceInfo(x.row))}
    get QUEST_NONE()            { return this.value(14, x=>new ConditionQuestNone(x.row))}
    get CLASS()                 { return this.value(15, x=>new ConditionClass(x.row))}
    get RACE()                  { return this.value(16, x=>new ConditionRace(x.row))}
    get ACHIEVEMENT()           { return this.value(17, x=>new ConditionAchievement(x.row))}
    get TITLE()                 { return this.value(18, x=>new ConditionTitle(x.row))}
    get SPAWN_MASK()            { return this.value(19, x=>new ConditionSpawnMask(x.row))}
    get GENDER()                { return this.value(20, x=>new ConditionGender(x.row))}
    get UNIT_STATE()            { return this.value(21, x=>new ConditionUnitState(x.row))}
    get MAP()                   { return this.value(22, x=>new ConditionMap(x.row))}
    get AREA()                  { return this.value(23, x=>new ConditionArea(x.row))}
    get CREATURE_TYPE()         { return this.value(24, x=>new ConditionCreatureType(x.row))}
    get SPELL()                 { return this.value(25, x=>new ConditionSpell(x.row))}
    get PHASE_MASK()            { return this.value(26, x=>new ConditionPhaseMask(x.row))}
    get LEVEL()                 { return this.value(27, x=>new ConditionLevel(x.row))}
    get QUEST_COMPLETE()        { return this.value(28, x=>new ConditionQuestComplete(x.row))}
    get NEAR_CREATURE()         { return this.value(29, x=>new ConditionNearCreature(x.row))}
    get NEAR_GAME_OBJECT()      { return this.value(30, x=>new ConditionNearGameObject(x.row))}
    get WORLD_OBJECT_TYPE()     { return this.value(31, x=>new ConditionWorldObjectType(x.row))}
    get TYPE_MASK()             { return this.value(32, x=>new ConditionTypeMask(x.row))}
    get RELATION()              { return this.value(33, x=>new ConditionRelation(x.row))}
    get REACTION()              { return this.value(34, x=>new ConditionReaction(x.row))}
    get DISTANCE_TO()           { return this.value(35, x=>new ConditionDistanceTo(x.row))}
    get ALIVE()                 { return this.value(36, x=>new ConditionAlive(x.row))}
    get HP_VALUE()              { return this.value(37, x=>new ConditionHPValue(x.row))}
    get HP_PERCENT()            { return this.value(38, x=>new ConditionHPPercent(x.row))}
    get REALM_ACHIEVEMENT()     { return this.value(39, x=>new ConditionRealmAchievement(x.row))}
    get IN_WATER()              { return this.value(40, x=>new ConditionInWater(x.row))}
    get STAND_STATE()           { return this.value(42, x=>new ConditionStandState(x.row))}
    get DAILY_QUEST_DONE()      { return this.value(43, x=>new ConditionDailyQuestDone(x.row))}
    get CHARMED()               { return this.value(44, x=>new ConditionCharmed(x.row))}
    get PET_TYPE()              { return this.value(45, x=>new ConditionPetType(x.row))}
    get TAXI()                  { return this.value(46, x=>new ConditionTaxi(x.row))}
    get QUEST_STATE()           { return this.value(47, x=>new ConditionQuestStateMask(x.row))}
    get QUEST_OBJECTIVE()       { return this.value(48, x=>new ConditionQuestObjective(x.row))}
    get DIFFICULTY()            { return this.value(49, x=>new ConditionDifficulty(x.row))}
    get OBJECT_ENTRY_OR_GUID()  { return this.value(51, x=>new ConditionObjectEntryOrGUID(x.row))}
}
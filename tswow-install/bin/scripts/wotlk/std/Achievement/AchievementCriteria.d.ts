import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Achievement_CriteriaCreator, Achievement_CriteriaRow } from "../../dbc/Achievement_Criteria";
import { TransformedEntity } from "../Misc/Entity";
import { MoneyCell } from "../Misc/MoneyCell";
import { RefUnknown } from "../Refs/Ref";
import { Achievement } from "./Achievement";
export declare class CriteriaTimer<T extends CriteriaBase> extends CellSystem<T> {
    get Asset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartEvent(): RefUnknown<this>;
    get Time(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(asset: number, startEvent: number, time: number): T;
}
export declare enum CriteriaFlags {
    PROGRESS_BAR = 1,
    HIDDEN = 2,
    FAIL_ACHIEVEMENT = 4,
    RESET_ON_START = 8,
    IS_DATE = 16,
    IS_MONEY = 32,
    IS_ACHIEVEMENT_ID = 64,
    QUANTITY_IS_CAPPED = 128
}
export declare class CriteriaBase extends TransformedEntity<Achievement_CriteriaRow, CriteriaPlain> {
    protected transformer(): EnumCellTransform<this>;
    protected default(): CriteriaPlain;
    constructor(row: Achievement_CriteriaRow);
    get Type(): CriteriaTypeCell<this>;
    get Achievement(): import("../Refs/Ref").RefReadOnly<this, Achievement>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof CriteriaFlags>;
    get UIOrder(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ID(): number;
    clear(): this;
}
export declare class CriteriaPlain extends CriteriaBase {
    get Asset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get FailAsset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FailEvent(): RefUnknown<this>;
    get Quantity(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartAsset(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get StartEvent(): RefUnknown<this>;
    clear(): this;
}
export declare class AchievementCriteria extends MultiRowSystem<CriteriaPlain, Achievement> {
    protected getAllRows(): CriteriaPlain[];
    protected isDeleted(value: CriteriaPlain): boolean;
    protected addCriteria(mod: string, criteriaId: string, c?: Achievement_CriteriaCreator): Achievement_CriteriaRow;
    addGet(mod: string, id: string): CriteriaBase;
    addMod(mod: string, id: string, callback: (criteria: CriteriaBase) => void): Achievement;
}
export declare class KillCreature extends CriteriaBase {
    get CreatureTemplate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KillQuantity(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class WinBG extends CriteriaBase {
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WinCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ReachLevel extends CriteriaBase {
    get Level(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ReachSkillLevel extends CriteriaBase {
    get Skill(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SkillLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteAchievement extends CriteriaBase {
    get CompletedAchievement(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteQuestCount extends CriteriaBase {
    get TotalQuestCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteDailyQuestDay extends CriteriaBase {
    get NumberOfDays(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteQuestsInZone extends CriteriaBase {
    get Zone(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NumberOfDays(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteDailyQuest extends CriteriaBase {
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteBattleGround extends CriteriaBase {
}
export declare class DeathAtMap extends CriteriaBase {
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DeathInDungeon extends CriteriaBase {
    get ManLimit(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteRaid extends CriteriaBase {
    /** Can be 5, 10 or 25 */
    get GroupSize(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class KilledByCreature extends CriteriaBase {
    get CreatureTemplate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class FallWithoutDying extends CriteriaBase {
    get FallHeight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DeathsFrom extends CriteriaBase {
    get EnvironmentalDamage(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteQuest extends CriteriaBase {
    get Quest(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get QuestCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class BeSpellTarget1 extends CriteriaBase {
}
export declare class BeSpellTarget2 extends CriteriaBase {
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CastSpell extends CriteriaBase {
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CastSpell2 extends CriteriaBase {
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class BgObjectiveCapture extends CriteriaBase {
    get Unknown(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HonorableKillAtArea extends CriteriaBase {
    get Area(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KillCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class WinArena extends CriteriaBase {
}
export declare class PlayArena extends CriteriaBase {
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LearnSpell extends CriteriaBase {
    get Spell(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class WinRatedArena extends CriteriaBase {
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flag(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HighestTeamRating extends CriteriaBase {
    get TeamType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ReachTeamRating extends CriteriaBase {
    get TeamType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TeamRating(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LearnSkillLevel extends CriteriaBase {
    get Skill(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    /** apprentice = 1, journeyman=2 etc */
    get SkillLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class OwnItem extends CriteriaBase {
}
export declare class UseItem extends CriteriaBase {
}
export declare class LootItem extends CriteriaBase {
}
export declare class EquipItem extends CriteriaBase {
    get Item(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ItemCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ExploreArea extends CriteriaBase {
    get WorldMapOverlay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class OwnRank extends CriteriaBase {
    /** NOT a reference to CharTitles.dbc */
    get Rank(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class BuyBankSlot extends CriteriaBase {
    get SlotCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class GainReputation extends CriteriaBase {
    get Faction(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ReputationAmount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class GainExaltedReputation extends CriteriaBase {
    get FactionCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class VisitBarberShop extends CriteriaBase {
    get NumberOfVisits(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class EquipEpicItem extends CriteriaBase {
    get ItemSlot(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class RollNeedOnLoot extends CriteriaBase {
}
export declare class RollGreedOnLoot extends CriteriaBase {
    get RollValue(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RollCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HonorableKillClass extends CriteriaBase {
    get Class(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KillCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HonorableKillRace extends CriteriaBase {
    get Race(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get KillCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DoEmote extends CriteriaBase {
    get Emote(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EmoteCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DamageDone extends CriteriaBase {
}
export declare class HealingDone extends CriteriaBase {
}
export declare class GetKillingBlows extends CriteriaBase {
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Flag(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Map(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class MoneyFromQuestReward extends CriteriaBase {
}
export declare class LootMoney extends CriteriaBase {
    get Amount(): MoneyCell<this>;
}
export declare class UseGameObject extends CriteriaBase {
    get GOTemplate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get UseCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SpecialPVPKill extends CriteriaBase {
    get KillCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class FishInGameObject extends CriteriaBase {
    get GOTemplate(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LootCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LearnSkillLineSpells extends CriteriaBase {
    get SkillLine(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class WinDuel extends CriteriaBase {
    get DuelCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HighestPower extends CriteriaBase {
    /** 0 = mana, 1=rage, 3=energy, 6=runic power */
    get PowerType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HighestStat extends CriteriaBase {
    /** 4 = spirit, 3=int, 2 = stamina, 1 = agility, 0 = strength */
    get StatType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HighestSpellPower extends CriteriaBase {
    get SpellSchool(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class HighestRating extends CriteriaBase {
    get RatingType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LootType extends CriteriaBase {
    get LootType(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get LootCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class LearnSkillLine extends CriteriaBase {
    get SkillLine(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class EarnHonorableKill extends CriteriaBase {
    get KillCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class AcceptedSummons extends CriteriaBase {
}
export declare class AchievementPointsReached extends CriteriaBase {
}
export declare class RandomDungeonPlayerCount extends CriteriaBase {
    get PlayerCount(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class CompleteEncounter extends CriteriaBase {
    protected mapRow(): import("../../sql/instance_encounter_achievement").instance_encounter_achievementRow;
    get Map(): number;
    get Boss(): number;
    set(map: number, boss: number): this;
}
export declare class CriteriaTypeCell<T extends CriteriaBase> extends EnumCellTransform<T> {
    get KILL_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, KillCreature>;
    get WIN_BG(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, WinBG>;
    get REACH_LEVEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, ReachLevel>;
    get REACH_SKILL_LEVEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, ReachSkillLevel>;
    get COMPLETE_ACHIEVEMENT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteAchievement>;
    get COMPLETE_QUEST_COUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteQuestCount>;
    get COMPLETE_QUEST_COUNT_DAILY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteDailyQuestDay>;
    get COMPLETE_QUEST_IN_ZONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteQuestsInZone>;
    get DAMAGE_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DamageDone>;
    get COMPLETE_DAILY_QUEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteDailyQuest>;
    get COMPLETE_BATTLE_GROUND(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteBattleGround>;
    get DEATH_AT_MAP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DeathAtMap>;
    get DEATH_IN_DUNGEON(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DeathInDungeon>;
    get COMPLETE_RAID(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteRaid>;
    get KILLED_BY_CREATURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, KilledByCreature>;
    get FALL_WITHOUT_DYING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, FallWithoutDying>;
    get DEATHS_FROM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DeathsFrom>;
    get COMPLETE_QUEST(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteQuest>;
    get BE_SPELL_TARGET(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, BeSpellTarget1>;
    get CAST_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CastSpell>;
    get BG_OBJECTIVE_CAPTURE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, BgObjectiveCapture>;
    get HONORABLE_KILL_AT_AREA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HonorableKillAtArea>;
    get WIN_ARENA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, WinArena>;
    get PLAY_ARENA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, PlayArena>;
    get LEARN_SPELL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LearnSpell>;
    get OWN_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, OwnItem>;
    get WIN_RATED_ARENA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, WinRatedArena>;
    get HIGHEST_TEAM_RATING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HighestTeamRating>;
    get REACH_TEAM_RATING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, ReachTeamRating>;
    get LEARN_SKILL_LEVEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LearnSkillLevel>;
    get USE_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, UseItem>;
    get LOOT_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LootItem>;
    get EXPLORE_AREA(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, ExploreArea>;
    get OWN_RANK(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, OwnRank>;
    get BUY_BANK_SLOT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, BuyBankSlot>;
    get GAIN_REPUTATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, GainReputation>;
    get GAIN_EXALTED_REPUTATION(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, GainExaltedReputation>;
    get VISIT_BARBER_SHOP(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, VisitBarberShop>;
    get EQUIP_EPIC_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, EquipEpicItem>;
    get ROLL_NEED_ON_LOOT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, RollNeedOnLoot>;
    get ROLL_GREED_ON_LOOT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, RollGreedOnLoot>;
    get HONORABLE_KILL_CLASS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HonorableKillClass>;
    get HONORABLE_KILL_RACE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HonorableKillRace>;
    get DO_EMOTE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, DoEmote>;
    get HEALING_DONE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HealingDone>;
    get KILLING_BLOWS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, GetKillingBlows>;
    get EQUIP_ITEM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, EquipItem>;
    get MONEY_FROM_QUEST_REWARD(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MoneyFromQuestReward>;
    get LOOT_MONEY(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LootMoney>;
    get USE_GAME_OBJECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, UseGameObject>;
    get BE_SPELL_TARGET2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, BeSpellTarget2>;
    get SPECIAL_PVP_KILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, SpecialPVPKill>;
    get FISH_IN_GAME_OBJECT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, FishInGameObject>;
    get LEARN_SKILLINE_SPELLS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LearnSkillLineSpells>;
    get WIN_DUEL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, WinDuel>;
    get HIGHEST_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HighestPower>;
    get HIGHEST_STAT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HighestStat>;
    get HIGHEST_SPELL_POWER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HighestSpellPower>;
    get HIGHEST_RATING(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, HighestRating>;
    get LOOT_TYPE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LootType>;
    get CAST_SPELL2(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CastSpell2>;
    get LEARN_SKILL_LINE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, LearnSkillLine>;
    get EARN_HONORABLE_KILL(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, EarnHonorableKill>;
    get ACCEPTED_SUMMONS(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, AcceptedSummons>;
    get ACHIEVEMENT_POINTS_REACHED(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, AchievementPointsReached>;
    get RANDOM_DUNGEON_PLAYER_COUNT(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, RandomDungeonPlayerCount>;
    get COMPLETE_ENCOUNTER(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, CompleteEncounter>;
}

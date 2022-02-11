import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { DBC } from "../../DBCFiles";
import { Achievement_CriteriaCreator, Achievement_CriteriaRow } from "../../dbc/Achievement_Criteria";
import { SQL } from "../../SQLFiles";
import { TransformedEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { MoneyCell } from "../Misc/MoneyCell";
import { RefUnknown } from "../Refs/Ref";
import { Achievement, AchievementRegistry } from "./Achievement";

export class CriteriaTimer<T extends CriteriaBase> extends CellSystem<T> {
    get Asset() { return this.wrap(this.owner.row.Timer_Asset_Id); }
    get StartEvent() { return new RefUnknown(this, this.owner.row.Timer_Start_Event); }
    get Time() { return this.wrap(this.owner.row.Timer_Time); }

    set(asset: number, startEvent: number, time: number) {
        this.Asset.set(asset)
            .StartEvent.set(startEvent)
            .Time.set(time)
        return this.owner;
    }
}

export enum CriteriaFlags {
    PROGRESS_BAR       = 0x1,
    HIDDEN             = 0x2,
    FAIL_ACHIEVEMENT   = 0x4,
    RESET_ON_START     = 0x8,
    IS_DATE            = 0x10,
    IS_MONEY           = 0x20,
    IS_ACHIEVEMENT_ID = 0x40,
    QUANTITY_IS_CAPPED = 0x80,
}

export class CriteriaBase extends TransformedEntity<Achievement_CriteriaRow,CriteriaPlain> {
    protected transformer(): EnumCellTransform<this> {
        return this.Type;
    }

    protected default() { return new CriteriaPlain(this.row); }

    constructor(row: Achievement_CriteriaRow) {
        super(row);
    }

    get Type() { return new CriteriaTypeCell(this, this.row.Type); }
    get Achievement() {
        return AchievementRegistry.readOnlyRef(this, this.row.Achievement_Id);
    }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Flags() {
        return makeMaskCell32(CriteriaFlags, this, this.row.Flags);
    }
    get UIOrder() { return this.wrap(this.row.Ui_Order); }
    get ID() { return this.row.ID.get(); }
    clear() {
        this.row.Type.set(0)
            .Asset_Id.set(0)
            .Fail_Asset.set(0)
            .Description.set({})
            .Fail_Event.set(0)
            .Flags.set(0)
            .Quantity.set(1)
            .Start_Asset.set(0)
            .Start_Event.set(0)
            .Ui_Order.set(0)
            .Timer_Asset_Id.set(0)
            .Timer_Start_Event.set(0)
            .Timer_Time.set(0)
            .Type.set(0)
        return this;
    }
}

export class CriteriaPlain extends CriteriaBase {
    get Asset() { return this.wrap(this.row.Asset_Id); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get FailAsset() { return this.wrap(this.row.Fail_Asset); }
    get FailEvent() {return new RefUnknown(this, this.row.Fail_Event); }
    get Quantity() { return this.wrap(this.row.Quantity)}
    get StartAsset() { return this.wrap(this.row.Start_Asset); }
    get StartEvent() { return new RefUnknown(this, this.row.Start_Event); }

    clear() {
        return this.Type.set(0)
            .Asset.set(0)
            .FailAsset.set(0)
            .Description.set({})
            .FailEvent.set(0)
            .Flags.set(0)
            .Quantity.set(0)
            .StartAsset.set(0)
            .StartEvent.set(0)
            .UIOrder.set(0)
    }
}

export class AchievementCriteria extends MultiRowSystem<CriteriaPlain,Achievement> {

    protected getAllRows(): CriteriaPlain[] {
        return DBC.Achievement_Criteria.queryAll({Achievement_Id:this.owner.ID}).map(x=>new CriteriaPlain(x));
    }
    protected isDeleted(value: CriteriaPlain): boolean {
        return value.row.isDeleted();
    }

    protected addCriteria(mod : string,criteriaId: string, c?: Achievement_CriteriaCreator) {
        const crit = DBC.Achievement_Criteria
            .add(Ids.Achievement_Criteria.id(mod,criteriaId),c)
        crit.Achievement_Id.set(this.owner.ID);
        return crit;
    }

    addGet(mod: string, id: string) {
        return new CriteriaBase(this.addCriteria(mod,id,{}))
            .clear()
    }

    addMod(mod: string, id: string, callback: (criteria: CriteriaBase)=>void) {
        callback(this.addGet(mod,id));
        return this.owner;
    }
}

export class KillCreature extends CriteriaBase {
    get CreatureTemplate() { return this.wrap(this.row.Asset_Id); }
    get KillQuantity() { return this.wrap(this.row.Quantity); }
}

export class WinBG extends CriteriaBase {
    get Map() { return this.wrap(this.row.Asset_Id); }
    get WinCount() { return this.wrap(this.row.Quantity); }
}

export class ReachLevel extends CriteriaBase {
    get Level() { return this.wrap(this.row.Quantity); }
}

export class ReachSkillLevel extends CriteriaBase {
    get Skill() { return this.wrap(this.row.Asset_Id); }
    get SkillLevel() { return this.wrap(this.row.Quantity); }
}

export class CompleteAchievement extends CriteriaBase {
    get CompletedAchievement() { return this.wrap(this.row.Asset_Id); }
}

export class CompleteQuestCount extends CriteriaBase {
    get TotalQuestCount() { return this.wrap(this.row.Quantity); }
}

export class CompleteDailyQuestDay extends CriteriaBase {
    get NumberOfDays() { return this.wrap(this.row.Quantity); }
}

export class CompleteQuestsInZone extends CriteriaBase {
    get Zone() { return this.wrap(this.row.Asset_Id); }
    get NumberOfDays() { return this.wrap(this.row.Quantity); }
}

export class CompleteDailyQuest extends CriteriaBase {
    get Count() { return this.wrap(this.row.Quantity); }
}

export class CompleteBattleGround extends CriteriaBase {
}

export class DeathAtMap extends CriteriaBase {
    get Map() { return this.wrap(this.row.Asset_Id); }
    get Count() { return this.wrap(this.row.Quantity); }
}

export class DeathInDungeon extends CriteriaBase {
    get ManLimit() { return this.wrap(this.row.Asset_Id); }
}

export class CompleteRaid extends CriteriaBase {
    /** Can be 5, 10 or 25 */
    get GroupSize() { return this.wrap(this.row.Asset_Id); }
}

export class KilledByCreature extends CriteriaBase {
    get CreatureTemplate() { return this.wrap(this.row.Asset_Id); }
}

export class FallWithoutDying extends CriteriaBase {
    get FallHeight() { return this.wrap(this.row.Quantity); }
}

export class DeathsFrom extends CriteriaBase {
    get EnvironmentalDamage() { return this.wrap(this.row.Asset_Id); }
}

export class CompleteQuest extends CriteriaBase {
    get Quest() { return this.wrap(this.row.Asset_Id); }
    get QuestCount() { return this.wrap(this.row.Quantity); }
}

export class BeSpellTarget1 extends CriteriaBase {
}

export class BeSpellTarget2 extends CriteriaBase {
    get Spell() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class CastSpell extends CriteriaBase {}

export class CastSpell2 extends CriteriaBase {
    get Spell() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class BgObjectiveCapture extends CriteriaBase {
    get Unknown() { return this.wrap(this.row.Asset_Id); }
    get Count() { return this.wrap(this.row.Quantity); }
}

export class HonorableKillAtArea extends CriteriaBase {
    get Area() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class WinArena extends CriteriaBase {
}

export class PlayArena extends CriteriaBase {
    get Map() { return this.wrap(this.row.Asset_Id); }
}

export class LearnSpell extends CriteriaBase {
    get Spell() { return this.wrap(this.row.Asset_Id); }
}

export class WinRatedArena extends CriteriaBase {
    get SpellCount() { return this.wrap(this.row.Quantity); }
    get Flag() { return this.wrap(this.row.Start_Event); }
}

export class HighestTeamRating extends CriteriaBase {
    get TeamType() { return this.wrap(this.row.Asset_Id); }
}

export class ReachTeamRating extends CriteriaBase {
    get TeamType() { return this.wrap(this.row.Asset_Id); }
    get TeamRating() { return this.wrap(this.row.Quantity); }
}

export class LearnSkillLevel extends CriteriaBase {
    get Skill() { return this.wrap(this.row.Asset_Id); }
    /** apprentice = 1, journeyman=2 etc */
    get SkillLevel() { return this.wrap(this.row.Quantity); }
}

export class OwnItem extends CriteriaBase {
}

export class UseItem extends CriteriaBase {
}

export class LootItem extends CriteriaBase {
}

export class EquipItem extends CriteriaBase {
    get Item() { return this.wrap(this.row.Asset_Id); }
    get ItemCount() { return this.wrap(this.row.Quantity); }
}

export class ExploreArea extends CriteriaBase {
    get WorldMapOverlay() { return this.wrap(this.row.Asset_Id); }
}

export class OwnRank extends CriteriaBase {
    /** NOT a reference to CharTitles.dbc */
    get Rank() { return this.wrap(this.row.Asset_Id); }
}

export class BuyBankSlot extends CriteriaBase {
    get SlotCount() { return this.wrap(this.row.Quantity); }
}

export class GainReputation extends CriteriaBase {
    get Faction() { return this.wrap(this.row.Asset_Id); }
    get ReputationAmount() { return this.wrap(this.row.Quantity); }
}

export class GainExaltedReputation extends CriteriaBase {
    get FactionCount() { return this.wrap(this.row.Quantity); }
}

export class VisitBarberShop extends CriteriaBase {
    get NumberOfVisits() { return this.wrap(this.row.Quantity); }
}

export class EquipEpicItem extends CriteriaBase {
    get ItemSlot() { return this.wrap(this.row.Asset_Id); }
}

export class RollNeedOnLoot extends CriteriaBase {
}

export class RollGreedOnLoot extends CriteriaBase {
    get RollValue() { return this.wrap(this.row.Asset_Id); }
    get RollCount() { return this.wrap(this.row.Quantity); }
}

export class HonorableKillClass extends CriteriaBase {
    get Class() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class HonorableKillRace extends CriteriaBase {
    get Race() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class DoEmote extends CriteriaBase {
    get Emote() { return this.wrap(this.row.Asset_Id); }
    get EmoteCount() { return this.wrap(this.row.Quantity); }
}

export class DamageDone extends CriteriaBase {
}

export class HealingDone extends CriteriaBase {
}

export class GetKillingBlows extends CriteriaBase {
    get Count() { return this.wrap(this.row.Quantity); }
    get Flag() { return this.wrap(this.row.Start_Event); }
    get Map() { return this.wrap(this.row.Start_Asset); }
}

export class MoneyFromQuestReward extends CriteriaBase {
}

export class LootMoney extends CriteriaBase {
    get Amount() { return new MoneyCell(this, 'COPPER', this.row.Quantity); }
}

export class UseGameObject extends CriteriaBase {
    get GOTemplate() { return this.wrap(this.row.Asset_Id); }
    get UseCount() { return this.wrap(this.row.Quantity); }
}

export class SpecialPVPKill extends CriteriaBase {
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class FishInGameObject extends CriteriaBase {
    get GOTemplate() { return this.wrap(this.row.Asset_Id); }
    get LootCount() { return this.wrap(this.row.Quantity); }
}

export class LearnSkillLineSpells extends CriteriaBase {
    get SkillLine() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class WinDuel extends CriteriaBase {
    get DuelCount() { return this.wrap(this.row.Quantity); }
}

export class HighestPower extends CriteriaBase {
    /** 0 = mana, 1=rage, 3=energy, 6=runic power */
    get PowerType() { return this.wrap(this.row.Asset_Id); }
}

export class HighestStat extends CriteriaBase {
    /** 4 = spirit, 3=int, 2 = stamina, 1 = agility, 0 = strength */
    get StatType() { return this.wrap(this.row.Asset_Id); }
}

export class HighestSpellPower extends CriteriaBase {
    get SpellSchool() { return this.wrap(this.row.Asset_Id); }
}

export class HighestRating extends CriteriaBase {
    get RatingType() { return this.wrap(this.row.Asset_Id); }
}

export class LootType extends CriteriaBase {
    get LootType() { return this.wrap(this.row.Asset_Id); }
    get LootCount() { return this.wrap(this.row.Quantity); }
}

export class LearnSkillLine extends CriteriaBase {
    get SkillLine() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class EarnHonorableKill extends CriteriaBase {
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class AcceptedSummons extends CriteriaBase {
}

export class AchievementPointsReached extends CriteriaBase {
}

export class RandomDungeonPlayerCount extends CriteriaBase {
    get PlayerCount() { return this.wrap(this.row.Quantity); }
}

export class CompleteEncounter extends CriteriaBase {
    protected mapRow() {
        return SQL.instance_encounter_achievement
            .query({entry:this.row.Asset_Id.get()})
    }

    get Map() { return this.mapRow().map.get()}
    get Boss() { return this.mapRow().boss.get()}

    set(map: number, boss: number) {
        let old = SQL.instance_encounter_achievement.query({map,boss})
        if(old !== undefined) {
            this.row.Asset_Id.set(old.entry.get());
        } else {
            let id = Ids.instance_encounter_achievement.id()
            SQL.instance_encounter_achievement.add(id)
                .map.set(map)
                .boss.set(boss)
            this.row.Asset_Id.set(id)
        }
        return this;
    }
}

export class CriteriaTypeCell<T extends CriteriaBase> extends EnumCellTransform<T> {
    get  KILL_CREATURE()              { return this.value(0, x=>new KillCreature(x.row)) }
    get  WIN_BG()                     { return this.value(1, x=>new WinBG(x.row)) }
    get  REACH_LEVEL()                { return this.value(5, x=>new ReachLevel(x.row)) }
    get  REACH_SKILL_LEVEL()          { return this.value(7, x=>new ReachSkillLevel(x.row)) }
    get  COMPLETE_ACHIEVEMENT()       { return this.value(8, x=>new CompleteAchievement(x.row)) }
    get  COMPLETE_QUEST_COUNT()       { return this.value(9, x=>new CompleteQuestCount(x.row)) }
    get  COMPLETE_QUEST_COUNT_DAILY() { return this.value(10, x=>new CompleteDailyQuestDay(x.row)) }
    get  COMPLETE_QUEST_IN_ZONE()     { return this.value(11, x=>new CompleteQuestsInZone(x.row)) }
    get  DAMAGE_DONE()                { return this.value(13, x=>new DamageDone(x.row)) }
    get  COMPLETE_DAILY_QUEST()       { return this.value(14, x=>new CompleteDailyQuest(x.row)) }
    get  COMPLETE_BATTLE_GROUND()     { return this.value(15, x=>new CompleteBattleGround(x.row)) }
    get  DEATH_AT_MAP()               { return this.value(16, x=>new DeathAtMap(x.row)) }
    get  DEATH_IN_DUNGEON()           { return this.value(18, x=>new DeathInDungeon(x.row)) }
    get  COMPLETE_RAID()              { return this.value(19, x=>new CompleteRaid(x.row)) }
    get  KILLED_BY_CREATURE()         { return this.value(20, x=>new KilledByCreature(x.row)) }
    get  FALL_WITHOUT_DYING()         { return this.value(24, x=>new FallWithoutDying(x.row)) }
    get  DEATHS_FROM()                { return this.value(26, x=>new DeathsFrom(x.row)) }
    get  COMPLETE_QUEST()             { return this.value(27, x=>new CompleteQuest(x.row)) }
    get  BE_SPELL_TARGET()            { return this.value(28, x=>new BeSpellTarget1(x.row)) }
    get  CAST_SPELL()                 { return this.value(29, x=>new CastSpell(x.row)) }
    get  BG_OBJECTIVE_CAPTURE()       { return this.value(30, x=>new BgObjectiveCapture(x.row)) }
    get  HONORABLE_KILL_AT_AREA()     { return this.value(31, x=>new HonorableKillAtArea(x.row)) }
    get  WIN_ARENA()                  { return this.value(32, x=>new WinArena(x.row)) }
    get  PLAY_ARENA()                 { return this.value(33, x=>new PlayArena(x.row)) }
    get  LEARN_SPELL()                { return this.value(34, x=>new LearnSpell(x.row)) }
    get  OWN_ITEM()                   { return this.value(36, x=>new OwnItem(x.row)) }
    get  WIN_RATED_ARENA()            { return this.value(37, x=>new WinRatedArena(x.row)) }
    get  HIGHEST_TEAM_RATING()        { return this.value(38, x=>new HighestTeamRating(x.row)) }
    get  REACH_TEAM_RATING()          { return this.value(39, x=>new ReachTeamRating(x.row)) }
    get  LEARN_SKILL_LEVEL()          { return this.value(40, x=>new LearnSkillLevel(x.row)) }
    get  USE_ITEM()                   { return this.value(41, x=>new UseItem(x.row)) }
    get  LOOT_ITEM()                  { return this.value(42, x=>new LootItem(x.row)) }
    get  EXPLORE_AREA()               { return this.value(43, x=>new ExploreArea(x.row.Quantity.set(1))) }
    get  OWN_RANK()                   { return this.value(44, x=>new OwnRank(x.row)) }
    get  BUY_BANK_SLOT()              { return this.value(45, x=>new BuyBankSlot(x.row)) }
    get  GAIN_REPUTATION()            { return this.value(46, x=>new GainReputation(x.row)) }
    get  GAIN_EXALTED_REPUTATION()    { return this.value(47, x=>new GainExaltedReputation(x.row)) }
    get  VISIT_BARBER_SHOP()          { return this.value(48, x=>new VisitBarberShop(x.row)) }
    get  EQUIP_EPIC_ITEM()            { return this.value(49, x=>new EquipEpicItem(x.row)) }
    get  ROLL_NEED_ON_LOOT()          { return this.value(50, x=>new RollNeedOnLoot(x.row)) }
    get  ROLL_GREED_ON_LOOT()         { return this.value(51, x=>new RollGreedOnLoot(x.row)) }
    get  HONORABLE_KILL_CLASS()       { return this.value(52, x=>new HonorableKillClass(x.row)) }
    get  HONORABLE_KILL_RACE()        { return this.value(53, x=>new HonorableKillRace(x.row)) }
    get  DO_EMOTE()                   { return this.value(54, x=>new DoEmote(x.row)) }
    get  HEALING_DONE()               { return this.value(55, x=>new HealingDone(x.row)) }
    get  KILLING_BLOWS()              { return this.value(56, x=>new GetKillingBlows(x.row)) }
    get  EQUIP_ITEM()                 { return this.value(57, x=>new EquipItem(x.row)) }
    get  MONEY_FROM_QUEST_REWARD()    { return this.value(62, x=>new MoneyFromQuestReward(x.row)) }
    get  LOOT_MONEY()                 { return this.value(67, x=>new LootMoney(x.row)) }
    get  USE_GAME_OBJECT()            { return this.value(68, x=>new UseGameObject(x.row)) }
    get  BE_SPELL_TARGET2()           { return this.value(69, x=>new BeSpellTarget2(x.row)) }
    get  SPECIAL_PVP_KILL()           { return this.value(70, x=>new SpecialPVPKill(x.row)) }
    get  FISH_IN_GAME_OBJECT()        { return this.value(72, x=>new FishInGameObject(x.row)) }
    get  LEARN_SKILLINE_SPELLS()      { return this.value(75, x=>new LearnSkillLineSpells(x.row)) }
    get  WIN_DUEL()                   { return this.value(76, x=>new WinDuel(x.row)) }
    get  HIGHEST_POWER()              { return this.value(96, x=>new HighestPower(x.row)) }
    get  HIGHEST_STAT()               { return this.value(97, x=>new HighestStat(x.row)) }
    get  HIGHEST_SPELL_POWER()        { return this.value(98, x=>new HighestSpellPower(x.row)) }
    get  HIGHEST_RATING()             { return this.value(100, x=>new HighestRating(x.row)) }
    get  LOOT_TYPE()                  { return this.value(109, x=>new LootType(x.row)) }
    get  CAST_SPELL2()                { return this.value(110, x=>new CastSpell2(x.row)) }
    get  LEARN_SKILL_LINE()           { return this.value(112, x=>new LearnSkillLine(x.row)) }
    get  EARN_HONORABLE_KILL()        { return this.value(113, x=>new EarnHonorableKill(x.row)) }
    get  ACCEPTED_SUMMONS()           { return this.value(114, x=>new AcceptedSummons(x.row)) }
    get  ACHIEVEMENT_POINTS_REACHED() { return this.value(115, x=>new AchievementPointsReached(x.row)) }
    get  RANDOM_DUNGEON_PLAYER_COUNT(){ return this.value(119, x=>new RandomDungeonPlayerCount(x.row)) }
    get  COMPLETE_ENCOUNTER()         { return this.value(120, x=>new CompleteEncounter(x.row))}
}
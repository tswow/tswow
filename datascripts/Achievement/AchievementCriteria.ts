import { EnumCellTransform } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Achievement_CriteriaCreator, Achievement_CriteriaRow } from "wotlkdata/dbc/types/Achievement_Criteria";
import { TransformedEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Achievement } from "./Achievement";

export class CriteriaTimer<T extends CriteriaBase> extends CellSystem<T> {
    get Asset() { return this.wrap(this.owner.row.Timer_Asset_Id); }
    get StartEvent() { return this.wrap(this.owner.row.Timer_Start_Event); }
    get Time() { return this.wrap(this.owner.row.Timer_Time); }

    set(asset: number, startEvent: number, time: number) {
        this.Asset.set(asset)
            .StartEvent.set(startEvent)
            .Time.set(time)
        return this.owner;
    }
}

export class CriteriaFlags<T extends CriteriaBase> extends MaskCell32<T> {
    get ProgressBar() { return this.bit(0); }
    get Hidden() { return this.bit(1); }
    get FailAchievement() { return this.bit(2); }
    get ResetOnStart() { return this.bit(3); }
    get IsDate() { return this.bit(4); }
    get IsMoney() { return this.bit(5); }
    get IsAchievementID() { return this.bit(6); }
    get QuantityIsCapped() { return this.bit(7); }
}

export class CriteriaBase extends TransformedEntity<Achievement_CriteriaRow,CriteriaPlain> {
    protected transformer(): EnumCellTransform<this> {
        return this.Type;
    }

    protected default() { return new CriteriaPlain(this.row); }

    constructor(row: Achievement_CriteriaRow) {
        super(row);
    }

    get Type() { return new CriteriaType(this, this.row.Type); }
    get AchievementID() { return this.row.Achievement_Id.get(); }
    get Description() { return this.wrapLoc(this.row.Description); }
    get Flags() { return new CriteriaFlags(this, this.row.Flags); }
    get UIOrder() { return this.wrap(this.row.Ui_Order); }
    get ID() { return this.row.ID.get(); }
    clear() {
        this.row.Type.set(0)
            .Asset_Id.set(0)
            .Fail_Asset.set(0)
            .Description.set({})
            .Fail_Event.set(0)
            .Flags.set(0)
            .Quantity.set(0)
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
    get FailEvent() {return this.wrap(this.row.Fail_Event); }
    get Quantity() { return this.wrap(this.row.Quantity)}
    get StartAsset() { return this.wrap(this.row.Start_Asset); }
    get StartEvent() { return this.wrap(this.row.Start_Event); }

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
        return DBC.Achievement_Criteria.filter({Achievement_Id:this.owner.ID}).map(x=>new CriteriaPlain(x));
    }
    protected isDeleted(value: CriteriaPlain): boolean {
        return value.row.isDeleted();
    }

    protected addCriteria(mod : string,criteriaId: string, c?: Achievement_CriteriaCreator) {
        const crit = DBC.Achievement_Criteria
            .add(Ids.Achievement_Criteria.id(mod,criteriaId),c)
        crit.Achievement_Id.set(this.owner.row.ID.get());
        return crit;
    }

    getAdd(mod: string, id: string) {
        return new CriteriaBase(this.addCriteria(mod,id,{}))
            .clear()
    }

    modAdd(mod: string, id: string, callback: (criteria: CriteriaBase)=>void) {
        callback(this.getAdd(mod,id));
        return this.owner;
    }
}

export class KillCreature extends CriteriaBase {
    get CreatureTemplateID() { return this.wrap(this.row.Asset_Id); }
    get KillQuantity() { return this.wrap(this.row.Quantity); }
}

export class WinBG extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
    get WinCount() { return this.wrap(this.row.Quantity); }
}

export class ReachLevel extends CriteriaBase {
    get Level() { return this.wrap(this.row.Quantity); }
}

export class ReachSkillLevel extends CriteriaBase {
    get SkillID() { return this.wrap(this.row.Asset_Id); }
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
    get ZoneID() { return this.wrap(this.row.Asset_Id); }
    get NumberOfDays() { return this.wrap(this.row.Quantity); }
}

export class CompleteDailyQuest extends CriteriaBase {
    get Count() { return this.wrap(this.row.Quantity); }
}

export class CompleteBattleGround extends CriteriaBase {
}

export class DeathAtMap extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
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
    get CreatureTemplateID() { return this.wrap(this.row.Asset_Id); }
}

export class FallWithoutDying extends CriteriaBase {
    get FallHeight() { return this.wrap(this.row.Quantity); }
}

export class DeathsFrom extends CriteriaBase {
    get EnvironmentalDamage() { return this.wrap(this.row.Asset_Id); }
}

export class CompleteQuest extends CriteriaBase {
    get QuestID() { return this.wrap(this.row.Asset_Id); }
    get QuestCount() { return this.wrap(this.row.Quantity); }
}

export class BeSpellTarget1 extends CriteriaBase {
}

export class BeSpellTarget2 extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class CastSpell extends CriteriaBase {}

export class CastSpell2 extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

export class BgObjectiveCapture extends CriteriaBase {
    get Unknown() { return this.wrap(this.row.Asset_Id); }
    get Count() { return this.wrap(this.row.Quantity); }
}

export class HonorableKillAtArea extends CriteriaBase {
    get AreaID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class WinArena extends CriteriaBase {
}

export class PlayArena extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
}

export class LearnSpell extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
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
    get SkillID() { return this.wrap(this.row.Asset_Id); }
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
    get ItemTemplateID() { return this.wrap(this.row.Asset_Id); }
    get ItemCount() { return this.wrap(this.row.Quantity); }
}

export class ExploreArea extends CriteriaBase {
    get WorldMapOverlayID() { return this.wrap(this.row.Asset_Id); }
}

export class OwnRank extends CriteriaBase {
    /** NOT a reference to CharTitles.dbc */
    get Rank() { return this.wrap(this.row.Asset_Id); }
}

export class BuyBankSlot extends CriteriaBase {
    get SlotCount() { return this.wrap(this.row.Quantity); }
}

export class GainReputation extends CriteriaBase {
    get FactionID() { return this.wrap(this.row.Asset_Id); }
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
    get ClassID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class HonorableKillRace extends CriteriaBase {
    get RaceID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class DoEmote extends CriteriaBase {
    get EmoteID() { return this.wrap(this.row.Asset_Id); }
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
    get CopperAmount() { return this.wrap(this.row.Quantity); }
}

export class UseGameObject extends CriteriaBase {
    get GameObjectTemplateID() { return this.wrap(this.row.Asset_Id); }
    get UseCount() { return this.wrap(this.row.Quantity); }
}

export class SpecialPVPKill extends CriteriaBase {
    get KillCount() { return this.wrap(this.row.Quantity); }
}

export class FishInGameObject extends CriteriaBase {
    get GameObjectEntry() { return this.wrap(this.row.Asset_Id); }
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

export class CriteriaType<T extends CriteriaBase> extends EnumCellTransform<T> {
    /** Enum Value:                                    0 */
    get  KillCreature()            { return this.value(0, x=>new KillCreature(x.row)) }
    /** Enum Value:                                    1 */
    get  WinBG()                   { return this.value(1, x=>new WinBG(x.row)) }
    /** Enum Value:                                    5 */
    get  ReachLevel()              { return this.value(5, x=>new ReachLevel(x.row)) }
    /** Enum Value:                                    7 */
    get  ReachSkillLevel()         { return this.value(7, x=>new ReachSkillLevel(x.row)) }
    /** Enum Value:                                    8 */
    get  CompleteAchievement()     { return this.value(8, x=>new CompleteAchievement(x.row)) }
    /** Enum Value:                                    9 */
    get  CompleteQuestCount()      { return this.value(9, x=>new CompleteQuestCount(x.row)) }
    /** Enum Value:                                    10 */
    get  CompleteQuestCountDaily() { return this.value(10, x=>new CompleteDailyQuestDay(x.row)) }
    /** Enum Value:                                    11 */
    get  CompleteQuestInZone()     { return this.value(11, x=>new CompleteQuestsInZone(x.row)) }
    /** Enum Value:                                    13 */
    get  DamageDone()              { return this.value(13, x=>new DamageDone(x.row)) }
    /** Enum Value:                                    14 */
    get  CompleteDailyQuest()      { return this.value(14, x=>new CompleteDailyQuest(x.row)) }
    /** Enum Value:                                    15 */
    get  CompleteBattleGround()    { return this.value(15, x=>new CompleteBattleGround(x.row)) }
    /** Enum Value:                                    16 */
    get  DeathAtMap()              { return this.value(16, x=>new DeathAtMap(x.row)) }
    /** Enum Value:                                    18 */
    get  DeathInDungeon()          { return this.value(18, x=>new DeathInDungeon(x.row)) }
    /** Enum Value:                                    19 */
    get  CompleteRaid()            { return this.value(19, x=>new CompleteRaid(x.row)) }
    /** Enum Value:                                    20 */
    get  KilledByCreature()        { return this.value(20, x=>new KilledByCreature(x.row)) }
    /** Enum Value:                                    24 */
    get  FallWithoutDying()        { return this.value(24, x=>new FallWithoutDying(x.row)) }
    /** Enum Value:                                    26 */
    get  DeathsFrom()              { return this.value(26, x=>new DeathsFrom(x.row)) }
    /** Enum Value:                                    27 */
    get  CompleteQuest()           { return this.value(27, x=>new CompleteQuest(x.row)) }
    /** Enum Value:                                    28 */
    get  BeSpellTarget()           { return this.value(28, x=>new BeSpellTarget1(x.row)) }
    /** Enum Value:                                    29 */
    get  CastSpell()               { return this.value(29, x=>new CastSpell(x.row)) }
    /** Enum Value:                                    30 */
    get  BgObjectiveCapture()      { return this.value(30, x=>new BgObjectiveCapture(x.row)) }
    /** Enum Value:                                    31 */
    get  HonorableKillAtArea()     { return this.value(31, x=>new HonorableKillAtArea(x.row)) }
    /** Enum Value:                                    32 */
    get  WinArena()                { return this.value(32, x=>new WinArena(x.row)) }
    /** Enum Value:                                    33 */
    get  PlayArena()               { return this.value(33, x=>new PlayArena(x.row)) }
    /** Enum Value:                                    34 */
    get  LearnSpell()              { return this.value(34, x=>new LearnSpell(x.row)) }
    /** Enum Value:                                    36 */
    get  OwnItem()                 { return this.value(36, x=>new OwnItem(x.row)) }
    /** Enum Value:                                    37 */
    get  WinRatedArena()           { return this.value(37, x=>new WinRatedArena(x.row)) }
    /** Enum Value:                                    38 */
    get  HighestTeamRating()       { return this.value(38, x=>new HighestTeamRating(x.row)) }
    /** Enum Value:                                    39 */
    get  ReachTeamRating()         { return this.value(39, x=>new ReachTeamRating(x.row)) }
    /** Enum Value:                                    40 */
    get  LearnSkillLevel()         { return this.value(40, x=>new LearnSkillLevel(x.row)) }
    /** Enum Value:                                    41 */
    get  UseItem()                 { return this.value(41, x=>new UseItem(x.row)) }
    /** Enum Value:                                    42 */
    get  LootItem()                { return this.value(42, x=>new LootItem(x.row)) }
    /** Enum Value:                                    43 */
    get  ExploreArea()             { return this.value(43, x=>new ExploreArea(x.row)) }
    /** Enum Value:                                    44 */
    get  OwnRank()                 { return this.value(44, x=>new OwnRank(x.row)) }
    /** Enum Value:                                    45 */
    get  BuyBankSlot()             { return this.value(45, x=>new BuyBankSlot(x.row)) }
    /** Enum Value:                                    46 */
    get  GainReputation()          { return this.value(46, x=>new GainReputation(x.row)) }
    /** Enum Value:                                    47 */
    get  GainExaltedReputation()   { return this.value(47, x=>new GainExaltedReputation(x.row)) }
    /** Enum Value:                                    48 */
    get  VisitBarberShop()         { return this.value(48, x=>new VisitBarberShop(x.row)) }
    /** Enum Value:                                    49 */
    get  EquipEpicItem()           { return this.value(49, x=>new EquipEpicItem(x.row)) }
    /** Enum Value:                                    50 */
    get  RollNeedOnLoot()          { return this.value(50, x=>new RollNeedOnLoot(x.row)) }
    /** Enum Value:                                    51 */
    get  RollGreedOnLoot()         { return this.value(51, x=>new RollGreedOnLoot(x.row)) }
    /** Enum Value:                                    52 */
    get  HonorableKillClass()      { return this.value(52, x=>new HonorableKillClass(x.row)) }
    /** Enum Value:                                    53 */
    get  HonorableKillRace()       { return this.value(53, x=>new HonorableKillRace(x.row)) }
    /** Enum Value:                                    54 */
    get  DoEmote()                 { return this.value(54, x=>new DoEmote(x.row)) }
    /** Enum Value:                                    55 */
    get  HealingDone()             { return this.value(55, x=>new HealingDone(x.row)) }
    /** Enum Value:                                    56 */
    get  KillingBlows()            { return this.value(56, x=>new GetKillingBlows(x.row)) }
    /** Enum Value:                                    57 */
    get  EquipItem()               { return this.value(57, x=>new EquipItem(x.row)) }
    /** Enum Value:                                    62 */
    get  MoneyFromQuestReward()    { return this.value(62, x=>new MoneyFromQuestReward(x.row)) }
    /** Enum Value:                                    67 */
    get  LootMoney()               { return this.value(67, x=>new LootMoney(x.row)) }
    /** Enum Value:                                    68 */
    get  UseGameObject()           { return this.value(68, x=>new UseGameObject(x.row)) }
    /** Enum Value:                                    69 */
    get  BeSpellTarget2()          { return this.value(69, x=>new BeSpellTarget2(x.row)) }
    /** Enum Value:                                    70 */
    get  SpecialPVPKill()          { return this.value(70, x=>new SpecialPVPKill(x.row)) }
    /** Enum Value:                                    72 */
    get  FishInGameObject()        { return this.value(72, x=>new FishInGameObject(x.row)) }
    /** Enum Value:                                    75 */
    get  LearnSkillineSpells()     { return this.value(75, x=>new LearnSkillLineSpells(x.row)) }
    /** Enum Value:                                    76 */
    get  WinDuel()                 { return this.value(76, x=>new WinDuel(x.row)) }
    /** Enum Value:                                    96 */
    get  HighestPower()            { return this.value(96, x=>new HighestPower(x.row)) }
    /** Enum Value:                                    97 */
    get  HighestStat()             { return this.value(97, x=>new HighestStat(x.row)) }
    /** Enum Value:                                    98 */
    get  HighestSpellPower()       { return this.value(98, x=>new HighestSpellPower(x.row)) }
    /** Enum Value:                                    100 */
    get  HighestRating()           { return this.value(100, x=>new HighestRating(x.row)) }
    /** Enum Value:                                    109 */
    get  LootType()                { return this.value(109, x=>new LootType(x.row)) }
    /** Enum Value:                                    110 */
    get  CastSpell2()              { return this.value(110, x=>new CastSpell2(x.row)) }
    /** Enum Value:                                    112 */
    get  LearnSkillLine()          { return this.value(112, x=>new LearnSkillLine(x.row)) }
    /** Enum Value:                                    113 */
    get  EarnHonorableKill()       { return this.value(113, x=>new EarnHonorableKill(x.row)) }
    /** Enum Value:                                    114 */
    get  AcceptedSummons()         { return this.value(114, x=>new AcceptedSummons(x.row)) }
    /** Enum Value:                                    115 */
    get  AchievementPointsReached(){ return this.value(115, x=>new AchievementPointsReached(x.row)) }
    /** Enum Value:                                    119 */
    get  RandomDungeonPlayerCount(){ return this.value(119, x=>new RandomDungeonPlayerCount(x.row)) }
}
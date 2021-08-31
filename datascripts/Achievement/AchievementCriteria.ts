import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Achievement_CriteriaCreator, Achievement_CriteriaRow } from "wotlkdata/dbc/types/Achievement_Criteria";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Achievement } from "./Achievement";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";

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

export class CriteriaBase extends MainEntity<Achievement_CriteriaRow> {
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

    objectify() {
        if(all_criteria[this.Type.get()]) {
            return new all_criteria[this.Type.get()](this.row).objectify();
        }
        return super.objectify();
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

export const all_criteria : any = {}
export function CriteriaID(id: number) {
    return function(target: any) {
        all_criteria[id] = target;
    }
}

@CriteriaID(0)
export class KillCreature extends CriteriaBase {
    get CreatureTemplateID() { return this.wrap(this.row.Asset_Id); }
    get KillQuantity() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(1)
export class WinBG extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
    get WinCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(5)
export class ReachLevel extends CriteriaBase {
    get Level() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(7)
export class ReachSkillLevel extends CriteriaBase {
    get SkillID() { return this.wrap(this.row.Asset_Id); }
    get SkillLevel() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(8)
export class CompleteAchievement extends CriteriaBase {
    get CompletedAchievement() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(9)
export class CompleteQuestCount extends CriteriaBase {
    get TotalQuestCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(10)
export class CompleteDailyQuestDay extends CriteriaBase {
    get NumberOfDays() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(11)
export class CompleteQuestsInZone extends CriteriaBase {
    get ZoneID() { return this.wrap(this.row.Asset_Id); }
    get NumberOfDays() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(14)
export class CompleteDailyQuest extends CriteriaBase {
    get Count() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(15)
export class CompleteBattleGround extends CriteriaBase {
}

@CriteriaID(16)
export class DeathAtMap extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
    get Count() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(18)
export class DeathInDungeon extends CriteriaBase {
    get ManLimit() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(19)
export class CompleteRaid extends CriteriaBase {
    /** Can be 5, 10 or 25 */
    get GroupSize() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(20)
export class KilledByCreature extends CriteriaBase {
    get CreatureTemplateID() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(24)
export class FallWithoutDying extends CriteriaBase {
    get FallHeight() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(26)
export class DeathsFrom extends CriteriaBase {
    get EnvironmentalDamage() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(27)
export class CompleteQuest extends CriteriaBase {
    get QuestID() { return this.wrap(this.row.Asset_Id); }
    get QuestCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(28)
export class BeSpellTarget1 extends CriteriaBase {
}

@CriteriaID(69)
export class BeSpellTarget2 extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(29)
export class CastSpell extends CriteriaBase {}

@CriteriaID(110)
export class CastSpell2 extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(30)
export class BgObjectiveCapture extends CriteriaBase {
    get Unknown() { return this.wrap(this.row.Asset_Id); }
    get Count() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(31)
export class HonorableKillAtArea extends CriteriaBase {
    get AreaID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(32)
export class WinArena extends CriteriaBase {
}

@CriteriaID(33)
export class PlayArena extends CriteriaBase {
    get MapID() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(34)
export class LearnSpell extends CriteriaBase {
    get SpellID() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(37)
export class WinRatedArena extends CriteriaBase {
    get SpellCount() { return this.wrap(this.row.Quantity); }
    get Flag() { return this.wrap(this.row.Start_Event); }
}

@CriteriaID(38)
export class HighestTeamRating extends CriteriaBase {
    get TeamType() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(39)
export class ReachTeamRating extends CriteriaBase {
    get TeamType() { return this.wrap(this.row.Asset_Id); }
    get TeamRating() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(40)
export class LearnSkillLevel extends CriteriaBase {
    get SkillID() { return this.wrap(this.row.Asset_Id); }
    /** apprentice = 1, journeyman=2 etc */
    get SkillLevel() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(36)
export class OwnItem extends CriteriaBase {
}

@CriteriaID(41)
export class UseItem extends CriteriaBase {
}

@CriteriaID(42)
export class LootItem extends CriteriaBase {
}

@CriteriaID(57)
export class EquipItem extends CriteriaBase {
    get ItemTemplateID() { return this.wrap(this.row.Asset_Id); }
    get ItemCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(43)
export class ExploreArea extends CriteriaBase {
    get WorldMapOverlayID() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(44)
export class OwnRank extends CriteriaBase {
    /** NOT a reference to CharTitles.dbc */
    get Rank() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(45)
export class BuyBankSlot extends CriteriaBase {
    get SlotCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(46)
export class GainReputation extends CriteriaBase {
    get FactionID() { return this.wrap(this.row.Asset_Id); }
    get ReputationAmount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(47)
export class GainExaltedReputation extends CriteriaBase {
    get FactionCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(48)
export class VisitBarberShop extends CriteriaBase {
    get NumberOfVisits() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(49)
export class EquipEpicItem extends CriteriaBase {
    get ItemSlot() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(50)
export class RollNeedOnLoot extends CriteriaBase {
}

@CriteriaID(51)
export class RollGreedOnLoot extends CriteriaBase {
    get RollValue() { return this.wrap(this.row.Asset_Id); }
    get RollCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(52)
export class HonorableKillClass extends CriteriaBase {
    get ClassID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(53)
export class HonorableKillRace extends CriteriaBase {
    get RaceID() { return this.wrap(this.row.Asset_Id); }
    get KillCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(54)
export class DoEmote extends CriteriaBase {
    get EmoteID() { return this.wrap(this.row.Asset_Id); }
    get EmoteCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(13)
export class DamageDone extends CriteriaBase {
}

@CriteriaID(55)
export class HealingDone extends CriteriaBase {
}

@CriteriaID(56)
export class GetKillingBlows extends CriteriaBase {
    get Count() { return this.wrap(this.row.Quantity); }
    get Flag() { return this.wrap(this.row.Start_Event); }
    get Map() { return this.wrap(this.row.Start_Asset); }
}

@CriteriaID(62)
export class MoneyFromQuestReward extends CriteriaBase {
}

@CriteriaID(67)
export class LootMoney extends CriteriaBase {
    get CopperAmount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(68)
export class UseGameObject extends CriteriaBase {
    get GameObjectTemplateID() { return this.wrap(this.row.Asset_Id); }
    get UseCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(70)
export class SpecialPVPKill extends CriteriaBase {
    get KillCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(72)
export class FishInGameObject extends CriteriaBase {
    get GameObjectEntry() { return this.wrap(this.row.Asset_Id); }
    get LootCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(75)
export class LearnSkillLineSpells extends CriteriaBase {
    get SkillLine() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(76)
export class WinDuel extends CriteriaBase {
    get DuelCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(96)
export class HighestPower extends CriteriaBase {
    /** 0 = mana, 1=rage, 3=energy, 6=runic power */
    get PowerType() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(97)
export class HighestStat extends CriteriaBase {
    /** 4 = spirit, 3=int, 2 = stamina, 1 = agility, 0 = strength */
    get StatType() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(98)
export class HighestSpellPower extends CriteriaBase {
    get SpellSchool() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(100)
export class HighestRating extends CriteriaBase {
    get RatingType() { return this.wrap(this.row.Asset_Id); }
}

@CriteriaID(109)
export class LootType extends CriteriaBase {
    get LootType() { return this.wrap(this.row.Asset_Id); }
    get LootCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(112)
export class LearnSkillLine extends CriteriaBase {
    get SkillLine() { return this.wrap(this.row.Asset_Id); }
    get SpellCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(113)
export class EarnHonorableKill extends CriteriaBase {
    get KillCount() { return this.wrap(this.row.Quantity); }
}

@CriteriaID(114)
export class AcceptedSummons extends CriteriaBase {
}

@CriteriaID(115)
export class AchievementPointsReached extends CriteriaBase {
}

@CriteriaID(119)
export class RandomDungeonPlayerCount extends CriteriaBase {
    get PlayerCount() { return this.wrap(this.row.Quantity); }
}

export class CriteriaType<T extends CriteriaBase> extends EnumCellWrapper<T> {
    @EnumField(0)
    setKillCreature() { return new KillCreature(this.set(0).row); }
    @EnumField(1)
    setWinBG() { return new WinBG(this.set(1).row)}
    @EnumField(5)
    setReachLevel() { return new ReachLevel(this.set(5).row)}
    @EnumField(7)
    setReachSkillLevel() { return new ReachSkillLevel(this.set(7).row)}
    @EnumField(8)
    setCompleteAchievement() { return new CompleteAchievement(this.set(8).row)}
    @EnumField(9)
    setCompleteQuestCount() { return new CompleteQuestCount(this.set(9).row)}
    @EnumField(10)
    setCompleteQuestCountDaily() { return new CompleteDailyQuestDay(this.set(10).row)}
    @EnumField(11)
    setCompleteQuestInZone() { return new CompleteQuestsInZone(this.set(11).row)}
    @EnumField(14)
    setCompleteDailyQuest() { return new CompleteDailyQuest(this.set(14).row)}
    @EnumField(15)
    setCompleteBattleGround() { return new CompleteBattleGround(this.set(15).row)}
    @EnumField(16)
    setDeathAtMap() { return new DeathAtMap(this.set(16).row)}
    @EnumField(18)
    setDeathInDungeon() { return new DeathInDungeon(this.set(18).row)}
    @EnumField(19)
    setCompleteRaid() { return new CompleteRaid(this.set(19).row)}
    @EnumField(20)
    setKilledByCreature() { return new KilledByCreature(this.set(20).row)}
    @EnumField(24)
    setFallWithoutDying() { return new FallWithoutDying(this.set(24).row)}
    @EnumField(26)
    setDeathsFrom() { return new DeathsFrom(this.set(26).row)}
    @EnumField(27)
    setCompleteQuest() { return new CompleteQuest(this.set(27).row)}
    @EnumField(28)
    setBeSpellTarget() { return new BeSpellTarget1(this.set(28).row)}
    @EnumField(69)
    setBeSpellTarget2() { return new BeSpellTarget2(this.set(69).row)}
    @EnumField(29)
    setCastSpell() { return new CastSpell(this.set(29).row)}
    @EnumField(110)
    setCastSpell2() { return new CastSpell2(this.set(110).row)}
    @EnumField(30)
    setBgObjectiveCapture() { return new BgObjectiveCapture(this.set(30).row)}
    @EnumField(31)
    setHonorableKillAtArea() { return new HonorableKillAtArea(this.set(31).row)}
    @EnumField(32)
    setWinArena() { return new WinArena(this.set(32).row)}
    @EnumField(33)
    setPlayArena() { return new PlayArena(this.set(33).row)}
    @EnumField(34)
    setLearnSpell() { return new LearnSpell(this.set(34).row)}
    @EnumField(37)
    setWinRatedArena() { return new WinRatedArena(this.set(37).row)}
    @EnumField(38)
    setHighestTeamRating() { return new HighestTeamRating(this.set(38).row)}
    @EnumField(39)
    setReachTeamRating() { return new ReachTeamRating(this.set(39).row)}
    @EnumField(40)
    setLearnSkillLevel() { return new LearnSkillLevel(this.set(40).row)}
    @EnumField(36)
    setOwnItem() { return new OwnItem(this.set(36).row)}
    @EnumField(41)
    setUseItem() { return new UseItem(this.set(41).row)}
    @EnumField(42)
    setLootItem() { return new LootItem(this.set(42).row)}
    @EnumField(57)
    setEquipItem() { return new EquipItem(this.set(57).row)}
    @EnumField(43)
    setExploreArea() { return new ExploreArea(this.set(43).row)}
    @EnumField(44)
    setOwnRank() { return new OwnRank(this.set(44).row)}
    @EnumField(45)
    setBuyBankSlot() { return new BuyBankSlot(this.set(45).row)}
    @EnumField(46)
    setGainReputation() { return new GainReputation(this.set(46).row)}
    @EnumField(47)
    setGainExaltedReputation() { return new GainExaltedReputation(this.set(47).row)}
    @EnumField(48)
    setVisitBarberShop() { return new VisitBarberShop(this.set(48).row)}
    @EnumField(49)
    setEquipEpicItem() { return new EquipEpicItem(this.set(49).row)}
    @EnumField(50)
    setRollNeedOnLoot() { return new RollNeedOnLoot(this.set(50).row)}
    @EnumField(51)
    setRollGreedOnLoot() { return new RollGreedOnLoot(this.set(51).row)}
    @EnumField(52)
    setHonorableKillClass() { return new HonorableKillClass(this.set(52).row)}
    @EnumField(53)
    setHonorableKillRace() { return new HonorableKillRace(this.set(53).row)}
    @EnumField(54)
    setDoEmote() { return new DoEmote(this.set(54).row)}
    @EnumField(13)
    setDamageDone() { return new DamageDone(this.set(13).row)}
    @EnumField(55)
    setHealingDone() { return new HealingDone(this.set(55).row)}
    @EnumField(56)
    setKillingBlows() { return new GetKillingBlows(this.set(56).row)}
    @EnumField(62)
    setMoneyFromQuestReward() { return new MoneyFromQuestReward(this.set(62).row)}
    @EnumField(67)
    setLootMoney() { return new LootMoney(this.set(67).row)}
    @EnumField(68)
    setUseGameObject() { return new UseGameObject(this.set(68).row)}
    @EnumField(70)
    setSpecialPVPKill() { return new SpecialPVPKill(this.set(70).row)}
    @EnumField(72)
    setFishInGameObject() { return new FishInGameObject(this.set(72).row)}
    @EnumField(75)
    setLearnSkillineSpells() { return new LearnSkillLineSpells(this.set(75).row)}
    @EnumField(76)
    setWinDuel() { return new WinDuel(this.set(76).row)}
    @EnumField(96)
    setHighestPower() { return new HighestPower(this.set(96).row)}
    @EnumField(97)
    setHighestStat() { return new HighestStat(this.set(97).row)}
    @EnumField(98)
    setHighestSpellPower() { return new HighestSpellPower(this.set(98).row)}
    @EnumField(100)
    setHighestRating() { return new HighestRating(this.set(100).row)}
    @EnumField(109)
    setLootType() { return new LootType(this.set(109).row)}
    @EnumField(112)
    setLearnSkillLine() { return new LearnSkillLine(this.set(112).row)}
    @EnumField(113)
    setEarnHonorableKill() { return new EarnHonorableKill(this.set(113).row)}
    @EnumField(114)
    setAcceptedSummons() { return new AcceptedSummons(this.set(114).row)}
    @EnumField(115)
    setAchievementPointsReached() { return new AchievementPointsReached(this.set(115).row)}
    @EnumField(119)
    setRandomDungeonPlayerCount() { return new RandomDungeonPlayerCount(this.set(119).row)}
}
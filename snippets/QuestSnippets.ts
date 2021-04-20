import { std } from "../datascripts/tswow-stdlib-data";

/**
 * Snippet: Quest::Kill
 * - Basic kill quest with some rewards
 */
std.Quests.create('my','quest')
    .MinLevel.set(1)

    .Objectives.Entity.add(3,10)
    .Objectives.Entity.add(6,10)

    .Rewards.ChoiceItem.add(25,1)
    .Rewards.Money.set(100)
    .Rewards.Difficulty.set1()

    .Questgiver.addBoth(1)
/** end-snippet */
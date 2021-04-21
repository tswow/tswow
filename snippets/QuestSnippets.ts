import { std } from "../datascripts/tswow-stdlib-data";
import { Pos } from "../datascripts/Misc/Position";

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

/**
 * Snippet: Quest::Escort
 * - Basic escort quest
 * - The waypoint examples are in the Blood Elf starting zone
 */
{
    let walker = std.CreatureTemplates.create(/*@1*/'mod'/**/,/*@2*/'id'/**/+'-walker')
        .Name.enGB.set('Questgiver NPC')
        .Models.addIds(29419)
        .FactionTemplate.setNeutralPassive()
        .NPCFlags.QuestGiver.mark()
        .spawn(/*@1*/'mod'/**/,/*@2*/'id'/**/+'-walker-spawn',
            // Spawn location of walker npc
            /*@3*/Pos(530,10350.250000,-6383.138184,38.526325,1.679071)/**/,
        ).end

    let finisher = std.CreatureTemplates.create(/*@1*/'mod'/**/,/*@2*/'id'/**/+'-finisher')
        .Name.enGB.set('Returner NPC')
        .Models.addIds(29419)
        .FactionTemplate.setNeutralPassive()
        .NPCFlags.QuestGiver.mark()
        .spawn(/*@1*/'mod'/**/,/*@2*/'id'/**/+'-finisher-spawn',
            // Spawn location of finisher npc (replace with your own)
            /*@4*/Pos(530,10340.181641,-6371.824707,35.110600,0.795497),/**/
        ).end

    let quest = std.Quests.create(/*@1*/'mod'/**/,/*@2*/'id'/**/+'-quest')
        .SortID.set(1)
        .MinLevel.set(1)
        .Questgiver.addStarter(walker.ID)
        .Questgiver.addEnder(finisher.ID)
        .Objectives.Scripted.enGB.set('NPC Escorted')
        .Text.Title.enGB.set('Escort Quest')
        .Text.Description.enGB.set('Quest Description')
        .Text.Objective.enGB.set('Help escort the NPC')
        .Text.Incomplete.enGB.set('Did you escort the NPC yet?')
        .Text.Reward.enGB.set('Good job escorting the NPC')

    let path = std.ScriptPaths.create()
        .add([
            // Waypoints (replace with your own!)
            /*@6*/Pos(530,10348.591797,-6373.072266,36.098927,1.677500),/**/
        ])

    walker.Scripts.onAcceptedQuest(quest.ID)
        .Action.setQuestWalk(true,path.ID,false,quest.ID,1,"DEFENSIVE")

    walker.Scripts.onDeath()
        .Action.setFailQuestWalk(quest.ID)
    
    walker.Scripts.onWaypointReached(path.length,path.ID)
        .Action.setForceDespawn(5000,5)
        .Target.setSelf()
        .then()
        .Action.setFinishQuestWalk(quest.ID)
}
/** end-snippet */
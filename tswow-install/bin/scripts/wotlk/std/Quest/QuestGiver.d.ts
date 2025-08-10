import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Quest } from "./Quest";
export declare class QuestNPC extends CellSystem<Quest> {
    /**
     * Mark a Creature as the start of a Quest.
     * @param npcId
     */
    addCreatureStarter(npcId: number): Quest;
    /**
     * Mark a Creature as the end of a Quest.
     * @param npcId
     */
    addCreatureEnder(npcId: number, addPoi?: boolean): Quest;
    /**
     * Mark a Creature as both a Quest starter and ender
     * @param npcId
     */
    addCreatureBoth(npcId: number, addPoi?: boolean): Quest;
    /**
     * Mark a GameObject as the start of a Quest.
     * @param goId
     */
    addObjectStarter(goId: number): Quest;
    /**
     * Mark a GameObject as the end of a Quest.
     * @param goId
     */
    addObjectEnder(goId: number): Quest;
    /**
     * Mark a GameObject as both a Quest starter and ender
     * @param goId
     */
    addObjectBoth(goId: number): Quest;
}

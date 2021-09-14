import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Quest } from "./Quest";

export class QuestSpecialFlags extends MaskCell32<Quest> {
    get Repeatable() { return this.bit(0); }

    /**
     * Makes quest only completable via some external event,
     *
     * For example:
     * - entry in areatrigger_involvedrelation
     * - entry in spell_script with command 7
     */
    get CustomComplete() { return this.bit(0); }
    get AutoAccept() { return this.bit(0); }
    get DungeonFinder() { return this.bit(0); }
    get Monthly() { return this.bit(0); }

    /**
     * usually involves killing invisible "bunny" npc with a spell
     */
    get DummyKillCredit() { return this.bit(0); }
}
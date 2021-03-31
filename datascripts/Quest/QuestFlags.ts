import { MaskCell } from "wotlkdata/cell/systems/Mask";
import { Quest } from "./Quest";

/**
 * Note that some flags may not be supported by the core
 * TODO: I read these from my phone screen, so they might be inaccurate.
 */
export class QuestFlags extends MaskCell<Quest> {
    get StayAlive() { return this.bit(0); }
    get PartyAccept() { return this.bit(1); }
    get Exploration() { return this.bit(2); }
    get HasCondition() { return this.bit(3); }
    get HideRewardPOI() { return this.bit(4); }
    get Raid() { return this.bit(5); }
    get TBC() { return this.bit(6); }
    get NoMoneyFromXP() { return this.bit(7); }
    get HiddenRewards() { return this.bit(8); }
    get Tracking() { return this.bit(9); }
    get DeprecateReputation() { return this.bit(10); }
    get Daily() { return this.bit(11); }
    get PvP() { return this.bit(12); }
    get Unavailable() { return this.bit(13); }
    get Weekly() { return this.bit(14); }
    get Autocomplete() { return this.bit(15); }
    get ShowItemInTracker() { return this.bit(16); }
    get ObjText() { return this.bit(17); }
    get AutoAccept() { return this.bit(18); }
    get CastOnAccept() { return this.bit(19); }
    get CastOnComplete() { return this.bit(20); }
    get UpdatePhaseShift() { return this.bit(21); }
    get SORWhitelist() { return this.bit(22); }
    get LaunchGossipComplete() { return this.bit(23); }
    get RemoveExtraGetItems() { return this.bit(24); }
    get HideUntilDiscovered() { return this.bit(25); }
    get PortraitInQuestLog() { return this.bit(26); }
    get ShowItemWhenCompleted() { return this.bit(27); }
    get LaunchGossipAccept() { return this.bit(28); }
    get ItemsGlowWhenDone() { return this.bit(29); }
    get FailOnLogout() { return this.bit(30); }
}
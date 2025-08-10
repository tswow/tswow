import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Table } from "../../../data/table/Table";
import { quest_templateQuery, quest_templateRow } from "../../sql/quest_template";
import { ChildEntity, MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { Quest } from "./Quest";
import { QuestRewardMail } from "./QuestAddon";
import { QuestDifficultyIndex } from "./QuestDifficultyIndex";
export declare class ItemChoiceReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;
    constructor(container: T, index: number, row: quest_templateRow);
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
    get Quantity(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemChoiceRewards<T> extends ArraySystem<ItemChoiceReward<T>, T> {
    protected row: quest_templateRow;
    constructor(owner: T, row: quest_templateRow);
    get length(): number;
    get(index: number): ItemChoiceReward<T>;
    add(item: number, quantity: number): T;
}
export declare class ItemReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;
    constructor(container: T, index: number, row: quest_templateRow);
    get Item(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Quantity(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemRewards<T> extends ArraySystem<ItemReward<T>, T> {
    protected row: quest_templateRow;
    constructor(owner: T, row: quest_templateRow);
    get length(): number;
    get(index: number): ItemReward<T>;
    add(item: number, quantity: number): T;
}
export declare class ReputationReward<T> extends ArrayEntry<T> {
    protected row: quest_templateRow;
    constructor(container: T, index: number, row: quest_templateRow);
    get Faction(): import("../Refs/Ref").RefNoCreate<this, import("../Faction/Faction").Faction>;
    get Reputation(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ReputationRewards<T> extends ArraySystem<ReputationReward<T>, T> {
    protected row: quest_templateRow;
    constructor(owner: T, row: quest_templateRow);
    get length(): number;
    get(index: number): ReputationReward<T>;
    add(faction: number, reputation: number): T;
}
export declare class QuestRewardTalents extends ChildEntity<quest_templateRow, Quest> {
    /**
     * Talent points that are added as a permanent bonus to the players talent points
     */
    get Permanent(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /**
     * Talents that are situationally or temporarily added as bonuses to the players talent points.
     *
     * - This is what death knight quests uses to give quest-based talent points in their starting zone.
     *   Unused in all other maps and by all other classes by default, but can be customized the
     *   Player.OnCalcTalentPoints livescript event.
     */
    get Temporary(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
}
export declare class QuestReward extends ChildEntity<quest_templateRow, Quest> {
    /** Reward player with items (no choice) */
    get Item(): ItemRewards<Quest>;
    /** Let player choose one of multiple items (Maximum 6) */
    get ChoiceItem(): ItemChoiceRewards<Quest>;
    /** Reward player with reputation to a faction */
    get Reputation(): ReputationRewards<Quest>;
    /** Money earned by completing this quest (becomes requirement if negative) */
    get Money(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** Bonus money at level 80 */
    get MoneyBonus(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** Display a spell when the player completes the quest */
    get DisplaySpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** Reward player with honor points */
    get Honor(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** Reward player with talent points */
    get Talents(): QuestRewardTalents;
    /** Reward player with a Title, such as <Grunt> */
    get Title(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get Difficulty(): QuestDifficultyIndex<Quest>;
    /** Reward player with arena points */
    get ArenaPoints(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    /** The mail received upon */
    get Mail(): QuestRewardMail;
}
/**
 * Used for LFGDungeonRewards
 */
export declare class QuestRewardStandalone extends MainEntity<quest_templateRow> {
    get ID(): number;
    /** Reward player with items (no choice) */
    get Item(): ItemRewards<this>;
    /** Let player choose one of multiple items (Maximum 6) */
    get ChoiceItem(): ItemChoiceRewards<this>;
    /** Reward player with reputation to a faction */
    get Reputation(): ReputationRewards<undefined>;
    /** Money earned by completing this quest (becomes requirement if negative) */
    get Money(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Bonus money at level 80 */
    get MoneyBonus(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Display a spell when the player completes the quest */
    get DisplaySpell(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Reward player with honor points */
    get Honor(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Reward player with talent points, as in the Death Knight starting area. */
    get Talents(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Reward player with a Title, such as <Grunt> */
    get Title(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
    /** Increased XP reward for difficult quests, a value between 0-8 */
    get Difficulty(): QuestDifficultyIndex<undefined>;
    /** Reward player with arena points */
    get ArenaPoints(): import("../../../data/cell/cells/Cell").CellWrapper<number, undefined>;
}
export declare class QuestRewardRegistryClass extends RegistryStatic<QuestRewardStandalone, quest_templateRow, quest_templateQuery> {
    protected Table(): Table<any, quest_templateQuery, quest_templateRow> & {
        add: (id: number) => quest_templateRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: QuestRewardStandalone): void;
    protected FindByID(id: number): quest_templateRow;
    protected EmptyQuery(): quest_templateQuery;
    ID(e: QuestRewardStandalone): number;
    protected Entity(r: quest_templateRow): QuestRewardStandalone;
}
export declare const QuestRewardRegistry: QuestRewardRegistryClass;

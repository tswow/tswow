import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { CellSystem, LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { Quest } from "./Quest";
export declare class ItemObjective extends ArrayEntry<Quest> {
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ItemObjectives extends ArraySystem<ItemObjective, Quest> {
    get length(): number;
    get(index: number): ItemObjective;
    add(item: number, count: number): Quest;
}
export declare class NpcGoObjective extends ArrayEntry<Quest> {
    get ID(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Count(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class NpcGoObjectives extends ArraySystem<NpcGoObjective, Quest> {
    get length(): number;
    get(index: number): NpcGoObjective;
    add(id: number, count: number): Quest;
}
export declare class ReputationObjective extends ArrayEntry<Quest> {
    get Faction(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Reputation(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class ReputationObjectives extends ArraySystem<ReputationObjective, Quest> {
    get length(): number;
    get(index: number): ReputationObjective;
    add(faction: number, reputation: number): Quest;
}
export declare class Scripted extends LocSystem<Quest> {
    protected localeRow(language: Language): import("../../sql/quest_template_locale").quest_template_localeRow;
    lang(lang: Language): Cell<string, Quest> & PendingCell;
    get mask(): Cell<number, Quest>;
    constructor(owner: Quest);
    clear(): Quest;
    set(con: loc_constructor): Quest;
}
export declare class QuestObjective extends CellSystem<Quest> {
    constructor(quest: Quest);
    get Scripted(): Scripted;
    get PlayerKills(): import("../../../data/cell/cells/Cell").CellWrapper<number, Quest>;
    get Entity(): NpcGoObjectives;
    get Reputation(): ReputationObjectives;
    get Item(): ItemObjectives;
}

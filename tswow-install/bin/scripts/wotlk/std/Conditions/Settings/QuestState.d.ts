import { MaskCell32ReadOnly } from "../../../../data/cell/cells/MaskCell";
export declare enum QuestStates {
    NOT_TAKEN = 1,
    COMPLETED = 2,
    IN_PROGRESS = 8,
    FAILED = 32,
    REWARDED = 64
}
export type QuestState = keyof typeof QuestStates;
export declare function makeQuestStateMask(states: QuestState[]): number;
export declare class QuestStateMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get NOT_TAKEN(): import("../../../../data/cell/cells/MaskCell").MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    get COMPLETED(): import("../../../../data/cell/cells/MaskCell").MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    get IN_PROGRESS(): import("../../../../data/cell/cells/MaskCell").MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    get FAILED(): import("../../../../data/cell/cells/MaskCell").MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
    get REWARDED(): import("../../../../data/cell/cells/MaskCell").MaskBitReadOnly<T, MaskCell32ReadOnly<T>>;
}

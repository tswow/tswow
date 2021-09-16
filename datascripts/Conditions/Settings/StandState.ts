import { EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export enum StandStates {
      STANDING = 0
    , SITTING = 1
}

export type StandState = keyof typeof StandStates;

export function resolveStandState(state: StandState) {
    return StandStates[state];
}

export class StandStateEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Standing() { return this.value(StandStates.STANDING); }
    get Sitting() { return this.value(StandStates.SITTING); }
}
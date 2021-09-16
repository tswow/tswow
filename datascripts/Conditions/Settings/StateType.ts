import { EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export enum StateTypes {
      EXACT = 0
    , ANY   = 1
}

export type StateType = keyof typeof StateTypes;

export class StateTypeEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Exact() { return this.value(StateTypes.EXACT); }
    get Any() { return this.value(StateTypes.ANY); }
}
import { EnumCell, EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export const DRUNKEN_STATES = [
      'SOBER'
    , 'TIPSY'
    , 'DRUNK'
    , 'SMASHED'
] as const

export type DrunkenState = typeof DRUNKEN_STATES[number]

export class DrunkenStateEnum<T> extends EnumCell<T> {
    get Sober()   { return this.value(0); }
    get Tipsy()   { return this.value(1); }
    get Drunk()   { return this.value(2); }
    get Smashed() { return this.value(3); }
}

export class DrunkenStateEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Sober()   { return this.value(0); }
    get Tipsy()   { return this.value(1); }
    get Drunk()   { return this.value(2); }
    get Smashed() { return this.value(3); }
}
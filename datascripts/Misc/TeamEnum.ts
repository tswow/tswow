import { EnumCell, EnumCellReadOnly } from "wotlkdata/cell/cells/EnumCell";

export class TeamEnum<T> extends EnumCell<T> {
    get Horde() { return this.value(67); }
    get Alliance() { return this.value(469); }
}

export class TeamEnumReadOnly<T> extends EnumCellReadOnly<T> {
    get Horde() { return this.value(67); }
    get Alliance() { return this.value(469); }
}
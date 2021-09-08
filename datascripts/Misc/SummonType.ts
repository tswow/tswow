import { EnumCellWrapper } from "wotlkdata/cell/cells/EnumCell";

export class SummonType<T> extends EnumCellWrapper<T> {
    setTimedOrDead() { return this.set(1); }
    setTimedOrCorpse() { return this.set(2); }
    setTimed() { return this.set(3); }
    setTimedOutOfCombat() { return this.set(4); }
    setCorpse() { return this.set(5); }
    setCorpseTimed() { return this.set(6); }
    setDead() { return this.set(7); }
    setManual() { return this.set(8); }
}
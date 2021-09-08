import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";

export class FactionEnum<T> extends EnumCellWrapper<T> {
    /** value = -1 */
    @EnumField(-1)
    setNone() { return this.set(-1); }

    /** value = 0 */
    @EnumField(0)
    setHorde() { return this.set(0); }

    /** value = 1 */
    @EnumField(1)
    setAlliance() { return this.set(1); }
}
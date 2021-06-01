import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";

export class ItemAmmoTypes<T> extends EnumCellWrapper<T> {
    @EnumField(0)
    setNone() { return this.set(0); }

    @EnumField(2)
    setArrow() { return this.set(2); }

    @EnumField(3)
    setBullet() { return this.set(3); }
}
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export class GameObjectFlags<T> extends MaskCell32<T> {
    get InUse() { return this.bit(0); }
    get Locked() { return this.bit(1); }
    get ConditionalSelect() { return this.bit(2); }
    get Transport() { return this.bit(3); }
    get NotSelectable() { return this.bit(4); }
    get NoDespawn() { return this.bit(5); }
    get Triggered() { return this.bit(6); }
    get Damaged() { return this.bit(9); }
    get Destroyed() { return this.bit(10); }
}
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class ItemAmmoTypes<T> extends EnumCell<T> {
    /** Enum Value:                  0 */
    get None()   { return this.value(0) }
    /** Enum Value:                  2 */
    get Arrow()  { return this.value(2) }
    /** Enum Value:                  3 */
    get Bullet() { return this.value(3) }
}
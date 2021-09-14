import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class FactionEnum<T> extends EnumCell<T> {
    /** Enum Value:                    -1 */
    get None()     { return this.value(-1) }
    /** Enum Value:                    0 */
    get Horde()    { return this.value(0) }
    /** Enum Value:                    1 */
    get Alliance() { return this.value(1) }
}
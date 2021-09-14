import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class SpellPowerType<T> extends EnumCell<T> {
    /** Enum Value:                      -2 */
    get Health()     { return this.value(-2) }
    /** Enum Value:                      0 */
    get Mana()       { return this.value(0) }
    /** Enum Value:                      1 */
    get Rage()       { return this.value(1) }
    /** Enum Value:                      2 */
    get Focus()      { return this.value(2) }
    /** Enum Value:                      3 */
    get Energy()     { return this.value(3) }
    /** Enum Value:                      4 */
    get Happiness()  { return this.value(4) }
    /** Enum Value:                      5 */
    get Rune()       { return this.value(5) }
    /** Enum Value:                      6 */
    get RunicPower() { return this.value(6) }
    /** Enum Value:                      127 */
    get All()        { return this.value(127) }
}
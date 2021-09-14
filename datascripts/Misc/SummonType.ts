import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class SummonType<T> extends EnumCell<T> {
    /** Enum Value:                            1 */
    get TimedOrDead()      { return this.value(1) }
    /** Enum Value:                            2 */
    get TimedOrCorpse()    { return this.value(2) }
    /** Enum Value:                            3 */
    get Timed()            { return this.value(3) }
    /** Enum Value:                            4 */
    get TimedOutOfCombat() { return this.value(4) }
    /** Enum Value:                            5 */
    get Corpse()           { return this.value(5) }
    /** Enum Value:                            6 */
    get CorpseTimed()      { return this.value(6) }
    /** Enum Value:                            7 */
    get Dead()             { return this.value(7) }
    /** Enum Value:                            8 */
    get Manual()           { return this.value(8) }
}
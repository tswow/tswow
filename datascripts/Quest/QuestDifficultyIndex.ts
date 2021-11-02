import { EnumCell } from "wotlkdata/wotlkdata/cell/cells/EnumCell";

export class QuestDifficultyIndex<T> extends EnumCell<T> {
    get DIFFICULTY_1()  { return this.value(1) }
    get DIFFICULTY_2()  { return this.value(2) }
    get DIFFICULTY_3()  { return this.value(3) }
    get DIFFICULTY_4()  { return this.value(4) }
    get DIFFICULTY_5()  { return this.value(5) }
    get DIFFICULTY_6()  { return this.value(6) }
    get DIFFICULTY_7()  { return this.value(7) }
    get DIFFICULTY_8()  { return this.value(8) }
    get DIFFICULTY_9()  { return this.value(9) }
    get DIFFICULTY_10() { return this.value(10) }
}
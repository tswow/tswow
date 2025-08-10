import { EnumCell, EnumCon } from "../../../data/cell/cells/EnumCell";
import { Gem } from "./Gem";
export declare enum GemType {
    META = 1,
    RED = 2,
    YELLOW = 4,
    ORANGE = 6,
    BLUE = 8,
    PURPLE = 10,
    GREEN = 12,
    PRISMATIC = 14
}
export declare class GemTypeCell extends EnumCell<Gem> {
    writeToItem(): Gem;
    set(value: EnumCon<keyof typeof GemType>): Gem;
    /** Enum Value = PRISMATIC */
    get PRISMATIC(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = GREEN */
    get GREEN(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = PURPLE */
    get PURPLE(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = BLUE */
    get BLUE(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = ORANGE */
    get ORANGE(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = YELLOW */
    get YELLOW(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = RED */
    get RED(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
    /** Enum Value = META */
    get META(): import("../../../data/cell/cells/EnumCell").EnumValue<Gem>;
}

import { EnumCell, EnumCon, makeEnum } from "wotlkdata/wotlkdata/cell/cells/EnumCell";
import { Gem } from "./Gem";

export enum GemType {
    META = 1,
    RED = 2,
    YELLOW = 4,
    ORANGE = 6,
    BLUE = 8,
    PURPLE = 10,
    GREEN = 12,
    PRISMATIC = 14
}

export class GemTypeCell extends EnumCell<Gem> {
    writeToItem() {
        switch(this.get()) {
            case GemType.META: this.owner.Item.get().Class.META_GEM.set();
                break;
            case GemType.RED: this.owner.Item.get().Class.RED_GEM.set();
                break;
            case GemType.YELLOW: this.owner.Item.get().Class.YELLOW_GEM.set();
                break;
            case GemType.ORANGE: this.owner.Item.get().Class.ORANGE_GEM.set();
                break;
            case GemType.BLUE: this.owner.Item.get().Class.BLUE_GEM.set();
                break;
            case GemType.PURPLE: this.owner.Item.get().Class.PURPLE_GEM.set();
                break;
            case GemType.GREEN: this.owner.Item.get().Class.GREEN_GEM.set();
                break;
            case GemType.PRISMATIC: this.owner.Item.get().Class.PRISMATIC_GEM.set();
                break;
        }
        return this.owner;
    }

    set(value: EnumCon<keyof typeof GemType>) {
        super.set(makeEnum(GemType,value));
        this.writeToItem();
        return this.owner;
    }

    /** Enum Value = PRISMATIC */
    get PRISMATIC() { return this.value(GemType.PRISMATIC) }
    /** Enum Value = GREEN */
    get GREEN()     { return this.value(GemType.GREEN) }
    /** Enum Value = PURPLE */
    get PURPLE()    { return this.value(GemType.PURPLE) }
    /** Enum Value = BLUE */
    get BLUE()      { return this.value(GemType.BLUE) }
    /** Enum Value = ORANGE */
    get ORANGE()    { return this.value(GemType.ORANGE) }
    /** Enum Value = YELLOW */
    get YELLOW()    { return this.value(GemType.YELLOW) }
    /** Enum Value = RED */
    get RED()       { return this.value(GemType.RED) }
    /** Enum Value = META */
    get META()      { return this.value(GemType.META) }
}
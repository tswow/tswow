import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { Gem } from "./Gem";

const META = 1;
const RED = 2;
const YELLOW = 4;
const ORANGE = 6;
const BLUE = 8;
const PURPLE = 10;
const GREEN = 12;
const PRISMATIC = 14;

export class GemType extends EnumCell<Gem> {
    writeToItem() {
        switch(this.get()) {
            case META: this.owner.Item.get().Class.MetaGem.set();
            case RED: this.owner.Item.get().Class.RedGem.set();
            case YELLOW: this.owner.Item.get().Class.YellowGem.set();
            case ORANGE: this.owner.Item.get().Class.OrangeGem.set();
            case BLUE: this.owner.Item.get().Class.BlueGem.set();
            case PURPLE: this.owner.Item.get().Class.PurpleGem.set();
            case GREEN: this.owner.Item.get().Class.GreenGem.set();
            case PRISMATIC: this.owner.Item.get().Class.PrismaticGem.set();
        }
        return this.owner;
    }

    set(value: number) {
        super.set(value);
        this.writeToItem();
        return this.owner;
    }

    /** Enum Value = PRISMATIC */
    get Prismatic() { return this.value(PRISMATIC) }
    /** Enum Value = GREEN */
    get Green()     { return this.value(GREEN) }
    /** Enum Value = PURPLE */
    get Purple()    { return this.value(PURPLE) }
    /** Enum Value = BLUE */
    get Blue()      { return this.value(BLUE) }
    /** Enum Value = ORANGE */
    get Orange()    { return this.value(ORANGE) }
    /** Enum Value = YELLOW */
    get Yellow()    { return this.value(YELLOW) }
    /** Enum Value = RED */
    get Red()       { return this.value(RED) }
    /** Enum Value = META */
    get Meta()      { return this.value(META) }
}

export type GemColorType =
      'META'
    | 'RED'
    | 'YELLOW'
    | 'ORANGE'
    | 'BLUE'
    | 'PURPLE'
    | 'GREEN'
    | 'PRISMATIC'

export function colToId(color: GemColorType) {
    switch(color) {
        case 'META': return META;
        case 'RED': return RED;
        case 'YELLOW': return YELLOW;
        case 'ORANGE': return ORANGE;
        case 'BLUE': return BLUE;
        case 'PURPLE': return PURPLE;
        case 'GREEN': return GREEN;
        case 'PRISMATIC': return PRISMATIC;
        default: throw new Error(`Invalid gem color: ${color}`)
    }
}

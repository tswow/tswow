import { EnumCellWrapper, EnumField } from "wotlkdata/cell/cells/EnumCell";
import { Gem } from "./Gem";

const META = 1;
const RED = 2;
const YELLOW = 4;
const ORANGE = 6;
const BLUE = 8;
const PURPLE = 10;
const GREEN = 12;
const PRISMATIC = 14;

export class GemType extends EnumCellWrapper<Gem> {
    writeToItem() {
        switch(this.get()) {
            case META: this.owner.Item.get().Class.setMetaGem();
            case RED: this.owner.Item.get().Class.setRedGem();
            case YELLOW: this.owner.Item.get().Class.setYellowGem();
            case ORANGE: this.owner.Item.get().Class.setOrangeGem();
            case BLUE: this.owner.Item.get().Class.setBlueGem();
            case PURPLE: this.owner.Item.get().Class.setPurpleGem();
            case GREEN: this.owner.Item.get().Class.setGreenGem();
            case PRISMATIC: this.owner.Item.get().Class.setPrismaticGem();
        }
        return this.owner;
    }

    set(value: number) {
        super.set(value);
        this.writeToItem();
        return this.owner;
    }

    /** value = 1 */
    @EnumField(META)
    setMeta() { return this.set(META); }

    /** value = 2 */
    @EnumField(RED)
    setRed() { return this.set(RED); }

    /** value = 4 */
    @EnumField(YELLOW)
    setYellow() { return this.set(YELLOW); }

    /** value = 6 */
    @EnumField(ORANGE)
    setOrange() { return this.set(ORANGE); }

    /** value = 8 */
    @EnumField(BLUE)
    setBlue() { return this.set(BLUE); }

    /** value = 10 */
    @EnumField(PURPLE)
    setPurple() { return this.set(PURPLE); }

    /** value = 12 */
    @EnumField(GREEN)
    setGreen() { return this.set(GREEN); }

    /** value = 14 */
    @EnumField(PRISMATIC)
    setPrismatic() { return this.set(PRISMATIC); }
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

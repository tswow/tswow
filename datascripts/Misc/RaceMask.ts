import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";
import { RaceType, resolveRaceType } from "../Race/RaceType";

// Note: don't add the non-playable races here, it will just be confusing

export class RaceMask<T> extends MaskCell32<T> {
    enableRace(raceId: RaceType) {
        return this.setBit(resolveRaceType(raceId)-1, true);
    }
    disableRace(raceId: number) {
        return this.setBit(resolveRaceType(raceId)-1, false);
    }
    get Human() { return this.bit(0); }
    get Orc() { return this.bit(1); }
    get Dwarf() { return this.bit(2); }
    get NightElf() { return this.bit(3); }
    get Undead() { return this.bit(4); }
    get Tauren() { return this.bit(5); }
    get Gnome() { return this.bit(6); }
    get Troll() { return this.bit(7); }
    get BloodElf() { return this.bit(9); }
    get Draenei() { return this.bit(10); }
}

export class RaceMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    get Human() { return this.bit(0); }
    get Orc() { return this.bit(1); }
    get Dwarf() { return this.bit(2); }
    get NightElf() { return this.bit(3); }
    get Undead() { return this.bit(4); }
    get Tauren() { return this.bit(5); }
    get Gnome() { return this.bit(6); }
    get Troll() { return this.bit(7); }
    get BloodElf() { return this.bit(9); }
    get Draenei() { return this.bit(10); }
}
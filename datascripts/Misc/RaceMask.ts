import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { MaskCell32, MaskCell32ReadOnly } from "wotlkdata/cell/cells/MaskCell";
import { makeRacemask, RaceMaskCon, RaceType, RACE_TYPES, resolveRaceType } from "../Race/RaceType";

// Note: don't add the non-playable races here, it will just be confusing

export class RaceMask<T> extends MaskCell32<T> {
    setRace(raceId: RaceType, value: boolean) {
        return this.setBit(resolveRaceType(raceId)-1, value);
    }
    getRace(raceId: RaceType) {
        return this.getBit(resolveRaceType(raceId)-1);
    }

    private raceBit(bit: number) { return this.bit(bit-1); }

    add(classes: RaceMaskCon) {
        return this.or(makeRacemask(classes));
    }

    remove(classes: RaceMaskCon) {
        return this.not(makeRacemask(classes));
    }

    forEach(callback: (cls: number)=>void) {
        for(let i=1;i<=32;++i) {
            if(this.getRace(i)) callback(i)
        }
    }

    filter(callback: (cls: number)=>boolean) {
        return this.map(x=>x)
            .filter(callback);
    }

    map<T>(callback: (cls: number)=>T) {
        let values: T[] = []
        this.forEach(x=>values.push(callback(x)))
        return values;
    }

    flip() {
        return this.set((~this.get()>>>0)&0x7fffffff);
    }

    get Human()    { return this.raceBit(RACE_TYPES.HUMAN); }
    get Orc()      { return this.raceBit(RACE_TYPES.ORC); }
    get Dwarf()    { return this.raceBit(RACE_TYPES.DWARF); }
    get NightElf() { return this.raceBit(RACE_TYPES.NIGHTELF); }
    get Undead()   { return this.raceBit(RACE_TYPES.UNDEAD); }
    get Tauren()   { return this.raceBit(RACE_TYPES.TAUREN); }
    get Gnome()    { return this.raceBit(RACE_TYPES.GNOME); }
    get Troll()    { return this.raceBit(RACE_TYPES.TROLL); }
    get BloodElf() { return this.raceBit(RACE_TYPES.BLOODELF); }
    get Draenei()  { return this.raceBit(RACE_TYPES.DRAENEI); }
}

export class RaceMaskReadOnly<T> extends MaskCell32ReadOnly<T> {
    getRace(raceId: RaceType) {
        return this.getBit(resolveRaceType(raceId)-1);
    }
    private raceBit(bit: number) { return this.bit(bit-1); }

    get Human()    { return this.raceBit(RACE_TYPES.HUMAN); }
    get Orc()      { return this.raceBit(RACE_TYPES.ORC); }
    get Dwarf()    { return this.raceBit(RACE_TYPES.DWARF); }
    get NightElf() { return this.raceBit(RACE_TYPES.NIGHTELF); }
    get Undead()   { return this.raceBit(RACE_TYPES.UNDEAD); }
    get Tauren()   { return this.raceBit(RACE_TYPES.TAUREN); }
    get Gnome()    { return this.raceBit(RACE_TYPES.GNOME); }
    get Troll()    { return this.raceBit(RACE_TYPES.TROLL); }
    get BloodElf() { return this.raceBit(RACE_TYPES.BLOODELF); }
    get Draenei()  { return this.raceBit(RACE_TYPES.DRAENEI); }
}

export class RaceEnum<T> extends EnumCell<T> {
    get Human()    { return this.value(1); }
    get Orc()      { return this.value(2); }
    get Dwarf()    { return this.value(3); }
    get NightElf() { return this.value(4); }
    get Undead()   { return this.value(5); }
    get Tauren()   { return this.value(6); }
    get Gnome()    { return this.value(7); }
    get Troll()    { return this.value(8); }
    get BloodElf() { return this.value(10); }
    get Draenei()  { return this.value(11); }
}
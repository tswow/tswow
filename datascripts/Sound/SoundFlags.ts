import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { SoundEntry } from "./SoundEntry";

export class SoundFlags extends MaskCell32<SoundEntry> {
    get NoDuplicates() { return this.bit(5); }
    get Looping() { return this.bit(9); }
    get VaryPitch() { return this.bit(10); }
    get VaryVolume() { return this.bit(11); }
}
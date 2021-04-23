import { SoundEntry } from "./SoundEntry";
import { SystemArray, ArrayEntry } from "wotlkdata/cell/systems/SystemArray";

export class SoundEntryFile<T> extends ArrayEntry<SoundEntry<T>> {
    clear(): SoundEntry<T> {
        this.owner.row.File.setIndex(this.index,"");
        this.owner.row.Freq.setIndex(this.index,0);
        return this.owner;
    }

    isClear(): boolean {
        return this.owner.row.File.getIndex(this.index) == "";
    }

    get File() { return this.wrapIndex(this.owner.row.File,this.index); }
    get Freq() { return this.wrapIndex(this.owner.row.Freq,this.index); }

    set(filename: string, frequency: number = 1) {
        this.File.set(filename);
        this.Freq.set(frequency);
        return this.owner;
    }
}

export class SoundEntryFiles<T> extends SystemArray<SoundEntryFile<T>, SoundEntry<T>> {
    get length(): number {
        return 10;
    }

    get(index: number): SoundEntryFile<T> {
        return new SoundEntryFile(this.owner, index);
    }

    add(filename: string, frequency: number = 1) {
        return this.getFree().set(filename,frequency);
    }
}
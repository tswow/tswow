import { ArrayEntry, ArraySystem } from "wotlkdata/cell/systems/ArraySystem";
import { SoundEntry } from "./SoundEntry";

export class SoundEntryFile extends ArrayEntry<SoundEntry> {
    clear() {
        this.container.row.File.setIndex(this.index,"");
        this.container.row.Freq.setIndex(this.index,0);
        return this;
    }

    isClear(): boolean {
        return this.container.row.File.getIndex(this.index) == "";
    }

    get File() { return this.wrapIndex(this.container.row.File,this.index); }
    get Freq() { return this.wrapIndex(this.container.row.Freq,this.index); }

    set(filename: string, frequency: number = 1) {
        this.File.set(filename);
        this.Freq.set(frequency);
        return this;
    }
}

export class SoundEntryFiles extends ArraySystem<SoundEntryFile, SoundEntry> {
    get length(): number {
        return 10;
    }

    get(index: number): SoundEntryFile {
        return new SoundEntryFile(this.owner, index);
    }

    add(filename: string, frequency: number = 1) {
        this.getFree().set(filename,frequency);
        return this.owner;
    }
}
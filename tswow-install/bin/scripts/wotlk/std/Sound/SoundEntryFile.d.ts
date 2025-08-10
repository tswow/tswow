import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { SoundEntry } from "./SoundEntry";
export declare class SoundEntryFile extends ArrayEntry<SoundEntry> {
    clear(): this;
    isClear(): boolean;
    get File(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<string, this>;
    get Freq(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    set(filename: string, frequency?: number): this;
}
export declare class SoundEntryFiles extends ArraySystem<SoundEntryFile, SoundEntry> {
    get length(): number;
    addAll(filenames: string[], frequency?: number): SoundEntry;
    get(index: number): SoundEntryFile;
    add(filename: string, frequency?: number): SoundEntry;
}

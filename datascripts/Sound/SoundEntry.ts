import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SoundType } from "./SoundType";
import { Ids } from "../Misc/Ids";
import { SoundEntryFiles } from "./SoundEntryFile";
import { SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";
import { Ref } from "../Refs/Ref";
import { MainEntity } from "../Misc/Entity";
import { SoundEntryAdvancedPointer } from "./SoundEntryAdvanced";
import { SoundFlags } from "./SoundFlags";

export class SoundEntryName extends CellSystem<SoundEntry> {
    get() {
        return this.owner.row.Name.get();
    }

    set(value: string) {
        this.owner.row.Name.set(value);
        return this.owner;
    }
}

export class SoundEntry extends MainEntity<SoundEntriesRow>{
    clear(): this {
        this.EAXDef.set(0)
            .Files.clearAll()
            .MinDistance.set(0)
            .Name.set("")
            .SoundType.set(0)
            .Volume.set(0)
            .Advanced.setRefID(0)
        return this;
    }

    get Advanced() { 
        return new SoundEntryAdvancedPointer(
            this, this.row.SoundEntriesAdvancedID); 
    }

    get Flags() { return new SoundFlags(this, this.row.Flags); }
    get SoundType() { return new SoundType(this, this.row.SoundType); }
    get Name() { return this.wrap(this.row.Name); }
    get Files(): SoundEntryFiles { return new SoundEntryFiles(this); }
    get DirectoryBase() { return this.wrap(this.row.DirectoryBase); }
    get Volume() { return this.wrap(this.row.Volumefloat); }
    get MinDistance() { return this.wrap(this.row.MinDistance); }
    get DistanceCutoff() { return this.wrap(this.row.DistanceCutoff); }
    get EAXDef() { return this.wrap(this.row.EAXDef); }
}

export class SoundEntryPointer<T> extends Ref<T,SoundEntry> {
    setSimple(directoryBase: string, songs: string[], volume?: number, frequency?: number) {
        let soundEntry = SoundEntryRegistry.setSimple(directoryBase,songs,volume,frequency);
        this.setRefID(soundEntry.row.ID.get());
        return this.owner;
    }

    setSimpleLoop(directoryBase: string, songs: string[], volume?: number, frequency?: number) {
        let soundEntry = SoundEntryRegistry.setSimple(directoryBase,songs,volume,frequency);
        soundEntry.Flags.Looping.mark();
        this.setRefID(soundEntry.row.ID.get());
        return this.owner;
    }

    protected exists(): boolean {
        return this.cell.get() > 0;
    }

    protected create(): SoundEntry {
        return new SoundEntry(DBC.SoundEntries.add(Ids.SoundEntries.id()));
    }

    protected clone(): SoundEntry {
        return new SoundEntry(this.resolve().row.clone(Ids.SoundEntries.id()));
    }

    protected id(v: SoundEntry): number {
        return v.row.ID.get();
    }

    protected resolve(): SoundEntry {
        return new SoundEntry(DBC.SoundEntries.findById(this.cell.get()));
    }
}

export const SoundEntryRegistry = {
    create() {
        let row = DBC.SoundEntries.add(Ids.SoundEntries.id());
        return new SoundEntry(row)
            .clear()
    },

    setSimple(directoryBase: string, sounds: string[], volume: number = 1, frequency: number = 1) {
        let sound = this.create()
        sound
            .Name.set(`SoundEntry${sound.row.ID.get()}`)
            .DirectoryBase.set(directoryBase)
            .MinDistance.set(8)
            .DistanceCutoff.set(45)
            .Volume.set(volume);
        sounds.forEach(x=>{
            sound.Files.add(x,frequency)
        });
        return sound;
    }
}
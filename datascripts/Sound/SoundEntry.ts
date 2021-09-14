import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";
import { SoundEntryAdvancedPointer } from "./SoundEntryAdvanced";
import { SoundEntryFiles } from "./SoundEntryFile";
import { SoundFlags } from "./SoundFlags";
import { SoundType } from "./SoundType";

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
            .Advanced.set(0)
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
        let soundEntry = SoundEntryRegistry.create(directoryBase,songs,volume,frequency);
        this.set(soundEntry.row.ID.get());
        return this.owner;
    }

    setSimpleLoop(directoryBase: string, songs: string[], volume?: number, frequency?: number) {
        let soundEntry = SoundEntryRegistry.create(directoryBase,songs,volume,frequency);
        soundEntry.Flags.Looping.set(true);
        this.set(soundEntry.row.ID.get());
        return this.owner;
    }

    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected create(): SoundEntry {
        return new SoundEntry(DBC.SoundEntries.add(Ids.SoundEntries.dynamicId()));
    }

    protected clone(): SoundEntry {
        return new SoundEntry(this.resolve().row.clone(Ids.SoundEntries.dynamicId()));
    }

    protected id(v: SoundEntry): number {
        return v.row.ID.get();
    }

    protected resolve(): SoundEntry {
        return new SoundEntry(DBC.SoundEntries.findById(this.cell.get()));
    }
}

function createSoundEntry(
      id: number
    , directoryBase: string = ""
    , sounds: string[] = []
    , volume: number = 1
    , frequency: number = 1
)
{
    return new SoundEntry(DBC.SoundEntries.add(id))
        .DirectoryBase.set(directoryBase)
        .Files.addAll(sounds,frequency)
        .MinDistance.set(8)
        .DistanceCutoff.set(45)
        .Volume.set(volume)
}

export const SoundEntryRegistry = {
    create(
        directoryBase?: string
        , sounds?: string[]
        , volume?: number
        , frequency?: number
    ) {
        return createSoundEntry(
              Ids.SoundEntries.dynamicId()
            , directoryBase
            , sounds
            , volume
            , frequency
        )
    },

    createStatic(
          mod: string
        , id: string
        , directoryBase?: string
        , sounds?: string[]
        , volume?: number
        , frequency?: number
    ) {
        return createSoundEntry(
              Ids.SoundEntries.staticId(mod,id)
            , directoryBase
            , sounds
            , volume
            , frequency
        )
    },
}
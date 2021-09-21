import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SoundEntriesQuery, SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStaticNoRef } from "../Refs/Registry";
import { SoundEntryAdvancedRegistry } from "./SoundEntryAdvanced";
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
    get ID() { return this.row.ID.get(); }
    get Advanced() {
        return SoundEntryAdvancedRegistry.ref(
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

export class SoundEntryRef<T> extends RefStatic<T,SoundEntry> {
    setSimpleLoop
    (
          directory: string
        , songs: string[]
        , volume = 1
        , frequency = 1
    ) {
        let entry = SoundEntryRegistry
            .createSimple(directory,songs,volume,frequency)
        this.cell.set(entry.ID)
        return this.owner;
    }

    setSimple(
          directory: string
        , songs: string[]
        , volume = 1
        , frequency = 1
    ) {
        let entry = SoundEntryRegistry
            .createSimpleLoop(directory,songs,volume,frequency)
        this.cell.set(entry.ID)
        return this.owner;
    }
}
export class SoundEntryRegistryClass
    extends RegistryStaticNoRef<SoundEntry,SoundEntriesRow,SoundEntriesQuery>
{
    ref<O>(owner: O, cell: Cell<number,any>): SoundEntryRef<O> {
        return new SoundEntryRef(owner, cell, this);
    }

    protected Table(): Table<any, SoundEntriesQuery, SoundEntriesRow> & { add: (id: number) => SoundEntriesRow; } {
        return DBC.SoundEntries
    }
    protected IDs(): StaticIDGenerator {
        return Ids.SoundEntries
    }
    Clear(r: SoundEntry): void {
        r.EAXDef.set(0)
         .Files.clearAll()
         .MinDistance.set(0)
         .Name.set("")
         .SoundType.set(0)
         .Volume.set(0)
         .Advanced.set(0)
    }
    protected Entity(r: SoundEntriesRow): SoundEntry {
        return new SoundEntry(r);
    }
    protected FindByID(id: number): SoundEntriesRow {
        return DBC.SoundEntries.findById(id);
    }
    protected EmptyQuery(): SoundEntriesQuery {
        return {}
    }
    ID(e: SoundEntry): number {
        return e.ID
    }

    private makeDynEntry(
          directory: string
        , files: string[]
        , volume = 1
        , frequency = 1
    ) {
        return new SoundEntry
            (
                DBC.SoundEntries.add(Ids.SoundEntries.dynamicId())
            )
            .DirectoryBase.set(directory)
            .Volume.set(volume)
            .Files.addAll(files,frequency)
            .DistanceCutoff.set(40)
            .MinDistance.set(8)
            .Flags.Looping.set(false);
    }

    createSimpleLoop(
          directoryBase: string
        , sounds: string[]
        , volume: number = 1
        , frequency: number = 1
    ) {
        return this.makeDynEntry(directoryBase, sounds, volume, frequency)
            .Flags.Looping.set(true)
    }

    createSimple(
          directoryBase: string
        , sounds: string[]
        , volume: number = 1
        , frequency: number = 1
    ) {
        return this.makeDynEntry(directoryBase, sounds, volume, frequency)
            .Flags.Looping.set(false)
    }
}

export const SoundEntryRegistry = new SoundEntryRegistryClass();
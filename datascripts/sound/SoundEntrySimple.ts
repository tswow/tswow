import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";
import { AutoIdGenerator, Ids } from "../Base/Ids";
import { DBC } from "wotlkdata";
import { SoundEntry } from "./SoundEntry";

export class SoundEntrySimple<T extends BaseSystem> extends SharedRef<T, SoundEntriesRow>{
    table(): SharedRefTable<SoundEntriesRow> {
        return DBC.SoundEntries;
    }

    ids(): AutoIdGenerator {
        return Ids.SoundEntries;
    }

    clear(): this {
        new SoundEntry(this, this.cell).clear();
        return this;
    }

    get Filename() { return this.ownerWrapIndex(this.row.File,0); }
    get Volume() { return this.ownerWrap(this.row.Volumefloat); }
    get MinDistance() { return this.ownerWrap(this.row.MinDistance); }
    get DistanceCutoff() { return this.ownerWrap(this.row.DistanceCutoff); }
}
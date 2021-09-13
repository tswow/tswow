import { DBC } from "wotlkdata";
import { SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow } from "wotlkdata/dbc/types/SoundEntriesAdvanced";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class SoundEntryAdvanced extends MainEntity<SoundEntriesAdvancedRow> {
    get ID() { return this.row.ID.get(); }
    get InnerRadius2D() { return this.wrap(this.row.InnerRadius2D); }
    get TimeA() { return this.wrap(this.row.TimeA); }
    get TimeB() { return this.wrap(this.row.TimeB); }
    get TimeC() { return this.wrap(this.row.TimeC); }
    get TimeD() { return this.wrap(this.row.TimeD); }
    get RandomOffsetRange() { return this.wrap(this.row.RandomOffsetRange); }
    get Usage() { return this.wrap(this.row.Usage); }
    get TimeIntervalMin() { return this.wrap(this.row.TimeintervalMin); }
    get TimeIntervalMax() { return this.wrap(this.row.TimeintervalMax); }
    get VolumeSliderCategory() { return this.wrap(this.row.VolumeSliderCategory); }
    get DuckToSFX() { return this.wrap(this.row.DuckToSFX); }
    get DuckToMusic() { return this.wrap(this.row.DuckToMusic); }
    get DuckToAmbience() { return this.wrap(this.row.DuckToAmbience); }
    get InnerRadius() { return this.wrap(this.row.InnerRadiusOfInfluence); }
    get OuterRadius() { return this.wrap(this.row.OuterRadiusOfInfluence); }
    get TimeToDuck() { return this.wrap(this.row.TimeToDuck); }
    get TimeToUnduck() { return this.wrap(this.row.TimeToUnduck); }
    get InsideAngle() { return this.wrap(this.row.InsideAngle); }
    get OutsideAngle() { return this.wrap(this.row.OutsideAngle); }
    get OutsideVolume() { return this.wrap(this.row.OutsideVolume); }
    get OuterRadius2D() { return this.wrap(this.row.OuterRadius2D); }
}

export class SoundEntryAdvancedPointer<T> extends Ref<T,SoundEntryAdvanced> {
    exists(): boolean {
        return this.cell.get() > 0;
    }

    protected create(): SoundEntryAdvanced {
        return SoundEntriesAdvanced.create();
    }

    protected clone(): SoundEntryAdvanced {
        return new SoundEntryAdvanced(SoundEntriesAdvanced
            .load(this.cell.get()).row
            .clone(Ids.SoundEntriesAdvanced.id()));
    }

    protected id(v: SoundEntryAdvanced): number {
        return v.ID;
    }

    protected resolve(): SoundEntryAdvanced {
        return new SoundEntryAdvanced(
            DBC.SoundEntriesAdvanced.findById(this.cell.get()))
    }
}

export const SoundEntriesAdvanced = {
    create() {
        return new SoundEntryAdvanced(DBC.SoundEntriesAdvanced.add(Ids.SoundEntriesAdvanced.id()))
    },

    load(id: number) {
        return new SoundEntryAdvanced(DBC.SoundEntriesAdvanced.findById(id))
    },

    filter(query: SoundEntriesAdvancedQuery) {
        return DBC.SoundEntriesAdvanced.filter(query).map(x=>new SoundEntryAdvanced(x));
    },

    find(query: SoundEntriesAdvancedQuery) {
        return new SoundEntryAdvanced(DBC.SoundEntriesAdvanced.find(query))
    }
}
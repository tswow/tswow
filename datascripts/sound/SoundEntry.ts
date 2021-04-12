import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Cell } from "wotlkdata/cell/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SoundType } from "./SoundType";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { SoundEntryFiles } from "./SoundEntryFile";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";

export class SoundEntryName<T extends BaseSystem> extends Subsystem<SoundEntry<T>> {
    get() {
        return this.owner.row.Name.get();
    }

    set(value: string) {
        this.owner.row.Name.set(value);
        if(this.owner.row.SoundEntriesAdvancedID.get()!=0) {
            this.owner.advanced_row.Name.set(value);
        }
        return this.owner;
    }
}

export class SoundEntry<T extends BaseSystem> extends SharedRef<T, SoundEntriesRow>{
    table(): SharedRefTable<SoundEntriesRow> {
        return DBC.SoundEntries;
    }

    ids(): AutoIdGenerator {
        return Ids.SoundEntries;
    }

    zeroFill(): this {
        this.EAXDef.set(0)
            .Files.clearAll()
            .InnerRadius.set(0)
            .InnerRadius2D.set(0)
            .InsideAngle.set(0)
            .MinDistance.set(0)
            .Name.set("")
            .OuterRadius.set(0)
            .OuterRadius2D.set(0)
            .OutsideAngle.set(0)
            .OutsideVolume.set(0)
            .RandomOffsetRange.set(0)
            .SoundType.set(0)
            .TimeA.set(0)
            .TimeB.set(0)
            .TimeC.set(0)
            .TimeD.set(0)
            .TimeIntervalMax.set(0)
            .TimeIntervalMin.set(0)
            .TimeToDuck.set(0)
            .TimeToUnduck.set(0)
            .Usage.set(0)
            .Volume.set(0)
            .VolumeSliderCategory.set(0)
        return this;
    }

    get advanced_row() { 
        if(this.row.SoundEntriesAdvancedID.get()===0) {
            this.row.SoundEntriesAdvancedID.set(Ids.SoundEntriesAdvanced.id());
            DBC.SoundEntriesAdvanced.add(this.row.SoundEntriesAdvancedID.get())
                .SoundEntryID.set(this.ID)
                .TimeA.set(0)
                .TimeB.set(0)
                .TimeC.set(0)
                .TimeD.set(0)
                .TimeToDuck.set(0)
                .TimeToUnduck.set(0)
                .TimeintervalMax.set(0)
                .TimeintervalMin.set(0)
                .Usage.set(0)
                .VolumeSliderCategory.set(0)
                .DuckToAmbience.set(0)
                .DuckToMusic.set(0)
                .DuckToSFX.set(0)
                .InnerRadius2D.set(0)
                .InnerRadiusOfInfluence.set(0)
                .InsideAngle.set(0)
                .Name.set(this.Name.get())
                .OuterRadius2D.set(0)
                .OuterRadiusOfInfluence.set(0)
                .OutsideAngle.set(0)
                .OutsideVolume.set(0)
                .RandomOffsetRange.set(0)
        }
        let dbc = DBC.SoundEntriesAdvanced.findById(this.row.SoundEntriesAdvancedID.get());
        dbc.Name.set(this.Name.get());
        return dbc;
    }


    constructor(owner: T, id: Cell<number,any>) {
        super(owner,[id]);
    }

    get SoundType() { return new SoundType(this, this.row.SoundType); }

    get Name(): SoundEntryName<T> { return new SoundEntryName(this); }
    get Files(): SoundEntryFiles<T> { return new SoundEntryFiles(this); }

    get Volume() { return this.wrap(this.row.Volumefloat); }
    get MinDistance() { return this.wrap(this.row.MinDistance); }
    get DistanceCutoff() { return this.wrap(this.row.DistanceCutoff); }
    get EAXDef() { return this.wrap(this.row.EAXDef); }


    get InnerRadius2D() { return this.wrap(this.advanced_row.InnerRadius2D); }
    get TimeA() { return this.wrap(this.advanced_row.TimeA); }
    get TimeB() { return this.wrap(this.advanced_row.TimeB); }
    get TimeC() { return this.wrap(this.advanced_row.TimeC); }
    get TimeD() { return this.wrap(this.advanced_row.TimeD); }
    get RandomOffsetRange() { return this.wrap(this.advanced_row.RandomOffsetRange); }
    get Usage() { return this.wrap(this.advanced_row.Usage); }
    get TimeIntervalMin() { return this.wrap(this.advanced_row.TimeintervalMin); }
    get TimeIntervalMax() { return this.wrap(this.advanced_row.TimeintervalMax); }
    get VolumeSliderCategory() { return this.wrap(this.advanced_row.VolumeSliderCategory); }
    get DuckToSFX() { return this.wrap(this.advanced_row.DuckToSFX); }
    get DuckToMusic() { return this.wrap(this.advanced_row.DuckToMusic); }
    get DuckToAmbience() { return this.wrap(this.advanced_row.DuckToAmbience); }
    get InnerRadius() { return this.wrap(this.advanced_row.InnerRadiusOfInfluence); }
    get OuterRadius() { return this.wrap(this.advanced_row.OuterRadiusOfInfluence); }

    get TimeToDuck() { return this.wrap(this.advanced_row.TimeToDuck); }
    get TimeToUnduck() { return this.wrap(this.advanced_row.TimeToUnduck); }
    get InsideAngle() { return this.wrap(this.advanced_row.InsideAngle); }
    get OutsideAngle() { return this.wrap(this.advanced_row.OutsideAngle); }

    get OutsideVolume() { return this.wrap(this.advanced_row.OutsideVolume); }
    get OuterRadius2D() { return this.wrap(this.advanced_row.OuterRadius2D); }

    makeUnique() : this {
        super.makeUnique();
        if(this.row.SoundEntriesAdvancedID.get()!=0) {
            let id = this.advanced_row.clone(Ids.SoundEntriesAdvanced.id()).ID.get();
            this.row.SoundEntriesAdvancedID.set(id);
        }
        return this;
    }
}
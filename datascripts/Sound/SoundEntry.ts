import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SoundType } from "./SoundType";
import { Ids } from "../Misc/Ids";
import { SoundEntryFiles } from "./SoundEntryFile";
import { SoundEntriesRow } from "wotlkdata/dbc/types/SoundEntries";
import { Transient, TransientOn } from "wotlkdata/cell/serialization/Transient";
import { Pointer } from "../Refs/Pointer";
import { MainEntity } from "../Misc/Entity";

export class SoundEntryName extends CellSystem<SoundEntry> {
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

export class SoundEntry extends MainEntity<SoundEntriesRow>{
    clear(): this {
        this.EAXDef.set(0)
            .Files.clearAll()
            .MinDistance.set(0)
            .Name.set("")
            .SoundType.set(0)
            .Volume.set(0)

        if(this.row.SoundEntriesAdvancedID.get() > 0) {
            this.RandomOffsetRange.set(0)
                .OuterRadius.set(0)
                .OuterRadius2D.set(0)
                .OutsideAngle.set(0)
                .OutsideVolume.set(0)
                .InsideAngle.set(0)
                .InnerRadius.set(0)
                .TimeA.set(0)
                .TimeB.set(0)
                .TimeC.set(0)
                .TimeD.set(0)
                .TimeIntervalMax.set(0)
                .TimeIntervalMin.set(0)
                .TimeToDuck.set(0)
                .TimeToUnduck.set(0)
                .Usage.set(0)
                .VolumeSliderCategory.set(0)
        }
        return this;
    }

    @Transient
    get advanced_row() { 
        if(this.row.SoundEntriesAdvancedID.get()===0) {
            this.row.SoundEntriesAdvancedID.set(Ids.SoundEntriesAdvanced.id());
            DBC.SoundEntriesAdvanced.add(this.row.SoundEntriesAdvancedID.get())
                .SoundEntryID.set(this.row.ID.get())
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

    @Transient
    protected advanced_id() { return this.row.SoundEntriesAdvancedID; }

    get SoundType() { return new SoundType(this, this.row.SoundType); }

    get Name(): SoundEntryName { return new SoundEntryName(this); }
    get Files(): SoundEntryFiles { return new SoundEntryFiles(this); }
    get DirectoryBase() { return this.wrap(this.row.DirectoryBase); }

    get Volume() { return this.wrap(this.row.Volumefloat); }
    get MinDistance() { return this.wrap(this.row.MinDistance); }
    get DistanceCutoff() { return this.wrap(this.row.DistanceCutoff); }
    get EAXDef() { return this.wrap(this.row.EAXDef); }

    @TransientOn('advanced_id',0)
    get InnerRadius2D() { return this.wrap(this.advanced_row.InnerRadius2D); }

    @TransientOn('advanced_id',0)
    get TimeA() { return this.wrap(this.advanced_row.TimeA); }

    @TransientOn('advanced_id',0)
    get TimeB() { return this.wrap(this.advanced_row.TimeB); }

    @TransientOn('advanced_id',0)
    get TimeC() { return this.wrap(this.advanced_row.TimeC); }

    @TransientOn('advanced_id',0)
    get TimeD() { return this.wrap(this.advanced_row.TimeD); }

    @TransientOn('advanced_id',0)
    get RandomOffsetRange() { return this.wrap(this.advanced_row.RandomOffsetRange); }

    @TransientOn('advanced_id',0)
    get Usage() { return this.wrap(this.advanced_row.Usage); }

    @TransientOn('advanced_id',0)
    get TimeIntervalMin() { return this.wrap(this.advanced_row.TimeintervalMin); }

    @TransientOn('advanced_id',0)
    get TimeIntervalMax() { return this.wrap(this.advanced_row.TimeintervalMax); }

    @TransientOn('advanced_id',0)
    get VolumeSliderCategory() { return this.wrap(this.advanced_row.VolumeSliderCategory); }

    @TransientOn('advanced_id',0)
    get DuckToSFX() { return this.wrap(this.advanced_row.DuckToSFX); }

    @TransientOn('advanced_id',0)
    get DuckToMusic() { return this.wrap(this.advanced_row.DuckToMusic); }

    @TransientOn('advanced_id',0)
    get DuckToAmbience() { return this.wrap(this.advanced_row.DuckToAmbience); }

    @TransientOn('advanced_id',0)
    get InnerRadius() { return this.wrap(this.advanced_row.InnerRadiusOfInfluence); }

    @TransientOn('advanced_id',0)
    get OuterRadius() { return this.wrap(this.advanced_row.OuterRadiusOfInfluence); }

    @TransientOn('advanced_id',0)
    get TimeToDuck() { return this.wrap(this.advanced_row.TimeToDuck); }

    @TransientOn('advanced_id',0)
    get TimeToUnduck() { return this.wrap(this.advanced_row.TimeToUnduck); }

    @TransientOn('advanced_id',0)
    get InsideAngle() { return this.wrap(this.advanced_row.InsideAngle); }

    @TransientOn('advanced_id',0)
    get OutsideAngle() { return this.wrap(this.advanced_row.OutsideAngle); }

    @TransientOn('advanced_id',0)
    get OutsideVolume() { return this.wrap(this.advanced_row.OutsideVolume); }

    @TransientOn('advanced_id',0)
    get OuterRadius2D() { return this.wrap(this.advanced_row.OuterRadius2D); }
}

export class SoundEntryPointer<T> extends Pointer<T,SoundEntry> {
    setNewSimple(directoryBase: string, songs: string[], volume?: number, frequency?: number) {
        let soundEntry = SoundEntryRegistry.createSimple(directoryBase,songs,volume,frequency);
        this.set(soundEntry.row.ID.get());
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

    createSimple(directoryBase: string, sounds: string[], volume: number = 1, frequency: number = 1) {
        let sound = this.create()
        sound
            .Name.set(`SoundEntry${sound.row.ID.get()}`)
            .DirectoryBase.set(directoryBase)
            .Volume.set(volume);
        sounds.forEach(x=>{
            sound.Files.add(x,frequency)
        });
        return sound;
    }
}
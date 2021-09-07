import { SoundProviderPreferencesQuery, SoundProviderPreferencesRow } from "wotlkdata/dbc/types/SoundProviderPreferences";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { DBC } from "wotlkdata"
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";

export class SoundProviderPreferencesFlags extends MaskCell32<SoundProviderPreferences> {
    get Outdoors() { return this.bit(0); }
    get Indoors() { return this.bit(1); }
    get Underwater() { return this.bit(2); }
}

export class SoundProviderPreferences extends MainEntity<SoundProviderPreferencesRow> {
    get ID() { return this.row.ID.get(); }
    get Flags() { return new SoundProviderPreferencesFlags(this,this.row.Flags); }

    get EAXEnvironmentSelection() { return this.wrap(this.row.EAXEnvironmentSelection); }
    get EAXDecayTime() { return this.wrap(this.row.EAXDecayTime); }
    get EAX2EnvironmentSize() { return this.wrap(this.row.EAX2EnvironmentSize); }
    get EAX2EnvironmentDiffusion() { return this.wrap(this.row.EAX2EnvironmentDiffusion); }
    get EAX2Room() { return this.wrap(this.row.EAX2Room); }
    get EAX2RoomHF() { return this.wrap(this.row.EAX2RoomHF); }
    get EAX2DecayHFRatio() { return this.wrap(this.row.EAX2DecayHFRatio); }
    get EAX2Reflections() { return this.wrap(this.row.EAX2Reflections); }
    get EAX2ReflectionsDelay() { return this.wrap(this.row.EAX2ReflectionsDelay); }
    get EAX2Reverb() { return this.wrap(this.row.EAX2Reverb); }
    get EAX2ReverbDelay() { return this.wrap(this.row.EAX2ReverbDelay); }
    get EAX2RoomRolloff() { return this.wrap(this.row.EAX2RoomRolloff); }
    get EAX2AirAbsorption() { return this.wrap(this.row.EAX2AirAbsorption); }
    get EAX3RoomLF() { return this.wrap(this.row.EAX3RoomLF); }
    get EAX3DecayLFRatio() { return this.wrap(this.row.EAX3DecayLFRatio); }
    get EAX3EchoTime() { return this.wrap(this.row.EAX3EchoTime); }
    get EAX3EchoDepth() { return this.wrap(this.row.EAX3EchoDepth); }
    get EAX3ModulationTime() { return this.wrap(this.row.EAX3ModulationTime); }
    get EAX3ModulationDepth() { return this.wrap(this.row.EAX3ModulationDepth); }
    get EAX3HFReference() { return this.wrap(this.row.EAX3HFReference); }
    get EAX3LFReference() { return this.wrap(this.row.EAX3LFReference); }
}

export const SoundProviderPreferenceRegistry = {
    create(parent?: number) {
        return new SoundProviderPreferences(
            parent 
            ? DBC.SoundProviderPreferences.findById(parent)
               .clone(Ids.SoundProviderPreferences.id())
            : DBC.SoundProviderPreferences.add(
                Ids.SoundProviderPreferences.id()
            )
        )
    },

    load(id: number) {
        return new SoundProviderPreferences(DBC.SoundProviderPreferences.findById(id))
    },

    filter(query: SoundProviderPreferencesQuery) {
        return DBC.SoundProviderPreferences
            .filter(query)
            .map(x=>new SoundProviderPreferences(x))
    },

    find(query: SoundProviderPreferencesQuery) {
        return new SoundProviderPreferences(
            DBC.SoundProviderPreferences.find(query)
        )
    },
}

export class SoundProviderPreferenceRef<T> extends Ref<T,SoundProviderPreferences> {
    protected create(): SoundProviderPreferences {
        return SoundProviderPreferenceRegistry.create();
    }
    protected clone(): SoundProviderPreferences {
        return SoundProviderPreferenceRegistry.create(this.cell.get());
    }
    protected exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: SoundProviderPreferences): number {
        return v.ID;
    }
    protected resolve(): SoundProviderPreferences {
        return SoundProviderPreferenceRegistry.load(this.cell.get());
    }
}
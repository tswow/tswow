import { DBC } from "../../DBCFiles";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { SoundProviderPreferencesQuery, SoundProviderPreferencesRow } from "../../dbc/SoundProviderPreferences";
import { Table } from "../../../data/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export enum SoundProviderPreferencesFlags {
    OUTDOORS   = 0x1,
    INDOORS    = 0x2,
    UNDERWATER = 0x4,
}

export class SoundProviderPreferences extends MainEntity<SoundProviderPreferencesRow> {
    get ID() { return this.row.ID.get(); }
    get Flags() {
        return makeMaskCell32(SoundProviderPreferencesFlags, this, this.row.Flags)
    }

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

export class SoundProviderPreferenceRegistryClass
    extends RegistryDynamic<
          SoundProviderPreferences
        , SoundProviderPreferencesRow
        , SoundProviderPreferencesQuery
    >
{
    protected Table(): Table<any, SoundProviderPreferencesQuery, SoundProviderPreferencesRow> & { add: (id: number) => SoundProviderPreferencesRow; } {
        return DBC.SoundProviderPreferences
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SoundProviderPreferences
    }
    Clear(entity: SoundProviderPreferences): void {
        // TODO: need to specify this
    }
    protected FindByID(id: number): SoundProviderPreferencesRow {
        return DBC.SoundProviderPreferences.findById(id);
    }
    protected EmptyQuery(): SoundProviderPreferencesQuery {
        return {}
    }
    ID(e: SoundProviderPreferences): number {
        return e.ID
    }
    protected Entity(r: SoundProviderPreferencesRow): SoundProviderPreferences {
        return new SoundProviderPreferences(r);
    }
}

export const SoundProviderPreferenceRegistry =
    new SoundProviderPreferenceRegistryClass();
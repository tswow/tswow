import { Table } from "../../../data/table/Table";
import { SoundProviderPreferencesQuery, SoundProviderPreferencesRow } from "../../dbc/SoundProviderPreferences";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare enum SoundProviderPreferencesFlags {
    OUTDOORS = 1,
    INDOORS = 2,
    UNDERWATER = 4
}
export declare class SoundProviderPreferences extends MainEntity<SoundProviderPreferencesRow> {
    get ID(): number;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SoundProviderPreferencesFlags>;
    get EAXEnvironmentSelection(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAXDecayTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2EnvironmentSize(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2EnvironmentDiffusion(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2Room(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2RoomHF(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2DecayHFRatio(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2Reflections(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2ReflectionsDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2Reverb(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2ReverbDelay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2RoomRolloff(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX2AirAbsorption(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3RoomLF(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3DecayLFRatio(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3EchoTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3EchoDepth(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3ModulationTime(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3ModulationDepth(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3HFReference(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAX3LFReference(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SoundProviderPreferenceRegistryClass extends RegistryDynamic<SoundProviderPreferences, SoundProviderPreferencesRow, SoundProviderPreferencesQuery> {
    protected Table(): Table<any, SoundProviderPreferencesQuery, SoundProviderPreferencesRow> & {
        add: (id: number) => SoundProviderPreferencesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SoundProviderPreferences): void;
    protected FindByID(id: number): SoundProviderPreferencesRow;
    protected EmptyQuery(): SoundProviderPreferencesQuery;
    ID(e: SoundProviderPreferences): number;
    protected Entity(r: SoundProviderPreferencesRow): SoundProviderPreferences;
}
export declare const SoundProviderPreferenceRegistry: SoundProviderPreferenceRegistryClass;

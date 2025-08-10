import { Table } from "../../../data/table/Table";
import { SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow } from "../../dbc/SoundEntriesAdvanced";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SoundEntryAdvanced extends MainEntity<SoundEntriesAdvancedRow> {
    get ID(): number;
    get InnerRadius2D(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeA(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeB(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeC(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeD(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get RandomOffsetRange(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Usage(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeIntervalMin(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeIntervalMax(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get VolumeSliderCategory(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DuckToSFX(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DuckToMusic(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DuckToAmbience(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get InnerRadius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OuterRadius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeToDuck(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TimeToUnduck(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get InsideAngle(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OutsideAngle(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OutsideVolume(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get OuterRadius2D(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SoundEntryAdvancedRegistryClass extends RegistryDynamic<SoundEntryAdvanced, SoundEntriesAdvancedRow, SoundEntriesAdvancedQuery> {
    protected Table(): Table<any, SoundEntriesAdvancedQuery, SoundEntriesAdvancedRow> & {
        add: (id: number) => SoundEntriesAdvancedRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SoundEntryAdvanced): void;
    protected FindByID(id: number): SoundEntriesAdvancedRow;
    protected EmptyQuery(): SoundEntriesAdvancedQuery;
    ID(e: SoundEntryAdvanced): number;
    protected Entity(r: SoundEntriesAdvancedRow): SoundEntryAdvanced;
}
export declare const SoundEntryAdvancedRegistry: SoundEntryAdvancedRegistryClass;

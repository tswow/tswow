import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { SoundEntriesQuery, SoundEntriesRow } from "../../dbc/SoundEntries";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
import { SoundEntryFiles } from "./SoundEntryFile";
import { SoundFlags } from "./SoundFlags";
import { SoundType } from "./SoundType";
export declare class SoundEntryName extends CellSystem<SoundEntry> {
    get(): string;
    set(value: string): SoundEntry;
}
export declare class SoundEntry extends MainEntity<SoundEntriesRow> {
    get ID(): number;
    get Advanced(): import("../Refs/Ref").RefDynamic<this, import("./SoundEntryAdvanced").SoundEntryAdvanced>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof SoundFlags>;
    get SoundType(): import("../../../data/cell/cells/EnumCell").EnumCellWrite<this, typeof SoundType>;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Files(): SoundEntryFiles;
    get DirectoryBase(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Volume(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MinDistance(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DistanceCutoff(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get EAXDef(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class SoundEntryRef<T> extends RefStatic<T, SoundEntry> {
    setSimpleLoop(directory: string, songs: string[], volume?: number, frequency?: number): T;
    setSimple(directory: string, songs: string[], volume?: number, frequency?: number): T;
}
export declare class SoundEntryRegistryClass extends RegistryStatic<SoundEntry, SoundEntriesRow, SoundEntriesQuery> {
    ref<O>(owner: O, cell: Cell<number, any>): SoundEntryRef<O>;
    protected Table(): Table<any, SoundEntriesQuery, SoundEntriesRow> & {
        add: (id: number) => SoundEntriesRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: SoundEntry): void;
    protected Entity(r: SoundEntriesRow): SoundEntry;
    protected FindByID(id: number): SoundEntriesRow;
    protected EmptyQuery(): SoundEntriesQuery;
    ID(e: SoundEntry): number;
    private makeDynEntry;
    createSimpleLoop(directoryBase: string, sounds: string[], volume?: number, frequency?: number): SoundEntry;
    createSimple(directoryBase: string, sounds: string[], volume?: number, frequency?: number): SoundEntry;
}
export declare const SoundEntryRegistry: SoundEntryRegistryClass;

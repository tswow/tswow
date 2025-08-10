import { Cell } from "../../../data/cell/cells/Cell";
import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { ZoneMusicQuery, ZoneMusicRow } from "../../dbc/ZoneMusic";
import { StaticIDGenerator } from "../Misc/Ids";
import { RefStatic } from "../Refs/Ref";
import { RegistryStatic } from "../Refs/Registry";
export declare class ZoneMusicEntry extends CellSystem<ZoneMusic> {
    private index;
    constructor(owner: ZoneMusic, index: number);
    get SilenceIntervalMin(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, ZoneMusic>;
    get SilenceIntervalMax(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, ZoneMusic>;
    get Sound(): import("./SoundEntry").SoundEntryRef<ZoneMusic>;
}
export declare class ZoneMusic extends CellSystemTop {
    readonly row: ZoneMusicRow;
    constructor(row: ZoneMusicRow);
    get ID(): number;
    get SoundDay(): ZoneMusicEntry;
    get SoundNight(): ZoneMusicEntry;
    get SetName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
}
export declare class ZoneMusicRef<T> extends RefStatic<T, ZoneMusic> {
    setSimple(directoryBase?: string, songs?: string[], silenceMin?: number, silenceMax?: number, volume?: number, frequency?: number): T;
}
export declare class ZoneMusicRegistryClass extends RegistryStatic<ZoneMusic, ZoneMusicRow, ZoneMusicQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): ZoneMusicRef<T>;
    protected Table(): Table<any, ZoneMusicQuery, ZoneMusicRow> & {
        add: (id: number) => ZoneMusicRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: ZoneMusic): void;
    protected Entity(r: ZoneMusicRow): ZoneMusic;
    protected FindByID(id: number): ZoneMusicRow;
    protected EmptyQuery(): ZoneMusicQuery;
    ID(e: ZoneMusic): number;
    createSimple(directoryBase?: string, songs?: string[], silenceMin?: number, silenceMax?: number, volume?: number, frequency?: number): ZoneMusic;
}
export declare const ZoneMusicRegistry: ZoneMusicRegistryClass;

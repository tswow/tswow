import { Cell } from "../../../data/cell/cells/Cell";
import { Table } from "../../../data/table/Table";
import { ZoneintroMusicTableQuery, ZoneintroMusicTableRow } from "../../dbc/ZoneintroMusicTable";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
export declare class ZoneIntroMusic extends MainEntity<ZoneintroMusicTableRow> {
    get ID(): number;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Sound(): import("./SoundEntry").SoundEntryRef<this>;
    get Priority(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MinDelayMinutes(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class ZoneIntroMusicRef<T> extends RefDynamic<T, ZoneIntroMusic> {
    createSimple(directoryBase?: string, songs?: string[], minDelay?: number, volume?: number, frequency?: number): T;
}
export declare class ZoneIntroMusicRegistryClass extends RegistryDynamic<ZoneIntroMusic, ZoneintroMusicTableRow, ZoneintroMusicTableQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): ZoneIntroMusicRef<T>;
    protected Table(): Table<any, ZoneintroMusicTableQuery, ZoneintroMusicTableRow> & {
        add: (id: number) => ZoneintroMusicTableRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: ZoneIntroMusic): void;
    protected Entity(r: ZoneintroMusicTableRow): ZoneIntroMusic;
    protected FindByID(id: number): ZoneintroMusicTableRow;
    protected EmptyQuery(): ZoneintroMusicTableQuery;
    ID(e: ZoneIntroMusic): number;
    createSimple(directoryBase?: string, songs?: string[], minDelay?: number, volume?: number, frequency?: number): ZoneIntroMusic;
}
export declare const ZoneIntroMusicRegistry: ZoneIntroMusicRegistryClass;
export declare const ZoneIntroMusicRegistryold: {
    create(directoryBase?: string, songs?: string[], minDelay?: number, volume?: number, frequency?: number): ZoneIntroMusic;
    load(id: number): ZoneIntroMusic;
    filter(query: ZoneintroMusicTableQuery): ZoneIntroMusic[];
    find(query: ZoneintroMusicTableQuery): ZoneIntroMusic;
};

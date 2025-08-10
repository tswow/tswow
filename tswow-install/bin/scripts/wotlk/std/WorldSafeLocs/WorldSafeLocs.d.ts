import { Cell } from "../../../data/cell/cells/Cell";
import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { WorldSafelocsQuery, WorldSafelocsRow } from "../../dbc/WorldSafelocs";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { Team } from "../Misc/TeamEnum";
import { RefDynamic } from "../Refs/Ref";
import { RegistryDynamic } from "../Refs/Registry";
import { Graveyards } from "./Graveyard";
export declare class WorldSafeLoc extends MainEntity<WorldSafelocsRow> {
    get ID(): number;
    get Position(): PositionMapXYZCell<this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Graveyards(): Graveyards;
}
export declare class WorldSafeLocRef<T> extends RefDynamic<T, WorldSafeLoc> {
    setSimple(obj: {
        map: number;
        x: number;
        y: number;
        z: number;
    }): T;
}
export declare class WorldSafeLocsRegistryClass extends RegistryDynamic<WorldSafeLoc, WorldSafelocsRow, WorldSafelocsQuery> {
    ref<T>(owner: T, value: Cell<number, any>): WorldSafeLocRef<T>;
    protected Table(): Table<any, WorldSafelocsQuery, WorldSafelocsRow> & {
        add: (id: number) => WorldSafelocsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldSafeLoc): void;
    protected Clone(entity: WorldSafeLoc, parent: WorldSafeLoc): void;
    protected Entity(r: WorldSafelocsRow): WorldSafeLoc;
    protected FindByID(id: number): WorldSafelocsRow;
    protected EmptyQuery(): WorldSafelocsQuery;
    ID(e: WorldSafeLoc): number;
    createSimple(obj: {
        map: number;
        x: number;
        y: number;
        z: number;
        o?: any;
    }): WorldSafeLoc;
    createGraveyard(area: number | number[], faction: EnumCon<Team> | 'BOTH', obj: {
        map: number;
        x: number;
        y: number;
        z: number;
        o?: any;
    }): void;
}
export declare const WorldSafeLocRegistry: WorldSafeLocsRegistryClass;

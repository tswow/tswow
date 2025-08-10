import { Table } from "../../../data/table/Table";
import { MapQuery, MapRow } from "../../dbc/Map";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Map } from "./Map";
export declare class MapRegistryClass extends RegistryStaticNoClone<Map, MapRow, MapQuery> {
    protected nullID: () => number;
    protected Table(): Table<any, MapQuery, MapRow> & {
        add: (id: number) => MapRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: Map): void;
    protected Entity(r: MapRow): Map;
    protected FindByID(id: number): MapRow;
    protected EmptyQuery(): MapQuery;
    ID(e: Map): number;
    createBattleground(mod: string, id: string): import("./Map").BattlegroundMap;
    createArena(mod: string, id: string): import("./Map").BattlegroundMap;
    createDungeon(mod: string, id: string): import("./Map").DungeonMap;
    createRaid(mod: string, id: string): import("./Map").DungeonMap;
}
export declare const MapRegistry: MapRegistryClass;

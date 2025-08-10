import { Table } from "../../../data/table/Table";
import { game_teleQuery, game_teleRow } from "../../sql/game_tele";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PositionMapXYZOCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
export declare class GMTeleport extends MainEntity<game_teleRow> {
    get ID(): number;
    get Position(): PositionMapXYZOCell<this>;
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
}
export declare class GMTeleportRegistryClass extends RegistryDynamic<GMTeleport, game_teleRow, game_teleQuery> {
    protected Table(): Table<any, game_teleQuery, game_teleRow> & {
        add: (id: number) => game_teleRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: GMTeleport): void;
    protected FindByID(id: number): game_teleRow;
    protected EmptyQuery(): game_teleQuery;
    ID(e: GMTeleport): number;
    protected Entity(r: game_teleRow): GMTeleport;
    createSimple(name: string, pos: Position): GMTeleport;
}
export declare const GMTeleportRegistry: GMTeleportRegistryClass;

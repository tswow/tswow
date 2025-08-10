import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { WorldMapOverlayQuery, WorldMapOverlayRow } from "../../dbc/WorldMapOverlay";
import { ArrayRefSystemNoCreate } from "../Misc/ArrayRefSystem";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { Boundary } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
export declare class WorldMapTexture extends CellSystem<WorldMapOverlay> {
    get Name(): import("../../../data/cell/cells/Cell").CellWrapper<string, WorldMapOverlay>;
    get Width(): import("../../../data/cell/cells/Cell").CellWrapper<number, WorldMapOverlay>;
    get Height(): import("../../../data/cell/cells/Cell").CellWrapper<number, WorldMapOverlay>;
    set(name: string, width: number, height: number): WorldMapOverlay;
}
export declare class WorldMapOverlay extends MainEntity<WorldMapOverlayRow> {
    get ID(): number;
    get MapArea(): import("../Refs/Ref").RefDynamic<this, import("./WorldMapArea").WorldMapArea>;
    get Areas(): ArrayRefSystemNoCreate<this, import("../Area/Area").Area>;
    get Texture(): WorldMapTexture;
    get Offset(): PositionXYCell<this>;
    get MapPoint(): PositionXYCell<this>;
    get HitRect(): Boundary<this>;
}
export declare class WorldMapOverlayRegistryClass extends RegistryDynamic<WorldMapOverlay, WorldMapOverlayRow, WorldMapOverlayQuery> {
    protected Table(): Table<any, WorldMapOverlayQuery, WorldMapOverlayRow> & {
        add: (id: number) => WorldMapOverlayRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldMapOverlay): void;
    protected FindByID(id: number): WorldMapOverlayRow;
    protected EmptyQuery(): WorldMapOverlayQuery;
    ID(e: WorldMapOverlay): number;
    protected Entity(r: WorldMapOverlayRow): WorldMapOverlay;
}
export declare const WorldMapOverlayRegistry: WorldMapOverlayRegistryClass;

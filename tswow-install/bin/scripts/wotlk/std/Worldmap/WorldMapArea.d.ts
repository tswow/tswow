import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { Table } from "../../../data/table/Table";
import { WorldMapAreaQuery, WorldMapAreaRow } from "../../dbc/WorldMapArea";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { Boundary } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
import { ADTBounds } from "./MinimapCoords";
import { WorldMapOverlay } from "./WorldMapOverlay";
export declare class WorldMapAreaOverlays extends MultiRowSystem<WorldMapOverlay, WorldMapArea> {
    protected getAllRows(): WorldMapOverlay[];
    protected isDeleted(value: WorldMapOverlay): boolean;
    addGet(): WorldMapOverlay;
    addMod(callback: (overlay: WorldMapOverlay) => void): WorldMapArea;
}
export declare class WorldMapAreaBoundary extends Boundary<WorldMapArea> {
    /**
     * Specify the minimum and maximum adt tiles to automatically
     * convert between minimap and world coordinates.
     *
     * This allows you to easier layout your map files on a large minimap texture
     */
    setMinimapCoords(bounds: ADTBounds, minX: number, minY: number, maxX: number, maxY: number): WorldMapArea;
}
export declare class WorldMapArea extends MainEntity<WorldMapAreaRow> {
    get ID(): number;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get Area(): import("../Refs/Ref").RefNoCreate<this, import("../Area/Area").Area>;
    get Directory(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Boundary(): WorldMapAreaBoundary;
    get DisplayMap(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get DefaultDungeonFloor(): import("../Refs/Ref").RefDynamic<this, import("./DungeonMap").DungeonMap>;
    get ParentWorldMap(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Overlays(): WorldMapAreaOverlays;
}
export declare class WorldMapAreaRegistryClass extends RegistryDynamic<WorldMapArea, WorldMapAreaRow, WorldMapAreaQuery> {
    protected Table(): Table<any, WorldMapAreaQuery, WorldMapAreaRow> & {
        add: (id: number) => WorldMapAreaRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldMapArea): void;
    protected FindByID(id: number): WorldMapAreaRow;
    protected EmptyQuery(): WorldMapAreaQuery;
    ID(e: WorldMapArea): number;
    protected Entity(r: WorldMapAreaRow): WorldMapArea;
}
export declare const WorldMapAreaRegistry: WorldMapAreaRegistryClass;

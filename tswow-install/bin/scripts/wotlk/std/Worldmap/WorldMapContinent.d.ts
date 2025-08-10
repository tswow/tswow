import { Table } from "../../../data/table/Table";
import { WorldMapContinentQuery, WorldMapContinentRow } from "../../dbc/WorldMapContinent";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { Boundary, MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryRowBase } from "../Refs/Registry";
import { ADTBounds } from "./MinimapCoords";
export declare class MapTaxiBoundary extends MinMax2DCell<WorldMapContinent> {
    setMinimapCoords(map: ADTBounds, minX: number, minY: number, maxX: number, maxY: number): WorldMapContinent;
    /**
     * Sets the taxi boundary to match the adt boundary.
     *
     * You should set ADT boundary before using this function.
     *
     * @param padding how many yards to pad the resulting image
     * @returns
     */
    matchADTBoundary(padding?: number): WorldMapContinent;
}
export declare class WorldMapContinentAreaBoundary extends Boundary<WorldMapContinent> {
    setMinimapCoords(map: ADTBounds, minX: number, minY: number, maxX: number, maxY: number): WorldMapContinent;
    matchADTBoundary(padding?: number): WorldMapContinent;
}
export declare class WorldMapContinent extends MainEntity<WorldMapContinentRow> {
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    /** 0 for outland, 1 for azeroth */
    get World(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ADTBoundary(): Boundary<this>;
    get ContinentOffset(): PositionXYCell<this>;
    get Scale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TaxiBoundary(): MapTaxiBoundary;
    get Directory(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    protected Area(): import("./WorldMapArea").WorldMapArea;
    get DisplayBoundary(): WorldMapContinentAreaBoundary;
    get ID(): number;
}
export declare class WorldMapContinentRegistryClass extends RegistryRowBase<WorldMapContinent, WorldMapContinentRow, WorldMapContinentQuery> {
    protected Table(): Table<any, WorldMapContinentQuery, WorldMapContinentRow> & {
        add: (id: number) => WorldMapContinentRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldMapContinent): void;
    protected FindByID(id: number): WorldMapContinentRow;
    protected EmptyQuery(): WorldMapContinentQuery;
    ID(e: WorldMapContinent): number;
    protected Entity(r: WorldMapContinentRow): WorldMapContinent;
    create(map: number): WorldMapContinent;
}
export declare const WorldMapContinentRegistry: WorldMapContinentRegistryClass;

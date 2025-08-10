import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Map } from "./Map";
export type MapBounds = {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
export declare class MapADT<T extends Map> extends CellSystem<T> {
    private mapsdir;
    private mapname;
    hasTile(x: number, y: number): boolean;
    getBoundary(): MapBounds;
    add(mod: string, blobs: [minx: number, miny: number, maxx: number, maxy: number, teleportName?: string][]): T;
}

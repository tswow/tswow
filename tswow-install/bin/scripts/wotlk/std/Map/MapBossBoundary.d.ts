import { EnumCellTransform } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { instance_boss_boundaryRow } from "../../sql/instance_boss_boundary";
import { TransformedEntity } from "../Misc/Entity";
import { PositionXYCell } from "../Misc/PositionCell";
export type XYPos = {
    x: number;
    y: number;
};
export declare class MapBossBoundary extends TransformedEntity<instance_boss_boundaryRow, MapBossBoundary> {
    protected transformer(): EnumCellTransform<any>;
    protected default(): MapBossBoundary;
    get Map(): number;
    get Boss(): number;
    get Index(): number;
    get UnionGroup(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Type(): MapBossBoundaryType<this>;
}
export declare class MapBossRectangle extends MapBossBoundary {
    get MinPos(): PositionXYCell<this>;
    get MaxPos(): PositionXYCell<this>;
    set(minPos: XYPos, maxPos: XYPos): this;
}
export declare class MapBossCircle extends MapBossBoundary {
    get Position(): PositionXYCell<this>;
    get Radius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(pos: XYPos, radius: number): void;
}
export declare class MapBossEllipse extends MapBossBoundary {
    get Position(): PositionXYCell<this>;
    get Radius(): PositionXYCell<this>;
    set(radius: XYPos, position: XYPos): void;
}
export declare class MapBossTriangle extends MapBossBoundary {
    get Pos1(): PositionXYCell<this>;
    get Pos2(): PositionXYCell<this>;
    get Pos3(): PositionXYCell<this>;
    set(pos1: XYPos, pos2: XYPos, pos3: XYPos): this;
}
export declare class MapBossParallelogram extends MapBossTriangle {
}
export declare class MapBossZRange extends MapBossBoundary {
    get Min(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Max(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    set(min: number, max: number): this;
}
export declare class MapBossBoundaryType<T extends MapBossBoundary> extends EnumCellTransform<T> {
    get RECTANGLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossRectangle>;
    get CIRCLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossCircle>;
    get ELLIPSE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossEllipse>;
    get TRIANGLE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossTriangle>;
    get PARALLELOGRAM(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossParallelogram>;
    get ZRANGE(): import("../../../data/cell/cells/EnumCell").EnumValueTransform<T, MapBossZRange>;
}
export declare class MapBossBoundaries extends MultiRowSystem<MapBossBoundary, MapBossBoundaries> {
    protected getAllRows(): MapBossBoundary[];
    protected isDeleted(value: MapBossBoundary): boolean;
    protected instanceMap: number;
    protected boss: number;
    constructor(map: number, boss: number);
    addGet(unionGroup?: number, inverted?: boolean): MapBossBoundary;
    addMod(callback: (boundary: MapBossBoundary) => void): MapBossBoundaries;
    addRectangle(unionGroup: number, inverted: boolean, minPos: XYPos, maxPos: XYPos): MapBossBoundaries;
    addCircle(unionGroup: number, inverted: boolean, pos: XYPos, radius: number): MapBossBoundaries;
    addEllipse(unionGroup: number, inverted: boolean, pos: XYPos, radius: XYPos): MapBossBoundaries;
    addTriangle(unionGroup: number, inverted: boolean, pos1: XYPos, pos2: XYPos, pos3: XYPos): MapBossBoundaries;
    addParallelogram(unionGroup: number, inverted: boolean, pos1: XYPos, pos2: XYPos, pos3: XYPos): MapBossBoundaries;
    addZRange(unionGroup: number, inverted: boolean, minZ: number, maxZ: number): MapBossBoundaries;
}

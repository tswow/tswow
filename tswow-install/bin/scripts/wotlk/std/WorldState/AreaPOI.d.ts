import { AreaPOIQuery, AreaPOIRow } from "../../dbc/AreaPOI";
import { MainEntity } from "../Misc/Entity";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
export declare enum AreaPOIFlags {
    SHOW_MINIMAP_ARROW = 1,
    SHOW_MINIMAP_ICON = 2,
    SHOW_ON_CONTINENT = 8,
    SHOW_ON_WORLD = 16,
    SHOW_ON_MAP = 132
}
export declare class AreaPOI extends MainEntity<AreaPOIRow> {
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof AreaPOIFlags>;
    get Position(): PositionMapXYZCell<this>;
    get Importance(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Icons(): SingleArraySystem<number, this>;
    get Faction(): import("../Refs/Ref").RefNoCreate<this, import("../Faction/Faction").Faction>;
    get Area(): import("../Refs/Ref").RefNoCreate<this, import("../Area/Area").Area>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get WorldState(): import("../Refs/Ref").RefStatic<this, import("./WorldState").WorldState>;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
}
export declare const AreaPOIRegistry: {
    create(parent?: number): AreaPOI;
    load(id: number): AreaPOI;
    filter(query: AreaPOIQuery): AreaPOI[];
    find(query: AreaPOIQuery): AreaPOI;
};

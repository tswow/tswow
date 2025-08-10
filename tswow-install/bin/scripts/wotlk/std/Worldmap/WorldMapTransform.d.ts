import { Table } from "../../../data/table/Table";
import { WorldMapTransformsQuery, WorldMapTransformsRow } from "../../dbc/WorldMapTransforms";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { PositionXYCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";
export declare class WorldMapTransform extends MainEntity<WorldMapTransformsRow> {
    get ID(): number;
    get SourceMap(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get DestinationMap(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get Region(): MinMax2DCell<this>;
    get Offset(): PositionXYCell<this>;
    get DungeonFloor(): import("../Refs/Ref").RefDynamic<this, import("./DungeonMap").DungeonMap>;
}
export declare class WorldMapTransformRegistryClass extends RegistryDynamic<WorldMapTransform, WorldMapTransformsRow, WorldMapTransformsQuery> {
    protected Table(): Table<any, WorldMapTransformsQuery, WorldMapTransformsRow> & {
        add: (id: number) => WorldMapTransformsRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: WorldMapTransform): void;
    protected FindByID(id: number): WorldMapTransformsRow;
    protected EmptyQuery(): WorldMapTransformsQuery;
    ID(e: WorldMapTransform): number;
    protected Entity(r: WorldMapTransformsRow): WorldMapTransform;
}
export declare const WorldMapTransformRegistry: WorldMapTransformRegistryClass;

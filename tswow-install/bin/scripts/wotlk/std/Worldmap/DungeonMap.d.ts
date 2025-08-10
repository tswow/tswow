import { Table } from "../../../data/table/Table";
import { DungeonMapQuery, DungeonMapRow } from "../../dbc/DungeonMap";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";
export declare class DungeonMap extends MainEntity<DungeonMapRow> {
    get ID(): number;
    get Map(): import("../Refs/Ref").RefNoCreate<this, import("../Map/Map").Map>;
    get FloorIndex(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Boundary(): MinMax2DCell<this>;
    get ParentWorldMap(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class DungeonMapRegistryClass extends RegistryDynamic<DungeonMap, DungeonMapRow, DungeonMapQuery> {
    protected Table(): Table<any, DungeonMapQuery, DungeonMapRow> & {
        add: (id: number) => DungeonMapRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: DungeonMap): void;
    protected FindByID(id: number): DungeonMapRow;
    protected EmptyQuery(): DungeonMapQuery;
    ID(e: DungeonMap): number;
    protected Entity(r: DungeonMapRow): DungeonMap;
}
export declare const DungeonMapRegistry: DungeonMapRegistryClass;

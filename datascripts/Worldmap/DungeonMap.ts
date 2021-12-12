import { DBC } from "wotlkdata";
import { DungeonMapQuery, DungeonMapRow } from "wotlkdata/wotlkdata/dbc/types/DungeonMap";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MapRegistry } from "../Map/Maps";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { MinMax2DCell } from "../Misc/LimitCells";
import { RegistryDynamic } from "../Refs/Registry";

export class DungeonMap extends MainEntity<DungeonMapRow> {
    get ID() { return this.row.ID.get(); }

    get Map() { return MapRegistry.ref(this, this.row.MapID); }

    get FloorIndex() { return this.wrap(this.row.FloorIndex); }

    get Boundary() {
        return new MinMax2DCell(
              this
            , this.row.MinX
            , this.row.MinY
            , this.row.MaxX
            , this.row.MaxY
            )
    }

    get ParentWorldMap() { return this.wrap(this.row.ParentWorldMapID); }
}

export class DungeonMapRegistryClass
    extends RegistryDynamic<DungeonMap,DungeonMapRow,DungeonMapQuery>
{
    protected Table(): Table<any, DungeonMapQuery, DungeonMapRow> & { add: (id: number) => DungeonMapRow; } {
        return DBC.DungeonMap
    }
    protected ids(): DynamicIDGenerator {
        return Ids.DungeonMap
    }
    Clear(entity: DungeonMap): void {
        entity
            .Boundary.set(0,0,0,0)
            .FloorIndex.set(0)
            .Map.set(0)
            .ParentWorldMap.set(0)
    }
    protected FindByID(id: number): DungeonMapRow {
        return DBC.DungeonMap.query({ID:id})
    }
    protected EmptyQuery(): DungeonMapQuery {
        return {}
    }
    ID(e: DungeonMap): number {
        return e.ID
    }
    protected Entity(r: DungeonMapRow): DungeonMap {
        return new DungeonMap(r);
    }
}

export const DungeonMapRegistry = new DungeonMapRegistryClass();
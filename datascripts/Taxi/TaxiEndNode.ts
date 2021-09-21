import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { TaxiNodesQuery, TaxiNodesRow } from "wotlkdata/dbc/types/TaxiNodes";
import { Table } from "wotlkdata/table/Table";
import { DBC } from "wotlkdata/wotlkdata";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RegistryDynamic } from "../Refs/Registry";

export class TaxiNodeMount extends CellSystem<TaxiEndNode> {
    get Horde() { return this.ownerWrapIndex(this.owner.row.MountCreatureID,0)}
    get Alliance() { return this.ownerWrapIndex(this.owner.row.MountCreatureID,1)}

    set(both: number) {
        this.Alliance.set(both);
        this.Horde.set(both);
        return this.owner;
    }
}

export class TaxiEndNode extends MainEntity<TaxiNodesRow> {
    get Position() { return new PositionMapXYZCell(
          this
        , this.row.MapID
        , this.row.X
        , this.row.Y
        , this.row.Z
        )}
    get Name() { return this.wrapLoc(this.row.Name); }
    get Mount() { return new TaxiNodeMount(this); }
    get ID() { return this.row.ID.get(); }
}

export class TaxiEndNodeRegistryClass
    extends RegistryDynamic<TaxiEndNode,TaxiNodesRow,TaxiNodesQuery>
{
    protected Table(): Table<any, TaxiNodesQuery, TaxiNodesRow> & { add: (id: number) => TaxiNodesRow; } {
        return DBC.TaxiNodes
    }
    protected ids(): DynamicIDGenerator {
        return Ids.TaxiNodes
    }
    Clear(entity: TaxiEndNode): void {
        entity.Mount.set(0)
              .Name.clear()
              .Position.setSpread(0,0,0,0)
    }
    protected FindByID(id: number): TaxiNodesRow {
        return DBC.TaxiNodes.findById(id);
    }
    protected EmptyQuery(): TaxiNodesQuery {
        return {}
    }
    ID(e: TaxiEndNode): number {
        return e.ID
    }
    protected Entity(r: TaxiNodesRow): TaxiEndNode {
        return new TaxiEndNode(r);
    }
}

export const TaxiEndNodeRegistry = new TaxiEndNodeRegistryClass();
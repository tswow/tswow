import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { TaxiNodesQuery, TaxiNodesRow } from "../../dbc/TaxiNodes";
import { Table } from "../../../data/table/Table";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RegistryStatic } from "../Refs/Registry";
import { TaxiPathRegistry } from "./Taxi";

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

    delete() {
        if(this.isDeleted()) return this;
        this.row.delete();
        TaxiPathRegistry
            .filter(x=>x.Start.get() === this.ID || x.End.get() === this.ID)
            .forEach(x=>{
                x.delete();
            })
        return this;
    }

    isDeleted() {
        return this.row.isDeleted();
    }

    undelete() {
        this.row.undelete();
        return this;
    }
}

// we should never create stray taxi endnodes
export class TaxiEndNodeRegistryClass
    extends RegistryStatic<TaxiEndNode,TaxiNodesRow,TaxiNodesQuery>
{
    protected IDs(): StaticIDGenerator {
        return Ids.TaxiNodesFlightpath
    }
    protected Table(): Table<any, TaxiNodesQuery, TaxiNodesRow> & { add: (id: number) => TaxiNodesRow; } {
        return DBC.TaxiNodes
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
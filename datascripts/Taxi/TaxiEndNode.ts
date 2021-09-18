import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { TaxiNodesRow } from "wotlkdata/dbc/types/TaxiNodes";
import { DBC } from "wotlkdata/wotlkdata";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { Ref } from "../Refs/RefOld";

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

export class TaxiEndNodeRef<T> extends Ref<T,TaxiEndNode> {
    protected create(): TaxiEndNode {
        return new TaxiEndNode(DBC.TaxiNodes.add(Ids.TaxiNodes.id()));
    }
    protected clone(): TaxiEndNode {
        return new TaxiEndNode(this.resolve().row.clone(Ids.TaxiNodes.id()));
    }
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected id(v: TaxiEndNode): number {
        return v.ID;
    }
    protected resolve(): TaxiEndNode {
        return new TaxiEndNode(DBC.TaxiNodes.findById(this.cell.get()));
    }
}

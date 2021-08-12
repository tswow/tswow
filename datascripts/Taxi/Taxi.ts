/*
import { DBC } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { TaxiNodesRow } from "wotlkdata/dbc/types/TaxiNodes";
import { TaxiPathRow } from "wotlkdata/dbc/types/TaxiPath";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PositionXYZCell } from "../Misc/PositionCell";

export class TaxiNode<T> extends CellSystem<T> {
    readonly row: TaxiNodesRow

    constructor(owner: T, row: TaxiNodesRow) {
        super(owner);
        this.row = row;
    }

    get Position() { return new PositionXYZCell(
          this
        , this.row.MapID
        , this.row.X
        , this.row.Y
        , this.row.Z
        )}

    get Name() { return this.wrapLoc(this.row.Name); }
    get MountCreatureID() { return this.wrapArray(this.row.MountCreatureID)}
}

export class TaxiPathNodes<T> extends CellSystem<TaxiPath<T>> {
    get length() {
        return this.nodes().length;
    }

    protected nodes() {
        return DBC.TaxiPathNode
            .filter({PathID:this.owner.ID})
            .sort((a,b)=>a.NodeIndex.get() > b.NodeIndex.get() ? 1 : -1)
    }

    private makeNode(pos: Position, flags: number, delay: number, arrivalEvent: number, departureEvent: number) {
        return DBC.TaxiPathNode.add(Ids.TaxiPathNode.id())
            .PathID.set(this.owner.ID)
            .MapID.set(pos.map)
            .LocX.set(pos.x)
            .LocY.set(pos.y)
            .LocZ.set(pos.z)
            .Flags.set(flags)
            .Delay.set(delay)
            .ArrivalEventID.set(arrivalEvent)
            .DepartureEventID.set(departureEvent)
    }

    insert(index: number, pos: Position, flags = 0, delay = 0, arrivalEvent = 0, departureEvent = 0) {
        this.nodes().slice(index).forEach(x=>x.NodeIndex.set(x.NodeIndex.get()+1));
        this.makeNode(pos,flags,delay,arrivalEvent,departureEvent)
            .NodeIndex.set(index);
        return this;
    }

    getIndex(index: number) {
        return this.nodes()[index];
    }

    push(pos: Position, flags = 0, delay = 0, arrivalEvent = 0, departureEvent = 0) {
        this.makeNode(pos,flags,delay,arrivalEvent,departureEvent)
            .NodeIndex.set(this.length-1)
        return this;
    }

    objectify() {
        return this.nodes().map(node=>{
            return ({
                  map: node.MapID.get()
                , x:   node.LocX.get()
                , y:   node.LocY.get()
                , z:   node.LocZ.get()
                , delay:  node.Delay.get()
                , flags:  node.Flags.get()
                , ArrivalEventId:  node.ArrivalEventID.get()
                , DepartureEventId:  node.DepartureEventID.get()
            });
        });
    }
}

export class TaxiPath<T> extends CellSystem<T> {
    readonly row: TaxiPathRow;

    constructor(owner: T, row: TaxiPathRow) {
        super(owner);
        this.row = row;
    }

    get ID() { return this.row.ID.get(); }

    get StartNode() {
        return new TaxiNode(this, DBC.TaxiNodes.findById(this.row.FromTaxiNode.get()));
    }

    get Nodes(): TaxiPathNodes<T> {
        return new TaxiPathNodes(this);
    }

    get EndNode() {
        return new TaxiNode(this, DBC.TaxiNodes.findById(this.row.FromTaxiNode.get()));
    }
}

export const TaxiPaths = {
    createStartEnd(fromNode: number, toNode: number, cost = 0) {
        return new TaxiPath(undefined, DBC.TaxiPath.add(Ids.TaxiPath.id())
            .FromTaxiNode.set(fromNode)
            .ToTaxiNode.set(toNode)
            .Cost.set(cost))
    },

    createPath(vertices: Position[], cost = 0) {
        if(vertices.length < 2) {
            throw new Error(`Taxi paths must be made up of at least two vertices`);
        }

        let ids = [vertices[0],vertices[vertices.length-1]].map(leaf=>
            DBC.TaxiNodes.add(Ids.TaxiNodes.id())
                .MapID.set(leaf.map)
                .X.set(leaf.x)
                .Y.set(leaf.y)
                .Z.set(leaf.z)
                .MountCreatureID.set([0,0])
                .ID.get()
        );

        let path = TaxiPaths.createStartEnd(ids[0],ids[1],cost);
        vertices.forEach(x=>{
            path.Nodes.push(x)
        });

        return path;
    }
}
*/
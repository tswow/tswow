import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { TaxiPathQuery, TaxiPathRow } from "wotlkdata/dbc/types/TaxiPath";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { RefNoCreate } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { TaxiEndNode, TaxiEndNodeRegistry } from "./TaxiEndNode";
import { TaxiPathNodes } from "./TaxiPathNode";

const ALLIANCE_DEFAULT_MOUNT = 541;
const HORDE_DEFAULT_MOUNT = 2224;

export class TaxiPath extends MainEntity<TaxiPathRow> {
    get ID() { return this.row.ID.get(); }
    get Start() {
        return TaxiEndNodeRegistry.ref(this, this.row.FromTaxiNode);
    }
    get End() {
        return TaxiEndNodeRegistry.ref(this, this.row.ToTaxiNode);
    }
    get Nodes(): TaxiPathNodes { return new TaxiPathNodes(this); }
    get Cost() {  return this.wrap(this.row.Cost) }
}

export type TaxiNodeConstructor = Position & {
    arrival_event?: number,
    departure_event?: number,
    delay?: number,
}

export class TaxiPathRegistryClass
    extends RegistryRowBase<TaxiPath,TaxiPathRow,TaxiPathQuery>
{

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Entity(r: TaxiPathRow): TaxiPath {
        return new TaxiPath(r);
    }
    protected FindByID(id: number): TaxiPathRow {
        return DBC.TaxiPath.findById(id);
    }
    protected EmptyQuery(): TaxiPathQuery {
        return {}
    }
    ID(e: TaxiPath): number {
        return e.ID
    }
    protected Table(): Table<any, TaxiPathQuery, TaxiPathRow> & { add: (id: number) => TaxiPathRow; } {
        return DBC.TaxiPath
    }
    protected IDs(): StaticIDGenerator {
        return Ids.TaxiPath
    }

    /**
     * Connects a new path between two existing taxi endpoint nodes
     */
    createStartEnd(mod: string, id: string, fromNode: number, toNode: number, cost = 0) {
        return new TaxiPath(DBC.TaxiPath.add(Ids.TaxiPath.id(mod,id))
            .FromTaxiNode.set(fromNode)
            .ToTaxiNode.set(toNode)
            .Cost.set(cost))
    }

    /**
     * Creates a complee
     * @returns
     */
    createNewPath(mod: string, id: string, cost: number, mount: number|[number,number], vertices: TaxiNodeConstructor[]) {
        if(vertices.length < 2) {
            throw new Error(`Taxi paths must be made up of at least two vertices`);
        }

        if(mount === 0) {
            mount = [HORDE_DEFAULT_MOUNT,ALLIANCE_DEFAULT_MOUNT];
        }

        if(typeof(mount) == 'number') {
            mount = [mount,mount];
        }

        let start = new TaxiEndNode(DBC.TaxiNodes.add(Ids.TaxiNodes.id()))
            .Position.set(vertices[0])
            .Mount.Horde.set(mount[0])
            .Mount.Alliance.set(mount[1])

        let end = new TaxiEndNode(DBC.TaxiNodes.add(Ids.TaxiNodes.id()))
            .Position.set(vertices[vertices.length-1])
            .Mount.Horde.set(mount[0])
            .Mount.Alliance.set(mount[1])

        let path = this.createStartEnd(mod,id,start.ID,end.ID,0)
            .Cost.set(cost)
        vertices.forEach(x=>{
            path.Nodes.push(x)
        });
        return path;
    }

    createPathFrom(mod: string, id: string, startNode: number, cost: number, endMount: number|[number,number], vertices: TaxiNodeConstructor[]) {
        let start = new TaxiEndNode(DBC.TaxiNodes.findById(startNode));
        if(endMount === 0) {
            endMount = [start.Mount.Horde.get()||HORDE_DEFAULT_MOUNT,start.Mount.Alliance.get()||ALLIANCE_DEFAULT_MOUNT];
        }

        if(typeof(endMount) == 'number') {
            endMount = [endMount,endMount];
        }

        let end = new TaxiEndNode(DBC.TaxiNodes.add(Ids.TaxiNodes.id()))
            .Position.set(vertices[vertices.length-1])
            .Mount.Horde.set(endMount[0])
            .Mount.Alliance.set(endMount[1])
        let path = this.createStartEnd(mod,id,start.ID,end.ID)
            .Cost.set(cost)
        vertices.unshift(start.Position.toPosition())
        vertices.forEach(x=>{
            path.Nodes.push(x);
        })
        return path;
    }

    createPathBetween(mod: string, id: string, startNode: number, endNode: number, cost: number, vertices: TaxiNodeConstructor[]) {
        let start = new TaxiEndNode(DBC.TaxiNodes.findById(startNode));
        let end = new TaxiEndNode(DBC.TaxiNodes.findById(endNode))
        let path = this.createStartEnd(mod,id,start.ID,end.ID)
            .Cost.set(cost)
        vertices.unshift(start.Position.toPosition())
        vertices.push(end.Position.toPosition())
        vertices.forEach(x=>{
            path.Nodes.push(x);
        })
        return path;
    }
}

export const TaxiPathRegistry = new TaxiPathRegistryClass();
import { sort } from "../../../data";
import { makeMaskCell32 } from "../../../data/cell/cells/MaskCell";
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { TaxiPathNodeRow } from "../../dbc/TaxiPathNode";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RefUnknown } from "../Refs/Ref";
import { TaxiNodeConstructor, TaxiPath } from "./Taxi";

export enum TaxiPathNodeFlags {
    MAP_CHANGE  = 0x1,
    SHOULD_STOP = 0x2,
}

export class TaxiPathNode extends MainEntity<TaxiPathNodeRow> {
    get ID() { return this.row.ID.get(); }
    get Position() { return new PositionMapXYZCell(
          this
        , this.row.MapID
        , this.row.LocX
        , this.row.LocY
        , this.row.LocZ
        )}

    get ArrivalEvent() { return new RefUnknown(this, this.row.ArrivalEventID); }
    get DepartureEvent() { return new RefUnknown(this, this.row.DepartureEventID); }
    get Flags() {
        return makeMaskCell32(TaxiPathNodeFlags, this, this.row.Flags)
    }
    get Delay() { return this.wrap(this.row.Delay); }
}

export class TaxiPathNodes extends MultiRowSystem<TaxiPathNode,TaxiPath> {
    protected getAllRows(): TaxiPathNode[] {
        return DBC.TaxiPathNode
            .queryAll({PathID:this.owner.ID})
            .sort((a,b)=>a.NodeIndex.get() > b.NodeIndex.get() ? 1 : -1)
            .map(x=>new TaxiPathNode(x))
    }
    protected isDeleted(value: TaxiPathNode): boolean {
        return value.row.isDeleted();
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

    insert(index: number, pos: TaxiNodeConstructor) {
        let rows = this.getAllRows();
        let flag = pos.delay ? 2 : 0;
        if(rows.length > 0 && index > 0 && rows[index-1].Position.Map.get() != pos.map) {
            rows[index-1].Flags.MAP_CHANGE.set(true)
        }

        if(rows.length > 0) {
            if(pos.teleports || rows[index].Position.Map.get() != pos.map) {
                flag = flag | 1;
            }
        }

        rows.slice(index).forEach(x=>x.row.NodeIndex.set(x.row.NodeIndex.get()+1));
        this.makeNode(pos,flag, pos.delay||0,pos.arrival_event||0,pos.departure_event||0)
            .NodeIndex.set(index);
        return this;
    }

    push(poses: TaxiNodeConstructor|TaxiNodeConstructor[]) {
        if(!Array.isArray(poses)) poses = [poses]
        let old = this.getAllRows();
        poses.forEach((pos,i)=>{
            if(old.length > 0 && old[old.length-1].Position.Map.get() != pos.map) {
                old[old.length-1].Flags.MAP_CHANGE.set(true)
            }
            let newNode = this.makeNode(pos,pos.delay ? 2 : 0,pos.delay || 0,pos.arrival_event || 0,pos.departure_event || 0)
                .NodeIndex.set(this.length-1)
            old.push(new TaxiPathNode(newNode));
        })

        return this;
    }

    objectify(options?: ObjectifyOptions) {
        return this.getAllRows().map(node=>{
            return ({
                  map: node.Position.Map.get()
                , x:   node.Position.X.get()
                , y:   node.Position.Y.get()
                , z:   node.Position.Z.get()
                , delay:  node.Delay.get()
                , flags:  node.Flags.get()
                , ArrivalEventId:  node.ArrivalEvent.get()
                , DepartureEventId:  node.DepartureEvent.get()
                , ID: node.ID
            });
        });
    }
}

sort('TaxiPathNodes', () => {
    // todo: temporary hack that limits amount of pathids and steps to 64k because quicksort is slow as a dog for this table.
    DBC.TaxiPathNode.binarySort(0,(r1) => {
        return (r1.PathID.get() << 16) + r1.NodeIndex.get()
    })
})
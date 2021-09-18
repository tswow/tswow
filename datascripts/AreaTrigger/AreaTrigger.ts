import { sort } from "wotlkdata";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { AreaTriggerRow } from "wotlkdata/dbc/types/AreaTrigger";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { distance3d, Position } from "../Misc/Position";
import { PositionMapXYZCell } from "../Misc/PositionCell";

export class AreaTriggerBase extends MainEntity<AreaTriggerRow> {
    get ID() { return this.row.ID.get(); }
    get Position() {
        return new PositionMapXYZCell(
              this
            , this.row.MapID
            , this.row.X
            , this.row.Y
            , this.row.Z
        )
    }
}

export class AreaTriggerRadius extends AreaTriggerBase {
    get Radius() { return this.wrap(this.row.Radius); }
}

export class AreaTriggerBoxBox extends CellSystem<AreaTriggerBox> {
    get Length() { return this.ownerWrap(this.owner.row.Box_Length); }
    get Width() { return this.ownerWrap(this.owner.row.Box_Width); }
    get Height() { return this.ownerWrap(this.owner.row.Box_Height); }
    get Yaw() { return this.ownerWrap(this.owner.row.Box_Yaw); }

    set(length: number, width: number, height: number, yaw: number) {
        this.Length.set(length);
        this.Width.set(width);
        this.Height.set(height);
        this.Yaw.set(yaw);
        return this.owner;
    }
}

export class AreaTriggerBox extends AreaTriggerBase {
    get Box() { return new AreaTriggerBoxBox(this); }
}

export const AreaTriggerRegistry = {
    createRadius(mod: string, id: string, pos: Position, radius: number|Position) {
        if(typeof(radius)==='object') {
            radius = distance3d(pos,radius);
        }
        return new AreaTriggerRadius(
            DBC.AreaTrigger
                .add(Ids.AreaTrigger.id(mod,id))
                .Box_Height.set(0)
                .Box_Length.set(0)
                .Box_Width.set(0)
                .Box_Yaw.set(0)
            )
            .Position.set(pos)
            .Radius.set(radius)
    },

    createBox(mod: string, id: string, pos: Position, length: number, width: number, height: number) {
        return new AreaTriggerBox(
            DBC.AreaTrigger
                .add(Ids.AreaTrigger.id(mod,id))
                .Radius.set(0)
            )
            .Position.set(pos)
            .Box.set(length,width,height,pos.o)
    },
}

sort('AreaTrigger',()=>{
    DBC.AreaTrigger.binarySort(0,row=>row.MapID.get());
})
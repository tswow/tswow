import { sort } from "wotlkdata";
import { CellSystem } from "wotlkdata/wotlkdata/cell/systems/CellSystem";
import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { AreaTriggerQuery, AreaTriggerRow } from "wotlkdata/wotlkdata/dbc/types/AreaTrigger";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { getInlineID } from "../InlineScript/InlineScript";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { distance3d, Position } from "../Misc/Position";
import { PositionMapXYZCell } from "../Misc/PositionCell";
import { RegistryStatic } from "../Refs/Registry";
import { AreaTriggerTavern } from "./AreaTriggerTavern";
import { AreaTriggerTeleport } from "./AreaTriggerTeleport";

export class AreaTriggerBase extends MainEntity<AreaTriggerRow> {
    get ID() { return this.row.ID.get(); }
    get Tavern() { return new AreaTriggerTavern(this); }
    get Teleport() { return new AreaTriggerTeleport(this); }
    get Position() {
        return new PositionMapXYZCell(
              this
            , this.row.MapID
            , this.row.X
            , this.row.Y
            , this.row.Z
        )
    }

    get InlineScripts() {
        return getInlineID(
              this
            , this.ID
            , 'AreaTriggerID'
        ) as _hidden.AreaTriggerID<this>
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

export class AreaTriggerRegistryClass
    extends RegistryStatic<
          AreaTriggerBase
        , AreaTriggerRow
        , AreaTriggerQuery
    >
{
    protected Table(): Table<any, any, AreaTriggerRow> & { add: (id: number) => AreaTriggerRow; } {
        return DBC.AreaTrigger
    }
    protected IDs(): StaticIDGenerator {
        return Ids.AreaTrigger
    }
    Clear(r: AreaTriggerBase, mod: string, id: string): void {
        r.row
            .MapID.set(0)
            .Radius.set(0)
            .X.set(0)
            .Y.set(0)
            .Z.set(0)
            .Box_Height.set(0)
            .Box_Length.set(0)
            .Box_Width.set(0)
            .Box_Yaw.set(0)
    }
    protected FindByID(id: number): AreaTriggerRow {
        return DBC.AreaTrigger.query({ID:id})
    }
    ID(e: AreaTriggerBase): number {
        return e.ID
    }
    protected EmptyQuery() {
        return {}
    }
    protected Entity(r: AreaTriggerRow): AreaTriggerBase {
        return new AreaTriggerBase(r);
    }

    createRadius(mod: string, id: string, pos: Position, radius: number|Position) {
        if(typeof(radius)==='object') {
            radius = distance3d(pos,radius);
        }
        return new AreaTriggerRadius(this.create(mod,id).row)
            .Position.set(pos)
            .Radius.set(radius)
    }

    createBox(mod: string, id: string, pos: Position, length: number, width: number, height: number) {
        return new AreaTriggerBox(this.create(mod,id).row)
            .Position.set(pos)
            .Box.set(length,width,height,pos.o)
    }
};

export const AreaTriggerRegistry = new AreaTriggerRegistryClass();

sort('AreaTrigger',()=>{
    DBC.AreaTrigger.binarySort(0,row=>row.MapID.get());
})
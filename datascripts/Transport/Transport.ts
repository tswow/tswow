import { SQL } from "wotlkdata"
import { Cell } from "wotlkdata/cell/cells/Cell"
import { transportsQuery, transportsRow } from "wotlkdata/sql/types/transports"
import { Table } from "wotlkdata/table/Table"
import { GameObjectMoTransportRef } from "../GameObject/GameObjectTemplate"
import { MainEntity } from "../Misc/Entity"
import { Ids } from "../Misc/Ids"
import { RefNoCreate } from "../Refs/Ref"
import { RegistryRowBase } from "../Refs/Registry"
import { TaxiNodeConstructor, TaxiPathRegistry } from "../Taxi/Taxi"
import { std } from "../tswow-stdlib-data"

const DEFAULT_DISPLAY_ID = 3015 // generic boat

export class Transport extends MainEntity<transportsRow> {
    get GameObject() { return new GameObjectMoTransportRef(this,this.row.entry); }
    get ID() { return this.row.guid.get(); }
    get Name() { return this.wrap(this.row.name); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
}

export class TransportRegistryClass
    extends RegistryRowBase<Transport,transportsRow,transportsQuery>
{

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Entity(r: transportsRow): Transport {
        return new Transport(r);
    }
    protected FindByID(id: number): transportsRow {
        return SQL.transports.find({guid:id});
    }
    protected EmptyQuery(): transportsQuery {
        return {}
    }
    protected ID(e: Transport): number {
        return e.ID
    }
    protected Table(): Table<any, transportsQuery, transportsRow> {
        return SQL.transports;
    }

    createSimple(mod: string,id: string, points: TaxiNodeConstructor[]) {
        let nid = Ids.transports.id(mod,id)
        let taxiPath = TaxiPathRegistry.createNewPath(mod,`${id}-path`,1,0,points);
        let gameObject = std.GameObjectTemplates.create(mod,`${id}-gameobject`)
            .Type.MoTransport.set()
            .SpawnGroup.set(0)
            .Display.set(DEFAULT_DISPLAY_ID)
            .Size.set(1)
            .MoveSpeed.set(30)
            .StartEvent.set(0)
            .StopEvent.set(0)
            .TaxiPath.set(taxiPath.ID)
            .AccelRate.set(9)
            .Flags.set(40)
        return new Transport(
            SQL.transports.add(nid)
            .entry.set(gameObject.ID)
            .name.set('tswow')
        )
    }
}

export const TransportRegistry = new TransportRegistryClass();
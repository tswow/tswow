import { SQL } from "wotlkdata"
import { transportsQuery, transportsRow } from "wotlkdata/sql/types/transports"
import { GameObjectMoTransportRef } from "../GameObject/GameObjectTemplate"
import { MainEntity } from "../Misc/Entity"
import { Ids } from "../Misc/Ids"
import { TaxiNodeConstructor, TaxiPathRegistry } from "../Taxi/Taxi"
import { std } from "../tswow-stdlib-data"

const DEFAULT_DISPLAY_ID = 3015 // generic boat

export class Transport extends MainEntity<transportsRow> {
    get GameObject() { return new GameObjectMoTransportRef(this,this.row.entry); }
    get ID() { return this.row.guid.get(); }
    get Name() { return this.wrap(this.row.name); }
    get ScriptName() { return this.wrap(this.row.ScriptName); }
}

export const TransportRegistry = {
    create(mod: string, id: string, points: TaxiNodeConstructor[]) {
        let nid = Ids.transports.id(mod,id)
        let taxiPath = TaxiPathRegistry.createNewPath(mod,id,1,0,points);

        let gameObject = std.GameObjectTemplates.create(mod,id)
            .Type.MoTransport.set()
            .SpawnGroup.set(0)
            .Display.setRefID(DEFAULT_DISPLAY_ID)
            .Size.set(1)
            .MoveSpeed.set(30)
            .StartEventID.set(0)
            .StopEventID.set(0)
            .TaxiPath.setRefID(taxiPath.ID)
            .AccelRate.set(9)
            .Flags.set(40)
        return new Transport(
            SQL.transports.add(nid)
            .entry.set(gameObject.ID)
            .name.set('tswow')
        )
    },

    load(id: number) {
        return new Transport(SQL.transports.find({entry:id}))
    },

    filter(query: transportsQuery) {
        return SQL.transports.filter(query)
            .map(x=>new Transport(x));
    },

    find(query: transportsQuery) {
        return new Transport(SQL.transports.find(query));
    }
}
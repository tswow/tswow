import { BattlemasterListQuery } from "wotlkdata/dbc/types/BattlemasterList";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { BattlegroundBase, createBgBase, filterBgsBase } from "./BattlegroundBase";
import { finish } from "wotlkdata"

export class BattlegroundPool extends BattlegroundBase {
    get Maps() { return new SingleArraySystem(this, this.dbc_row.MapID, -1); }
}

function filterBgPools(query: BattlemasterListQuery) {
    return filterBgsBase(query)
        .filter(({dbc})=>
               dbc.MapID.getIndex(1)>-1
            || dbc.MapID.getIndex(2)>-1
            || dbc.MapID.getIndex(3)>-1
            || dbc.MapID.getIndex(4)>-1
            || dbc.MapID.getIndex(5)>-1
            || dbc.MapID.getIndex(6)>-1
            || dbc.MapID.getIndex(7)>-1
        )
        .map(({dbc,sql})=>new BattlegroundPool(dbc,sql))
}

export const BattlegroundPoolRegistry = {
    create(mod: string, id: string, maps: number[]) {
        if(maps.length === 1) {
            throw new Error(`Creating battleground pool with just one battleground (make a battleground instead)`)
        }

        if(maps.length > 8) {
            throw new Error(`Creating battleground pool with ${maps.length} maps, only 7 are supported`);
        }
        let {dbc,sql} = createBgBase(mod,id)
        let pool = new BattlegroundPool(dbc,sql)
        maps.forEach(x=>pool.Maps.add(x))
        return pool;
    },

    load(id: number) {
        return filterBgPools({ID:id})[0]
    },

    filter(query: BattlemasterListQuery) {
        return filterBgPools(query)
    },

    find(query: BattlemasterListQuery) {
        return filterBgPools(query)[0];
    }
}

finish('bgpool-worldsafelocs',()=>{
    BattlegroundPoolRegistry.filter({})
        .forEach(x=>{
            if(x.sql_row.HordeStartLoc.get() !== 0 || x.sql_row.AllianceStartLoc.get() !== 0) {
                throw new Error(
                      `Battlemaster ${x.ID} has multiple maps registered`
                    + `, but also specifies Horde/Alliance starting Locations.`
                    + ` Only specific battlegrounds can specify starting locations.`
                    )
            }
        });
})
import { DBC } from "wotlkdata/dbc/DBCFiles"
import { MapQuery } from "wotlkdata/dbc/types/Map";
import { Map } from "./Map"

export const Maps = {
    load(id: number) {
        return new Map(DBC.Map.findById(id));
    },

    create(mod: string, id: string) {
        // TODO: Not finished!
    },

    filter(query: MapQuery) {
        return DBC.Map.filter(query).map(x=>new Map(x));
    }
}
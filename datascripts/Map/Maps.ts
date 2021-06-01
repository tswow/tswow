import { DBC } from "wotlkdata/dbc/DBCFiles"
import { MapQuery } from "wotlkdata/dbc/types/Map";
import { Ids } from "../Misc/Ids";
import { Map } from "./Map"

export const Maps = {
    load(id: number) {
        return new Map(DBC.Map.findById(id));
    },

    create(mod: string, id: string) {
        return new Map(DBC.Map.add(Ids.Map.id(mod,id)));
    },

    filter(query: MapQuery) {
        return DBC.Map.filter(query).map(x=>new Map(x));
    }
}
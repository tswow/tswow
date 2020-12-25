import { DBC } from "wotlkdata/dbc/DBCFiles"
import { Map } from "./Map"

export const Maps = {
    load(id: number) {
        return new Map(DBC.Map.findById(id));
    },

    create(mod: string, id: string) {
        
    }
}
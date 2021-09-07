import { Map } from "./Map"
import { SystemStoreTop, CreateArgument } from "wotlkdata/cell/serialization/SystemStore";
import { DBC } from "wotlkdata";
import { Ids } from "../Misc/Ids";
import { MapQuery } from "wotlkdata/dbc/types/Map";

export class Maps extends SystemStoreTop<Map> {
    protected registeredClass() { return Map; }

    protected loadRaw(args: any[]): Map {
        return this.load(args[0] as number);
    }

    protected createInt(mod: string, id: string): Map {
        return this.create(mod,id);
    }

    protected className(): string {
        return "tswow-stdlib.Map";
    }

    protected template(): Map {
        return this.load(0);
    }

    protected createArguments(): CreateArgument[] { return [] }

    load(id: number): Map {
        return new Map(DBC.Map.findById(id));
    }

    create(mod: string, id: string, parent = 0) {
        return new Map(
            parent ? DBC.Map.findById(parent).clone(Ids.Map.id(mod,id))
            :  DBC.Map.add(Ids.Map.id(mod,id))
        );
    }

    filter(query: MapQuery) {
        return DBC.Map.filter(query).map(x=>new Map(x));
    }
}
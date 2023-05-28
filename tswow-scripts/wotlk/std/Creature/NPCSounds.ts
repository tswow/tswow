import { Table } from "../../../data/table/Table";
import { NPCSoundsQuery, NPCSoundsRow } from "../../dbc/NPCSounds";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { SoundEntryRegistry } from "../Sound/SoundEntry";

export class NPCSounds extends MainEntity<NPCSoundsRow>
{
    get ID() { return this.row.ID.get(); }
    get Hello() { return SoundEntryRegistry.ref(this, this.wrapIndex(this.row.SoundID,0)) }
    get Goodbye() { return SoundEntryRegistry.ref(this, this.wrapIndex(this.row.SoundID,1)) }
    get Pissed() { return SoundEntryRegistry.ref(this, this.wrapIndex(this.row.SoundID,2)) }
    get Ack() { return SoundEntryRegistry.ref(this, this.wrapIndex(this.row.SoundID,3)) }
}

export class NPCSoundsRegistryClass extends RegistryDynamic<NPCSounds,NPCSoundsRow,NPCSoundsQuery>
{
    protected Table(): Table<any, NPCSoundsQuery, NPCSoundsRow> & { add: (id: number) => NPCSoundsRow; } {
        return DBC.NPCSounds
    }
    protected ids(): DynamicIDGenerator {
        return Ids.NPCSounds
    }
    Clear(entity: NPCSounds): void { entity
        .Ack.set(0)
        .Goodbye.set(0)
        .Hello.set(0)
        .Pissed.set(0)
    }
    protected FindByID(id: number): NPCSoundsRow {
        return this.Table().query({ID:id})
    }
    ID(e: NPCSounds): number {
        return e.ID
    }
    protected EmptyQuery() {
        return {}
    }
    protected Entity(r: NPCSoundsRow): NPCSounds {
        return new NPCSounds(r);
    }
}

export const NPCSoundsRegistry = new NPCSoundsRegistryClass();
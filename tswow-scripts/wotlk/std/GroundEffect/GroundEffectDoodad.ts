import { Table } from "../../../data/table/Table";
import { GroundEffectDoodadQuery, GroundEffectDoodadRow } from "../../dbc/GroundEffectDoodad";
import { DBC } from "../../DBCFiles";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";

export class GroundEffectDoodad extends MainEntity<GroundEffectDoodadRow>
{
    get ID() { return this.row.ID.get(); }
    get Path() { return this.wrap(this.row.Doodadpath); }
    get Flags() { return this.wrap(this.row.Flags); }
}

export class GroundEffectDoodadRegistryClass extends RegistryStatic
<GroundEffectDoodad,GroundEffectDoodadRow,GroundEffectDoodadQuery>
{
    protected Table(): Table<any, GroundEffectDoodadQuery, GroundEffectDoodadRow> & { add: (id: number) => GroundEffectDoodadRow; } {
        return DBC.GroundEffectDoodad
    }
    protected IDs(): StaticIDGenerator {
        return Ids.GroundEffectDoodad
    }
    Clear(r: GroundEffectDoodad, mod: string, id: string): void { r
        .Flags.set(0)
        .Path.set("")
    }
    protected FindByID(id: number): GroundEffectDoodadRow {
        return this.Table().query({ID:id});
    }
    ID(e: GroundEffectDoodad): number {
        return e.ID
    }
    protected EmptyQuery(): GroundEffectDoodadQuery {
        return {}
    }
    protected Entity(r: GroundEffectDoodadRow): GroundEffectDoodad {
        return new GroundEffectDoodad(r);
    }
}

export const GroundEffectDoodadRegistry = new GroundEffectDoodadRegistryClass();

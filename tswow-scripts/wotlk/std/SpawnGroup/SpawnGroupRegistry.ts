import { SQL } from "wotlkdata"
import { spawn_groupQuery } from "wotlkdata/wotlkdata/sql/types/spawn_group"
import { spawn_group_templateRow } from "wotlkdata/wotlkdata/sql/types/spawn_group_template"
import { Table } from "wotlkdata/wotlkdata/table/Table"
import { Ids, StaticIDGenerator } from "../Misc/Ids"
import { RegistryStatic } from "../Refs/Registry"
import { SpawnGroup } from "./SpawnGroup"

export class SpawnGroupRegistryClass
    extends RegistryStatic<
      SpawnGroup
    , spawn_group_templateRow
    , spawn_groupQuery
> {
    protected Table(): Table<any, spawn_groupQuery, spawn_group_templateRow> & { add: (id: number) => spawn_group_templateRow; } {
        return SQL.spawn_group_template
    }
    protected IDs(): StaticIDGenerator {
        return Ids.spawn_group_templates
    }
    Clear(r: SpawnGroup, mod: string, id: string): void {
        r.Flags.set(0)
         .Name.set('')
    }
    protected FindByID(id: number): spawn_group_templateRow {
        return SQL.spawn_group_template.query({groupId:id})
    }
    ID(e: SpawnGroup): number {
        return e.ID
    }
    protected EmptyQuery(): spawn_groupQuery {
        return {}
    }
    protected Entity(r: spawn_group_templateRow): SpawnGroup {
        return new SpawnGroup(r);
    }
}
export const SpawnGroupRegistry = new SpawnGroupRegistryClass();
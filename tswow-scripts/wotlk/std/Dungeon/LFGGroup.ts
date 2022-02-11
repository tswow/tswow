import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { LfgDungeonGroupQuery, LfgDungeonGroupRow } from "wotlkdata/wotlkdata/dbc/types/LfgDungeonGroup";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class LFGDungeonGroup extends MainEntity<LfgDungeonGroupRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get OrderIndex() { return this.wrap(this.row.Order_Index); }
    get Type() { return this.wrap(this.row.Parent_Group_Id); }
}

export class LFGDungeonGroupRegistryClass
    extends RegistryDynamic<LFGDungeonGroup,LfgDungeonGroupRow,LfgDungeonGroupQuery>
{
    protected Table(): Table<any, LfgDungeonGroupQuery, LfgDungeonGroupRow> & { add: (id: number) => LfgDungeonGroupRow; } {
        return DBC.LfgDungeonGroup
    }
    protected ids(): DynamicIDGenerator {
        return Ids.LfgDungeonGroup
    }
    Clear(entity: LFGDungeonGroup): void {
        entity
            .Name.clear()
            .OrderIndex.set(0)
            .Type.set(0)
    }
    protected FindByID(id: number): LfgDungeonGroupRow {
        return DBC.LfgDungeonGroup.query({ID:id})
    }
    protected EmptyQuery(): LfgDungeonGroupQuery {
        return {}
    }
    ID(e: LFGDungeonGroup): number {
        return e.ID
    }
    protected Entity(r: LfgDungeonGroupRow): LFGDungeonGroup {
        return new LFGDungeonGroup(r);
    }
}

export const LFGDungeonGroupRegistry = new LFGDungeonGroupRegistryClass();
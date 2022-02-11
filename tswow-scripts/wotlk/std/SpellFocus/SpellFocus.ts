import { DBC } from "wotlkdata";
import { SpellFocusObjectQuery, SpellFocusObjectRow } from "wotlkdata/wotlkdata/dbc/types/SpellFocusObject";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export class SpellFocus extends MainEntity<SpellFocusObjectRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
}

export class SpellFocusRegistryClass
    extends RegistryDynamic<
          SpellFocus
        , SpellFocusObjectRow
        , SpellFocusObjectQuery
    >
{
    protected Table(): Table<any, SpellFocusObjectQuery, SpellFocusObjectRow> & { add: (id: number) => SpellFocusObjectRow; } {
        return DBC.SpellFocusObject
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellFocusObject
    }
    Clear(entity: SpellFocus): void {
        entity.Name.clear()
    }
    protected FindByID(id: number): SpellFocusObjectRow {
        return DBC.SpellFocusObject.findById(id);
    }
    ID(e: SpellFocus): number {
        return e.ID
    }
    protected EmptyQuery(): SpellFocusObjectQuery {
        return {}
    }
    protected Entity(r: SpellFocusObjectRow): SpellFocus {
        return new SpellFocus(r);
    }
}

export const SpellFocusRegistry = new SpellFocusRegistryClass();
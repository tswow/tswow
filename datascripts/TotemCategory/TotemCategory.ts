import { DBC } from "wotlkdata";
import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { TotemCategoryQuery, TotemCategoryRow } from "wotlkdata/dbc/types/TotemCategory";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { TotemTypeRegistry } from "./TotemType";

export class TotemCategory extends MainEntity<TotemCategoryRow> {
    get ID() { return this.row.ID.get(); }
    get Name() { return this.wrapLoc(this.row.Name); }
    get Type() {
        return TotemTypeRegistry.ref(this, this.row.TotemCategoryType);
    }
    get Mask() {
        return new MaskCell32(this, this.row.TotemCategoryMask);
    }
}

export class TotemCategoryRegistryClass
    extends RegistryDynamic<TotemCategory,TotemCategoryRow,TotemCategoryQuery>
{
    protected Table(): Table<any, TotemCategoryQuery, TotemCategoryRow> & { add: (id: number) => TotemCategoryRow; } {
        return DBC.TotemCategory
    }
    protected ids(): DynamicIDGenerator {
        return Ids.TotemCategory
    }
    Clear(entity: TotemCategory): void {
        entity.Name.clear()
            .Mask.clearAll()
            .Mask.setBit(0,true)
            .Type.set(0)
    }
    protected FindByID(id: number): TotemCategoryRow {
        return DBC.TotemCategory.findById(id);
    }
    ID(e: TotemCategory): number {
        return e.ID
    }
    protected EmptyQuery(): TotemCategoryQuery {
        return {}
    }
    protected Entity(r: TotemCategoryRow): TotemCategory {
        return new TotemCategory(r);
    }

    createNewType() {
        return this.create().Type.modRefCopy(()=>{})
    }
}

export const TotemCategoryRegistry = new TotemCategoryRegistryClass();
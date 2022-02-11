import { DBC } from "wotlkdata";
import { LockQuery, LockRow } from "wotlkdata/wotlkdata/dbc/types/Lock";
import { LockTypeQuery, LockTypeRow } from "wotlkdata/wotlkdata/dbc/types/LockType";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { Lock } from "./Lock";
import { LockType } from "./LockType";

export class LockTypeRegistryClass
    extends RegistryDynamic<LockType,LockTypeRow,LockTypeQuery>
{
    protected Table(): Table<any, LockTypeQuery, LockTypeRow> & { add: (id: number) => LockTypeRow; } {
        return DBC.LockType
    }
    protected ids(): DynamicIDGenerator {
        return Ids.LockType
    }
    Clear(entity: LockType): void {
        entity.Cursor.set('')
              .Name.clear()
              .ResourceName.clear()
              .Verb.clear()
    }
    protected Entity(r: LockTypeRow): LockType {
        return new LockType(r);
    }
    protected FindByID(id: number): LockTypeRow {
        return DBC.LockType.findById(id);
    }
    protected EmptyQuery(): LockTypeQuery {
        return {}
    }
    ID(e: LockType): number {
        return e.ID;
    }
}
export const LockTypeRegistry = new LockTypeRegistryClass();

export class LockRegistryClass
    extends RegistryDynamic<Lock,LockRow,LockQuery>
{
    protected Table(): Table<any, LockQuery, LockRow> & { add: (id: number) => LockRow; } {
        return DBC.Lock
    }
    protected ids(): DynamicIDGenerator {
        return Ids.Lock
    }
    Clear(entity: Lock): void {
        entity.Requirements.clearAll()
    }
    protected Entity(r: LockRow): Lock {
        return new Lock(r);
    }
    protected FindByID(id: number): LockRow {
        return DBC.Lock.findById(id);
    }
    protected EmptyQuery(): LockQuery {
        return {}
    }
    ID(e: Lock): number {
        return e.ID;
    }
}

export const LockRegistry = new LockRegistryClass();
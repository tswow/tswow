import { Table } from "../../../data/table/Table";
import { LockQuery, LockRow } from "../../dbc/Lock";
import { LockTypeQuery, LockTypeRow } from "../../dbc/LockType";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RegistryDynamic, RegistryStatic } from "../Refs/Registry";
import { Lock } from "./Lock";
import { LockType } from "./LockType";
export declare class LockTypeRegistryClass extends RegistryDynamic<LockType, LockTypeRow, LockTypeQuery> {
    protected Table(): Table<any, LockTypeQuery, LockTypeRow> & {
        add: (id: number) => LockTypeRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: LockType): void;
    protected Entity(r: LockTypeRow): LockType;
    protected FindByID(id: number): LockTypeRow;
    protected EmptyQuery(): LockTypeQuery;
    ID(e: LockType): number;
}
export declare const LockTypeRegistry: LockTypeRegistryClass;
export declare class LockRegistryClass extends RegistryStatic<Lock, LockRow, LockQuery> {
    protected Table(): Table<any, LockQuery, LockRow> & {
        add: (id: number) => LockRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(entity: Lock): void;
    protected Entity(r: LockRow): Lock;
    protected FindByID(id: number): LockRow;
    protected EmptyQuery(): LockQuery;
    ID(e: Lock): number;
}
export declare const LockRegistry: LockRegistryClass;

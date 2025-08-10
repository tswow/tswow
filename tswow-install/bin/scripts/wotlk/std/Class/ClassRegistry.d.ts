import { Cell } from "../../../data/cell/cells/Cell";
import { CellReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { EnumCon } from "../../../data/cell/cells/EnumCell";
import { Table } from "../../../data/table/Table";
import { ChrClassesQuery, ChrClassesRow } from "../../dbc/ChrClasses";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryRowBase } from "../Refs/Registry";
import { Class } from "./Class";
import { ClassIDs } from "./ClassIDs";
export declare enum ClassMask {
    WARRIOR = 1,
    PALADIN = 2,
    HUNTER = 4,
    ROGUE = 8,
    PRIEST = 16,
    DEATH_KNIGHT = 32,
    SHAMAN = 64,
    MAGE = 128,
    WARLOCK = 256,
    DRUID = 1024
}
export declare class ClassRegistryClass extends RegistryRowBase<Class, ChrClassesRow, ChrClassesQuery> {
    ref<T>(owner: T, cell: Cell<number, any>): import("../Refs/Ref").RefNoCreateTT<T, Class, typeof ClassIDs>;
    readOnlyRef<T>(owner: T, cell: CellReadOnly<number, any>): import("../Refs/Ref").RefReadOnlyTT<T, Class, typeof ClassIDs>;
    protected Table(): Table<any, ChrClassesQuery, ChrClassesRow> & {
        add: (id: number) => ChrClassesRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Entity(row: ChrClassesRow): Class;
    protected FindByID(id: number): ChrClassesRow;
    protected EmptyQuery(): ChrClassesQuery;
    ID(e: Class): number;
    load(cls: EnumCon<keyof typeof ClassIDs>): Class;
    create(mod: string, clsId: string, parentClass: EnumCon<keyof typeof ClassIDs>): Class;
}
export declare const ClassRegistry: ClassRegistryClass;

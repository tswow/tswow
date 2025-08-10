import { Cell } from "../../../data/cell/cells/Cell";
import { CellReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { Row } from "../../../data/table/Row";
import { Table } from "../../../data/table/Table";
import { IMainEntity, TransformedEntity } from "../Misc/Entity";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RefDynamic, RefNoCreate, RefReadOnly, RefStatic } from "./Ref";
import { RegistryBase } from "./RegistryBase";
export declare abstract class RegistryQueryBase<E, R extends Row<any, Q>, Q> extends RegistryBase<E, R> {
    protected abstract Table(): Table<any, Q, R>;
    protected abstract EmptyQuery(): Q;
    queryAll(query: Q): E[];
    query(query: Q): E;
    protected getAll(): E[];
}
export declare abstract class RegistryRowBase<E extends IMainEntity<R> | TransformedEntity<R, any>, R extends Row<any, Q>, Q> extends RegistryQueryBase<E, R, Q> {
    protected abstract FindByID(id: number): R;
    abstract ID(e: E): number;
    load(id: number): E;
    filter(callback: (entity: E, index: number, array: E[]) => any): E[];
    find(callback: (entity: E, index: number, array: E[]) => boolean | number): E;
    map<T>(callback: (entity: E, index: number, array: E[]) => T): T[];
    reduce<T>(callback: (last: T, cur: E, index: number, array: E[]) => T, initial: T): T;
    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[]) => T, initial: T): T;
    static id<E extends IMainEntity<any> | TransformedEntity<any, any>>(registry: RegistryRowBase<E, any, any>, e: E): number;
    readOnlyRef<T>(owner: T, cell: CellReadOnly<number, any>): RefReadOnly<T, E>;
}
export declare abstract class RegistryStaticNoClone<E extends IMainEntity<R> | TransformedEntity<R, any>, R extends Row<any, Q> & {
    clone: (id: number) => R;
}, Q> extends RegistryRowBase<E, R, Q> {
    protected abstract Table(): Table<any, Q, R> & {
        add: (id: number) => R;
    };
    protected abstract IDs(): StaticIDGenerator;
    abstract Clear(r: E, mod: string, id: string): void;
    ref<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, E>;
    create(mod: string, id: string): E;
}
export declare abstract class RegistryStatic<E extends IMainEntity<R> | TransformedEntity<R, any>, R extends Row<any, Q> & {
    clone: (id: number) => R;
}, Q> extends RegistryRowBase<E, R, Q> {
    ref<T>(owner: T, cell: Cell<number, any>): RefStatic<T, E>;
    protected abstract Table(): Table<any, Q, R> & {
        add: (id: number) => R;
    };
    protected abstract IDs(): StaticIDGenerator;
    abstract Clear(r: E, mod: string, id: string): void;
    protected Clone(mod: string, id: string, r: E, parent: E): void;
    create(mod: string, id: string, parent?: number): E;
}
export declare abstract class RegistryDynamicNoClone<E extends IMainEntity<R>, R extends Row<any, Q> & {
    clone: (id: number) => R;
}, Q> extends RegistryRowBase<E, R, Q> {
    ref<T>(owner: T, cell: Cell<number, any>): RefNoCreate<T, E>;
    protected abstract Table(): Table<any, Q, R> & {
        add: (id: number) => R;
    };
    protected abstract IDs(): DynamicIDGenerator;
    abstract Clear(entity: E): void;
    create(): E;
}
export declare abstract class RegistryDynamic<E extends IMainEntity<R>, R extends Row<any, Q> & {
    clone: (id: number) => R;
}, Q> extends RegistryRowBase<E, R, Q> {
    ref<T>(owner: T, cell: Cell<number, any>): RefDynamic<T, E>;
    protected abstract Table(): Table<any, Q, R> & {
        add: (id: number) => R;
    };
    protected abstract ids(): DynamicIDGenerator;
    abstract Clear(entity: E): void;
    protected Clone(entity: E, parent: E): void;
    create(parent?: number): E;
}

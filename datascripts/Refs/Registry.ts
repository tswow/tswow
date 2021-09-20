import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly } from "wotlkdata/cell/cells/CellReadOnly";
import { Row } from "wotlkdata/table/Row";
import { Table } from "wotlkdata/table/Table";
import { MainEntity, TransformedEntity, TwoRowMainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RefDynamic, RefReadOnly, RefStatic } from "./Ref";

export abstract class RegistryRoot<E,R> {
    protected abstract getAll(): E[];
    protected abstract MakeEntity(r: R): E;
    protected abstract ID(e: E): number;
    protected nullID = () => 0;

    filter(callback: (entity: E, index: number, array: E[])=>any) {
        return this.getAll().filter(callback);
    }

    find(callback: (entity: E, index: number, array: E[])=>boolean|number) {
        return this.getAll().find(callback);
    }

    map<T>(callback: (entity: E, index: number, array: E[])=>T) {
        return this.getAll().map(callback);
    }

    reduce<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.getAll().reduce(callback,initial);
    }

    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.getAll().reduceRight(callback,initial);
    }
}

export abstract class DBCSQLRegistryBase<
      DBC extends Row<any,DBCQuery> & {clone: (id: number)=>DBC}
    , SQL extends Row<any,SQLQuery> & {clone: (id: number)=>SQL}
    , DBCQuery
    , SQLQuery
    , E extends TwoRowMainEntity<DBC,SQL>
> extends RegistryRoot<E,DBCQuery>{
    protected abstract DBCTable(): Table<any,DBCQuery,DBC>
    protected abstract SQLTable(): Table<any,SQLQuery,SQL>
    protected abstract EntityFromDBC(row: DBC): E
    protected abstract EntityFromSQL(row: SQL): E
    protected abstract EntityFromBoth(dbc: DBC, sql: SQL): E

    protected abstract LoadDBC(id: number): DBC
    protected abstract LoadSQL(id: number): SQL

    protected abstract EmptyQuery(): DBCQuery;

    getAll() {
        return this.DBCTable()
            .filter(this.EmptyQuery())
            .map(x=>this.EntityFromDBC(x))
    }

    queryAllDBC(query: DBCQuery) {
        return this.DBCTable().filter(query).map(x=>this.EntityFromDBC(x));
    }

    queryDBC(query: DBCQuery) {
        let v = this.DBCTable().find(query);
        return (v ? this.EntityFromDBC(v) : undefined) as E;
    }

    queryAllSQL(query: SQLQuery) {
        return this.SQLTable().filter(query).map(x=>this.EntityFromSQL(x));
    }

    querySQL(query: SQLQuery) {
        let v = this.SQLTable().find(query);
        return (v ? this.EntityFromSQL(v) : undefined) as E;
    }
}

export abstract class DBCSQLRegistryStatic<
      DBC extends Row<any,DBCQuery> & {clone: (id: number)=>DBC}
    , SQL extends Row<any,SQLQuery> & {clone: (id: number)=>SQL}
    , DBCQuery
    , SQLQuery
    , E extends TwoRowMainEntity<DBC,SQL>
> extends DBCSQLRegistryBase<DBC,SQL,DBCQuery,SQLQuery,E>{
    protected abstract DBCTable(): Table<any,DBCQuery,DBC> & { add: (id: number)=>DBC}
    protected abstract SQLTable(): Table<any,SQLQuery,SQL> & { add: (id: number)=>SQL}
    protected abstract Clear(e: E, mod: string, name: string): void;
    protected abstract Clone(e: E, parent: E, mod: string, name: string): void;
    protected abstract IDs(): StaticIDGenerator;

    create(mod: string, name: string, parent = this.nullID()) {
        let id = this.IDs().id(mod,name);
        if(parent !== this.nullID()) {
            let parentDbc = this.LoadDBC(parent);
            let parentSql = this.LoadSQL(parent);
            let parentEntity = this.EntityFromBoth(parentDbc,parentSql);
            let dbcRow = parentDbc.clone(id);
            let sqlRow = parentSql.clone(id);
            let entity = this.EntityFromBoth(dbcRow,sqlRow);
            this.Clone(entity,parentEntity,mod,name);
            return entity;
        } else {
            let dbcRow = this.DBCTable().add(id);
            let sqlRow = this.SQLTable().add(id);
            let entity = this.EntityFromBoth(dbcRow,sqlRow);
            this.Clear(entity,mod,name);
            return entity;
        }
    }
}

export abstract class RegistryRowBase<
      E extends MainEntity<R>|TransformedEntity<R,any>
    , R extends Row<any,Q>,Q
>
extends RegistryRoot<E,R>
{
    protected abstract Entity(r: R): E;
    protected abstract FindByID(id: number): R;
    protected abstract EmptyQuery(): Q;
    protected abstract ID(e: E): number;
    protected abstract Table(): Table<any,Q,R>

    protected getAll(): E[] {
        return this.Table().filter(this.EmptyQuery()).map(x=>this.Entity(x));
    }

    load(id: number) {
        let v = this.FindByID(id);
        return (v ? this.Entity(v) : undefined) as E;
    }

    queryAll(query: Q) {
        return this.Table().filter(query).map(x=>this.Entity(x));
    }

    query(query: Q) {
        let v = this.Table().find(query);
        return (v ? this.Entity(v) : undefined) as E;
    }

    filter(callback: (entity: E, index: number, array: E[])=>any) {
        return this.queryAll(this.EmptyQuery()).filter(callback);
    }

    find(callback: (entity: E, index: number, array: E[])=>boolean|number) {
        return this.queryAll(this.EmptyQuery()).find(callback);
    }

    map<T>(callback: (entity: E, index: number, array: E[])=>T) {
        return this.queryAll(this.EmptyQuery()).map(callback);
    }

    reduce<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.queryAll(this.EmptyQuery()).reduce(callback,initial);
    }

    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.queryAll(this.EmptyQuery()).reduceRight(callback,initial);
    }

    static id<E extends MainEntity<any>|TransformedEntity<any,any>>(registry: RegistryRowBase<E,any,any>, e: E) {
        return registry.ID(e);
    }

    readOnlyRef<T>(owner: T, cell: CellReadOnly<number,any>): RefReadOnly<T,E> {
        return new RefReadOnly(owner, cell, this);
    }
}

export abstract class RegistryStaticNoRef<
      E extends MainEntity<R> | TransformedEntity<R,any>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs(): StaticIDGenerator
    abstract Clear(r: E, mod: string, name: string): void;
    protected abstract Clone(mod: string, name: string, r: E, parent: E): void;

    create(mod: string, name: string, parent: number = 0) {
        let id = this.IDs().id(mod,name);
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(id));
            this.Clone(mod,name,entity,parentEntity);
            return entity;
        } else {
            let entity = this.Entity(this.Table().add(id));
            this.Clear(entity, mod, name);
            return entity;
        }
    }
}

export abstract class RegistryStatic<
      E extends MainEntity<R>|TransformedEntity<R,any>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryStaticNoRef<E,R,Q>
{
    ref<T>(owner: T, cell: Cell<number,any>): RefStatic<T,E> {
        return new RefStatic(owner, cell, this);
    }
}

export abstract class RegistryDynamicNoRef<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract ids(): DynamicIDGenerator
    abstract Clear(entity: E): void;
    protected abstract Clone(entity: E, parent: E): void;

    create(parent: number = 0) {
        let id = this.ids().id();
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(id))
            this.Clone(entity,parentEntity);
            return entity;
        } else {
            let entity = this.Entity(this.Table().add(id));
            this.Clear(entity);
            return entity;
        }
    }
}

export abstract class RegistryDynamic<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryDynamicNoRef<E,R,Q>
{
    ref<T>(owner: T, cell: Cell<number,any>): RefDynamic<T,E> {
        return new RefDynamic(owner, cell, this);
    }
}
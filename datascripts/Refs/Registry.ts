import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly } from "wotlkdata/cell/cells/CellReadOnly";
import { Row } from "wotlkdata/table/Row";
import { Table } from "wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RefReadOnly, RefStatic } from "./Ref";

export abstract class RegistryBase<E extends MainEntity<R>,R extends Row<any,Q>,Q> {
    protected nullID = () => 0;
    protected abstract Entity: (r: R) => E;
    protected abstract FindByID: (id: number) => R;
    protected abstract EmptyQuery: Q;
    protected abstract ID: (e: E)=>number;
    protected abstract Table: Table<any,Q,R>
    protected abstract Clear: (entity: E)=>void

    load(id: number) {
        let v = this.FindByID(id);
        return (v ? this.Entity(v) : undefined) as E;
    }

    queryAll(query: Q) {
        return this.Table.filter(query).map(x=>this.Entity(x));
    }

    query(query: Q) {
        let v = this.Table.find(query);
        return (v ? this.Entity(v) : undefined) as E;
    }

    filter(callback: (entity: E, index: number, array: E[])=>boolean) {
        return this.queryAll(this.EmptyQuery).filter(callback);
    }

    find(callback: (entity: E, index: number, array: E[])=>boolean) {
        return this.queryAll(this.EmptyQuery).find(callback);
    }

    map<T>(callback: (entity: E, index: number, array: E[])=>T) {
        return this.queryAll(this.EmptyQuery).map(callback);
    }

    reduce<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.queryAll(this.EmptyQuery).reduce(callback,initial);
    }

    reduceRight<T>(callback: (last: T, cur: E, index: number, array: E[])=>T, initial: T) {
        return this.queryAll(this.EmptyQuery).reduceRight(callback,initial);
    }

    static id<E extends MainEntity<any>>(registry: RegistryBase<E,any,any>, e: E) {
        return registry.ID(e);
    }

    readOnlyRef<T>(owner: T, cell: CellReadOnly<number,any>): RefReadOnly<T,E> {
        return new RefReadOnly(owner, cell, this);
    }
}

export abstract class RegistryStaticNoRef<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryBase<E,R,Q>
{
    protected abstract Table: Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs: StaticIDGenerator
    protected OnCreate = (mod: string,name: string,r: E,p?:E) => {}

    create(mod: string, name: string, parent: number = 0) {
        let id = this.IDs.id(mod,name);
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(id));
            this.OnCreate(mod,name,entity,parentEntity);
            return entity;
        } else {
            let entity = this.Entity(this.Table.add(id));
            this.Clear(entity);
            this.OnCreate(mod,name,entity);
            return entity;
        }
    }
}

export abstract class RegistryStatic<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryStaticNoRef<E,R,Q>
{
    ref<T>(owner: T, cell: Cell<number,any>): RefStatic<T,E> {
        return new RefStatic(owner, cell, this);
    }
}

export abstract class RegistryDynamic<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryBase<E,R,Q>
{
    protected abstract Table: Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract ids: DynamicIDGenerator
    protected OnCreate = (entity: E,parent?:E) => {}

    create(parent: number = 0) {
        let id = this.ids.id();
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(id))
            this.OnCreate(entity,parentEntity)
            return entity;
        } else {
            let entity = this.Entity(this.Table.add(id));
            this.Clear(entity);
            this.OnCreate(entity);
            return entity;
        }
    }
}

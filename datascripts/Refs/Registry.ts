import { Cell } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly } from "wotlkdata/cell/cells/CellReadOnly";
import { Row } from "wotlkdata/table/Row";
import { Table } from "wotlkdata/table/Table";
import { MainEntity, TransformedEntity } from "../Misc/Entity";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RefDynamic, RefNoCreate, RefReadOnly, RefStatic } from "./Ref";
import { RegistryBase } from "./RegistryBase";

export abstract class RegistryRowBase<
      E extends MainEntity<R>|TransformedEntity<R,any>
    , R extends Row<any,Q>,Q
>
extends RegistryBase<E,R>
{
    protected abstract FindByID(id: number): R;
    protected abstract EmptyQuery(): Q;
    abstract ID(e: E): number;
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

export abstract class RegistryStaticNoClone<
      E extends MainEntity<R> | TransformedEntity<R,any>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs(): StaticIDGenerator
    abstract Clear(r: E, mod: string, name: string): void;

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    create(mod: string, name: string) {
        let entity = this.Entity(this.Table().add(this.IDs().id(mod,name)));
        this.Clear(entity,mod,name);
        return entity;
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
    protected Clone(mod: string, name: string, r: E, parent: E) {}

    create(mod: string, name: string, parent: number = this.nullID()) {
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
        // @ts-ignore TODO FIX
        return new RefStatic(owner, cell, this);
    }
}

export abstract class RegistryDynamicNoClone<
      E extends MainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract ids(): DynamicIDGenerator
    abstract Clear(entity: E): void;

    create() {
        let entity = this.Entity(this.Table().add(this.ids().id()))
        this.Clear(entity);
        return entity;
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
    protected Clone(entity: E, parent: E) {}

    create(parent: number = this.nullID()) {
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
        // @ts-ignore fix
        return new RefDynamic(owner, cell, this);
    }
}
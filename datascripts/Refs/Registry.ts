import { Cell } from "wotlkdata/wotlkdata/cell/cells/Cell";
import { CellReadOnly } from "wotlkdata/wotlkdata/cell/cells/CellReadOnly";
import { Row } from "wotlkdata/wotlkdata/table/Row";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { IMainEntity, TransformedEntity } from "../Misc/Entity";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RefDynamic, RefNoCreate, RefReadOnly, RefStatic } from "./Ref";
import { RegistryBase } from "./RegistryBase";

export abstract class RegistryQueryBase<
      E
    , R extends Row<any,Q>
    , Q
> extends RegistryBase<E,R>
{
    protected abstract Table(): Table<any,Q,R>
    protected abstract EmptyQuery(): Q;

    queryAll(query: Q) {
        return this.Table().queryAll(query).map(x=>this.Entity(x));
    }

    query(query: Q) {
        let v = this.Table().query(query);
        return (v ? this.Entity(v) : undefined) as E;
    }

    protected getAll(): E[] {
        return this.Table().queryAll(this.EmptyQuery()).map(x=>this.Entity(x));
    }
}

export abstract class RegistryRowBase<
      E extends IMainEntity<R>|TransformedEntity<R,any>
    , R extends Row<any,Q>,Q
>
extends RegistryQueryBase<E,R,Q>
{
    protected abstract FindByID(id: number): R;
    abstract ID(e: E): number;

    load(id: number) {
        let v = this.FindByID(id);
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

    static id<E extends IMainEntity<any>|TransformedEntity<any,any>>(registry: RegistryRowBase<E,any,any>, e: E) {
        return registry.ID(e);
    }

    readOnlyRef<T>(owner: T, cell: CellReadOnly<number,any>): RefReadOnly<T,E> {
        return new RefReadOnly(owner, cell, this);
    }
}

export abstract class RegistryStaticNoClone<
      E extends IMainEntity<R> | TransformedEntity<R,any>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs(): StaticIDGenerator
    abstract Clear(r: E, mod: string, id: string): void;

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    create(mod: string, id: string) {
        let entity = this.Entity(this.Table().add(this.IDs().id(mod,id)));
        this.Clear(entity,mod,id);
        return entity;
    }
}

export abstract class RegistryStatic<
      E extends IMainEntity<R> |TransformedEntity<R,any>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    ref<T>(owner: T, cell: Cell<number,any>): RefStatic<T,E> {
        // @ts-ignore TODO FIX
        return new RefStatic(owner, cell, this);
    }

    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs(): StaticIDGenerator
    abstract Clear(r: E, mod: string, id: string): void;
    protected Clone(mod: string, id: string, r: E, parent: E) {}

    create(mod: string, id: string, parent: number = this.nullID()) {
        let nid = this.IDs().id(mod,id);
        if(parent !== this.nullID()) {
            let parentEntity = this.Entity(this.FindByID(parent));
            let entity = this.Entity(parentEntity.row.clone(nid));
            this.Clone(mod,id,entity,parentEntity);
            return entity;
        } else {
            let entity = this.Entity(this.Table().add(nid));
            this.Clear(entity, mod, id);
            return entity;
        }
    }
}

export abstract class RegistryDynamicNoClone<
      E extends IMainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{

    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected abstract Table(): Table<any,Q,R> & { add: (id: number)=>R}
    protected abstract IDs(): DynamicIDGenerator
    abstract Clear(entity: E): void;

    create() {
        let entity = this.Entity(this.Table().add(this.IDs().id()))
        this.Clear(entity);
        return entity;
    }
}

export abstract class RegistryDynamic<
      E extends IMainEntity<R>
    , R extends Row<any,Q> & {clone: (id: number)=>R}
    , Q
    >
    extends RegistryRowBase<E,R,Q>
{
    ref<T>(owner: T, cell: Cell<number,any>): RefDynamic<T,E> {
        // @ts-ignore fix
        return new RefDynamic(owner, cell, this);
    }

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
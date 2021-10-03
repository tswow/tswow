import { Cell, CellWrapper } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly, CellWrapperReadOnly } from "wotlkdata/cell/cells/CellReadOnly";

// TODO: move/rename this somewhere suitable
export class SelfRef<T,V> {
    protected owner: T
    protected transformer: ()=>V
    constructor(owner: T, transformer: ()=>V) {
        this.owner = owner;
        this.transformer = transformer;
    }

    get() {
        return this.transformer();
    }

    mod(callback: (value: V)=>void) {
        callback(this.get());
        return this.owner;
    }
}

export interface LoadRegistry<V> {
    load(id: number): V
    Exists(num: number): boolean
}

/**
 * A reference that cannot be changed.
 */
export class RefReadOnly<T,V> extends CellWrapperReadOnly<number,T>{
    protected registry: LoadRegistry<V>;
    constructor(owner: T, cell: CellReadOnly<number,any>, registry: LoadRegistry<V>) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        return this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
    }

    exists() { return this.registry.Exists(this.cell.get()); }

    objectify() { return this.cell.get(); }
}

export class RefUnknown<T> extends CellWrapper<number,T> {}

/**
 * An internal base reference type that should not be used externally
 */
export class RefBase<T,V,R extends LoadRegistry<V>> extends CellWrapper<number,T> {
    protected registry: R;

    constructor(owner: T, cell: Cell<number,any>, registry: R) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        return this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    exists() { return this.registry.Exists(this.cell.get()); }

    objectify() { return this.cell.get(); }
}

/**
 * A reference that cannot create new entities, but can still
 * be re-pointed.
 */
export class RefNoCreate<T,V> extends RefBase<T,V,LoadRegistry<V>> {}


export interface StaticRegistry<T> extends LoadRegistry<T> {
    create(mod: string, id: string, parent?: number): T;
    ID(entity: T): number;
}

/**
 * A reference to a static entity that requires a mod/id pair to create
 */
export class RefStatic<T,V> extends RefBase<T,V,StaticRegistry<V>> {
    getRefCopy(mod: string, id: string) {
        let v = this.registry.create(mod,id,this.cell.get());
        this.cell.set(this.registry.ID(v));
        return v;
    }

    modRefCopy(mod: string, id: string, callback: (value: V)=>void) {
        callback(this.getRefCopy(mod,id));
        return this.owner;
    }
}

export interface DynamicRegistry<T> extends LoadRegistry<T> {
    create(parent?: number): T;
    ID(entity: T): number;
}

export class RefDynamic<T,V> extends RefBase<T,V,DynamicRegistry<V>> {
    getRef() {
        let v = this.registry.load(this.cell.get());
        if(v === undefined) {
            v = this.registry.create();
            this.cell.set(this.registry.ID(v));
        }
        return v;
    }

    getRefCopy() {
        let v = this.registry.create(this.cell.get());
        this.cell.set(this.registry.ID(v));
        return v;
    }

    modRefCopy(callback: (value: V)=>void) {
        callback(this.getRefCopy());
        return this.owner;
    }
}
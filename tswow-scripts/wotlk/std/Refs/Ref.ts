import { Cell, CellWrapper } from "../../../data/cell/cells/Cell";
import { CellReadOnly, CellWrapperReadOnly } from "../../../data/cell/cells/CellReadOnly";
import { EnumCon, EnumValueRead, EnumValueWrite } from "../../../data/cell/cells/EnumCell";
import { makePrototype } from "../../../data/cell/cells/PrototypeRegistry";

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
    ID(entity: V): number;
}

/**
 * A reference that cannot be changed.
 */
export class RefReadOnly<T,V> extends CellWrapperReadOnly<number,T>{
    protected registry: LoadRegistry<V>;
    protected cached?: V = undefined;

    constructor(owner: T, cell: CellReadOnly<number,any>, registry: LoadRegistry<V>) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        if(this.cached && this.registry.ID(this.cached) === this.cell.get()) {
            return this.cached;
        }
        return this.cached = this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
    }

    is(value: number) {
        return this.get() === value;
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
    protected cached?: V = undefined;

    constructor(owner: T, cell: Cell<number,any>, registry: R) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        if(this.cached && this.registry.ID(this.cached) === this.cell.get()) {
            return this.cached;
        }
        return this.cached = this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    exists() { return this.registry.Exists(this.cell.get()); }

    is(value: number) { return this.get() === value; }

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

export class RefValue<T> implements EnumValueWrite<T> {
    protected owner: T;
    protected cell: Cell<number,any>
    protected index: number;

    constructor(owner: T, cell: Cell<number,any>, index: number) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
    }

    is() { return this.cell.get() === this.index; }

    on(callback: ()=>void) {
        if(this.is()) callback();
        return this.owner;
    }

    set() {
        this.cell.set(this.index);
        return this.owner;
    }
}

function decon(obj: any, val: EnumCon<any>): number {
    return typeof(val) === 'string' ? obj[val] : val;
}

function refProtoMaker(p: any, k: string, v: any) {
    Object.defineProperty(p,k,{
        get: function() {
            return this.value(v);
        }
    })
}

export class RefDynamicT<T,V,Str> extends RefDynamic<T,V> {
    protected value(index: number) { return new RefValue(this.owner, this.cell, index)}
    private obj: any
    set(val: EnumCon<Str>) { return super.set(decon(this.obj,val)); }
    is(val: EnumCon<Str>) { return super.is(decon(this.obj,val)); }
}

export type RefDynamicTT<T,V,Str> = {
    [Property in keyof Str]: EnumValueWrite<T>
} & RefDynamicT<T,V,Str>

export function makeRefDynamic<T,V,Str>(s: Str, owner: T, cell: Cell<number,any>, registry: DynamicRegistry<V>) {
    return makePrototype(
          'refDynamic'
        , RefDynamicT.prototype
        , s
        , {owner,cell,registry}
        , refProtoMaker
        ) as RefDynamicTT<T,V,Str>
}

export class RefStaticT<T,V,Str> extends RefStatic<T,V> {
    protected value(index: number) { return new RefValue(this.owner, this.cell, index)}
    private obj2: any
    set(val: EnumCon<Str>) { return super.set(decon(this.obj2,val)); }
    is(val: EnumCon<Str>) { return super.is(decon(this.obj2,val)); }
}

export type RefStaticTT<T,V,Str> = {
    [Property in keyof Str]: EnumValueWrite<T>
} & RefStaticT<T,V,Str>

export function makeRefStatic<T,V,Str>(s: Str, owner: T, cell: Cell<number,any>, registry: StaticRegistry<V>) {
    return makePrototype(
          'refStatic'
        , RefStaticT.prototype
        , s
        , {owner,cell,registry}
        , refProtoMaker
        ) as RefStaticTT<T,V,Str>
}

export class RefNoCreateT<T,V,Str> extends RefNoCreate<T,V> {
    protected value(index: number) { return new RefValue(this.owner, this.cell, index)}
    protected obj2: any
    set(val: EnumCon<Str>) { return super.set(decon(this.obj2,val)); }
    is(val: EnumCon<Str>) { return super.is(decon(this.obj2,val)); }
}

export type RefNoCreateTT<T,V,Str> = {
    [Property in keyof Str]: EnumValueWrite<T>
} & RefNoCreateT<T,V,Str>

export function makeRefNoCreate<T,V,Str>(s: Str, owner: T, cell: Cell<number,any>, registry: LoadRegistry<V>) {
    return makePrototype(
          'refNoCreate'
        , RefNoCreateT.prototype
        , s
        , {owner,cell,registry}
        , refProtoMaker
        ) as RefNoCreateTT<T,V,Str>
}

export class RefReadOnlyT<T,V,Str> extends RefReadOnly<T,V> {
    // todo: cell hack
    protected value(index: number) { return new RefValue(this.owner, this.cell as Cell<number,any>, index)}
    private obj2: any
    set(val: EnumCon<Str>) { return super.set(decon(this.obj2,val)); }
    is(val: EnumCon<Str>) { return super.is(decon(this.obj2,val)); }
}
export type RefReadOnlyTT<T,V,Str> = {
    [Property in keyof Str]: EnumValueRead<T>
} & RefReadOnlyT<T,V,Str>
export function makeRefReadOnly<T,V,Str>(s: Str, owner: T, cell: CellReadOnly<number,any>, registry: LoadRegistry<V>) {
    return makePrototype(
          'refReadOnly'
        , RefReadOnlyT.prototype
        , s
        , {owner,cell,registry}
        , refProtoMaker
        ) as RefReadOnlyTT<T,V,Str>
}
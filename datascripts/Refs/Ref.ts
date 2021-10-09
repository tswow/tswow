import { Cell, CellWrapper } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly, CellWrapperReadOnly } from "wotlkdata/cell/cells/CellReadOnly";
import { EnumCon, makeEnum } from "wotlkdata/cell/cells/EnumCell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";

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

interface RefEnumReadOnly {
    get(): number;
}

interface RefEnum<T> extends RefEnumReadOnly {
    set(value: number): T
}

export class RefEnumValueReadOnly<T> extends CellSystem<T> {
    protected value: number;
    protected container: RefEnumReadOnly

    constructor(owner: T, container: RefEnumReadOnly, value: number) {
        super(owner);
        this.value = value;
        this.container = container;
    }

    is() {
        return this.value === this.container.get();
    }

    on(callback: ()=>void) {
        if(this.is()) callback();
        return this.owner;
    }
}
export class RefEnumValue<T> extends RefEnumValueReadOnly<T> {
    protected container: RefEnum<T>

    constructor(owner: T, container: RefEnum<T>, value: number) {
        super(owner,container,value);
        this.container = container;
    }

    set() {
        return this.container.set(this.value);
    }
}

export abstract class RefDynamicEnum<T,V,S> extends RefDynamic<T,V> {
    protected abstract obj(): any;

    protected value(index: number) {
        return new RefEnumValue(this.owner,this,index);
    }

    set(value: EnumCon<S>) {
        return super.set(makeEnum(this.obj(),value))
    }

    is(value: EnumCon<S>) {
        return this.get() === makeEnum(this.obj(),value)
    }

    on(value: EnumCon<S>, callback: ()=>void) {
        if(this.is(value)) callback();
        return this.owner;
    }
}

export abstract class RefReadOnlyEnum<T,V,S> extends RefReadOnly<T,V> {
    protected abstract obj(): any;

    protected value(index: number) {
        return new RefEnumValueReadOnly(this.owner,this,index);
    }

    set(value: EnumCon<S>) {
        return super.set(makeEnum(this.obj(),value))
    }

    is(value: EnumCon<S>) {
        return this.get() === makeEnum(this.obj(),value)
    }

    on(value: EnumCon<S>, callback: ()=>void) {
        if(this.is(value)) callback();
        return this.owner;
    }
}

export abstract class RefNoCreateEnum<T,V,S> extends RefNoCreate<T,V> {
    protected abstract obj(): any;

    protected value(index: number) {
        return new RefEnumValue(this.owner,this,index);
    }

    set(value: EnumCon<S>) {
        return super.set(makeEnum(this.obj(),value))
    }

    is(value: EnumCon<S>) {
        return this.get() === makeEnum(this.obj(),value)
    }

    on(value: EnumCon<S>, callback: ()=>void) {
        if(this.is(value)) callback();
        return this.owner;
    }
}

export abstract class RefStaticEnum<T,V,S> extends RefDynamic<T,V> {
    protected abstract obj(): any;

    protected value(index: number) {
        return new RefEnumValue(this.owner,this,index);
    }

    set(value: EnumCon<S>) {
        return super.set(makeEnum(this.obj(),value))
    }

    is(value: EnumCon<S>) {
        return this.get() === makeEnum(this.obj(),value)
    }

    on(value: EnumCon<S>, callback: ()=>void) {
        if(this.is(value)) callback();
        return this.owner;
    }
}
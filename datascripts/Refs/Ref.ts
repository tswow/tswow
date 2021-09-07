import { Cell } from "wotlkdata/cell/cells/Cell";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";

export interface IntCell {
    get(): number;
    set(value: number): any;
}

export interface CanObjectify {
    objectify(): any
}

export class SelfRef<T,V extends CanObjectify> {
    protected getter: ()=>V;
    protected owner: T;
    
    constructor(owner: T, getter: ()=>V) {
        this.getter = getter;
        this.owner = owner;
    }

    get() {
        return this.getter();
    }

    mod(callback: (value: V)=>void) {
        callback(this.getter());
        return this.owner;
    }

    objectify() {
        return this.getter().objectify()
    }
}

export abstract class RefReadOnly<T,V extends CanObjectify> extends CellSystem<T> {
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }

    abstract getRef(): V;
    abstract exists(): boolean
    
    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    getRefID() { return this.cell.get(); }

    objectify() {
        if(this.exists()) {
            return this.getRef().objectify();
        } else {
            return 'NULL'
        }
    }
}

export abstract class RefBase<T,V extends CanObjectify> {
    protected owner: T;
    protected cell: Cell<number,any>

    constructor(owner: T, cell: Cell<number,any>) {
        this.owner = owner;
        this.cell = cell;
    }

    getRefID() {
        return this.cell.get();
    }

    setRefID(newPointer: number) {
        this.cell.set(newPointer);
        return this.owner;
    }

    objectify() {
        if(!this.exists()) {
            return 'NULL'
        } else {
            return this.resolve().objectify()
        }
    }

    getRef() {
        if(!this.exists()) {
            throw new Error(`Tried following invalid ref: ${this.cell.get()}`)
        } else {
            return this.resolve();
        }
    }

    // Do NOT add "owner" to this callback: it doesn't make sense
    // when we're not creating a copy
    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    abstract exists(): boolean;
    protected abstract id(v: V): number;
    protected abstract resolve(): V;
}

export abstract class Ref<T,V extends CanObjectify> extends RefBase<T,V>{
    protected setCreate() {
        let v = this.create();
        this.setRefID(this.id(v));
        return v;
    }

    getRef() {
        if(!this.exists()) {
            return this.setCreate();
        } else {
            return this.resolve();
        }
    }

    getRefCopy() {
        if(!this.exists()) {
            return this.setCreate();
        } else {
            let clone = this.clone();
            this.setRefID(this.id(clone));
            return clone;
        }
    }

    modRefCopy(callback: (value: V, owner : T)=>void) {
        callback(this.getRefCopy(), this.owner);
        return this.owner;
    }

    protected abstract create(): V;
    protected abstract clone(): V;
}

export abstract class RefStatic<T,V extends CanObjectify> extends RefBase<T,V> {
    protected abstract create(mod: string, id: string): V;
    protected abstract clone(mod: string, id: string): V;

    protected setCreate(mod: string, id: string) {
        let v = this.create(mod, id);
        this.setRefID(this.id(v));
        return v;
    }

    getRefCopy(mod: string, id: string) {
        if(!this.exists()) {
            return this.setCreate(mod, id);
        } else {
            let clone = this.clone(mod, id);
            this.setRefID(this.id(clone));
            return clone;
        }
    }

    modRefCopy(mod: string, id: string, callback: (value: V, owner : T)=>void) {
        callback(this.getRefCopy(mod, id), this.owner);
        return this.owner;
    }
}
import { Cell } from "wotlkdata/cell/cells/Cell";

export interface IntCell {
    get(): number;
    set(value: number): any;
}

export interface CanObjectify {
    objectify(): any
}

export abstract class Ref<T,V extends CanObjectify> {
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

    modRef(callback: (value: V)=>void) {
        let v: V;
        if(!this.exists()) {
            v = this.create();
        } else {
            v = this.resolve();
        }
        callback(v);
        return this.owner;
    }

    getRef() {
        return this.resolve();
    }

    getRefCopy() {
        this.setRefID(this.id(this.clone()))
        return this.resolve();
    }

    modRefCopy(callback: (value: V)=>void) {
        let v: V;
        if(!this.exists()) {
            v = this.create();
            this.setRefID(this.id(v));
        } else {
            v = this.clone();
            this.setRefID(this.id(v));
        }
        callback(v);
        return this.owner;
    }

    objectify() {
        if(!this.exists()) {
            return 'NULL'
        } else {
            return this.resolve().objectify()
        }
    }

    protected abstract exists(): boolean;
    protected abstract create(): V;
    protected abstract clone(): V;
    protected abstract id(v: V): number;
    protected abstract resolve(): V;
}
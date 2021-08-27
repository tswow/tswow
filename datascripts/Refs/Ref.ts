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

    // Do NOT add "owner" to this callback: it doesn't make sense
    // when we're not creating a copy
    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }

    modRefCopy(callback: (value: V, owner : T)=>void) {
        callback(this.getRefCopy(), this.owner);
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
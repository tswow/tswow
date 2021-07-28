export interface IntCell {
    get(): number;
    set(value: number): any;
}

export interface CanObjectify {
    objectify(): any
}

export abstract class Pointer<T,V extends CanObjectify> {
    protected owner: T;

    constructor(owner: T) {
        this.owner = owner;
    }

    get() {
        return this.field().get();
    }

    set(value: number) {
        this.repoint(value);
        return this.owner;
    }

    repoint(newPointer: number) {
        this.field().set(newPointer);
        return this.owner;
    }

    modify(callback: (value: V)=>void) {
        let v: V;
        if(!this.exists()) {
            v = this.create();
        } else {
            v = this.resolve();
        }
        callback(v);
        return this.owner;
    }

    cloneModify(callback: (value: V)=>void) {
        let v: V;
        if(!this.exists()) {
            v = this.create();
            this.repoint(this.id(v));
        } else {
            v = this.clone();
            this.repoint(this.id(v));
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
    protected abstract field(): IntCell;
    protected abstract id(v: V): number;
    protected abstract resolve(): V;
}
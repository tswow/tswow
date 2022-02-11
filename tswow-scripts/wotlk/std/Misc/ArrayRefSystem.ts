import { Objectified } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { RefDynamic, RefNoCreate, RefStatic } from "../Refs/Ref";
import { MainEntity } from "./Entity";

export class ArrayRefSystem<T,V extends Objectified> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number)=>RefDynamic<T,V>;

    constructor(owner: T, clearValue: number, length: number, getter: (index: number)=>RefDynamic<T,V>) {
        super(owner);
        this.clearValue = clearValue;
        this.length = length;
        this.getter = getter;
    }

    clear(index: number) {
        return this.setId(index,this.clearValue);
    }

    clearAll() {
        return this.forEach(x=>x.set(this.clearValue));
    }

    forEachRef(callback: (ref: V)=>void) {
        for(let i=0;i<this.length;++i) {
            let ref = this.getter(i);
            if(ref.exists()) callback(ref.getRef());
        }
        return this.owner;
    }

    forEach(callback: (ref: RefDynamic<T,V>)=>void) {
        for(let i=0;i<this.length;++i) {
            callback(this.getter(i));
        }
        return this.owner;
    }

    setId(index: number, ref: number) {
        this.getter(index).set(ref);
        return this.owner;
    }

    addId(refId: number) {
        for(let i=0;i<this.length;++i) {
            if(!this.getter(i).exists()) {
                return this.setId(i,refId);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    modRef(index: number, callback: (value: V)=>void) {
        this.getter(index).modRef(callback);
    }

    modRefCopy(index: number, callback: (value: V)=>void) {
        this.getter(index).modRefCopy(callback);
    }

    getRef(index: number) {
        return this.getter(index).getRef();
    }

    getRefCopy(index: number) {
        return this.getter(index).getRefCopy();
    }

    addMod(callback: (value: V)=>void = ()=>{}) {
        for(let i=0;i<this.length;++i) {
            if(!this.getter(i).exists()) {
                return this.getter(i).modRefCopy(callback);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    addGet() {
        for(let i=0;i<this.length;++i) {
            if(!this.getter(i).exists()) {
                return this.getter(i).getRefCopy();
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }
}

export class ArrayRefSystemStatic<T,V extends MainEntity<any>> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number)=>RefStatic<T,V>;

    constructor(owner: T, clearValue: number, length: number, getter: (index: number)=>RefStatic<T,V>) {
        super(owner);
        this.clearValue = clearValue;
        this.length = length;
        this.getter = getter;
    }

    clear(index: number) {
        return this.setId(index,this.clearValue);
    }

    clearAll() {
        return this.forEach(x=>x.set(this.clearValue));
    }

    forEachRef(callback: (ref: V)=>void) {
        for(let i=0;i<this.length;++i) {
            let ref = this.getter(i);
            if(ref.get() > this.clearValue) callback(ref.getRef());
        }
        return this.owner;
    }

    forEach(callback: (ref: RefStatic<T,V>)=>void) {
        for(let i=0;i<this.length;++i) {
            callback(this.getter(i));
        }
        return this.owner;
    }

    setId(index: number, ref: number) {
        this.getter(index).set(ref);
        return this.owner;
    }

    addId(refId: number) {
        for(let i=0;i<this.length;++i) {
            if(this.getter(i).get() <= this.clearValue) {
                return this.setId(i,refId);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    modRef(index: number, callback: (value: V)=>void) {
        this.getter(index).modRef(callback);
    }

    modRefCopy(mod: string, id: string, index: number, callback: (value: V)=>void) {
        this.getter(index).modRefCopy(mod,id,callback);
    }

    getRef(index: number) {
        return this.getter(index).getRef();
    }

    getRefCopy(mod: string, id: string, index: number) {
        return this.getter(index).getRefCopy(mod,id);
    }

    addMod(mod: string, id: string, callback: (value: V)=>void = ()=>{}) {
        for(let i=0;i<this.length;++i) {
            if(this.getter(i).get() <= this.clearValue) {
                return this.getter(i).modRefCopy(mod,id,callback);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    addGet(mod: string, id: string) {
        for(let i=0;i<this.length;++i) {
            if(this.getter(i).get() <= this.clearValue) {
                return this.getter(i).getRefCopy(mod,id);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }
}

// TODO: Probably not needed with more generics
export class ArrayRefSystemNoCreate<T,V extends MainEntity<any>> extends CellSystem<T> {
    protected readonly clearValue: number;
    protected readonly length: number;
    protected readonly getter: (index: number)=>RefNoCreate<T,V>;

    constructor(owner: T, clearValue: number, length: number, getter: (index: number)=>RefNoCreate<T,V>) {
        super(owner);
        this.clearValue = clearValue;
        this.length = length;
        this.getter = getter;
    }

    clear(index: number) {
        return this.setId(index,this.clearValue);
    }

    clearAll() {
        return this.forEach(x=>x.set(this.clearValue));
    }

    forEachRef(callback: (ref: V)=>void) {
        for(let i=0;i<this.length;++i) {
            let ref = this.getter(i);
            if(ref.get() > this.clearValue) callback(ref.getRef());
        }
        return this.owner;
    }

    forEach(callback: (ref: RefNoCreate<T,V>)=>void) {
        for(let i=0;i<this.length;++i) {
            callback(this.getter(i));
        }
        return this.owner;
    }

    setId(index: number, ref: number) {
        this.getter(index).set(ref);
        return this.owner;
    }

    addId(refId: number) {
        for(let i=0;i<this.length;++i) {
            if(this.getter(i).get() <= this.clearValue) {
                return this.setId(i,refId);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    modRef(index: number, callback: (value: V)=>void) {
        this.getter(index).modRef(callback);
    }

    getRef(index: number) {
        return this.getter(index).getRef();
    }
}
import { SystemArray, ArrayEntry } from "wotlkdata/cell/systems/SystemArray";
import { DBCArrayCell } from "wotlkdata/dbc/DBCCell";
import { CPrim } from "wotlkdata/cell/Cell";

export class SingleArrayEntry<D extends CPrim,T> extends ArrayEntry<T> {
    protected array: DBCArrayCell<D,any>;
    protected clearValue: D;

    constructor(owner: T, index: number, array: DBCArrayCell<D,any>, clearValue: D) {
        super(owner,index);
        this.array = array;
        this.clearValue = clearValue;
    }

    clear(): T {
        this.array.setIndex(this.index, this.clearValue);
        return this.owner;
    }

    isClear(): boolean {
        return this.array.getIndex(this.index) == this.clearValue;
    }

    set(value: D) {
        this.array.setIndex(this.index,value);
    }

    get() {
        return this.array.getIndex(this.index);
    }

    objectify() { 
        return this.array.getIndex(this.index);
    }
}

export class SingleArraySystem<D extends CPrim, T> extends SystemArray<SingleArrayEntry<D,T>,T> {
    protected array: DBCArrayCell<D,any>;
    protected clearValue: D;

    constructor(owner: T, array: DBCArrayCell<D,any>, clearValue: D) {
        super(owner);
        this.array = array;
        this.clearValue = clearValue;
    }

    get length(): number {
        return this.array.length;
    }

    getIndex(index: number) {
        return this.get(index).get();
    }

    setIndex(index: number, value: D) {
        return this.get(index).set(value);
    }

    get(index: number): SingleArrayEntry<D,T> {
        return new SingleArrayEntry(this.owner,index,this.array, this.clearValue);
    }
    
}
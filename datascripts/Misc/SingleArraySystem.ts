import { ArraySystem, ArrayEntry } from "wotlkdata/cell/systems/ArraySystem";
import { DBCArrayCell } from "wotlkdata/dbc/DBCCell";
import { CPrim } from "wotlkdata/cell/cells/Cell";

export class SingleArrayEntry<D extends CPrim,T> extends ArrayEntry<T> {
    protected array: DBCArrayCell<D,any>;
    protected clearValue: D;

    constructor(owner: T, index: number, array: DBCArrayCell<D,any>, clearValue: D) {
        super(owner,index);
        this.array = array;
        this.clearValue = clearValue;
    }

    clear() {
        this.array.setIndex(this.index, this.clearValue);
        return this;
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

export class SingleArraySystem<D extends CPrim, T> extends ArraySystem<SingleArrayEntry<D,T>,T> {
    protected array: DBCArrayCell<D,any>;
    protected clearValue: D;

    constructor(owner: T, array: DBCArrayCell<D,any>, clearValue: D) {
        super(owner);
        this.array = array;
        this.clearValue = clearValue;
    }

    get length(): number {
        return this.array.length();
    }

    getIndex(index: number) {
        return this.get(index).get();
    }

    setIndex(index: number, value: D) {
        this.get(index).set(value);
        return this.owner;
    }

    protected get(index: number): SingleArrayEntry<D,T> {
        return new SingleArrayEntry(this.owner,index,this.array, this.clearValue);
    }

    add(value: D) {
        for(let i=0;i<this.length;++i) {
            if(this.getIndex(i)===this.clearValue) {
                this.setIndex(i,value);
                return this.owner;
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }
}
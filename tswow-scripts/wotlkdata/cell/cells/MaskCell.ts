import { Objects } from "../serialization/ObjectIteration";
import { Transient } from "../serialization/Transient";
import { Cell } from "./Cell";
import { CellRoot } from "./CellRoot";

export class MaskBit<T,D extends MaskCell<T>> {
    protected owner: D;
    protected bit: number;

    constructor(owner: D, bit: number) {
        this.owner = owner;
        this.bit = bit;
    }

    protected get isBit() { return true; }

    check() { return this.owner.check(this.bit); }
    mark() { return this.owner.mark(this.bit); }
    clear() { return this.owner.clear(this.bit); }
}

export abstract class MaskCell<T> extends CellRoot<T> {
    protected bit(no: number): MaskBit<T,this> {
        return new MaskBit(this, no);
    }
    abstract mark(no: number): T;
    abstract clear(no: number): T;
    abstract check(no: number): boolean;
    abstract clearAll(): T;
    abstract toString(): string;

    get length() { return 32; }

    objectify() {
        let usedIndices : number[] = []
        let thing = Object.keys(Objects.mapObject(this, ['object'],
            (k, v) => {
                usedIndices.push(v.bit);
                return v.isBit && v.check();
            },
            (k, v) => {
                return k;
            }
        ));

        for(let i=0;i<this.length;++i) {
            if(this.bit(i).check() && ! usedIndices.includes(i)) {
                thing.push(`Bit${i}`);
            }
        }
        return thing;
    }
}

export class MaskCell32<T> extends MaskCell<T> {
    @Transient
    protected cell: Cell<number, any>;
    protected readonly signed: boolean;

    constructor(owner: T, cell: Cell<number, any>, signed = false) {
        super(owner);
        this.cell = cell;
        this.signed = signed;
    }

    toString() {
        return (this.signed && this.cell.get() == -1)
            ? '1'.repeat(32)
            : this.cell.get().toString(2)
    }

    clearAll() {
        this.cell.set(0);
        return this.owner;
    }

    mark(no: number): T {
        if(!this.signed || this.cell.get() != -1) {
            this.set((this.cell.get() | 1 << no)>>>0);
        }
        return this.owner;
    }

    clear(no: number): T {
        if(this.signed && this.cell.get() == -1 && no < 32 && no >= 0) {
            this.cell.set(0xffffffff);
        }
        this.set((this.cell.get() & ~(1 << no))>>>0);
        return this.owner;
    }

    check(no: number): boolean {
        return (this.signed && this.cell.get() == -1)
            || ((this.cell.get()) & ((1 << no))>>>0) !== 0;
    }

    get(): number {
        return this.cell.get();
    }

    set(value: number) {
        this.cell.set(this.signed && value == 0xffffffff ? -1 : value);
        return this.owner;
    }

    protected deserialize(value: any) {
        this.set(value);
    }

    protected bit(no: number): MaskBit<T,this> { return new MaskBit(this, no); }
}

export class MaskCell64<T> extends MaskCell<T> {
    @Transient
    protected cell: Cell<bigint, any>;

    constructor(owner: T, cell: Cell<bigint, any>) {
        super(owner);
        this.cell = cell;
    }

    set(value: bigint) {
        this.cell.set(value);
        return this.owner;
    }

    get length() { return 64; }

    get() { return this.cell.get(); }

    mark(no: number): T {
        this.cell.set(this.cell.get() | (BigInt(1) << BigInt(no)));
        return this.owner;
    }

    clear(no: number): T {
        this.cell.set(this.cell.get() & (~((BigInt(1) << BigInt(no)))));
        this.cell.set(BigInt(0));
        return this.owner;
    }

    check(no: number): boolean {
        return (this.cell.get() & ((BigInt(1) << BigInt(no)))) !== BigInt(0);
    }

    clearAll(): T {
        this.cell.set(BigInt(0));
        return this.owner;
    }

    toString(): string {
        return this.cell.get().toString(2);
    }

    protected deserialize(value: any) {
        this.set(value);
    }
}
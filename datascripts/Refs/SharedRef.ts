import { Subsystem } from "wotlkdata/cell/Subsystem";
import { AutoIdGenerator } from "../Misc/Ids";
import { Cell } from "wotlkdata/cell/Cell";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { DBCKeyCell } from "wotlkdata/dbc/DBCCell";
import { MulticastCell } from "../Misc/MulticastCell";
import { Transient } from "wotlkdata/cell/Transient";

export interface SharedRefRow {
    ID: DBCKeyCell<any>;
    clone(id: number): this;
}

export interface SharedRefTable<T extends SharedRefRow> {
    add(id: number): T;
    findById(id: number): T;
}

function shouldClone(gen: AutoIdGenerator, holder: any, cell: Cell<number,any>) {
    return !AutoIdGenerator.isCustom(gen, cell.get()) && BaseSystem.getUniqueRefs(holder);
}

export class TopSystem {
    
}

export class TopCell extends Cell<number,undefined> {
    protected id: number;

    constructor(id: number) {
        super(undefined)
        this.id = id;
    }

    get(): number {
        return this.id;
    }
    set(value: number) {
        throw new Error("Tried accessing pointer cell to top-level object.");
        return undefined;
    }
}

export abstract class SharedRef<T,R extends SharedRefRow> extends Subsystem<T> {
    constructor(owner: T, cells: Cell<number,any>[] | Cell<number,any>) {
        super(owner);
        if(!Array.isArray(cells)) {
            cells = [cells];
        }
        this.cell = new MulticastCell(this, cells);
    }

    exists() {
        return this.cell.get() > 0;
    }

    get ID() { return this.cell.get(); }

    setID(id: number) {
        this.cell.set(id);
        return this.owner;
    }

    @Transient
    private _row: R|undefined;

    @Transient
    protected cell: Cell<number,any>;

    abstract table(): SharedRefTable<R>
    abstract ids(): AutoIdGenerator;
    abstract clear(): this;

    @Transient
    get row() {
        if(this.cell.get() === 0) {
            let id = this.ids().id();
            this.table().add(id);
            this.cell.set(id);
            this.clear();
        } else if(shouldClone(this.ids(),this.owner,this.cell)) {
            this.makeUnique()
        }

        return this.getRow();
    }

    private getRow() {
        if(this._row === undefined || this._row.ID.get() !== this.cell.get()) {
            this._row = this.table().findById(this.cell.get());
        }
        return this._row;
    }

    makeUnique(): this {
        let id = this.ids().id();
        if(this.cell.get() === 0) {
            this._row = this.table().add(id)
            this.clear()
        } else {
            this._row = this.getRow().clone(id)
        }
        this.cell.set(id);
        return this;
    }
}
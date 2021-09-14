import { Objectified, Objects } from "../serialization/ObjectIteration";
import { CellSystemTop } from "../systems/CellSystem";
import { Cell, CellWrapper } from "./Cell";

export class EnumCell<T> extends CellWrapper<number,T> {
    value(index: number, setCallback?: ()=>void): EnumValue<T> {
        return new EnumValue(this.owner, this, index, setCallback);
    }

    objectify() {
        let enums = Objects.mapObject(this,['object'],(k,v)=>v.isEnum);
        for(const [key,value] of Object.entries(enums)) {
            if(value.isSelected()) return key;
        }
        return this.cell.get();
    }
}

export class EnumValue<T> {
    private owner: T;
    private cell: Cell<number,any>
    private index: number;
    protected get isEnum() { return true; }
    private setCallback?: ()=>void

    constructor(owner: T, cell: EnumCell<T>, index: number, setCallback?: ()=>void) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
        this.setCallback = setCallback;
    }

    isSelected() {
        return this.cell.get() === this.index;
    }

    set() {
        this.cell.set(this.index);
        if(this.setCallback) this.setCallback();
        return this.owner;
    }
}


export class EnumCellTransform<T extends Objectified> extends CellWrapper<number,T> {
    value<V extends Objectified>(index: number, transformer: (t: T)=>V): EnumValueTransform<T,V> {
        return new EnumValueTransform(this.owner, this, index, transformer);
    }

    plain_value(index: number) {
        return new EnumValueTransform(this.owner, this, index, (t)=>t);
    }

    private getSelection():
        {     name: string|undefined
            , cell: EnumValueTransform<T,any>|undefined
        }
    {
        let enums = Objects.mapObject(this,['object'],(k,v)=>v.isEnum);
        for(const [name,cell] of Object.entries(enums)) {
            if(cell.isSelected()) return {name,cell};
        }
        return {name:undefined,cell:undefined};
    }

    objectify() {
        const {name} = this.getSelection();
        return name === undefined ? this.cell.get() : name;
    }

    static getSelection(transformEnum: EnumCellTransform<any>) {
        return transformEnum.getSelection();
    }
}

export class EnumValueTransform<T extends Objectified,V extends Objectified> {
    private owner: T;
    private cell: Cell<number,any>
    private index: number;
    protected get isEnum() { return true; }
    protected transformer: (t: T)=>V;

    constructor(owner: T, cell: EnumCellTransform<T>, index: number, transformer: (t: T)=>V) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
        this.transformer = transformer;
    }

    isSelected() {
        return this.cell.get() === this.index;
    }

    set() {
        this.cell.set(this.index);
        return this.transformer(this.owner);
    }

    as() {
        if(this.cell.get() !== this.index) {
            throw new Error(
                  `Tried accessing enum as ${this.index},`
                + ` but value is ${this.cell.get()}`
            )
        }
        return this.transformer(this.owner);
    }
}

export abstract class TransformedClass<T> extends CellSystemTop {
    protected abstract transformer(): EnumCellTransform<any>
    protected abstract default(): T;

    protected objectifyParent() {
        return Objects.objectifyObj(this);
    }

    objectify() {
        let {cell} = EnumCellTransform.getSelection(this.transformer());
        if(cell === undefined) {
            return this.objectifyParent();
        }
        return cell.as().objectifyParent();
    }
}
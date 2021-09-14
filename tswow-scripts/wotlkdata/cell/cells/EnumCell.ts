import { Objects } from "../serialization/ObjectIteration";
import { Cell, CellWrapper } from "./Cell";

function getEnumKey(obj: any, index: number) {
    if (obj === undefined) {
        return index;
    }
    return obj.enumKeys ? obj.enumKeys[index] || index : index;
}

function getEnumFieldName(name: string) {
    if (name.startsWith('set') && name.length > 3) {
        return name.substring(3);
    } else {
        return name;
    }
}

export abstract class EnumCell<T> extends Cell<number,T> {
    objectify() {
        return getEnumKey(this, this.get());
    }
}

export class EnumCellWrapper<T> extends EnumCell<T> {
    get(): number {
        return this.cell.get();
    }

    set(value: number): T {
        this.cell.set(value);
        return this.owner;
    }

    protected cell: Cell<number,any>;

    constructor(owner: T, cell: Cell<number,any>) {
        super(owner);
        this.cell = cell;
    }
}

export function EnumField(index: number) {
    return function(prototype: any, field: string) {
        if (prototype.enumKeys === undefined) {
            prototype.enumKeys = {};
        }
        prototype.enumKeys[index] = getEnumFieldName(field);
    };
}


export class EnumCellWrapperNew<T> extends CellWrapper<number,T> {
    value(index: number): EnumValue<T> {
        return new EnumValue(this.owner, this, index);
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

    constructor(owner: T, cell: EnumCellWrapperNew<T>, index: number) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
    }

    isSelected() {
        return this.cell.get() === this.index;
    }

    select() {
        this.cell.set(this.index);
        return this.owner;
    }
}
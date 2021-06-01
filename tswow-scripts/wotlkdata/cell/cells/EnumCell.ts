import { Cell } from "./Cell";

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
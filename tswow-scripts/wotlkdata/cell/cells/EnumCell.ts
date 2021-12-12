import { Objectified, Objects } from "../serialization/ObjectIteration";
import { CellSystemTop } from "../systems/CellSystem";
import { Cell, CellWrapper } from "./Cell";
import { CellReadOnly, CellWrapperReadOnly } from "./CellReadOnly";
import { makePrototype } from "./PrototypeRegistry";

export class EnumCellReadOnly<T> extends CellWrapperReadOnly<number,T> {
    protected value(index: number): EnumValueReadOnly<T> {
        return new EnumValueReadOnly(this.owner, this, index);
    }

    is(index: number) {
        return this.get() === index;
    }

    on(index: number, callback: ()=>void) {
        if(this.is(index)) callback();
        return this.owner;
    }

    objectify() {
        let enums = Objects.mapObject(this,['object'],(k,v)=>v.isEnum);
        for(const [key,value] of Object.entries(enums)) {
            if(value.is()) return key;
        }
        return this.cell.get();
    }
}

export class EnumValueReadOnly<T> {
    protected owner: T;
    protected cell: CellReadOnly<number,any>
    protected index: number;
    protected get isEnum() { return true; }

    constructor(owner: T, cell: EnumCellReadOnly<T>, index: number) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
    }

    is() {
        return this.cell.get() === this.index;
    }

    protected set() {
        CellReadOnly.set(this.cell,this.index);
        return this.owner;
    }
}

export class EnumCell<T> extends EnumCellReadOnly<T> {
    protected value(index: number, setCallback?: ()=>void): EnumValue<T> {
        return new EnumValue(this.owner, this, index, setCallback);
    }

    set(value: number) { return super.set(value); }
}

export class EnumValue<T> extends EnumValueReadOnly<T>{
    protected get isEnum() { return true; }
    private setCallback?: ()=>void

    constructor(owner: T, cell: EnumCell<T>, index: number, setCallback?: ()=>void) {
        super(owner,cell,index);
        this.setCallback = setCallback;
    }

    set() {
        super.set();
        if(this.setCallback) this.setCallback();
        return this.owner;
    }
}

function enumCellTransformGetSelection(transform: any) {
    return Object
        .entries(
            Objects.mapObject(transform, ['object'], (_,v)=>v.isEnum)
        )
        .map(([name,cell])=>({name,cell}))
        .find(({name,cell})=>cell.is())
        || {name:undefined,cell:undefined}
}

function verifyAs(value1: number, value2: number) {
    if(value1 !== value2) {
        throw new Error(
            `Tried accessing enum as ${value1},`
          + ` but value is ${value2}`
      )
    }
}

export class EnumCellTransform<T extends Objectified> extends CellWrapper<number,T> {
    value<V extends Objectified>(index: number, transformer: (t: T)=>V): EnumValueTransform<T,V> {
        return new EnumValueTransform(this.owner, this, index, transformer);
    }

    value_static<V extends Objectified>(
          index: number
        , transformer: (t: T, mod: string, value: string)=>V): EnumValueTransformStatic<T,V>
    {
        return new EnumValueTransformStatic(this.owner,this, index, transformer);
    }

    plain_value(index: number) {
        return new EnumValueTransform(this.owner, this, index, (t)=>t);
    }

    private getSelection():
        {     name: string|undefined
            , cell: EnumValueTransform<T,any>|undefined
        }
    {
        return enumCellTransformGetSelection(this);
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

    is() {
        return this.cell.get() === this.index;
    }

    set() {
        this.cell.set(this.index);
        return this.transformer(this.owner);
    }

    as() {
        verifyAs(this.index, this.cell.get())
        return this.transformer(this.owner);
    }

    on(callback: (value: V)=>void) {
        if(this.is()) callback(this.as());
        return this.owner;
    }

    if() {
        return (this.is() ? this.as() : undefined) as V;
    }
}

export class EnumValueTransformStatic<T extends Objectified,V extends Objectified> {
    private owner: T;
    private cell: Cell<number,any>
    private index: number;
    protected get isEnum() { return true; }
    protected transformer: (t: T, mod: string, name: string)=>V;

    constructor(
          owner: T
        , cell: EnumCellTransform<T>
        , index: number
        , transformer: (t: T, mod: string, name: string)=>V
    ) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
        this.transformer = transformer;
    }

    is() {
        return this.cell.get() === this.index;
    }

    set(mod: string, name: string) {
        this.cell.set(this.index);
        return this.transformer(this.owner,mod,name);
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

export class EnumCellTransformReadOnly<T extends Objectified> extends CellWrapperReadOnly<number,T> {
    value<V extends Objectified>(index: number, transformer: (t: T)=>V): EnumValueTransformReadOnly<T,V> {
        return new EnumValueTransformReadOnly(this.owner, this, index, transformer);
    }

    plain_value(index: number) {
        return new EnumValueTransformReadOnly(this.owner, this, index, (t)=>t);
    }

    private getSelection():
        {     name: string|undefined
            , cell: EnumValueTransformReadOnly<T,any>|undefined
        }
    {
        return enumCellTransformGetSelection(this)
    }

    objectify() {
        const {name} = this.getSelection();
        return name === undefined ? this.cell.get() : name;
    }

    static getSelection(transformEnum: EnumCellTransformReadOnly<any>) {
        return transformEnum.getSelection();
    }
}

export class EnumValueTransformReadOnly<T extends Objectified,V extends Objectified> {
    private owner: T;
    private cell: CellReadOnly<number,any>
    private index: number;
    protected get isEnum() { return true; }
    protected transformer: (t: T)=>V;

    constructor(owner: T, cell: EnumCellTransformReadOnly<T>, index: number, transformer: (t: T)=>V) {
        this.owner = owner;
        this.cell = cell;
        this.index = index;
        this.transformer = transformer;
    }

    is() {
        return this.cell.get() === this.index;
    }

    as() {
        verifyAs(this.index, this.cell.get())
        return this.transformer(this.owner);
    }
}

export abstract class TransformedClassReadOnly<T> extends CellSystemTop {
    protected abstract transformer(): EnumCellTransformReadOnly<any>
    protected abstract default(): T;

    protected objectifyParent() {
        return Objects.objectifyObj(this);
    }

    objectify() {
        let {cell} = EnumCellTransformReadOnly.getSelection(this.transformer());
        if(cell === undefined) {
            return this.objectifyParent();
        }
        return cell.as().objectifyParent();
    }
}

export type EnumCon<T> = T | number

export class EnumCellT<T,V> extends EnumCell<T> {
    protected obj: any;

    constructor(owner: T, cell: Cell<number,any>, obj: any) {
        super(owner, cell);
        this.obj = obj;
    }

    private res(con: EnumCon<V>) {
        return typeof(con) === 'string' ? this.obj[con] : con
    }

    set(con: EnumCon<V>) {
        return super.set(this.res(con));
    }

    is(con: EnumCon<V>) {
        return super.is(this.res(con));
    }

    on(con: EnumCon<V>, callback: ()=>void) {
        return super.on(this.res(con),callback);
    }
}


export interface EnumValueRead<T> {
    is(): boolean
    on(callback: ()=>void): T
}

export interface EnumValueWrite<T> extends EnumValueRead<T> {
    set(): T
}

export type EnumCellWrite<T,Type> = {
    [Property in keyof Omit<Type,'obj'>]: EnumValueWrite<T>;
} & EnumCellT<T,keyof Type>

export type EnumCellRead<T,Type> = {
    [Property in keyof Omit<Type,'obj'>]: EnumValueRead<T>;
} & Omit<EnumCellT<T,keyof Type>,'set'>

export function makeEnumCell<T,Enum>(obj: Enum, owner: T, cell: Cell<number,any>) {
    let value = makePrototype('enum',EnumCellT.prototype,obj,{owner,cell},(p,k,v)=>{
        Object.defineProperty(p,k,{
            get: function() {
                return this.value(v);
            }
        })
    })
    value.obj = obj;
    return value as EnumCellWrite<T,Enum>
}

export function makeEnumCellReadOnly<T,Enum>(obj: Enum, owner: T, cell: CellReadOnly<number,any>) {
    let value = makePrototype('enum',EnumCellT.prototype,obj,{owner,cell},(p,k,v)=>{
        Object.defineProperty(p,k,{
            get: function() {
                return this.value(v);
            }
        })
    })
    value.obj = obj;
    return value as EnumCellRead<T,Enum>
}

export function makeEnum<T>(obj: any, con: EnumCon<T>): number {
    return typeof(con) ==='number' ? con : (obj[con] as any as number);
}
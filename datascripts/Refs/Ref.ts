import { Cell, CellWrapper } from "wotlkdata/cell/cells/Cell";
import { CellReadOnly, CellWrapperReadOnly } from "wotlkdata/cell/cells/CellReadOnly";
import { MainEntity, TransformedEntity } from "../Misc/Entity";
import { RegistryRowBase, RegistryDynamic, RegistryStatic } from "./Registry";

export class RefReadOnly<T,V extends MainEntity<any>|TransformedEntity<any,any>> extends CellWrapperReadOnly<number,T>{
    protected registry: RegistryRowBase<V,any,any>;

    constructor(owner: T, cell: CellReadOnly<number,any>, registry: RegistryRowBase<V,any,any>) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        return this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
    }
}

export class RefBase<T,V extends MainEntity<any>|TransformedEntity<any,any>, R extends RegistryRowBase<V,any,any>> extends CellWrapper<number,T> {
    protected registry: R;

    constructor(owner: T, cell: Cell<number,any>, registry: R) {
        super(owner,cell);
        this.registry = registry;
    }

    getRef() {
        return this.registry.load(this.cell.get());
    }

    modRef(callback: (value: V)=>void) {
        callback(this.getRef());
        return this.owner;
    }
}

export class RefNoCreate<T,V extends MainEntity<any>|TransformedEntity<any,any>> extends RefBase<T,V,RegistryRowBase<V,any,any>> {}

export class RefStatic<T,V extends MainEntity<any>|TransformedEntity<any,any>> extends RefBase<T,V,RegistryStatic<V,any,any>> {
    getRefCopy(mod: string, id: string) {
        let v = this.registry.create(mod,id,this.cell.get());
        this.cell.set(RegistryRowBase.id(this.registry,v));
        return v;
    }

    modRefCopy(mod: string, id: string, callback: (value: V)=>void) {
        callback(this.getRefCopy(mod,id));
        return this.owner;
    }
}

export class RefDynamic<T,V extends MainEntity<any>> extends RefBase<T,V,RegistryDynamic<V,any,any>> {
    getRefCopy() {
        let v = this.registry.create(this.cell.get());
        this.cell.set(RegistryRowBase.id(this.registry,v));
        return v;
    }

    modRefCopy(callback: (value: V)=>void) {
        callback(this.getRefCopy());
        return this.owner;
    }
}
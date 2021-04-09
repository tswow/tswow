import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Cell } from "wotlkdata/cell/Cell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Ids } from "../Base/Ids";

export class ParticleColor<T> extends Subsystem<T> {
    id: Cell<number,any>
    
    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
    }

    get row() { 
        if(this.id.get()===0) {
            this.id.set(Ids.ParticleColors.id());
        }
        return DBC.ParticleColor.findById(this.id.get()); 
    }

    get Start() { return this.wrapArray(this.row.Start);}
    get End() { return this.wrapArray(this.row.End); }
    get Mid() { return this.wrapArray(this.row.Mid); }

    set(start1: number, start2: number, start3: number, mid1: number, mid2: number, mid3: number, end1: number, end2: number, end3: number) {
        this.setStart(start1,start2,start3);
        this.setMid(mid1,mid2,mid3);
        this.setEnd(end1,end2,end3);
        return this.owner;
    }

    setStart(start1: number, start2: number, start3: number) {
        this.Start.setIndex(0,start1);
        this.Start.setIndex(1,start2);
        this.Start.setIndex(2,start3);
        return this.owner;
    }

    setMid(mid1: number, mid2: number, mid3: number) {
        this.Mid.setIndex(0,mid1);
        this.Mid.setIndex(1,mid2);
        this.Mid.setIndex(2,mid3);
        return this.owner;
    }

    setEnd(end1: number, end2: number, end3: number) {
        this.End.setIndex(0,end1);
        this.End.setIndex(1,end2);
        this.End.setIndex(2,end3);
        return this.owner;
    }

    makeUnique() {
        let id = Ids.ParticleColors.id();
        this.row.clone(id);
        this.id.set(id);
    }
}
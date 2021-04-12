import { DBC } from "wotlkdata/dbc/DBCFiles";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { ParticleColorRow } from "wotlkdata/dbc/types/ParticleColor";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";

export class ParticleColor<T extends BaseSystem> extends SharedRef<T, ParticleColorRow> {
    table(): SharedRefTable<ParticleColorRow> {
        return DBC.ParticleColor;
    }
    ids(): AutoIdGenerator {
        return Ids.ParticleColors;
    }
    zeroFill(): this {
        this.set(0,0,0,0,0,0,0,0,0);
        return this;
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
}
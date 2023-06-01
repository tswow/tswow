import { Table } from "../../../data/table/Table";
import { ParticleColorQuery, ParticleColorRow } from "../../dbc/ParticleColor";
import { DBC } from "../../DBCFiles";
import { RegistryDynamic } from "../Refs/Registry";
import { CodegenSettings, GenerateCode } from "./Codegen";
import { MainEntity } from "./Entity";
import { DynamicIDGenerator, Ids } from "./Ids";

export class ParticleColor extends MainEntity<ParticleColorRow> {
    clear(): this {
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

    codify(settings: CodegenSettings)
    {
        return GenerateCode(settings,`std.ParticleColors.create()`,code=>{
            code.line(`.setStart(${this.Start.getIndex(0),this.Start.getIndex(1),this.Start.getIndex(2)})`)
            code.line(`.setMid(${this.Mid.getIndex(0),this.Mid.getIndex(1),this.Mid.getIndex(2)})`)
            code.line(`.setEnd(${this.End.getIndex(0),this.End.getIndex(1),this.End.getIndex(2)})`)
        })
    }
}

export class ParticleColorRegistryClass
    extends RegistryDynamic<ParticleColor,ParticleColorRow,ParticleColorQuery>
{
    protected Table(): Table<any, ParticleColorQuery, ParticleColorRow> & { add: (id: number) => ParticleColorRow; } {
        return DBC.ParticleColor
    }
    protected ids(): DynamicIDGenerator {
        return Ids.ParticleColors
    }
    Clear(entity: ParticleColor): void {
        entity
            .End.fill(0)
            .Mid.fill(0)
            .Start.fill(0)
    }
    protected FindByID(id: number): ParticleColorRow {
        return DBC.ParticleColor.findById(id);
    }
    protected EmptyQuery(): ParticleColorQuery {
        return {}
    }
    ID(e: ParticleColor): number {
        return e.row.ID.get()
    }
    protected Entity(r: ParticleColorRow): ParticleColor {
        return new ParticleColor(r);
    }
}
export const ParticleColorRegistry = new ParticleColorRegistryClass();
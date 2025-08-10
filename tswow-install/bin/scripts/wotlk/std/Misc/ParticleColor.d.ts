import { Table } from "../../../data/table/Table";
import { ParticleColorQuery, ParticleColorRow } from "../../dbc/ParticleColor";
import { RegistryDynamic } from "../Refs/Registry";
import { CodegenSettings } from "./Codegen";
import { MainEntity } from "./Entity";
import { DynamicIDGenerator } from "./Ids";
export declare class ParticleColor extends MainEntity<ParticleColorRow> {
    clear(): this;
    get Start(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    get End(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    get Mid(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<number, this>;
    set(start1: number, start2: number, start3: number, mid1: number, mid2: number, mid3: number, end1: number, end2: number, end3: number): undefined;
    setStart(start1: number, start2: number, start3: number): undefined;
    setMid(mid1: number, mid2: number, mid3: number): undefined;
    setEnd(end1: number, end2: number, end3: number): undefined;
    codify(settings: CodegenSettings): string;
}
export declare class ParticleColorRegistryClass extends RegistryDynamic<ParticleColor, ParticleColorRow, ParticleColorQuery> {
    protected Table(): Table<any, ParticleColorQuery, ParticleColorRow> & {
        add: (id: number) => ParticleColorRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: ParticleColor): void;
    protected FindByID(id: number): ParticleColorRow;
    protected EmptyQuery(): ParticleColorQuery;
    ID(e: ParticleColor): number;
    protected Entity(r: ParticleColorRow): ParticleColor;
}
export declare const ParticleColorRegistry: ParticleColorRegistryClass;

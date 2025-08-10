import { Table } from "../../../data/table/Table";
import { GroundEffectDoodadQuery, GroundEffectDoodadRow } from "../../dbc/GroundEffectDoodad";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
export declare class GroundEffectDoodad extends MainEntity<GroundEffectDoodadRow> {
    get ID(): number;
    get Path(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
}
export declare class GroundEffectDoodadRegistryClass extends RegistryStatic<GroundEffectDoodad, GroundEffectDoodadRow, GroundEffectDoodadQuery> {
    protected Table(): Table<any, GroundEffectDoodadQuery, GroundEffectDoodadRow> & {
        add: (id: number) => GroundEffectDoodadRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: GroundEffectDoodad, mod: string, id: string): void;
    protected FindByID(id: number): GroundEffectDoodadRow;
    ID(e: GroundEffectDoodad): number;
    protected EmptyQuery(): GroundEffectDoodadQuery;
    protected Entity(r: GroundEffectDoodadRow): GroundEffectDoodad;
}
export declare const GroundEffectDoodadRegistry: GroundEffectDoodadRegistryClass;

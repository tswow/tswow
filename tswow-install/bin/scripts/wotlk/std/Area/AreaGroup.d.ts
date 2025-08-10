import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Table } from "../../../data/table/Table";
import { AreaGroupQuery, AreaGroupRow } from "../../dbc/AreaGroup";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class AreaGroupAreas extends CellSystem<AreaGroup> {
    add(id: number): void;
}
export declare class AreaGroup extends MainEntity<AreaGroupRow> {
    get ID(): number;
    get Areas(): AreaGroupAreas;
}
export declare class AreaGroupRegistryClass extends RegistryDynamic<AreaGroup, AreaGroupRow, AreaGroupQuery> {
    protected Table(): Table<any, AreaGroupQuery, AreaGroupRow> & {
        add: (id: number) => AreaGroupRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: AreaGroup): void;
    protected FindByID(id: number): AreaGroupRow;
    ID(e: AreaGroup): number;
    protected EmptyQuery(): AreaGroupQuery;
    protected Entity(r: AreaGroupRow): AreaGroup;
}
export declare const AreaGroupRegistry: AreaGroupRegistryClass;

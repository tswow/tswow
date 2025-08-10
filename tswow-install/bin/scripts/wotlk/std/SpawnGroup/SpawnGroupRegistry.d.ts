import { Table } from "../../../data/table/Table";
import { spawn_groupQuery } from "../../sql/spawn_group";
import { spawn_group_templateRow } from "../../sql/spawn_group_template";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { SpawnGroup } from "./SpawnGroup";
export declare class SpawnGroupRegistryClass extends RegistryStatic<SpawnGroup, spawn_group_templateRow, spawn_groupQuery> {
    protected Table(): Table<any, spawn_groupQuery, spawn_group_templateRow> & {
        add: (id: number) => spawn_group_templateRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: SpawnGroup, mod: string, id: string): void;
    protected FindByID(id: number): spawn_group_templateRow;
    ID(e: SpawnGroup): number;
    protected EmptyQuery(): spawn_groupQuery;
    protected Entity(r: spawn_group_templateRow): SpawnGroup;
}
export declare const SpawnGroupRegistry: SpawnGroupRegistryClass;

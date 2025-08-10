import { ArrayEntry, ArraySystem } from "../../../data/cell/systems/ArraySystem";
import { Table } from "../../../data/table/Table";
import { SkillTiersQuery, SkillTiersRow } from "../../dbc/SkillTiers";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SkillTier extends ArrayEntry<SkillTiers> {
    get Cost(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    get Value(): import("../../../data/cell/cells/CellArray").CellIndexWrapper<number, this>;
    clear(): this;
    isClear(): boolean;
}
export declare class SkillTiersTiers extends ArraySystem<SkillTier, SkillTiers> {
    get length(): number;
    get(index: number): SkillTier;
}
export declare class SkillTiers extends MainEntity<SkillTiersRow> {
    get Tiers(): SkillTiersTiers;
    get ID(): number;
}
export declare class SkillTiersRegistryClass extends RegistryDynamic<SkillTiers, SkillTiersRow, SkillTiersQuery> {
    protected Table(): Table<any, SkillTiersQuery, SkillTiersRow> & {
        add: (id: number) => SkillTiersRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SkillTiers): void;
    protected Entity(r: SkillTiersRow): SkillTiers;
    protected FindByID(id: number): SkillTiersRow;
    protected EmptyQuery(): SkillTiersQuery;
    ID(e: SkillTiers): number;
}
export declare const SkillTiersRegistry: SkillTiersRegistryClass;

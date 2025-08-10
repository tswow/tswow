import { Table } from "../../../data/table/Table";
import { SkillLineQuery, SkillLineRow } from "../../dbc/SkillLine";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { SkillLine } from "./SkillLine";
export declare class SkillLineRegistryClass extends RegistryStatic<SkillLine, SkillLineRow, SkillLineQuery> {
    protected Table(): Table<any, SkillLineQuery, SkillLineRow> & {
        add: (id: number) => SkillLineRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: SkillLine, mod: string, name: string): void;
    protected Clone(mod: string, name: string, r: SkillLine, parent: SkillLine): void;
    protected Entity(r: SkillLineRow): SkillLine;
    protected FindByID(id: number): SkillLineRow;
    protected EmptyQuery(): SkillLineQuery;
    ID(e: SkillLine): number;
}
export declare const SkillLineRegistry: SkillLineRegistryClass;

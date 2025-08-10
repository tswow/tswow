import { Table } from "../../../data/table/Table";
import { SkillLineQuery, SkillLineRow } from "../../dbc/SkillLine";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Profession } from "./Profession";
export declare class ProfessionRegistryClass extends RegistryStaticNoClone<Profession, SkillLineRow, SkillLineQuery> {
    protected Table(): Table<any, SkillLineQuery, SkillLineRow> & {
        add: (id: number) => SkillLineRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: Profession): void;
    protected Entity(r: SkillLineRow): Profession;
    protected FindByID(id: number): SkillLineRow;
    protected EmptyQuery(): SkillLineQuery;
    ID(e: Profession): number;
}
export declare const ProfessionRegistry: ProfessionRegistryClass;

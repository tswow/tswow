import { DBC } from "wotlkdata";
import { SkillLineQuery, SkillLineRow } from "wotlkdata/wotlkdata/dbc/types/SkillLine";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { SkillLine } from "./SkillLine";

export class SkillLineRegistryClass
    extends RegistryStatic<SkillLine,SkillLineRow,SkillLineQuery>
{
    protected Table(): Table<any, SkillLineQuery, SkillLineRow> & { add: (id: number) => SkillLineRow; } {
        return DBC.SkillLine
    }
    protected IDs(): StaticIDGenerator {
        return Ids.SkillLine
    }
    Clear(r: SkillLine, mod: string, name: string): void {
            r.Category.set(7)
             .SkillCosts.set(0)
             .CanLink.set(0)
    }
    protected Clone(mod: string, name: string, r: SkillLine, parent: SkillLine): void {
        parent.RaceClassInfos.forEach(x=>x.row.clone(r.ID))
    }
    protected Entity(r: SkillLineRow): SkillLine {
        return new SkillLine(r);
    }
    protected FindByID(id: number): SkillLineRow {
        return DBC.SkillLine.findById(id);
    }
    protected EmptyQuery(): SkillLineQuery {
        return {}
    }
    ID(e: SkillLine): number {
        return e.ID;
    }
}

export const SkillLineRegistry = new SkillLineRegistryClass();
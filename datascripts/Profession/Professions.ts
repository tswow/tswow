import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SkillLineQuery, SkillLineRow } from "wotlkdata/dbc/types/SkillLine";
import { Table } from "wotlkdata/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { SkillTiersRegistry } from "../SkillTiers/SkillTiers";
import { Profession } from "./Profession";

export class ProfessionRegistryClass
    extends RegistryStatic<Profession,SkillLineRow,SkillLineQuery>
{
    protected Table(): Table<any, SkillLineQuery, SkillLineRow> & { add: (id: number) => SkillLineRow; } {
        return DBC.SkillLine
    }
    protected IDs(): StaticIDGenerator {
        return Ids.SkillLine
    }
    Clear(r: Profession): void {
        r.SkillLine.CanLink.set(1)
         .RaceClassInfos.addMod(rci=>{
            rci.ClassMask.set(0xffffff)
               .RaceMask.set(0xffffff)
               .Flags.clearAll()
               .Flags.IsProfession.set(true)
               .Flags.IsClassLine.set(true)
               .SkillTier.set(SkillTiersRegistry.create().ID)
        })
    }
    protected Clone(mod: string, name: string, r: Profession, parent: Profession): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: SkillLineRow): Profession {
        return new Profession(r);
    }
    protected FindByID(id: number): SkillLineRow {
        return DBC.SkillLine.findById(id);
    }
    protected EmptyQuery(): SkillLineQuery {
        return {}
    }
    ID(e: Profession): number {
        return e.ID;
    }
}

export const ProfessionRegistry = new ProfessionRegistryClass()
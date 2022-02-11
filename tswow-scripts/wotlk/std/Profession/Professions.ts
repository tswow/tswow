import { DBC } from "../../DBCFiles";
import { SkillLineQuery, SkillLineRow } from "../../dbc/SkillLine";
import { Table } from "../../../data/table/Table";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { SkillTiersRegistry } from "../SkillTiers/SkillTiers";
import { Profession, ProfessionRanks } from "./Profession";

export class ProfessionRegistryClass
    extends RegistryStaticNoClone<Profession,SkillLineRow,SkillLineQuery>
{
    protected Table(): Table<any, SkillLineQuery, SkillLineRow> & { add: (id: number) => SkillLineRow; } {
        return DBC.SkillLine
    }
    protected IDs(): StaticIDGenerator {
        return Ids.SkillLine
    }
    Clear(r: Profession): void {
        r.AsSkillLine.get().CanLink.set(1)
         .RaceClassInfos.addMod(undefined,undefined,rci=>{
            rci
               .Flags.clearAll()
               .Flags.IS_PROFESSION.set(true)
               .Flags.IS_CLASS_LINE.set(true)
               .SkillTier.set(SkillTiersRegistry.create().ID)
        })
        ProfessionRanks.setCached(r.Ranks,0);
        Profession.setCacheLearnSpells(r);
        Profession.setCacheRanks(r);
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
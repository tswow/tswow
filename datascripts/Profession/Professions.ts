import { SkillLines } from "../SkillLines/SkillLines";
import { SkillTiersRegistry } from "../SkillTiers/SkillTiers";
import { Profession } from "./Profession";
import { DefaultProfession, ProfessionType, resolveProfession } from "./ProfessionType";

export const Professions = {
    load(id: number | DefaultProfession) {
        return new Profession(SkillLines.load(resolveProfession(id)));
    },

    create(mod: string, id: string, type: ProfessionType|number) {
        return new Profession(SkillLines.create(mod,id)
            .CanLink.set(1)
            .Category.set(typeof(type)=='number'?type: type == 'PROFESSION' ? 11 : 9)
            .RaceClassInfos.modNew(rci=>{
                rci.ClassMask.set(0xffffff)
                   .RaceMask.set(0xffffff)
                   .Flags.clearAll()
                   .Flags.IsProfession.set(true)
                   .Flags.IsClassLine.set(true)
                   .SkillTier.set(SkillTiersRegistry.create().ID)
            }))
    }
}
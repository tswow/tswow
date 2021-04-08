import { Profession } from "./Profession"
import { SkillLines } from "../SkillLines/SkillLines"
import { DefaultProfession, resolveProfession, ProfessionTier, resolveProfessionType, ProfessionType } from "./ProfessionType";

export const Professions = {
    load(id: number | DefaultProfession) {
        return new Profession(SkillLines.load(resolveProfession(id)));
    },

    create(mod: string, id: string, hasCrafting: boolean, type: ProfessionType|number, highestRank: ProfessionTier) {
        return new Profession(SkillLines.create(mod,id)
            .CanLink.set(1)
            .Category.set(11)
            .RaceClassInfos.add()
                .ClassMask.set(0)
                .RaceMask.set(0)
                .Flags.clearAll()
                .Flags.IsProfession.mark()
                .Flags.IsClassLine.mark()
            .end)
            .addSkillsTo(mod,id,highestRank)
            .setHasCrafting(hasCrafting)
    }
}
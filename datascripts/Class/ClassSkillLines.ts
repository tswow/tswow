import { DBC } from "wotlkdata"
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem"
import { SQL } from "wotlkdata/sql/SQLFiles"
import { SkillLine } from "../SkillLines/SkillLine"
import { SkillLineRegistry } from "../SkillLines/SkillLines"
import { Class } from "./Class"

export class ClassSkillLines extends MultiRowSystem<SkillLine,Class> {
    protected getAllRows(): SkillLine[] {
        return DBC.SkillLine
            .filter({})
            .map(x=>new SkillLine(x))
            .filter(x=>
                x.RaceClassInfos
                    .filter(y=>y.ClassMask.getBit(this.owner.ID-1)).length>0)
    }
    protected isDeleted(a: SkillLine): boolean {
        return a.row.isDeleted();
    }

    addGet(mod: string, id: string) {
        const sl = SkillLineRegistry.create(mod,id)
            .Category.set(7)
            .SkillCosts.set(0)
            .CanLink.set(0)
            .RaceClassInfos.addMod(rci=>{
                // TODO: ugly
                rci.RaceMask.set(4294967295)
                   .ClassMask.clearAll()
                   .ClassMask.setBit(this.owner.ID-1,true)
                   .Flags.set(1040)
            })
        SQL.playercreateinfo_skills
            .add(0, 1<<(this.owner.ID-1),sl.ID)
            .comment.set(`${this.owner.ID} - ${id}`);
        return sl;
    }

    addMod(mod: string, id: string, callback: (sl: SkillLine, cls: Class)=>void) {
        callback(this.addGet(mod,id), this.owner);
        return this.owner;
    }
}
import { DBC } from "wotlkdata"
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem"
import { SkillLine } from "../SkillLines/SkillLine"
import { SkillLines } from "../SkillLines/SkillLines"
import { Class } from "./Class"

export class ClassSkillLines extends MultiRowSystem<SkillLine,Class> {
    protected getAllRows(): SkillLine[] {
        return DBC.SkillLine
            .filter({})
            .map(x=>new SkillLine(x))
            .filter(x=>
                x.RaceClassInfos
                    .filter(y=>y.ClassMask.check(this.owner.ID-1)).length>0)
    }
    protected isDeleted(a: SkillLine): boolean {
        return a.row.isDeleted();
    }

    getCreate(mod: string, id: string) {
        return SkillLines.createClass(mod,id,this.owner.ID);
    }

    modCreate(mod: string, id: string, callback: (sl: SkillLine)=>void) {
        callback(this.getCreate(mod,id));
        return this.owner;
    }
}
import { makeMaskCell32, MaskCellWrite } from "../../../data/cell/cells/MaskCell";
import { BuildArgs } from "../../../data/Settings";
import { SQL } from "../../SQLFiles";
import { SqlRow } from "../../../data/sql/SQLRow";
import { playercreateinfo_skillsRow } from "../../sql/playercreateinfo_skills";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Class/ClassRegistry";
import { RaceMask } from "../Race/RaceType";
import { SkillLineRegistry } from "./SkillLines";

// Always rewrite this table entirely so masks work
if(BuildArgs.WRITE_SERVER) {
    SQL.Databases.world_dest.read(`DELETE from \`playercreateinfo_skills\`;`)
}
SQL.playercreateinfo_skills.queryAll({})
    .forEach(x=>{
        SqlRow.markDirty(x)
    })

export class SkillAutolearn extends ClassRaceMaskEntry<playercreateinfo_skillsRow>
{
    get ClassMask(): MaskCellWrite<this,typeof ClassMask> {
        return makeMaskCell32(ClassMask, this,this.wrapUnlock(this.row.classMask));
    }
    get RaceMask(): MaskCellWrite<this,typeof RaceMask> {
        return makeMaskCell32(RaceMask, this,this.wrapUnlock(this.row.raceMask));
    }
    get Skill() {
        return SkillLineRegistry.readOnlyRef(this, this.row.skill);
    }
    get Rank() {
        return this.wrap(this.row.rank)
    }
}

export class SkillsAutolearn<T> extends ClassRaceMaskSystem<SkillAutolearn,playercreateinfo_skillsRow,T> {
    protected skill: number;
    constructor(owner: T, skill: number) {
        super(owner);
        this.skill = skill;
    }
    protected _addGet(classmask: number, racemask: number): SkillAutolearn {
        return new SkillAutolearn(
            SQL.playercreateinfo_skills.add(racemask,classmask,this.skill)
                .rank.set(0)
        )
    }
    protected getAllRows(): SkillAutolearn[] {
        return SQL.playercreateinfo_skills.queryAll({skill:this.skill})
            .map(x=>new SkillAutolearn(x))
    }
    protected isDeleted(value: SkillAutolearn): boolean {
        return value.row.isDeleted();
    }
}
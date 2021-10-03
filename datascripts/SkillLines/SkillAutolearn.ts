import { SQL } from "wotlkdata/sql/SQLFiles";
import { SqlRow } from "wotlkdata/sql/SQLRow";
import { playercreateinfo_skillsRow } from "wotlkdata/sql/types/playercreateinfo_skills";
import { ClassRaceMaskEntry, ClassRaceMaskSystem } from "../Class/ClassRaceData/ClassRaceMaskSystem";
import { ClassMask } from "../Misc/ClassMask";
import { RaceMask } from "../Misc/RaceMask";
import { SkillLineRegistry } from "./SkillLines";

// Always rewrite this table entirely so masks work

SQL.Databases.world_dest.read(`DELETE from \`playercreateinfo_skills\`;`)
SQL.playercreateinfo_skills.filter({})
   .forEach(x=>{
        SqlRow.markDirty(x)
   })

export class SkillAutolearn extends ClassRaceMaskEntry<playercreateinfo_skillsRow>
{
    get ClassMask(): ClassMask<this> {
        return new ClassMask(this,this.wrapUnlock(this.row.classMask));
    }
    get RaceMask(): RaceMask<this> {
        return new RaceMask(this, this.wrapUnlock(this.row.raceMask));
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
        return SQL.playercreateinfo_skills.filter({skill:this.skill})
            .map(x=>new SkillAutolearn(x))
    }
    protected isDeleted(value: SkillAutolearn): boolean {
        return value.row.isDeleted();
    }
}
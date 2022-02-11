import { CellSystem } from "../../../../data/cell/systems/CellSystem";
import { SQL } from "../../../SQLFiles";
import { ClassRacePair } from "./ClassRaces";

const playerCreateInfos: {
    [cls: number]: {
        [race: number]: {
            [skill: number]: number
        }
    }
} = {}

SQL.playercreateinfo_skills.queryAll({})
    .forEach(x=>{
        let classes: number[] = []
        let races: number[] = []
        let classmask = x.classMask.get();
        let racemask = x.raceMask.get();

        for(let i=0;i<31;++i) {
            if(classmask === 0 || classmask&1<<i) {
                classes.push(i+1)
            }
        }
        for(let i=0;i<31;++i) {
            if(racemask === 0 || racemask&1<<i) {
                races.push(i+1)
            }
        }
        const rank = x.rank.get();
        const skill = x.skill.get();
        classes.forEach((cls)=>{
            let clspci = playerCreateInfos[cls] || (playerCreateInfos[cls] = {})
            races.forEach((race)=>{
                let racepci = clspci[race] || (clspci[race] = {})
                racepci[skill] = rank;
            })
        })
    });

export class SkillAutolearn extends CellSystem<ClassRacePair> {
    protected skill: number;

    constructor(owner: ClassRacePair, skill: number) {
        super(owner);
        this.skill = skill;
    }

    remove() {
        return this.set(-1);
    }

    set(rank: number) {
        let clspci = playerCreateInfos[this.owner.Class.get()]
            || (playerCreateInfos[this.owner.Class.get()] = {})
        let racepci = clspci[this.owner.Race.get()] || (clspci[this.owner.Race.get()] = {})
        racepci[this.skill] = rank;
        return this.owner;
    }

    get() {
        let clspci = playerCreateInfos[this.owner.Class.get()];
        if(!clspci) return -1;
        let racepci = clspci[this.owner.Race.get()]
        if(!racepci) return -1;
        let rank = racepci[this.skill];
        return rank === undefined ? -1 : rank;
    }
}

export class ClassRaceEquipSkill extends CellSystem<ClassRacePair> {
    protected skill: number;
    constructor(owner: ClassRacePair, skill: number) {
        super(owner);
        this.skill = skill;
    }

    get Autolearn() { return new SkillAutolearn(this.owner, this.skill) }
}
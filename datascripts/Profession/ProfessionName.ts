import { Profession } from "./Profession";
import { Language } from "wotlkdata/dbc/Localization";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { loc_constructor } from "wotlkdata/primitives";
import { Spell } from "../Spell/Spell";
import { SkillLine } from "../SkillLines/SkillLine";
import { LocSystem } from "wotlkdata/cell/systems/CellSystem";
import { PendingCell } from "wotlkdata/cell/cells/PendingCell";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";

export abstract class ProfessionLocSystem extends LocSystem<Profession> {
    protected abstract forSpell(spell: Spell): LocSystem<any>
    protected abstract main(skillLine: SkillLine): LocSystem<any>

    protected allSystems() {
        let systems = [this.main(this.owner.skillLine)];

        for(let i=1;i<this.owner.GetHighestRank();++i) {
            systems.push(this.forSpell(this.owner.getSkillRank(i)));
        }
        if(this.owner.GetHighestRank()>0) {
            systems.push(this.forSpell(this.owner.ApprenticeLearnSpell));
        }

        return systems;
    }
    
    lang(lang: Language): Cell<string, Profession> & PendingCell {
        return new MulticastCell<string,Profession>(this.owner,this.allSystems().map(x=>x.lang(lang)));
    }
    get mask(): Cell<number, Profession> {
        return new MulticastCell<number,Profession>(this.owner,this.allSystems().map(x=>x.mask))
    }

    set(con: loc_constructor): Profession {
        this.allSystems().forEach(x=>x.set(con));
        return this.owner;
    }
}

export class ProfessionNameSystem extends ProfessionLocSystem {
    protected forSpell(spell: Spell): LocSystem<any> {
        return spell.Name;
    }
    protected main(skill: SkillLine): LocSystem<any> {
        return skill.Name;
    }
}

export class ProfessionDescriptionSystem extends ProfessionLocSystem {
    protected allSystems() {
        return super.allSystems().slice(1);
    }

    protected forSpell(spell: Spell): LocSystem<any> {
        return spell.Description;
    }

    protected main(skill: SkillLine): LocSystem<any> {
        return skill.Description;
    }
}
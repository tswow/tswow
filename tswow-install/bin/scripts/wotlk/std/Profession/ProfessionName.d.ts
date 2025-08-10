import { Cell } from "../../../data/cell/cells/Cell";
import { PendingCell } from "../../../data/cell/cells/PendingCell";
import { LocSystem } from "../../../data/cell/systems/CellSystem";
import { Language } from "../../../data/dbc/Localization";
import { loc_constructor } from "../../../data/primitives";
import { SkillLine } from "../SkillLines/SkillLine";
import { Spell } from "../Spell/Spell";
import { Profession } from "./Profession";
export declare abstract class ProfessionLocSystem extends LocSystem<Profession> {
    protected abstract forSpell(spell: Spell): LocSystem<any>;
    protected abstract main(skillLine: SkillLine): LocSystem<any>;
    protected allSystems(): LocSystem<any>[];
    lang(lang: Language): Cell<string, Profession> & PendingCell;
    get mask(): Cell<number, Profession>;
    set(con: loc_constructor): Profession;
}
export declare class ProfessionNameSystem extends ProfessionLocSystem {
    protected forSpell(spell: Spell): LocSystem<any>;
    protected main(skill: SkillLine): LocSystem<any>;
}
export declare class ProfessionDescriptionSystem extends ProfessionLocSystem {
    protected allSystems(): LocSystem<any>[];
    protected forSpell(spell: Spell): LocSystem<any>;
    protected main(skill: SkillLine): LocSystem<any>;
}

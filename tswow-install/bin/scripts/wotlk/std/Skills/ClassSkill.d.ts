import { SkillLineRow } from "../../dbc/SkillLine";
import { MainEntity } from "../Misc/Entity";
import { SpellIconCell } from "../Spell/SpellIcon";
/**
 * Represents a class skill type (Mage/Frost, Warlock/Destruction, Warrior/Arms etc.)
 *
 * Talent trees are completely separate from these.
 */
export declare class ClassSkill extends MainEntity<SkillLineRow> {
    get Description(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Icon(): SpellIconCell<this>;
}
export declare const ClassSkills: {
    load(id: number): ClassSkill;
    create(mod: string, id: string): ClassSkill;
};

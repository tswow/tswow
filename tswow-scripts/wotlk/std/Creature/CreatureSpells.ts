import { EnumCon, makeEnum, makeEnumCellReadOnly } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_template_spellRow } from "../../sql/creature_template_spell";
import { SQL } from "../../SQLFiles";
import { MainEntity } from "../Misc/Entity";
import { CreatureTemplateRegistry } from "./Creatures";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureSpell extends MainEntity<creature_template_spellRow> {
    get CreatureTemplate() {
        return CreatureTemplateRegistry.readOnlyRef(this, this.row.CreatureID)
    }
    get Index() {
        return this.wrapReadOnly(this.row.Index)
    }

    get Spell() { return this.wrap(this.row.Spell); }
}

export class CreatureSpells extends MultiRowSystem<CreatureSpell,CreatureTemplate> {
    protected getAllRows(): CreatureSpell[] {
        return SQL.creature_template_spell
            .queryAll({CreatureID:this.owner.ID})
            .map(x=>new CreatureSpell(x))
    }

    protected isDeleted(value: CreatureSpell): boolean {
        return value.isDeleted();
    }

    set(index: number, spell: number) {
        
        SQL.creature_template_spell
            .add(this.owner.ID,index)
            .Spell.set(spell)
        return this.owner;
    }
}
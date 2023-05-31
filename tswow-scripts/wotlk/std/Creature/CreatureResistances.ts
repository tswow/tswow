import { EnumCon, makeEnum, makeEnumCellReadOnly } from "../../../data/cell/cells/EnumCell";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_template_resistanceRow } from "../../sql/creature_template_resistance";
import { SQL } from "../../SQLFiles";
import { MainEntity } from "../Misc/Entity";
import { SchoolTypes } from "../Misc/School";
import { CreatureTemplateRegistry } from "./Creatures";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureResistance extends MainEntity<creature_template_resistanceRow> {
    get CreatureTemplate() {
        return CreatureTemplateRegistry.readOnlyRef(this, this.row.CreatureID)
    }

    get School() { return makeEnumCellReadOnly(SchoolTypes,this,this.row.School) }
    get Resistance() { return this.wrap(this.row.Resistance); }
}

export class CreatureResistances extends MultiRowSystem<CreatureResistance,CreatureTemplate> {
    protected getAllRows(): CreatureResistance[] {
        return SQL.creature_template_resistance
            .queryAll({CreatureID:this.owner.ID})
            .map(x=>new CreatureResistance(x))
    }

    protected isDeleted(value: CreatureResistance): boolean {
        return value.isDeleted();
    }

    add(school: EnumCon<SchoolTypes>, resistance: number) {
        let schoolId = makeEnum(SchoolTypes, school)
        let old = SQL.creature_template_resistance
            .query({CreatureID:this.owner.ID, School: schoolId})
        if(old) {
            old.Resistance.set(old.Resistance.get()+resistance);
        } else {
            SQL.creature_template_resistance
                .add(this.owner.ID,schoolId)
                .Resistance.set(resistance)
        }
        return this.owner;
    }
}
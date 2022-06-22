import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { creature_equip_templateRow } from "../../sql/creature_equip_template";
import { SQL } from "../../SQLFiles";
import { MainEntity } from "../Misc/Entity";
import { CreatureTemplateRegistry } from "./Creatures";
import { CreatureTemplate } from "./CreatureTemplate";

export class CreatureEquip extends MainEntity<creature_equip_templateRow> {
    get CreatureTemplate() {
        return CreatureTemplateRegistry.readOnlyRef(this, this.row.CreatureID);
    }
    get Index() { return this.row.ID.get(); }

    get RightHand() { return this.wrap(this.row.ItemID1); }
    get LeftHand() { return this.wrap(this.row.ItemID2); }
    get Ranged() { return this.wrap(this.row.ItemID3); }
}

export class CreatureEquipment extends MultiRowSystem<CreatureEquip,CreatureTemplate> {
    protected getAllRows(): CreatureEquip[] {
        return SQL.creature_equip_template
            .queryAll({CreatureID:this.owner.ID})
            .map(x=>new CreatureEquip(x))
    }

    protected isDeleted(value: CreatureEquip): boolean {
        return value.isDeleted();
    }

    add(rightHand: number = 0, leftHand: number = 0, ranged: number = 0) {
        // TODO: breaks when deleting rows
        let nextId = this.getAllRows().length+1
        SQL.creature_equip_template
            .add(this.owner.ID,nextId)
            .ItemID1.set(rightHand)
            .ItemID2.set(leftHand)
            .ItemID3.set(ranged)
        return this.owner;
    }
}
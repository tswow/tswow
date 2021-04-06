import { Subsystem } from "wotlkdata/cell/Subsystem";
import { ItemTemplate } from "./ItemTemplate";

type ItemAmmoType = 'NONE'|'ARROW'|'BULLET'

export class ItemAmmoTypes extends Subsystem<ItemTemplate> {
    set(type: ItemAmmoType) {
        switch(type) {
            case 'NONE':
                this.owner.row.ammo_type.set(0);
                break;
            case 'ARROW':
                this.owner.row.ammo_type.set(2);
                break;
            case 'BULLET':
                this.owner.row.ammo_type.set(3);
                break;
            default:
                throw new Error(`Invalid item ammo type: ${type}`);
        }
    }

    get() {
        switch(this.owner.row.ammo_type.get()) {
            case 2:
                return 'ARROW'
            case 3:
                return 'BULLET'
            default:
                return 'NONE';
        }
    }

    objectify() {
        return this.get();
    }
}
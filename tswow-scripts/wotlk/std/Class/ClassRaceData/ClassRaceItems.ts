import { SQL } from "../../../SQLFiles";
import { MultiRowSystem } from "../../../../data/cell/systems/MultiRowSystem";
import { playercreateinfo_itemRow } from "../../../sql/playercreateinfo_item";
import { ItemTemplateRegistry } from "../../Item/ItemTemplate";
import { MainEntity } from "../../Misc/Entity";
import { ClassRegistry } from "../ClassRegistry";
import { ClassRacePair } from "./ClassRaces";

export class ClassRaceItem extends MainEntity<playercreateinfo_itemRow> {
    get Race() { return this.wrapReadOnly(this.row.race); }
    get Class() { return ClassRegistry.readOnlyRef(this, this.row.class); }
    get Item() { return ItemTemplateRegistry.readOnlyRef(this, this.row.itemid); }
    get Amount() { return this.wrap(this.row.amount); }
}

export class ClassRaceItems extends MultiRowSystem<ClassRaceItem,ClassRacePair> {
    protected getAllRows(): ClassRaceItem[] {
        return SQL.playercreateinfo_item.queryAll(
            {
                  race:this.owner.Race.get()
                , class:this.owner.Class.get()
            })
            .map(x=>new ClassRaceItem(x))
    }
    protected isDeleted(value: ClassRaceItem): boolean {
        return value.row.isDeleted();
    }

    add(item: number, amount: number = 1) {
        SQL.playercreateinfo_item
            .add(this.owner.Race.get(),this.owner.Class.get(),item)
            .amount.set(amount);
        return this.owner;
    }
}

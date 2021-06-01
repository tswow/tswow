import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { makeRacemask, RaceType } from "../Race/RaceType";
import { Class } from "./Class";

export class ClassStartInventory extends CellSystem<Class> {
    add(items: number, amount: number, races: RaceType[] = []) {
        SQL.playercreateinfo_item.add(makeRacemask(races), this.owner.ID, items)
            .amount.set(amount)
        return this.owner;
    }
}
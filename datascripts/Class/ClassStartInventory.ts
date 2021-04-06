import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SQL } from "wotlkdata/sql/SQLFiles";
import { makeRacemask, RaceType, resolveRaceType } from "../Race/RaceType";
import { Class } from "./Class";

export class ClassStartInventory extends Subsystem<Class> {
    add(items: number, amount: number, races: RaceType[] = []) {
        SQL.playercreateinfo_item.add(makeRacemask(races), this.owner.ID, items)
            .amount.set(amount)
        return this.owner;
    }
}
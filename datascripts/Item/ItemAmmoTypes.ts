import { ItemTemplate } from "./ItemTemplate";
import { Enum } from "wotlkdata/cell/systems/Enum";

export class ItemAmmoTypes<T> extends Enum<T> {
    setNone() { return this.set(0); }
    setArrow() { return this.set(2); }
    setBullet() { return this.set(3); }
}
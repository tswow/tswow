import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class SkillCategory<T> extends EnumCell<T>{
    get Attribute()  { return this.value(5); }
    get Weapon()     { return this.value(6); }
    get Class()      { return this.value(7); }
    get Armor()      { return this.value(8); }
    get Secondary()  { return this.value(9); }
    get Language()   { return this.value(10); }
    get Profession() { return this.value(11); }
    get Generic()    { return this.value(12); }
}
import { EnumCell } from "wotlkdata/cell/cells/EnumCell";

export class CreatureFactionTemplate<T> extends EnumCell<T> {
    get NeutralNonAggressive() { return this.value(7)}
    get Stormwind()            { return this.value(11)}
    get NeutralHostile()       { return this.value(21)}
    get NeutralPassive()       { return this.value(35)}
    get Ironforge()            { return this.value(57)}
    get Gnomeregan()           { return this.value(64)}
    get Ratchet()              { return this.value(69)}
    get Undercity()            { return this.value(71)}
    get Darnassus()            { return this.value(79)}
    get Orgrimmar()            { return this.value(85)}
    get ThunderBluff()         { return this.value(105)}
    get BloodsailBuccaneers()  { return this.value(119)}
    get BootyBay()             { return this.value(121)}
    get DarkspearTrolls()      { return this.value(126)}
    get Gadgetzan()            { return this.value(474)}
    get CenarionCircle()       { return this.value(994)}
    get Silvermoon()           { return this.value(1604)}
    get Exodar()               { return this.value(1639)}
    get Shatar()               { return this.value(1741)}
    get KirinTor()             { return this.value(2007)}
}
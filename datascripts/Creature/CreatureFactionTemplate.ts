import { EnumCellWrapper } from "wotlkdata/cell/cells/EnumCell";

export class CreatureFactionTemplate<T> extends EnumCellWrapper<T> {
    setNeutralHostile() { return this.set(21); }
    setNeutralPassive() { return this.set(35); }
    setNeutralNonAggressive() { return this.set(7); }
    setSilvermoon() { return this.set(1604); }
    setOrgrimmar() { return this.set(85); }
    setUndercity() { return this.set(71); }
    setThunderBluff() { return this.set(105); }
    setStormwind() { return this.set(11); }
    setDarnassus() { return this.set(79); }
    setIronforge() { return this.set(57); }
    setExodar() { return this.set(1639); }
    setRatchet() { return this.set(69); }
    setBootyBay() { return this.set(121); }
    setGadgetzan() { return this.set(474); }
    setBloodsailBuccaneers() { return this.set(119); }
    setDarkspearTrolls() { return this.set(126); }
    setGnomeregan() { return this.set(64); }
    setShatar() { return this.set(1741); }
    setKirinTor() { return this.set(2007); }
    setCenarionCircle() { return this.set(994); }
}
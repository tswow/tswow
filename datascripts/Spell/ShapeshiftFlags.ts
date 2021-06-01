import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";

export class ShapeshiftFlags<T> extends MaskCell32<T> {
    get IsShapeshift() { return this.bit(0); }
    get PreventCancel() { return this.bit(1); }
    get AllowInteraction() { return this.bit(3); }
    get GetAttackContributionFromStat() { return this.bit(5); }
    get CanEquipItems() { return this.bit(6); }
    get CanUseItems() { return this.bit(7); }
    get CanAutoUnshift() { return this.bit(8); }
    get PreventLFG() { return this.bit(9); }
    get PreventNonShapeshiftSpells() { return this.bit(10); }
    get CancelAtFlightMaster() { return this.bit(11); }
    get PreventEmoteSound() { return this.bit(12); }
}
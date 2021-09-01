import { MaskCell32 } from "wotlkdata/cell/cells/MaskCell";
import { Enchantment } from "./Enchantment";

export class EnchantmentFlags extends MaskCell32<Enchantment> {
    get MakeSoulbound() { return this.bit(0); }
    get SuppressLog() { return this.bit(1); }

    /** eg. [Rockbiter] */
    get PlayerEnchantment() { return this.bit(3); }


    /**
     * Increments bonus by 1 (CalculateEnchantmentBonus)
     */
    get BonusIncrement() { return this.bit(5); }
    get Collectable() { return this.bit(8); }

    /**
     * "Hidden if not collected"
     */
    get Hidden() { return this.bit(9); }
}
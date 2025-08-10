import { Table } from "../../../data/table/Table";
import { SpellItemEnchantmentQuery, SpellItemEnchantmentRow } from "../../dbc/SpellItemEnchantment";
import { MainEntity } from "../Misc/Entity";
import { StaticIDGenerator } from "../Misc/Ids";
import { RegistryStatic } from "../Refs/Registry";
import { EnchantmentEffects } from "./EnchantmentEffect";
import { EnchantmentFlags } from "./EnchantmentFlags";
import { EnchantmentSpells } from "./EnchantmentSpells";
export declare class Enchantment extends MainEntity<SpellItemEnchantmentRow> {
    get Charges(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Effects(): EnchantmentEffects<this>;
    get ID(): number;
    /**
     * All spells that are used to cast this enchantment.
     *
     * For spells cast by the enchantment itself, see "Effects"
     */
    get EnchantSpells(): EnchantmentSpells;
    get ItemVisuals(): import("../Refs/Ref").RefDynamic<this, import("../Item/ItemVisualEffect").ItemVisuals>;
    get Flags(): import("../../../data/cell/cells/MaskCell").MaskCellWrite<this, typeof EnchantmentFlags>;
    get Condition(): import("../Refs/Ref").RefDynamic<this, import("./EnchantmentCondition").EnchantmentConditions>;
    get Name(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
}
export declare class EnchantmentRegistryClass extends RegistryStatic<Enchantment, SpellItemEnchantmentRow, SpellItemEnchantmentQuery> {
    protected Table(): Table<any, SpellItemEnchantmentQuery, SpellItemEnchantmentRow> & {
        add: (id: number) => SpellItemEnchantmentRow;
    };
    protected IDs(): StaticIDGenerator;
    Clear(r: Enchantment): void;
    protected Entity(r: SpellItemEnchantmentRow): Enchantment;
    protected FindByID(id: number): SpellItemEnchantmentRow;
    protected EmptyQuery(): SpellItemEnchantmentQuery;
    ID(e: Enchantment): number;
}
export declare const EnchantmentRegistry: EnchantmentRegistryClass;

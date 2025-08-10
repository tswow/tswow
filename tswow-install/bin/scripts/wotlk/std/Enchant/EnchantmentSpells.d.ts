import { CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { Spell } from "../Spell/Spell";
import { SpellItemEquips } from "../Spell/SpellItemEquips";
import { SpellReagents } from "../Spell/SpellReagents";
import { Enchantment } from "./Enchantment";
export declare class EnchantmentSpell extends CellSystemTop {
    protected readonly spell: Spell;
    constructor(spell: Spell);
    get ValidTarget(): SpellItemEquips<this>;
    get Reagents(): SpellReagents<this>;
    get Totems(): SingleArraySystem<number, this>;
    get CastTime(): import("../Spell/SpellCastTime").SpellCastTimeRef<this>;
    get SpellFocus(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get SpellName(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get SpellDescription(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get ItemName(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Subtext(): import("../../../data/cell/systems/CellSystem").WrappedLoc<this>;
    get Visual(): import("../Refs/Ref").RefDynamic<this, import("../Spell/SpellVisual").SpellVisual>;
    AsSpell(): Spell;
    get Item(): import("../Refs/Ref").RefStatic<this, import("../Item/ItemTemplate").ItemTemplate>;
}
export declare class EnchantmentSpells extends MultiRowSystem<EnchantmentSpell, Enchantment> {
    protected getAllRows(): EnchantmentSpell[];
    protected isDeleted(value: EnchantmentSpell): boolean;
    add(mod: string, id: string, createItem?: boolean): EnchantmentSpell;
    addMod(mod: string, id: string, createItem: boolean, callback?: (spell: EnchantmentSpell) => void): Enchantment;
}

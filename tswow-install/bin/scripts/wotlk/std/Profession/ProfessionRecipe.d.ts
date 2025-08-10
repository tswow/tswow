import { CellSystem, CellSystemTop } from "../../../data/cell/systems/CellSystem";
import { MultiRowSystem } from "../../../data/cell/systems/MultiRowSystem";
import { ShiftedNumberCell } from "../Misc/ShiftedNumberCell";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { Spell } from "../Spell/Spell";
import { SpellReagents } from "../Spell/SpellReagents";
import { Profession } from "./Profession";
import { ProfessionTier } from "./ProfessionType";
export declare class RecipeRank extends CellSystem<ProfessionRecipe> {
    protected readonly spell: Spell;
    constructor(owner: ProfessionRecipe, spell: Spell);
    get Yellow(): import("../../../data/cell/cells/Cell").CellWrapper<number, ProfessionRecipe>;
    get Gray(): import("../../../data/cell/cells/Cell").CellWrapper<number, ProfessionRecipe>;
    set(yellow: number, gray: number): ProfessionRecipe;
}
export declare class RecipeOutputItem extends CellSystem<ProfessionRecipe> {
    constructor(owner: ProfessionRecipe);
    set(item: number): ProfessionRecipe;
    get(): number;
}
export declare class ProfessionRecipe extends CellSystemTop {
    protected readonly spell: Spell;
    protected readonly profession: Profession;
    constructor(profession: Profession, spell: Spell);
    get SpellFocus(): import("../Refs/Ref").RefDynamic<this, import("../SpellFocus/SpellFocus").SpellFocus>;
    get ID(): number;
    get ProfessionID(): number;
    /**
     * Set to desired item count -1 (i.e. set to 199 for 200, or 0 for 1)
     */
    get OutputCount(): ShiftedNumberCell<this>;
    get OutputItem(): RecipeOutputItem;
    get Ranks(): RecipeRank;
    get Reagents(): SpellReagents<this>;
    get Totems(): SingleArraySystem<number, this>;
    get CastTime(): import("../Spell/SpellCastTime").SpellCastTimeRef<this>;
    LearnOnRank(rank: ProfessionTier): this;
    AsSpell(): Spell;
}
export declare class ProfessionRecipes extends MultiRowSystem<ProfessionRecipe, Profession> {
    protected getAllRows(): ProfessionRecipe[];
    protected isDeleted(value: ProfessionRecipe): boolean;
    addGet(mod: string, id: string): ProfessionRecipe;
    addMod(mod: string, id: string, callback: (recipe: ProfessionRecipe) => void): Profession;
}

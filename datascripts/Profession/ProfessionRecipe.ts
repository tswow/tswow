import { Spell } from "../Spell/Spell";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { Profession } from "./Profession";
import { SpellReagents } from "../Spell/SpellReagents";
import { std } from "../tswow-stdlib-data";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { SpellCastTimePointer } from "../Spell/SpellCastTime";
import { ArraySystem } from "wotlkdata/cell/systems/ArraySystem";

export class RecipeRank extends CellSystem<ProfessionRecipe> {
    protected readonly spell: Spell;

    constructor(owner: ProfessionRecipe, spell: Spell) {
        super(owner)
        this.spell = spell;
    }

    get Green() { return this.spell.SkillLines.get()[0].TrivialRank.Low; }
    get Gray() { return this.spell.SkillLines.get()[0].TrivialRank.High; }

    set(green: number, gray: number) {
        this.Green.set(green);
        this.Gray.set(gray);
        return this.owner;
    }
}

export class RecipeOutputItem extends CellSystem<ProfessionRecipe> {
    constructor(owner: ProfessionRecipe) {
        super(owner);
    }

    set(item: number) {
        this.owner.spell.Effects.mod(0,eff=>eff.ItemType.set(item))
        this.owner.spell.Name.enGB.set(std.Items.load(item).Name.enGB.get());
        return this.owner;
    }

    get() {
        return this.owner.spell.Effects.get(0).ItemType.get();
    }
}

export class ProfessionRecipe extends CellSystem<Profession> {
    readonly spell: Spell;

    constructor(owner: Profession, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get SpellFocus() { return this.wrap(this.spell.RequiresSpellFocus); }
    get ID() { return this.spell.ID; }

    /**
     * Set to desired item count -1 (i.e. set to 199 for 200, or 0 for 1)
     */
    get OutputCount() { return this.wrap(this.spell.Effects.get(0).BasePoints); }
    get OutputItem() { return new RecipeOutputItem(this); }
    get Ranks() { return new RecipeRank(this, this.spell); }
    get Reagents() { return new SpellReagents(this, this.spell); }
    get Totems() { return new SingleArraySystem(this,this.spell.row.RequiredTotemCategoryID,0); }
    get CastTime() { return new SpellCastTimePointer(this, this.spell.row.CastingTimeIndex); }
}
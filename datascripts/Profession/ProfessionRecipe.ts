import { Spell } from "../Spell/Spell";
import { Subsystem } from "wotlkdata/cell/Subsystem";
import { Profession } from "./Profession";
import { SpellReagents } from "../Spell/SpellReagents";
import { std } from "../tswow-stdlib-data";
import { SingleArraySystem } from "../Base/SingleArraySystem";
import { SpellCastTime } from "../Spell/SpellCastTime";
import { SpellAnimation } from "../Spell/SpellAnimation";
import { SoundEntry } from "../sound/SoundEntry";

export class RecipeRank extends Subsystem<ProfessionRecipe> {
    protected readonly spell: Spell;

    constructor(owner: ProfessionRecipe, spell: Spell) {
        super(owner)
        this.spell = spell;
    }

    get Green() { return this.spell.SkillLines.getIndex(0).TrivialSkillLineRankLow; }
    get Gray() { return this.spell.SkillLines.getIndex(0).TrivialSkillLineRankHigh; }

    set(green: number, gray: number) {
        this.Green.set(green);
        this.Gray.set(gray);
        return this.owner;
    }
}

export class RecipeOutputItem extends Subsystem<ProfessionRecipe> {
    constructor(owner: ProfessionRecipe) {
        super(owner);
    }

    set(item: number) {
        this.owner.spell.Effects.get(0).ItemType.set(item);
        this.owner.spell.Name.enGB.set(std.Items.load(item).Name.enGB.get());
        return this.owner;
    }

    get() {
        return this.owner.spell.Effects.get(0).ItemType.get();
    }
}

export class ProfessionRecipe extends Subsystem<Profession> {
    readonly spell: Spell;

    constructor(owner: Profession, spell: Spell) {
        super(owner);
        this.spell = spell;
    }

    get SpellFocus() { return this.wrap(this.spell.RequiresSpellFocus); }
    get ID() { return this.spell.ID; }
    get OutputItem() { return new RecipeOutputItem(this); }
    get Ranks() { return new RecipeRank(this, this.spell); }
    get Reagents() { return new SpellReagents(this, this.spell); }
    get Totems() { return new SingleArraySystem(this,this.spell.row.RequiredTotemCategoryID,0); }
    get CastTime() { return new SpellCastTime(this, [this.spell.row.CastingTimeIndex]); }

    get Animation() { return new SpellAnimation(this, this.spell.Visual.Precast.row.AnimID); }
    get Sound() { return new SoundEntry(this,this.spell.Visual.Precast.row.SoundID); }
}
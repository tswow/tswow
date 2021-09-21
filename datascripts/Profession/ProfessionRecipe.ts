import { CellSystem, CellSystemTop } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SingleArraySystem } from "../Misc/SingleArraySystem";
import { Spell } from "../Spell/Spell";
import { SpellCastTimeRegistry } from "../Spell/SpellCastTime";
import { SpellReagents } from "../Spell/SpellReagents";
import { SpellRegistry } from "../Spell/Spells";
import { std } from "../tswow-stdlib-data";
import { Profession } from "./Profession";
import { ProfessionTier } from "./ProfessionType";

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
        this.owner.AsSpell().Effects.mod(0,eff=>eff.ItemType.set(item))
        this.owner.AsSpell().Name.enGB.set(std.Items.load(item).Name.enGB.get());
        return this.owner;
    }

    get() {
        return this.owner.AsSpell().Effects.get(0).ItemType.get();
    }
}

export class ProfessionRecipe extends CellSystemTop {
    protected readonly spell: Spell;
    protected readonly profession: Profession;

    constructor(profession: Profession, spell: Spell) {
        super();
        this.profession = profession;
        this.spell = spell;
    }

    get SpellFocus() { return this.wrap(this.spell.RequiresSpellFocus); }
    get ID() { return this.spell.ID; }
    get ProfessionID() { return this.profession.ID; }

    /**
     * Set to desired item count -1 (i.e. set to 199 for 200, or 0 for 1)
     */
    get OutputCount() { return this.wrap(this.spell.Effects.get(0).BasePoints); }
    get OutputItem() { return new RecipeOutputItem(this); }
    get Ranks() { return new RecipeRank(this, this.spell); }
    get Reagents() { return new SpellReagents(this, this.spell); }
    get Totems() { return new SingleArraySystem(this,this.spell.row.RequiredTotemCategoryID,0); }
    get CastTime() { return SpellCastTimeRegistry.ref(this, this.spell.row.CastingTimeIndex); }

    LearnOnRank(rank: ProfessionTier) {
        this.profession.Ranks.get(rank).LearnSpells().forEach(x=>
            {
                x.Effects.addLearnSpells([this.ID]);
            })
        return this;
    }

    AsSpell() {
        return this.spell;
    }
}

export class ProfessionRecipes extends MultiRowSystem<ProfessionRecipe,Profession> {
    protected getAllRows(): ProfessionRecipe[] {
        return DBC.SkillLineAbility.filter({SkillLine:this.owner.ID})
            .map(x=>SpellRegistry.load(x.Spell.get()))
            .filter(x=>x.Effects.hasEffectType(23))
            .map(x=>new ProfessionRecipe(this.owner, x))
    }
    protected isDeleted(value: ProfessionRecipe): boolean {
        return value.AsSpell().row.isDeleted()
    }

    addGet(mod: string, id: string) {
        return new ProfessionRecipe(
              this.owner
            , SpellRegistry.create(mod,id)
                    .Attributes.isAbility.set(true)
                    .Attributes.isTradeSpell.set(true)
                    .Attributes.notShapeshifted.set(true)
                    .Attributes.noThreat.set(true)
                    .InterruptFlags.OnMovement.set(true)
                    .InterruptFlags.OnPushback.set(true)
                    .InterruptFlags.OnInterruptCast.set(true)
                    .Effects.addMod((effect)=>{
                        effect.EffectType.CreateItem.set()
                              .TargetA.UnitCaster.set()
                    })
                    .SkillLines
                    .addMod(this.owner.ID)
            )
    }

    addMod(mod: string, id: string, callback: (recipe: ProfessionRecipe)=>void) {
        callback(this.addGet(mod,id));
        return this.owner;
    }
}
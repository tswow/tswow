import { MainSystem } from "wotlkdata/cell/MainSystem";
import { Spell } from "../Spell";
import { SpellPower } from "../SpellPower";
import { SpellRecovery } from "../SpellRecovery";
import { SharedRefs } from "../../Refs/SharedRefs";
import { SingleArraySystem } from "../../Base/SingleArraySystem";
import { SpellReagents } from "../SpellReagents";
import { SpellIconCell } from "../SpellIcon";

export class SpellTemplate extends MainSystem {
    readonly spell: Spell
    get row() { return this.spell.row; }

    constructor(spell: Spell) {
        super();
        this.spell = spell;
    }

    get Name() { return this.wrapLoc(this.spell.Name); }
    get Subtext() { return this.wrapLoc(this.spell.Subtext); }
    get Description() { return this.wrapLoc(this.spell.Description); }
    get Mana() { return new SpellPower(this,this.spell); }
    get Cooldown() { return new SpellRecovery(this, this.spell); }
    get CastTime() { return SharedRefs.getOrCreateCastTime(this, this.spell); }

    get Totems() { return new SingleArraySystem(this,this.row.Totem,0); }
    get Reagents() { return new SpellReagents(this,this.spell); }

    get Icon() { return new SpellIconCell(this, this.row.SpellIconID); }

    protected findEffect(effId: number) {
        for(let i=0;i<this.spell.Effects.length;++i) {
            let eff = this.spell.Effects.get(i);
            if(eff.EffectType.get()==effId) return eff;
        }
        throw new Error(`Spell ${this.spell.ID} has no effect ${effId}`);
    }
}
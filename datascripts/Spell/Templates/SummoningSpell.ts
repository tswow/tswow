import { SpellTemplate } from "./SpellTemplate";
import { Spells } from "../Spells";

export class SummoningSpell extends SpellTemplate {
    get SummonedPet() {
        return this.wrap(this.findEffect(56).MiscValueA);
    }

    static create(mod: string, id: string) {
        return new SummoningSpell(Spells.create(mod,id,688));
    }
}
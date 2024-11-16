import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { SQL } from "../../SQLFiles";
import { TrainerSpell } from "../Trainer/Trainer";

export class TrainerSpells<T> extends CellSystem<T>{
    @Transient
    spellId: number;

    constructor(owner: T, spellId: number) {
        super(owner);
        this.spellId = spellId;
    }

    protected getAllRows(): TrainerSpell[] {
        return SQL.trainer_spell
            .queryAll({SpellId:this.spellId})
            .map(x=>new TrainerSpell(x))
    }
    protected isDeleted(value: TrainerSpell): boolean {
        return value.row.isDeleted();
    }

    add(trainer: number,cost = 0, reqLevel = 0, reqSkillLine = 0, reqSkillRank = 0, reqAbilities: number[] = []) {
        SQL.trainer_spell.add(trainer, this.spellId)
            .MoneyCost.set(cost)
            .ReqLevel.set(reqLevel)
            .ReqSkillLine.set(reqSkillLine)
            .ReqSkillRank.set(reqSkillRank)
            .ReqLevel.set(reqLevel)
            .ReqAbility1.set(reqAbilities[0]||0)
            .ReqAbility2.set(reqAbilities[1]||0)
            .ReqAbility3.set(reqAbilities[2]||0)
            .VerifiedBuild.set(17688);
        return this.owner;
    }

    addGet(spellId: number) {
        return new TrainerSpell(
                SQL.trainer_spell.add(this.spellId,spellId)
                   .VerifiedBuild.set(17688)
            )
            .Cost.set(0)
            .ReqAbilities.clearAll()
            .RequiredLevel.set(0)
    }

    addMod(spellId: number, callback: (spells: TrainerSpell)=>void) {
        callback(this.addGet(spellId));
        return this.owner;
    }
}
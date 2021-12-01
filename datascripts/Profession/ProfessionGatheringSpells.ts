import { DBC } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/wotlkdata/cell/systems/MultiRowSystem";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";
import { Profession } from "./Profession";

export class ProfessionGatheringSpells extends MultiRowSystem<Spell,Profession> {
    protected getAllRows(): Spell[] {
        return DBC.SkillLineAbility.queryAll({SkillLine:this.owner.ID})
            .map(x=>SpellRegistry.load(x.Spell.get()))
            .filter(x=>
                   x.Effects.find(y=>y.Type.OPEN_LOCK.is())
                && x.Effects.find(y=>y.Type.SKILL.is())
            )
    }

    protected isDeleted(value: Spell): boolean {
        return value.row.isDeleted();
    }

    addGet(mod: string, id: string, lockType: number, autoLearnAt: number = 0) {
        let spl = SpellRegistry.create(mod,id)
        .Attributes.IS_HIDDEN_IN_SPELLBOOK.set(true)
        .Attributes.IS_HIDDEN_FROM_LOG.set(true)
        .Attributes.UNK41.set(true)
        .SkillLines.addMod(this.owner.ID,undefined,undefined)
        .Effects.addMod((eff)=>{
            eff.Type.OPEN_LOCK.set()
            .ImplicitTargetA.GAMEOBJECT_TARGET.set()
            .LockType.set(lockType)
            .AsEffect.get()
            .PointsBase.set(-1)
            .PointsPerLevel.set(5)
            .Radius.setSimple(2,0,2)
            .ChainAmplitude.set(1)
        })
        .Effects.addMod((eff)=>{
            eff.Type.SKILL.set()
            .AsEffect.get()
            .MiscValueA.set(this.owner.ID)
            .PointsDieSides.set(1)
            .ChainAmplitude.set(1)
            .BonusMultiplier.set(1)
        })
        .SchoolMask.setBit(0,true)
        .InterruptFlags.ON_MOVEMENT.set(true)
        .InterruptFlags.ON_PUSHBACK.set(true)
        .InterruptFlags.ON_INTERRUPT_CAST.set(true)
        .InterruptFlags.setBit(3,true)
        .InterruptFlags.setBit(4,true)
        // 12 is the one used by mining
        .Range.set(12)
        if(autoLearnAt>=0) {
            this.owner.Ranks.get(autoLearnAt).LearnSpells().forEach(x=>{
                x.Effects.addLearnSpells([spl.ID])
            })
        }
        return spl;
    }

    addMod(mod: string, id: string, lockType: number, autoLearnAt: number = 0, callback: (spell: Spell)=>void = ()=>{}) {
        callback(this.addGet(mod,id,lockType,autoLearnAt));
        return this.owner;
    }
}
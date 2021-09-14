import { DBC } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { Spell } from "../Spell/Spell";
import { Spells } from "../Spell/Spells";
import { Profession } from "./Profession";

export class ProfessionGatheringSpells extends MultiRowSystem<Spell,Profession> {
    protected getAllRows(): Spell[] {
        return DBC.SkillLineAbility.filter({SkillLine:this.owner.ID})
            .map(x=>Spells.load(x.Spell.get()))
            .filter(x=>x.Effects.hasEffectType(33) && x.Effects.hasEffectType(118))
    }

    protected isDeleted(value: Spell): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, id: string, lockType: number, autoLearnAt: number = 0) {
        let spl = Spells.create(mod,id)
        .Attributes.isHiddenInSpellbook.set(true)
        .Attributes.isHiddenFromLog.set(true)
        .Attributes.unk41.set(true)
        .SkillLines.addMod(this.owner.ID)
        .Effects.addMod((eff)=>{
            eff.EffectType.OpenLock.set()
            .TargetA.GameobjectTarget.set()
            .LockType.set(lockType)
            .AsRawEffect()
            .BasePoints.set(-1)
            .PointsPerLevel.set(5)
            .Radius.modRefCopy(x=>x.set(2,0,2))
            .ChainAmplitude.set(1)
        })
        .Effects.addMod((eff)=>{
            eff.EffectType.Skill.set()
            .AsRawEffect()
            .MiscValueA.set(this.owner.ID)
            .DieSides.set(1)
            .ChainAmplitude.set(1)
            .BonusMultiplier.set(1)
        })
        .SchoolMask.setBit(0,true)
        .InterruptFlags.OnMovement.set(true)
        .InterruptFlags.OnPushback.set(true)
        .InterruptFlags.OnInterruptCast.set(true)
        .InterruptFlags.setBit(3,true)
        .InterruptFlags.setBit(4,true)
        // 12 is the one used by mining
        .Range.set(12)
        if(autoLearnAt>=0) {
            this.owner.Ranks.get(autoLearnAt).LearnSpells().forEach(x=>{
                x.Effects.addLearnSpells(spl.ID)
            })
        }
        return spl;
    }

    addMod(mod: string, id: string, lockType: number, autoLearnAt: number = 0, callback: (spell: Spell)=>void = ()=>{}) {
        callback(this.add(mod,id,lockType,autoLearnAt));
        return this.owner;
    }
}
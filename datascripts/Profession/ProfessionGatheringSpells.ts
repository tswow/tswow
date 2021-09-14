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
        .Attributes.isHiddenInSpellbook.mark()
        .Attributes.isHiddenFromLog.mark()
        .Attributes.unk41.mark()
        .SkillLines.addMod(this.owner.ID)
        .Effects.modFree((eff)=>{
            eff.EffectType.OpenLock.set()
            .TargetA.GameobjectTarget.set()
            .LockType.set(lockType)
            .AsRawEffect()
            .BasePoints.set(-1)
            .PointsPerLevel.set(5)
            .Radius.modRefCopy(x=>x.set(2,0,2))
            .ChainAmplitude.set(1)
        })
        .Effects.modFree((eff)=>{
            eff.EffectType.Skill.set()
            .AsRawEffect()
            .MiscValueA.set(this.owner.ID)
            .DieSides.set(1)
            .ChainAmplitude.set(1)
            .BonusMultiplier.set(1)
        })
        .SchoolMask.mark(0)
        .InterruptFlags.OnMovement.mark()
        .InterruptFlags.OnPushback.mark()
        .InterruptFlags.OnInterruptCast.mark()
        .InterruptFlags.mark(3)
        .InterruptFlags.mark(4)
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
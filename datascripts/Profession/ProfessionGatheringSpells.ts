import { DBC } from "wotlkdata";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";
import { Profession } from "./Profession";

export class ProfessionGatheringSpells extends MultiRowSystem<Spell,Profession> {
    protected getAllRows(): Spell[] {
        return DBC.SkillLineAbility.filter({SkillLine:this.owner.ID})
            .map(x=>SpellRegistry.load(x.Spell.get()))
            .filter(x=>
                   x.Effects.find(y=>y.Type.OpenLock.is())
                && x.Effects.find(y=>y.Type.Skill.is())
            )
    }

    protected isDeleted(value: Spell): boolean {
        return value.row.isDeleted();
    }

    add(mod: string, id: string, lockType: number, autoLearnAt: number = 0) {
        let spl = SpellRegistry.create(mod,id)
        .Attributes.isHiddenInSpellbook.set(true)
        .Attributes.isHiddenFromLog.set(true)
        .Attributes.unk41.set(true)
        .SkillLines.addMod(this.owner.ID,undefined,undefined)
        .Effects.addMod((eff)=>{
            eff.Type.OpenLock.set()
            .TargetA.GameobjectTarget.set()
            .LockType.set(lockType)
            .AsEffect.get()
            .BasePoints.set(-1)
            .PointsPerLevel.set(5)
            .Radius.setSimple(2,0,2)
            .ChainAmplitude.set(1)
        })
        .Effects.addMod((eff)=>{
            eff.Type.Skill.set()
            .AsEffect.get()
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
                x.Effects.addLearnSpells([spl.ID])
            })
        }
        return spl;
    }

    addMod(mod: string, id: string, lockType: number, autoLearnAt: number = 0, callback: (spell: Spell)=>void = ()=>{}) {
        callback(this.add(mod,id,lockType,autoLearnAt));
        return this.owner;
    }
}
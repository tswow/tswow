import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SpellQuery, SpellRow } from "wotlkdata/dbc/types/Spell";
import { CreatureTemplateRef } from "../Creature/CreatureTemplate";
import { Items, ItemTemplate } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { SelfRef } from "../Refs/Ref";
import { Spell } from "../Spell/Spell";
import { Spells } from "../Spell/Spells";

const SUMMON_EFFECT_INDEX = 28;
const COMPANION_SKILLINE = 778
const DEFAULT_COMPANION_VISUAL = 353

export class CompanionItems extends MultiRowSystem<ItemTemplate,Companion> {
    protected getAllRows(): ItemTemplate[] {
        return Items.filter({spelltrigger_1:6,spellid_1:this.owner.ID})
            .concat(Items.filter({spelltrigger_2:6,spellid_2:this.owner.ID}))
            .concat(Items.filter({spelltrigger_3:6,spellid_3:this.owner.ID}))
            .concat(Items.filter({spelltrigger_4:6,spellid_4:this.owner.ID}))
            .concat(Items.filter({spelltrigger_5:6,spellid_5:this.owner.ID}))
            .filter((x,i,arr)=>arr.findIndex(y=>y.ID==x.ID)===i);
    }

    protected isDeleted(value: ItemTemplate): boolean {
        return value.row.isDeleted()
    }

    add(mod: string, id: string) {
        const spell = Spells.create(mod,id)
            .Icon.set('Interface\\Icons\\Trade_Engineering')
            .Effects.modFree(efffect=>{
                efffect.EffectType.LearnSpell.set()
                    .LearntSpell.set(this.owner.ID)
                    .ImplicitTargetA.SrcCaster.set()
                    .ChainAmplitude.set(1)
            })
            .StanceBarOrder.set(4294967295)
            .InterruptFlags.OnMovement.mark()
            .InterruptFlags.OnPushback.mark()
            .InterruptFlags.OnInterruptCast.mark()
            .InterruptFlags.mark(3)

        Items.create(mod,id)
            .Name.set(this.owner.Spell.get().Name.objectify())
            .Quality.Blue.set()
            .ClassMask.set(-1)
            .Bonding.BindsOnPickup.set()
            .Class.setMount()
            .Material.Liquid.set()
            .InventoryType.NonEquippable.set()
            .Spells.modFree((ispell=>{
                ispell.SpellID.set(spell.ID)
                     .Category.set(330)
                     .Trigger.OnUse.set()
                     .Charges.set(-1)
                     .ProcsPerMinute.set(0)
                     .Cooldown.set(-1)
                     .CategoryCooldown.set(3000)
            }))
            .Spells.modFree((spell=>{
                spell.SpellID.set(this.owner.ID)
                    .Category.set(0)
                    .Trigger.OnLearn.set()
                    .Charges.set(0)
                    .ProcsPerMinute.set(0)
                    .Cooldown.set(0)
                    .CategoryCooldown.set(0)
            }))
        return this.owner;
    }
}

export class Companion extends MainEntity<SpellRow> {
    protected mountIndex() {
        // only one mount index is valid
        let index = this.Spell.get().Effects.effectIndex(SUMMON_EFFECT_INDEX)
        if(index<0) {
            throw new Error(`Invalid mount spell: ${this.ID} has no mount effect!`)
        }
        return index;
    }

    get Items() { return new CompanionItems(this); }
    get Creature() {
        return new CreatureTemplateRef(
              this
            , this.wrapIndex(this.row.EffectMiscValue,this.mountIndex())
        )
    }
    get Spell() { return new SelfRef(this, ()=>new Spell(this.row)); }
    get ID() { return this.row.ID.get(); }
}

export const CompanionRegistry = {
    create(mod: string,id: string) {
        let spell = Spells.create(mod,id)
            .Attributes.isAbility.mark()
            .Attributes.isHiddenFromLog.mark()
            .Attributes.sheatheUnchanged.mark()
            .Attributes.ignoreBonuses.mark()
            .Duration.setRefID(21)
            .Range.setRefID(1)
            .Cooldown.set(0,0,1500,133)
            .CastTime.setRefID(1)
            .InterruptFlags.OnMovement.mark()
            .InterruptFlags.OnPushback.mark()
            .InterruptFlags.OnInterruptCast.mark()
            .InterruptFlags.mark(3)
            .InterruptFlags.mark(4)
            .Visual.setRefID(DEFAULT_COMPANION_VISUAL)
            .SkillLines.modAdd(COMPANION_SKILLINE,false,sla=>{
                sla.MinSkillRank.set(1)
            })
            .Effects.modFree(effects=>{
                effects.EffectType.Summon.set()
                    .SummonProperties.set(41)
                    .SummonedCreature.set(0)
                    .TargetA.DestCasterSummon.set()
            })
        return new Companion(spell.row);
    },

    createWithItem(mod: string, id: string) {
        return this.create(mod,id)
            .Items.add(mod,`${id}-item`)
    },

    load(id: number) {
        let spell = Spells.load(id)
        if(!spell || spell.Effects.effectIndex(SUMMON_EFFECT_INDEX)<0) {
            return undefined;
        }
        return new Companion(spell.row);
    },

    filter(query: SpellQuery) {
        return Spells.filter({...query,Effect:SUMMON_EFFECT_INDEX})
            .filter(x=>x.SkillLines
                .filter(y=>y.SkillLine.get()===COMPANION_SKILLINE).length>0)
            .map(x=>new Companion(x.row))
    },

    find(query: SpellQuery) {
        let spell = Spells.filter({...query,EffectAura:SUMMON_EFFECT_INDEX})
            .filter(x=>x.SkillLines
                .filter(y=>y.SkillLine.get()===COMPANION_SKILLINE).length>0)
        return spell.length>0 ? new Companion(spell[0].row) : undefined;
    }
}
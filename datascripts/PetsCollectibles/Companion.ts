import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SpellQuery, SpellRow } from "wotlkdata/dbc/types/Spell";
import { Table } from "wotlkdata/table/Table";
import { CreatureTemplateRef } from "../Creature/CreatureTemplate";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { SelfRef } from "../Refs/RefOld";
import { RegistryStatic } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";

const SUMMON_EFFECT_INDEX = 28;
const COMPANION_SKILLINE = 778
const DEFAULT_COMPANION_VISUAL = 353

export class CompanionItems extends MultiRowSystem<ItemTemplate,Companion> {
    protected getAllRows(): ItemTemplate[] {
        // TODO: inefficient query
        return ItemTemplateRegistry.queryAll({spelltrigger_1:6,spellid_1:this.owner.ID})
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_2:6,spellid_2:this.owner.ID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_3:6,spellid_3:this.owner.ID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_4:6,spellid_4:this.owner.ID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_5:6,spellid_5:this.owner.ID}))
            .filter((x,i,arr)=>arr.findIndex(y=>y.ID==x.ID)===i);
    }

    protected isDeleted(value: ItemTemplate): boolean {
        return value.row.isDeleted()
    }

    add(mod: string, id: string) {
        const spell = SpellRegistry.create(mod,id)
            .Icon.set('Interface\\Icons\\Trade_Engineering')
            .Effects.addMod(efffect=>{
                efffect.EffectType.LearnSpell.set()
                    .LearntSpell.set(this.owner.ID)
                    .ImplicitTargetA.SrcCaster.set()
                    .ChainAmplitude.set(1)
            })
            .StanceBarOrder.set(4294967295)
            .InterruptFlags.OnMovement.set(true)
            .InterruptFlags.OnPushback.set(true)
            .InterruptFlags.OnInterruptCast.set(true)
            .InterruptFlags.setBit(3, true)

        ItemTemplateRegistry.create(mod,id)
            .Name.set(this.owner.Spell.get().Name.objectify())
            .Quality.Blue.set()
            .ClassMask.set(-1)
            .Bonding.BindsOnPickup.set()
            .Class.setMount()
            .Material.Liquid.set()
            .InventoryType.NonEquippable.set()
            .Spells.addMod((ispell=>{
                ispell.Spell.set(spell.ID)
                     .Category.set(330)
                     .Trigger.OnUse.set()
                     .Charges.set(-1)
                     .ProcsPerMinute.set(0)
                     .Cooldown.set(-1)
                     .CategoryCooldown.set(3000)
            }))
            .Spells.addMod((spell=>{
                spell.Spell.set(this.owner.ID)
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

export class CompanionRegistryClass
    extends RegistryStatic<Companion,SpellRow,SpellQuery>
{
    protected Table(): Table<any, SpellQuery, SpellRow> & { add: (id: number) => SpellRow; } {
        return DBC.Spell
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Spell
    }
    Clear(r: Companion): void {
        SpellRegistry.Clear(r.Spell.get())
        r.Spell.get()
            .Attributes.isAbility.set(true)
            .Attributes.isHiddenFromLog.set(true)
            .Attributes.sheatheUnchanged.set(true)
            .Attributes.ignoreBonuses.set(true)
            .Duration.set(21)
            .Range.set(1)
            .Cooldown.set(0,0,1500,133)
            .CastTime.set(1)
            .InterruptFlags.OnMovement.set(true)
            .InterruptFlags.OnPushback.set(true)
            .InterruptFlags.OnInterruptCast.set(true)
            .InterruptFlags.setBit(3,true)
            .InterruptFlags.setBit(4,true)
            .Visual.set(DEFAULT_COMPANION_VISUAL)
            .SkillLines.addMod(COMPANION_SKILLINE,false,sla=>{
                sla.MinSkillRank.set(1)
            })
            .Effects.addMod(effects=>{
                effects.EffectType.Summon.set()
                    .SummonProperties.set(41)
                    .SummonedCreature.set(0)
                    .TargetA.DestCasterSummon.set()
            })
    }

    createWithItem(mod: string, name: string, itemCount = 1) {
        let companion = this.create(mod,name);
        for(let i=0;i<itemCount;++i) {
            companion.Items.add(mod,`${name}-item-${i}`)
        }
        return companion;
    }

    protected Clone(mod: string, name: string, r: Companion, parent: Companion): void {
        throw new Error("Method not implemented.");
    }
    protected Entity(r: SpellRow): Companion {
        return new Companion(r);
    }
    protected FindByID(id: number): SpellRow {
        return DBC.Spell.findById(id);
    }
    protected EmptyQuery(): SpellQuery {
        return {}
    }
    protected ID(e: Companion): number {
        return e.ID;
    }
}

export const CompanionRegistry = new CompanionRegistryClass();
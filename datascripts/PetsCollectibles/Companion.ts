import { LocSystem, MulticastLocCell } from "wotlkdata/cell/systems/CellSystem";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { SpellQuery, SpellRow } from "wotlkdata/dbc/types/Spell";
import { Table } from "wotlkdata/table/Table";
import { CreatureModels } from "../Creature/CreatureModels";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { Ids, StaticIDGenerator } from "../Misc/Ids";
import { SelfRef } from "../Refs/Ref";
import { RegistryStaticNoClone } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { SpellCastTimeRegistry } from "../Spell/SpellCastTime";
import { SpellRegistry } from "../Spell/Spells";
import { SpellVisualRegistry } from "../Spell/SpellVisual";
import { CollectibleIcon } from "./CollectibleIcon";

const COMPANION_SKILLINE = 778
const DEFAULT_COMPANION_VISUAL = 353

export class CompanionItems extends MultiRowSystem<ItemTemplate,Companion> {
    protected getAllRows(): ItemTemplate[] {
        // TODO: inefficient query
        return ItemTemplateRegistry.queryAll({spelltrigger_1:6,spellid_1:this.owner.SpellID})
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_2:6,spellid_2:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_3:6,spellid_3:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_4:6,spellid_4:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_5:6,spellid_5:this.owner.SpellID}))
            .filter((x,i,arr)=>arr.findIndex(y=>y.ID==x.ID)===i);
    }

    protected isDeleted(value: ItemTemplate): boolean {
        return value.row.isDeleted()
    }

    add(mod: string, id: string) {
        const spell = SpellRegistry.create(mod,`${id}-spell`)
            .Icon.set('Interface\\Icons\\Trade_Engineering')
            .Effects.addMod(efffect=>{
                efffect.Type.LearnSpell.set()
                    .LearntSpell.set(this.owner.SpellID)
                    .ImplicitTargetA.SrcCaster.set()
                    .ChainAmplitude.set(1)
            })
            .StanceBarOrder.set(4294967295)
            .InterruptFlags.OnMovement.set(true)
            .InterruptFlags.OnPushback.set(true)
            .InterruptFlags.OnInterruptCast.set(true)
            .InterruptFlags.setBit(3, true)

        ItemTemplateRegistry.create(mod,`${id}-item`)
            .Name.set(this.owner.AsSpell.get().Name.objectify())
            .Quality.Blue.set()
            .ClassMask.set(-1)
            .Bonding.BindsOnPickup.set()
            .Class.Pet.set()
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
                spell.Spell.set(this.owner.SpellID)
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
        return this.AsSpell.get().Effects
            .indexOf(x=>x.Type.Summon.is())
    }

    get Items() { return new CompanionItems(this); }
    get CreatureTemplate() {
        return CreatureTemplateRegistry.ref(
              this
            , this.wrapIndex(this.row.EffectMiscValue,this.mountIndex())
        )
    }
    get AsSpell() { return new SelfRef(this, ()=>new Spell(this.row)); }
    get SpellID() { return this.row.ID.get(); }
    get Icon() {
        return new CollectibleIcon(
              this
            , ()=>({spell:this.AsSpell.get(),items: this.Items.get()})
        )
    }
    get Name() {
        return new MulticastLocCell(
            this
            ,([this.AsSpell.get().Name] as LocSystem<any>[])
                .concat(this.Items.map(x=>x.Name))
                .concat(this.CreatureTemplate.exists()
                    ? [this.CreatureTemplate.getRef().Name]
                    :[]
                )
        )
    }

    get CastTime() {
        return SpellCastTimeRegistry.ref(this, this.AsSpell.get().CastTime)
    }

    get Models() {
        return new CreatureModels(this, this.CreatureTemplate.getRef().row)
    }

    get SpellVisual() {
        return SpellVisualRegistry.ref(this, this.AsSpell.get().Visual);
    }
}

export class CompanionRegistryClass
    extends RegistryStaticNoClone<Companion,SpellRow,SpellQuery>
{
    protected Table(): Table<any, SpellQuery, SpellRow> & { add: (id: number) => SpellRow; } {
        return DBC.Spell
    }
    protected IDs(): StaticIDGenerator {
        return Ids.Spell
    }
    Clear(r: Companion): void {
        SpellRegistry.Clear(r.AsSpell.get())
        r.AsSpell.get()
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
            .SkillLines.addMod(COMPANION_SKILLINE,undefined,undefined,sla=>{
                sla.MinSkillRank.set(1)
            })
            .Effects.addMod(effects=>{
                effects.Type.Summon.set()
                    .SummonProperties.set(41)
                    .SummonedCreature.set(0)
                    .TargetA.DestCasterSummon.set()
            })
    }

    create(mod: string, id: string, createItem = true, createCreature = true) {
        let companion = super.create(mod,id);
        if(createItem) companion.Items.add(mod,`${id}-item`)
        if(createCreature) companion.CreatureTemplate.getRefCopy(mod,`${id}-creature`)
        return companion
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
    ID(e: Companion): number {
        return e.SpellID;
    }
}

export const CompanionRegistry = new CompanionRegistryClass();
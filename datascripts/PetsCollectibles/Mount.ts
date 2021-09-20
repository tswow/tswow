import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { MultiRowSystem } from "wotlkdata/cell/systems/MultiRowSystem";
import { SpellQuery, SpellRow } from "wotlkdata/dbc/types/Spell";
import { Table } from "wotlkdata/table/Table";
import { CreatureTemplateRef } from "../Creature/CreatureTemplate";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { RefNoCreate } from "../Refs/Ref";
import { SelfRef } from "../Refs/RefOld";
import { RegistryRowBase } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { SpellRegistry } from "../Spell/Spells";

const MOUNT_AURA_TYPE = 78;
const MOUNT_SKILL = 762;
const DEFAULT_MOUNT_RANK = 75;

export class MountItems extends MultiRowSystem<ItemTemplate,Mount> {
    protected getAllRows(): ItemTemplate[] {
        return ItemTemplateRegistry
            .queryAll({spelltrigger_1:6,spellid_1:this.owner.ID})
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
            .Requirements.Skill.set(MOUNT_SKILL,DEFAULT_MOUNT_RANK)
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
    }
}

export class Mount extends MainEntity<SpellRow> {
    protected mountIndex() {
        // only one mount index is valid
        let index = this.Spell.get().Effects.auraIndex(MOUNT_AURA_TYPE)
        if(index<0) {
            throw new Error(`Invalid mount spell: ${this.ID} has no mount effect!`)
        }
        return index;
    }

    get ID() { return this.row.ID.get(); }
    /**
     * @warning Currently, tswow can only find Mount items that are implemented by specifying its spell id
     * in one of the items spells with a "learn (6)" spell item trigger.
     * This misses ~20 mounts that have a real spell to learn it instead (which may or may not have an item to trigger it),
     * and an additional ~80 mounts that have seemingly no way to learn to learn it at all.
     */
    get Items() { return new MountItems(this); }
    get Creature() {
        return new CreatureTemplateRef(
              this
            , this.wrapIndex(this.row.EffectMiscValue,this.mountIndex())
        )
    }

    get Spell() { return new SelfRef(this, ()=>new Spell(this.row)); }
}

export class MountRegistryClass
    extends RegistryRowBase<Mount,SpellRow,SpellQuery>
{
    ref<T>(owner: T, cell: Cell<number,any>) {
        return new RefNoCreate(owner, cell, this);
    }

    protected Entity(r: SpellRow): Mount {
        return new Mount(r);
    }
    protected FindByID(id: number): SpellRow {
        return DBC.Spell.findById(id);
    }
    protected EmptyQuery(): SpellQuery {
        return {}
    }
    protected ID(e: Mount): number {
        return e.ID;
    }
    protected Table(): Table<any, SpellQuery, SpellRow> {
        return DBC.Spell;
    }

    createWithItem(mod: string, id: string, speed: number, flightSpeed = 0) {
        let mount = this.createSimple(mod,id,speed,flightSpeed);
        mount.Items.add(mod,`${id}-item`)
        return mount;
    }

    createSimple(mod: string, id: string, speed: number, flightSpeed = 0) {
        let spell = SpellRegistry.create(mod,id)
            .Attributes.isHiddenFromLog.set(true)
            .Attributes.isAbility.set(true)
            .Attributes.outdoorsOnly.set(true)
            .Attributes.notShapeshifted.set(true)
            .Attributes.sheatheUnchanged.set(true)
            .Attributes.stopAttacking.set(true)
            .Attributes.cannotUseInCombat.set(true)
            .Attributes.ignoreBonuses.set(true)
            .Attributes.unk79.set(true)
            .Icon.set('Interface\\Icons\\Trade_Engineering')
            .CastTime.set(16)
            .InterruptFlags.set(31)
            .Duration.set(21)
            .Range.set(1)
            .Visual.set(1706)
            .Cooldown.StartCategory.set(330)
            .Mechanic.set(21)
            .Levels.Spell.set(1)
            .Effects.addMod(effect=>{
                effect
                    .EffectType.ApplyAura.set()
                    .AuraType.Mounted.set()
                    .CreatureTemplate.set(0)
                    .TargetA.UnitCaster.set()
            })
            .Effects.addMod(effect=>{
                effect
                    .EffectType.ApplyAura.set()
                    .AuraType.ModIncreaseMountedSpeed.set()
                    .BasePercent.set(speed)
                    .TargetA.UnitCaster.set()
                    .RandomPercent.set(1)
            })

        if(flightSpeed>0) {
            spell.Effects.addMod(effect=>{
                effect
                    .EffectType.ApplyAura.set()
                    .AuraType.ModIncreaseFlightSpeed.set()
                    .BasePercent.set(flightSpeed)
                    .TargetA.UnitCaster.set()
                    .RandomPercent.set(1)
            })
        }
        return new Mount(spell.row);
    }
}

export const MountRegistry = new MountRegistryClass();
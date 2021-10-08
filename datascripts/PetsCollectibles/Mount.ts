import { DBC } from "wotlkdata";
import { Cell } from "wotlkdata/cell/cells/Cell";
import { MulticastCell } from "wotlkdata/cell/cells/MulticastCell";
import { LocSystem, MulticastLocCell } from "wotlkdata/cell/systems/CellSystem";
import { MultirowSystemCached } from "wotlkdata/cell/systems/MultiRowSystem";
import { SpellQuery, SpellRow } from "wotlkdata/dbc/types/Spell";
import { Table } from "wotlkdata/table/Table";
import { CreatureModels } from "../Creature/CreatureModels";
import { CreatureTemplateRegistry } from "../Creature/Creatures";
import { ItemBonding } from "../Item/ItemBonding";
import { SkillRequirement } from "../Item/ItemRequirements";
import { ItemTemplate, ItemTemplateRegistry } from "../Item/ItemTemplate";
import { MainEntity } from "../Misc/Entity";
import { RefNoCreate, SelfRef } from "../Refs/Ref";
import { RegistryRowBase } from "../Refs/Registry";
import { Spell } from "../Spell/Spell";
import { SpellCastTimeRegistry } from "../Spell/SpellCastTime";
import { SpellRegistry } from "../Spell/Spells";
import { SpellVisualRegistry } from "../Spell/SpellVisual";
import { CollectibleIcon } from "./CollectibleIcon";

const MOUNT_SKILL = 762;

export class MountItems extends MultirowSystemCached<ItemTemplate,Mount> {
    protected getAllRows(): ItemTemplate[] {
        return ItemTemplateRegistry
            .queryAll({spelltrigger_1:6,spellid_1:this.owner.SpellID})
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_2:6,spellid_2:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_3:6,spellid_3:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_4:6,spellid_4:this.owner.SpellID}))
            .concat(ItemTemplateRegistry.queryAll({spelltrigger_5:6,spellid_5:this.owner.SpellID}))
            .filter((x,i,arr)=>arr.findIndex(y=>y.ID==x.ID)===i);
    }

    protected isDeleted(value: ItemTemplate): boolean {
        return value.row.isDeleted()
    }

    add(mod: string, id: string, mountSkillRank: number = 0) {
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

        const item = ItemTemplateRegistry.create(mod,`${id}-item`)
            .Name.set(this.owner.AsSpell.get().Name.objectify())
            .Quality.Blue.set()
            .ClassMask.set(-1)
            .Bonding.BindsOnPickup.set()
            .Class.Mount.set()
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
        if(mountSkillRank > 0) {
            item.Requirements.Skill.set(MOUNT_SKILL,mountSkillRank)
        }
        if(this.cache !== undefined) {
            this.cache.push(item)
        }
    }
}

export class Mount extends MainEntity<SpellRow> {
    protected mountIndex() {
        return this.AsSpell.get().Effects
            .indexOf(x=>x.Aura.Mounted.is())
    }

    get SpellID() { return this.row.ID.get(); }

    /**
     * @warning Currently, tswow can only find Mount items that are implemented by specifying its spell id
     * in one of the items spells with a "learn (6)" spell item trigger.
     * This misses ~20 mounts that have a real spell to learn it instead (which may or may not have an item to trigger it),
     * and an additional ~80 mounts that have seemingly no way to learn it at all.
     */
    readonly Items = new MountItems(this);

    get CreatureTemplate() {
        return CreatureTemplateRegistry.ref(
              this
            , this.wrapIndex(this.row.EffectMiscValue,this.mountIndex())
        )
    }

    get Models() {
        return new CreatureModels(this, this.CreatureTemplate.getRef().row)
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

    get Bonding() {
        return new ItemBonding(
              this
            , new MulticastCell(this, this.Items.map(x=>x.row.bonding))
        )
    }

    get SkillRequirement() {
        const items = this.Items.get()
        return new SkillRequirement(this
            , new MulticastCell(this,items.map(x=>x.row.RequiredSkill))
            , new MulticastCell(this,items.map(x=>x.row.RequiredSkillRank))
        )
    }

    get Icon() {
        return new CollectibleIcon(
              this
            , ()=>({spell:this.AsSpell.get(),items: this.Items.get()})
        )
    }

    get CastTime() {
        return SpellCastTimeRegistry.ref(this, this.AsSpell.get().CastTime)
    }

    get SpellVisual() {
        return SpellVisualRegistry.ref(this, this.AsSpell.get().Visual);
    }

    get AsSpell() { return new SelfRef(this, ()=>new Spell(this.row)); }
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
    ID(e: Mount): number {
        return e.SpellID;
    }
    protected Table(): Table<any, SpellQuery, SpellRow> {
        return DBC.Spell;
    }

    create(mod: string, id: string, speed = 59, flightSpeed = 0, createItem = true, createCreature = true) {
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
                    .Type.ApplyAura.set()
                    .Aura.Mounted.set()
                    .CreatureTemplate.set(0)
                    .TargetA.UnitCaster.set()
            })
            .Effects.addMod(effect=>{
                effect
                    .Type.ApplyAura.set()
                    .Aura.ModIncreaseMountedSpeed.set()
                    .BasePercent.set(speed)
                    .TargetA.UnitCaster.set()
                    .RandomPercent.set(1)
            })

        if(flightSpeed>0) {
            spell.Effects.addMod(effect=>{
                effect
                    .Type.ApplyAura.set()
                    .Aura.ModIncreaseFlightSpeed.set()
                    .BasePercent.set(flightSpeed)
                    .TargetA.UnitCaster.set()
                    .RandomPercent.set(1)
            })
        }
        let mount = new Mount(spell.row);

        if(createItem) {
            mount.Items.setCache([])
            mount.Items.add(mod,`${id}-item`)
        }

        if(createCreature) {
            mount.CreatureTemplate.getRefCopy(mod,`${id}-creature`)
        }

        return mount;
    }
}

export const MountRegistry = new MountRegistryClass();
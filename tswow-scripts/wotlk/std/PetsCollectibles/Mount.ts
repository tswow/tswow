import { DBC } from "../../DBCFiles";
import { Cell } from "../../../data/cell/cells/Cell";
import { makeEnumCell } from "../../../data/cell/cells/EnumCell";
import { MulticastCell } from "../../../data/cell/cells/MulticastCell";
import { LocSystem, MulticastLocCell } from "../../../data/cell/systems/CellSystem";
import { MultirowSystemCached } from "../../../data/cell/systems/MultiRowSystem";
import { SpellQuery, SpellRow } from "../../dbc/Spell";
import { Table } from "../../../data/table/Table";
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
        this.addGet(mod,id,mountSkillRank);
        return this.owner;
    }

    addMod(mod: string, id: string, callback: (spell: Spell, item: ItemTemplate)=>void) {
        const {spell,item} = this.addGet(mod,id,0);
        callback(spell,item);
        return this.owner;
    }

    addGet(mod: string, id: string, mountSkillRank: number = 0) {
        const spell = SpellRegistry.create(mod,`${id}-spell`)
            .Icon.setPath('Interface\\Icons\\Trade_Engineering')
            .Effects.addMod(efffect=>{
                efffect.Type.LEARN_SPELL.set()
                    .LearntSpell.set(this.owner.SpellID)
                    .ImplicitTargetA.SRC_CASTER.set()
                    .ChainAmplitude.set(1)
            })
            .StanceBarOrder.set(4294967295)
            .InterruptFlags.ON_MOVEMENT.set(true)
            .InterruptFlags.ON_PUSHBACK.set(true)
            .InterruptFlags.ON_INTERRUPT_CAST.set(true)
            .InterruptFlags.setBit(3, true)

        const item = ItemTemplateRegistry.create(mod,`${id}-item`)
            .Name.set(this.owner.AsSpell.get().Name.objectify())
            .Quality.BLUE.set()
            .ClassMask.set(-1)
            .Bonding.BINDS_ON_PICKUP.set()
            .Class.MOUNT.set()
            .Material.LIQUID.set()
            .InventoryType.NON_EQUIPPABLE.set()
            .Spells.addMod((ispell=>{
                ispell.Spell.set(spell.ID)
                     .Category.set(330)
                     .Trigger.ON_USE.set()
                     .Charges.set(1,'DELETE_ITEM')
                     .ProcsPerMinute.set(0)
                     .Cooldown.set(-1)
                     .CategoryCooldown.set(3000)
            }))
            .Spells.addMod((spell=>{
                spell.Spell.set(this.owner.SpellID)
                     .Category.set(0)
                     .Trigger.ON_LEARN.set()
                     .Charges.set('UNLIMITED')
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
        return {spell,item};
    }
}

export class Mount extends MainEntity<SpellRow> {
    protected mountIndex() {
        return this.AsSpell.get().Effects
            .indexOf(x=>x.Aura.MOUNTED.is())
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
        return makeEnumCell(ItemBonding,this,
            new MulticastCell(this, this.Items.map(x=>x.row.bonding))
        );
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
            .Attributes.IS_HIDDEN_FROM_LOG.set(true)
            .Attributes.IS_ABILITY.set(true)
            .Attributes.OUTDOORS_ONLY.set(true)
            .Attributes.NOT_SHAPESHIFTED.set(true)
            .Attributes.SHEATHE_UNCHANGED.set(true)
            .Attributes.STOP_ATTACKING.set(true)
            .Attributes.CANNOT_USE_IN_COMBAT.set(true)
            .Attributes.IGNORE_BONUSES.set(true)
            .Attributes.UNK79.set(true)
            .Icon.setPath('Interface\\Icons\\Trade_Engineering')
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
                    .Type.APPLY_AURA.set()
                    .Aura.MOUNTED.set()
                    .CreatureTemplate.set(0)
                    .ImplicitTargetA.UNIT_CASTER.set()
            })
            .Effects.addMod(effect=>{
                effect
                    .Type.APPLY_AURA.set()
                    .Aura.MOD_INCREASE_MOUNTED_SPEED.set()
                    .PercentBase.set(speed)
                    .ImplicitTargetA.UNIT_CASTER.set()
                    .PercentDieSides.set(1)
            })

        if(flightSpeed>0) {
            spell.Effects.addMod(effect=>{
                effect
                    .Type.APPLY_AURA.set()
                    .Aura.MOD_INCREASE_FLIGHT_SPEED.set()
                    .PercentBase.set(flightSpeed)
                    .ImplicitTargetA.UNIT_CASTER.set()
                    .PercentDieSides.set(1)
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
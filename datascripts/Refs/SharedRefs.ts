import { DBC, SQL } from "wotlkdata"
import { AutoIdGenerator, Ids } from "../Base/Ids";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { Cell } from "wotlkdata/cell/Cell";
import { SimpleLock } from "../Locks/SimpleLock";
import { Locks } from "../Locks/Locks";
import { AttachedLootSet } from "../Loot/Loot";
import { SpellVisual, emptySpellVisualRow } from "../Spell/SpellVisual";
import { Spell } from "../Spell/Spell";
import { CellArray } from "wotlkdata/cell/CellArray";
import { SpellRow } from "wotlkdata/dbc/types/Spell";
import { SpellCastTime } from "../Spell/SpellCastTime";
import { SpellRadius } from "../Spell/SpellRadius";
import { SpellEffect } from "../Spell/SpellEffect";
import { SpellDuration } from "../Spell/SpellDuration";
import { GameObjectTemplate } from "../GameObject/GameObjectTemplate";
import { GameObjectDisplay, cleanGameObjectDisplayRow } from "../GameObject/GameObjectDisplay";
import { CreatureTemplate } from "../Creature/CreatureTemplate";
import { CreatureVisual, CreatureModel } from "../Creature/CreatureVisual";
import { SoundEntry } from "../sound/SoundEntry";
import { ItemVisual } from "../Item/ItemVisual";
import { ItemTemplate } from "../Item/ItemTemplate";
import { ItemEffects } from "../Item/ItemVisualEffect";
import { ParticleColor } from "../Misc/ParticleColor";

function shouldClone(gen: AutoIdGenerator, holder: BaseSystem, cell: Cell<number,any>) {
    return !AutoIdGenerator.isCustom(gen, cell.get()) && BaseSystem.getUniqueRefs(holder);
}

function shouldCloneArray(gen: AutoIdGenerator, holder: BaseSystem, cell: CellArray<number,any>, index: number) {
    return !AutoIdGenerator.isCustom(gen, cell.getIndex(index)) && BaseSystem.getUniqueRefs(holder);
}

export const SharedRefs = {
    getOrCreateLock(holder: BaseSystem, cell: Cell<number,any>) {
        if(cell.get()===0) {
            let lock = Locks.createEmpty();
            cell.set(lock.ID);
            return DBC.Lock.findById(lock.ID);
        }

        if(shouldClone(Ids.Lock,holder,cell)) {
            let lock = new SimpleLock(DBC.Lock.findById(cell.get()).clone(Ids.Lock.id()));
            cell.set(lock.ID);
            return DBC.Lock.findById(lock.ID);
        }

        return DBC.Lock.findById(cell.get());
    },

    getOrCreateLoot<T>(holder: BaseSystem, set: AttachedLootSet<T>) {
        let cell = AttachedLootSet.cell(set);
        let idgen = AttachedLootSet.idgen(set);

        if(cell.get()==0) {
            cell.set(idgen.id());
            return set;
        }

        if(shouldClone(idgen,holder,cell)) {
            set.makeUnique(true);
        }

        return set;
    },

    getOrCreateSpellVisual<T extends BaseSystem>(owner: T, cell: Cell<number,any>) {
        if(cell.get()===0) {
            let spellVisual = DBC.SpellVisual.add(Ids.SpellVisual.id())
            emptySpellVisualRow(spellVisual);
            cell.set(spellVisual.ID.get());
            return new SpellVisual<T>(owner, spellVisual);
        }

        let vis = new SpellVisual<T>(owner
            , DBC.SpellVisual.findById(cell.get())
            , cell);

        if(shouldClone(Ids.SpellVisual,owner,cell)) {
            vis.makeUnique();
        }
        return vis;
    },

    getOrCreateCastTime<T extends BaseSystem>(owner: T, spell: Spell) {
        if(spell.row.CastingTimeIndex.get()===0) {
            let casttime = DBC.SpellCastTimes.add(Ids.SpellCastTimes.id());
            casttime.Base.set(0)
                .Minimum.set(0)
                .PerLevel.set(0)
            spell.row.CastingTimeIndex.set(casttime.ID.get());
            return new SpellCastTime(owner,spell);
        } 
        let ctime = new SpellCastTime(owner, spell);
        if(shouldClone(Ids.SpellCastTimes,owner,spell.row.CastingTimeIndex)) {
            ctime.makeUnique();
        }
        return ctime;
    },

    getOrCreateSpellRadius<T extends BaseSystem>(owner: T, effect: SpellEffect) {
        if(effect.row.EffectRadiusIndex.getIndex(effect.index)===0) {
            let radiusRow = DBC.SpellRadius.add(Ids.SpellRadius.id())
                .Radius.set(0)
                .RadiusMax.set(0)
                .RadiusPerLevel.set(0)
            effect.row.EffectRadiusIndex.setIndex(effect.index,radiusRow.ID.get());
            return new SpellRadius(owner, effect);
        }

        let rad = new SpellRadius(owner, effect);
        if(shouldCloneArray(Ids.SpellRadius,owner,effect.row.EffectRadiusIndex,effect.index)) {
            rad.makeUnique();
        }
        return rad;
    },

    getOrCreateSpellDuration(spell: Spell) {
        if(spell.row.DurationIndex.get()===0) {
            let durationRow = DBC.SpellDuration.add(Ids.SpellDuration.id());
            durationRow.Duration.set(0)
                .DurationPerLevel.set(0)
                .MaxDuration.set(0)
            return new SpellDuration(spell);
        }

        let dur = new SpellDuration(spell);
        if(shouldClone(Ids.SpellDuration,spell,spell.row.DurationIndex)) {
            dur.makeUnique();
        }
        return dur;
    },

    getOrCreateGameObjectDisplay<T extends GameObjectTemplate<T>>(gobj: GameObjectTemplate<T>): GameObjectDisplay<T> {
        if(gobj.row.displayId.get()===0) {
            let row = DBC.GameObjectDisplayInfo.add(Ids.GameObjectDisplay.id());
            gobj.row.displayId.set(row.ID.get());
            return new GameObjectDisplay(gobj as any, row);
        }

        if(shouldClone(Ids.GameObjectDisplay,gobj,gobj.row.displayId)) {
            let id = Ids.GameObjectDisplay.id();
            gobj.row.displayId.set(id);
            let row = DBC.GameObjectDisplayInfo.add(id);
            cleanGameObjectDisplayRow(row);
            return new GameObjectDisplay(gobj as any, row);
        }

        return new GameObjectDisplay(gobj as any, 
            DBC.GameObjectDisplayInfo.findById(gobj.row.displayId.get()));
    },

    getOrCreateCreatureVisual(creature: CreatureTemplate, index: number) {
        let id = 
              index == 0 
            ? creature.row.modelid1 
            : index==1 
            ? creature.row.modelid2 
            : index==2 
            ? creature.row.modelid3 
            : creature.row.modelid4

        if(id.get()===0) {
            id.set(Ids.CreatureDisplayInfo.id())
            DBC.CreatureDisplayInfo.add(id.get())
                .BloodID.set(0)
                .BloodLevel.set(0)
                .CreatureGeosetData.set(0)
                .CreatureModelAlpha.set(0)
                .CreatureModelScale.set(0)
                .ExtendedDisplayInfoID.set(0)
                .ModelID.set(0)
                .NPCSoundID.set(0)
                .ObjectEffectPackageID.set(0)
                .ParticleColorID.set(0)
                .PortraitTextureName.set("")
                .SoundID.set(0)
                .TextureVariation.set(["","",""])
            SQL.creature_model_info.add(id.get())
                .BoundingRadius.set(0)
                .CombatReach.set(0)
                .DisplayID_Other_Gender.set(0)
                .Gender.set(0)
            creature.Models.setId(index,id.get());
            return new CreatureVisual(creature,id);
        }

        let cv = new CreatureVisual(creature,id);
        if(shouldClone(Ids.CreatureDisplayInfo,creature,id)) {
            cv.makeUnique();
        }
        return cv;
    },

    getOrCreateCreatureModel<T>(visual: CreatureVisual<T>) {
        let id = visual.dbc_row.ModelID;
        if(id.get()===0) {
            id.set(Ids.CreatureModel.id());
            DBC.CreatureModelData.add(id.get())
                .AttachedEffectScale.set(0)
                .BloodID.set(0)
                .CollisionHeight.set(0)
                .CollisionWidth.set(0)
                .DeathThudShakeSize.set(0)
                .Flags.set(0)
                .FoleyMaterialID.set(0)
                .FootprintParticleScale.set(0)
                .FootprintTextureID.set(0)
                .FootprintTextureLength.set(0)
                .FootprintTextureWidth.set(0)
                .FootstepShakeSize.set(0)
                .GeoBoxMaxX.set(0)
                .GeoBoxMaxY.set(0)
                .GeoBoxMaxZ.set(0)
                .GeoBoxMinX.set(0)
                .GeoBoxMinY.set(0)
                .GeoBoxMinZ.set(0)
                .MissileCollisionPush.set(0)
                .MissileCollisionRadius.set(0)
                .MissileCollisionRadius.set(0)
                .MissileCollisionRaise.set(0)
                .ModelName.set("")
                .ModelScale.set(0)
                .MountHeight.set(0)
                .SizeClass.set(0)
                .SoundID.set(0)
                .WorldEffectScale.set(0)
            return new CreatureModel(visual,id);
        }

        let model = new CreatureModel(visual,id);
        if(shouldClone(Ids.CreatureModel,model,id)) {
            model.makeUnique();
        }
        return model;
    },

    getOrCreateSoundEntry<T extends BaseSystem>(owner: T, cell: Cell<number,any>) {
        if(cell.get()===0) {
            cell.set(Ids.SoundEntries.id());
            DBC.SoundEntries.add(cell.get())
                .DirectoryBase.set("")
                .DistanceCutoff.set(45)
                .EAXDef.set(0)
                .File.set(["","","","","","","","","",""])
                .Flags.set(0)
                .Freq.set([1,1,1,1,1,1,1,1,1,1])
                .MinDistance.set(8)
                .Name.set("")
                .SoundEntriesAdvancedID.set(0)
                .SoundType.set(0)
                .Volumefloat.set(1)
            return new SoundEntry(owner, cell);
        }
    },

    getOrCreateItemDisplayInfo(owner: ItemTemplate, cell: Cell<number,any>) {
        if(cell.get()===0) {
            cell.set(Ids.ItemDisplayInfo.id());
            DBC.ItemDisplayInfo.add(cell.get())
                .InventoryIcon.set(["",""])
                .ItemVisual.set(0)
                .ModelName.set(["",""])
                .ModelTexture.set(["",""])
                .GeosetGroup.set([0,0,0])
                .Flags.set(0)
                .SpellVisualID.set(0)
                .GroupSoundIndex.set(0)
                .HelmetGeosetVis.set([0,0])
                .ParticleColorID.set(0)
            return new ItemVisual(owner);
        }

        let visual = new ItemVisual(owner);
        if(shouldClone(Ids.ItemDisplayInfo,visual,cell)) {
            visual.makeUnique();
        }
        return visual;
    },

    getOrCreateItemVisuals(owner: ItemVisual, cell: Cell<number,any>) {
        if(cell.get()===0) {
            cell.set(Ids.ItemVisualEffects.id());
            DBC.ItemVisuals.add(cell.get()).Slot.set([0,0,0,0,0])
            return new ItemEffects(owner, cell);
        }

        let eff = new ItemEffects(owner, cell);
        if(shouldClone(Ids.ItemVisuals,owner, cell)) {
            eff.makeUnique();
        }
        return eff;
    },

    getOrCreateParticleColor<T extends BaseSystem>(owner: T, cell: Cell<number,any>) {
        if(cell.get()===0) {
            cell.set(Ids.ParticleColors.id());
            DBC.ParticleColor.add(cell.get())
                .Start.set([0,0,0])
                .Mid.set([0,0,0])
                .End.set([0,0,0])
            return new ParticleColor(owner, cell);
        }

        let color = new ParticleColor(owner, cell);
        if(shouldClone(Ids.ParticleColors, owner, cell)) {
            color.makeUnique();
        }
        return color;
    }
}
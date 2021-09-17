import { DBC, SQL } from "wotlkdata";
import { Transient } from "wotlkdata/cell/serialization/Transient";
import { CreatureDisplayInfoRow } from "wotlkdata/dbc/types/CreatureDisplayInfo";
import { CreatureModelDataRow } from "wotlkdata/dbc/types/CreatureModelData";
import { creature_model_infoRow } from "wotlkdata/sql/types/creature_model_info";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/Ref";
import { SoundEntryPointer } from "../Sound/SoundEntry";

export class CreatureModel extends MainEntity<CreatureModelDataRow> {
    clear(): this {
        this.ModelName.set("")
        this.SizeClass.set(0)
        this.ModelScale.set(0)
        this.Blood.set(0)
        this.FootprintTexture.set(0)
        this.FootprintTextureLength.set(0)
        this.FoleyMaterial.set(0)
        this.FootstepShakeSize.set(0)
        this.DeathThudShake.set(0)
        this.CollisionHeight.set(0)
        this.CollisionHeight.set(0)
        this.MountHeight.set(0)
        this.WorldEffectScale.set(0)
        this.AttachedEffectScale.set(0)
        this.MissileCollisionRadius.set(0)
        this.AttachedEffectScale.set(0)
        this.MissileCollisionRadius.set(0)
        this.MissileCollisionPush.set(0)
        this.MissileCollisionRaise.set(0)
        this.row.SoundID.set(0)
        return this;
    }

    get ModelName() { return this.wrap(this.row.ModelName); }
    get SizeClass() { return this.wrap(this.row.SizeClass); }
    get ModelScale() { return this.wrap(this.row.ModelScale); }
    get Blood() { return this.wrap(this.row.BloodID); }
    get FootprintTexture() { return this.wrap(this.row.FootprintTextureID); }
    get FootprintTextureLength() { return this.wrap(this.row.FootprintTextureLength); }
    get FoleyMaterial() { return this.wrap(this.row.FoleyMaterialID); }
    get FootstepShakeSize() { return this.wrap(this.row.FootstepShakeSize); }
    get DeathThudShake() { return this.wrap(this.row.DeathThudShakeSize); }
    get Sound() { return new SoundEntryPointer(this, this.row.SoundID); }
    get CollisionWidth() { return this.wrap(this.row.CollisionWidth); }
    get CollisionHeight() { return this.wrap(this.row.CollisionHeight);}
    get MountHeight() { return this.wrap(this.row.MountHeight); }
    get WorldEffectScale() { return this.wrap(this.row.WorldEffectScale); }
    get AttachedEffectScale() { return this.wrap(this.row.AttachedEffectScale); }
    get MissileCollisionRadius() { return this.wrap(this.row.MissileCollisionRadius); }
    get MissileCollisionPush() { return this.wrap(this.row.MissileCollisionPush); }
    get MissileCollisionRaise() { return this.wrap(this.row.MissileCollisionRaise); }
}

export class CreatureVisual extends MainEntity<CreatureDisplayInfoRow> {
    @Transient
    protected _sql_row: creature_model_infoRow|undefined;
    get sql_row() {
        return this._sql_row = this._sql_row
            || SQL.creature_model_info.find({DisplayID:this.row.ID.get()})
            || (SQL.creature_model_info.add(this.row.ID.get())
                .BoundingRadius.set(0)
                .CombatReach.set(0)
                .DisplayID_Other_Gender.set(0)
                .Gender.set(0)
            )
    }

    hasSql() {
        if(this._sql_row) return true;
        return this.sql_row || SQL.creature_model_info.find({DisplayID:this.row.ID.get()});
    }

    get Model(): CreatureModelPointer<this> {
        return new CreatureModelPointer(this, this.row.ModelID);
    }

    get BoundingRadius() { return this.wrap(this.sql_row.BoundingRadius); }
    get CombatReach() { return this.wrap(this.sql_row.CombatReach); }

    get Sound() { return new SoundEntryPointer(this,this.row.SoundID); }
    get ExtendedDisplay() { return this.wrap(this.row.ExtendedDisplayInfoID); }
    get CreatureModelScale() { return this.wrap(this.row.CreatureModelScale); }
    get CreatureModelAlpha() { return this.wrap(this.row.CreatureModelAlpha); }
    get TextureVariation() { return this.wrapArray(this.row.TextureVariation); }
    get BloodLevel() { return this.wrap(this.row.BloodLevel); }
    get Blood() { return this.wrap(this.row.BloodID); }
    get NPCSound() { return new SoundEntryPointer(this,this.row.NPCSoundID); }
    get ParticleColor() { return this.wrap(this.row.ParticleColorID); }
    get CreatureGeosetData() { return this.wrap(this.row.CreatureGeosetData); }
    get ObjectEffectPackage() { return this.wrap(this.row.ObjectEffectPackageID); }

    clear(): this {
        this.ExtendedDisplay.set(0)
            .CreatureModelScale.set(0)
            .CreatureModelAlpha.set(0)
            .TextureVariation.set(["","",""])
            .BloodLevel.set(0)
            .Blood.set(0)
            .ParticleColor.set(0)
            .CreatureGeosetData.set(0)
            .ObjectEffectPackage.set(0)
            .row.SoundID.set(0)
            .NPCSoundID.set(0)

        if(this.hasSql()) {
            this.sql_row
                .BoundingRadius.set(0)
                .CombatReach.set(0)
                .DisplayID_Other_Gender.set(0)
                .Gender.set(0)
        }
        return this;
    }
}

export class CreatureVisualPointer<T> extends Ref<T,CreatureVisual> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): CreatureVisual {
        return new CreatureVisual(DBC.CreatureDisplayInfo.add(Ids.CreatureDisplayInfo.id()))
    }
    protected clone(): CreatureVisual {
        return new CreatureVisual(
            this.resolve().row.clone(Ids.CreatureDisplayInfo.id())
        )
    }
    protected id(v: CreatureVisual): number {
        return v.row.ID.get()
    }
    protected resolve(): CreatureVisual {
        return new CreatureVisual(DBC.CreatureDisplayInfo.findById(this.cell.get()));
    }
}

export class CreatureModelPointer<T> extends Ref<T,CreatureModel> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): CreatureModel {
        return new CreatureModel(DBC.CreatureModelData.add(Ids.creature_model_info.id()))
    }
    protected clone(): CreatureModel {
        return new CreatureModel(this.resolve().row.clone(Ids.creature_model_info.id()))
    }
    protected id(v: CreatureModel): number {
        return v.row.ID.get()
    }
    protected resolve(): CreatureModel {
        return new CreatureModel(DBC.CreatureModelData.findById(this.cell.get()));
    }
}
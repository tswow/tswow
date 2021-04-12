import { CreatureDisplayInfoRow } from "wotlkdata/dbc/types/CreatureDisplayInfo";
import { creature_model_infoRow } from "wotlkdata/sql/types/creature_model_info";
import { DBC, SQL } from "wotlkdata";
import { CreatureModelDataRow } from "wotlkdata/dbc/types/CreatureModelData";
import { Cell } from "wotlkdata/cell/Cell";
import { Ids, AutoIdGenerator } from "../Base/Ids";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SoundEntry } from "../sound/SoundEntry";

export class CreatureModel<T extends BaseSystem> extends SharedRef<T,CreatureModelDataRow> {
    table(): SharedRefTable<CreatureModelDataRow> {
        return DBC.CreatureModelData;
    }
    ids(): AutoIdGenerator {
        return Ids.CreatureModel;
    }
    clear(): this {
        this.ModelName.set("")
        this.SizeClass.set(0)
        this.ModelScale.set(0)
        this.BloodID.set(0)
        this.FootprintTextureID.set(0)
        this.FootprintTextureLength.set(0)
        this.FoleyMaterialID.set(0)
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
    get BloodID() { return this.wrap(this.row.BloodID); }
    get FootprintTextureID() { return this.wrap(this.row.FootprintTextureID); }
    get FootprintTextureLength() { return this.wrap(this.row.FootprintTextureLength); }
    get FoleyMaterialID() { return this.wrap(this.row.FoleyMaterialID); }
    get FootstepShakeSize() { return this.wrap(this.row.FootstepShakeSize); }
    get DeathThudShake() { return this.wrap(this.row.DeathThudShakeSize); }
    get Sound() { return new SoundEntry(this, this.row.SoundID); }
    get CollisionWidth() { return this.wrap(this.row.CollisionWidth); }
    get CollisionHeight() { return this.wrap(this.row.CollisionHeight);}
    get MountHeight() { return this.wrap(this.row.MountHeight); }
    get WorldEffectScale() { return this.wrap(this.row.WorldEffectScale); }
    get AttachedEffectScale() { return this.wrap(this.row.AttachedEffectScale); }
    get MissileCollisionRadius() { return this.wrap(this.row.MissileCollisionRadius); }
    get MissileCollisionPush() { return this.wrap(this.row.MissileCollisionPush); }
    get MissileCollisionRaise() { return this.wrap(this.row.MissileCollisionRaise); }
}

export class CreatureVisual<T extends BaseSystem> extends SharedRef<T,CreatureDisplayInfoRow> {
    table(): SharedRefTable<CreatureDisplayInfoRow> {
        return DBC.CreatureDisplayInfo
    }
    ids(): AutoIdGenerator {
        return Ids.CreatureDisplayInfo;
    }
    protected _sql_row: creature_model_infoRow;
    get sql_row() { 
        if(this._sql_row===undefined||this._sql_row.DisplayID.get()!==this.cell.get()) {
            this._sql_row = SQL.creature_model_info.find({DisplayID: this.cell.get()});
        }
        return this._sql_row; 
    }

    get Model(): CreatureModel<CreatureVisual<T>> { 
        return new CreatureModel(this, [this.row.ModelID]);
    }

    constructor(owner: T, id: Cell<number,any>) {
        super(owner,[id]);
        this._sql_row = SQL.creature_model_info.find({DisplayID: id.get()});
    }

    get BoundingRadius() { return this.wrap(this.sql_row.BoundingRadius); }
    get CombatReach() { return this.wrap(this.sql_row.CombatReach); }

    get Sound() { return new SoundEntry(this,this.row.SoundID); }
    get ExtendedDisplayID() { return this.wrap(this.row.ExtendedDisplayInfoID); }
    get CreatureModelScale() { return this.wrap(this.row.CreatureModelScale); }
    get CreatureModelAlpha() { return this.wrap(this.row.CreatureModelAlpha); }
    get TextureVariation() { return this.wrapArray(this.row.TextureVariation); }
    get BloodLevel() { return this.wrap(this.row.BloodLevel); }
    get BloodID() { return this.wrap(this.row.BloodID); }
    get NPCSound() { return new SoundEntry(this,this.row.NPCSoundID); }
    get ParticleColorID() { return this.wrap(this.row.ParticleColorID); }
    get CreatureGeosetData() { return this.wrap(this.row.CreatureGeosetData); }
    get ObjectEffectPackageID() { return this.wrap(this.row.ObjectEffectPackageID); }

    clear(): this {
        this.BoundingRadius.set(0)
            .CombatReach.set(0)
            .ExtendedDisplayID.set(0)
            .CreatureModelScale.set(0)
            .CreatureModelAlpha.set(0)
            .TextureVariation.set(["","",""])
            .BloodLevel.set(0)
            .BloodID.set(0)
            .ParticleColorID.set(0)
            .CreatureGeosetData.set(0)
            .ObjectEffectPackageID.set(0)
            .row.SoundID.set(0)
                .NPCSoundID.set(0)
        return this;
    }
}
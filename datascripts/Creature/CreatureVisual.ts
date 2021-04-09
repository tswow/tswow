import { Subsystem } from "wotlkdata/cell/Subsystem";
import { CreatureDisplayInfoRow } from "wotlkdata/dbc/types/CreatureDisplayInfo";
import { creature_model_infoRow } from "wotlkdata/sql/types/creature_model_info";
import { DBC, SQL } from "wotlkdata";
import { CreatureModelDataRow } from "wotlkdata/dbc/types/CreatureModelData";
import { Cell } from "wotlkdata/cell/Cell";
import { Ids } from "../Base/Ids";
import { SharedRefs } from "../Refs/SharedRefs";

export class CreatureModel<T> extends Subsystem<T> {
    protected _row: CreatureModelDataRow;
    id: Cell<number,any>;

    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
        this._row = DBC.CreatureModelData.findById(this.id.get());
    }

    get row() { return this._row; }

    get ModelName() { return this.wrap(this.row.ModelName); }
    get SizeClass() { return this.wrap(this.row.SizeClass); }
    get ModelScale() { return this.wrap(this.row.ModelScale); }
    get BloodID() { return this.wrap(this.row.BloodID); }
    get FootprintTextureID() { return this.wrap(this.row.FootprintTextureID); }
    get FootprintTextureLength() { return this.wrap(this.row.FootprintTextureLength); }
    get FoleyMaterialID() { return this.wrap(this.row.FoleyMaterialID); }
    get FootstepShakeSize() { return this.wrap(this.row.FootstepShakeSize); }
    get DeathThudShake() { return this.wrap(this.row.DeathThudShakeSize); }
    get SoundID() { return this.wrap(this.row.SoundID); }
    get Sound() { return SharedRefs.getOrCreateSoundEntry(this, this.row.SoundID); }
    get CollisionWidth() { return this.wrap(this.row.CollisionWidth); }
    get CollisionHeight() { return this.wrap(this.row.CollisionHeight);}
    get MountHeight() { return this.wrap(this.row.MountHeight); }
    get WorldEffectScale() { return this.wrap(this.row.WorldEffectScale); }
    get AttachedEffectScale() { return this.wrap(this.row.AttachedEffectScale); }
    get MissileCollisionRadius() { return this.wrap(this.row.MissileCollisionRadius); }
    get MissileCollisionPush() { return this.wrap(this.row.MissileCollisionPush); }
    get MissileCollisionRaise() { return this.wrap(this.row.MissileCollisionRaise); }

    makeUnique() {
        let id = Ids.CreatureModel.id();
        this.id.set(id);
        this._row = this.row.clone(id);
    }
}

export class CreatureVisual<T> extends Subsystem<T> {
    protected id: Cell<number,any>;

    protected _dbc_row: CreatureDisplayInfoRow;
    protected _sql_row: creature_model_infoRow;

    get dbc_row() { return this._dbc_row; }
    get sql_row() { return this._sql_row; }
    get Model(): CreatureModel<CreatureVisual<T>> { 
        return SharedRefs.getOrCreateCreatureModel(this); 
    }

    protected get dbc_model_row() {
        return DBC.CreatureModelData.findById(this.dbc_row.ID.get());
    }

    get ID() { 
        return this.dbc_row.ID.get();
    }
    
    constructor(owner: T, id: Cell<number,any>) {
        super(owner);
        this.id = id;
        this._dbc_row = DBC.CreatureDisplayInfo.findById(id.get());
        this._sql_row = SQL.creature_model_info.find({DisplayID: id.get()});
    }

    get BoundingRadius() { return this.wrap(this.sql_row.BoundingRadius); }
    get CombatReach() { return this.wrap(this.sql_row.CombatReach); }

    get Sound() { return SharedRefs.getOrCreateSoundEntry(this,this.dbc_row.SoundID); }
    get SoundID() { return this.dbc_row.SoundID; }
    get ExtendedDisplayID() { return this.wrap(this.dbc_row.ExtendedDisplayInfoID); }
    get CreatureModelScale() { return this.wrap(this.dbc_row.CreatureModelScale); }
    get CreatureModelAlpha() { return this.wrap(this.dbc_row.CreatureModelAlpha); }
    get TextureVariation() { return this.wrapArray(this.dbc_row.TextureVariation); }
    get BloodLevel() { return this.wrap(this.dbc_row.BloodLevel); }
    get BloodID() { return this.wrap(this.dbc_row.BloodID); }
    get NPCSoundID() { return this.wrap(this.dbc_row.NPCSoundID); }
    get NPCSound() { return SharedRefs.getOrCreateSoundEntry(this,this.dbc_row.NPCSoundID); }
    get ParticleColorID() { return this.wrap(this.dbc_row.ParticleColorID); }
    get CreatureGeosetData() { return this.wrap(this.dbc_row.CreatureGeosetData); }
    get ObjectEffectPackageID() { return this.wrap(this.dbc_row.ObjectEffectPackageID); }

    makeUnique() {
        let id = Ids.CreatureDisplayInfo.id();
        this._dbc_row = this.dbc_row.clone(id);
        this._sql_row = this.sql_row.clone(id);
        this.id.set(id);
        this.Model.makeUnique();
    }
}
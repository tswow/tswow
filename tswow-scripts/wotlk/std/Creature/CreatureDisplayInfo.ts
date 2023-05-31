import { Transient } from "../../../data/cell/serialization/Transient";
import { Table } from "../../../data/table/Table";
import { CreatureDisplayInfoQuery, CreatureDisplayInfoRow } from "../../dbc/CreatureDisplayInfo";
import { CreatureModelDataQuery, CreatureModelDataRow } from "../../dbc/CreatureModelData";
import { DBC } from "../../DBCFiles";
import { creature_model_infoRow } from "../../sql/creature_model_info";
import { SQL } from "../../SQLFiles";
import { CodegenSettings, GenerateCode } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { GeoBox } from "../Misc/GeoBox";
import { DynamicIDGenerator, Ids, StaticIDGenerator } from "../Misc/Ids";
import { RegistryDynamic, RegistryStatic } from "../Refs/Registry";
import { CreatureSoundDataRegistry } from "./CreatureSoundData";
import { NPCSoundsRegistry } from "./NPCSounds";

export class CreatureModel extends MainEntity<CreatureModelDataRow> {
    clear(): this {
        this.ModelName.set("")
        this.SizeClass.set(0)
        this.ModelScale.set(0)
        this.Blood.set(0)
        this.Flags.set(0)
        this.FootprintTexture.set(0)
        this.FootprintTextureLength.set(0)
        this.FoleyMaterial.set(0)
        this.FootstepShakeSize.set(0)
        this.DeathThudShake.set(0)
        this.CollisionHeight.set(0)
        this.CollisionWidth.set(0)
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

    get ID() {return this.row.ID.get(); }
    get Flags() { return this.wrap(this.row.Flags); }
    get ModelName() { return this.wrap(this.row.ModelName); }
    get SizeClass() { return this.wrap(this.row.SizeClass); }
    get ModelScale() { return this.wrap(this.row.ModelScale); }
    get Blood() { return this.wrap(this.row.BloodID); }
    get FootprintTexture() { return this.wrap(this.row.FootprintTextureID); }
    get FootprintTextureLength() { return this.wrap(this.row.FootprintTextureLength); }
    get FoleyMaterial() { return this.wrap(this.row.FoleyMaterialID); }
    get FootstepShakeSize() { return this.wrap(this.row.FootstepShakeSize); }
    get DeathThudShake() { return this.wrap(this.row.DeathThudShakeSize); }
    get Sound() { return CreatureSoundDataRegistry.ref(this, this.row.SoundID); }
    get CollisionWidth() { return this.wrap(this.row.CollisionWidth); }
    get CollisionHeight() { return this.wrap(this.row.CollisionHeight);}
    get MountHeight() { return this.wrap(this.row.MountHeight); }
    get WorldEffectScale() { return this.wrap(this.row.WorldEffectScale); }
    get AttachedEffectScale() { return this.wrap(this.row.AttachedEffectScale); }
    get MissileCollisionRadius() { return this.wrap(this.row.MissileCollisionRadius); }
    get MissileCollisionPush() { return this.wrap(this.row.MissileCollisionPush); }
    get MissileCollisionRaise() { return this.wrap(this.row.MissileCollisionRaise); }
    get Geobox() { 
        return new GeoBox(this,
            this.row.GeoBoxMinX,
            this.row.GeoBoxMaxX,
            this.row.GeoBoxMinY,
            this.row.GeoBoxMaxY,
            this.row.GeoBoxMinZ,
            this.row.GeoBoxMaxZ
        )
    }

    codify(settings: CodegenSettings)
    {
        return GenerateCode(settings,'std.CreatureModels.create()',code=>{
            if(this.ModelName.get().length > 0)
            {
                code.line(`.ModelName.set('${this.ModelName.get().split('\\').join('\\\\')}')`)
            }
            code.non_def_num('SizeClass',this.SizeClass);
            code.non_def_num('ModelScale',this.ModelScale);
            code.non_def_num('Blood',this.Blood);
            code.non_def_num('Flags',this.Flags);
            code.non_def_num('FootprintTexture',this.FootprintTexture);
            code.non_def_num('FootprintTextureLength',this.FootprintTextureLength);
            code.non_def_num('FoleyMaterial',this.FoleyMaterial);
            code.non_def_num('FootstepShakeSize',this.FootstepShakeSize);
            code.non_def_num('DeathThudShake',this.DeathThudShake);
            code.non_def_num('CollisionHeight',this.CollisionHeight);
            code.non_def_num('CollisionWidth',this.CollisionWidth);
            code.non_def_num('MountHeight',this.MountHeight);
            code.non_def_num('WorldEffectScale',this.WorldEffectScale);
            code.non_def_num('AttachedEffectScale',this.AttachedEffectScale);
            code.non_def_num('MissileCollisionRadius',this.MissileCollisionRadius);
            code.non_def_num('AttachedEffectScale',this.AttachedEffectScale);
            code.non_def_num('MissileCollisionRadius',this.MissileCollisionRadius);
            code.non_def_num('MissileCollisionPush',this.MissileCollisionPush);
            code.non_def_num('MissileCollisionRaise',this.MissileCollisionRaise);
            code.line(`.Geobox.set({minX:${this.Geobox.MinX.get()}, minY:${this.Geobox.MinY.get()}, minZ:${this.Geobox.MinZ.get()},maxX:${this.Geobox.MaxX.get()},maxY:${this.Geobox.MaxY.get()},maxZ:${this.Geobox.MaxZ.get()}})`)
            code.non_def_num('Sound',this.Sound);
        })
    }
}

export class CreatureDisplayInfo extends MainEntity<CreatureDisplayInfoRow> {
    @Transient
    protected _sql_row: creature_model_infoRow|undefined;
    get sql_row() {
        return this._sql_row = this._sql_row
            || SQL.creature_model_info.query({DisplayID:this.row.ID.get()})
            || (SQL.creature_model_info.add(this.row.ID.get())
                .BoundingRadius.set(0)
                .CombatReach.set(0)
                .DisplayID_Other_Gender.set(0)
                .Gender.set(0)
            )
    }

    hasSql() {
        if(this._sql_row) return true;
        return this.sql_row || SQL.creature_model_info.query({DisplayID:this.row.ID.get()});
    }

    get ID() { return this.row.ID.get(); }
    get Model() {
        return CreatureModelRegistry.ref(this, this.row.ModelID);
    }

    get BoundingRadius() { return this.wrap(this.sql_row.BoundingRadius); }
    get CombatReach() { return this.wrap(this.sql_row.CombatReach); }

    get Sound() { return CreatureSoundDataRegistry.ref(this, this.row.SoundID); }
    get ExtendedDisplay() { return this.wrap(this.row.ExtendedDisplayInfoID); }
    get CreatureModelScale() { return this.wrap(this.row.CreatureModelScale); }
    get CreatureModelAlpha() { return this.wrap(this.row.CreatureModelAlpha); }
    get TextureVariation() { return this.wrapArray(this.row.TextureVariation); }
    get BloodLevel() { return this.wrap(this.row.BloodLevel); }
    get Blood() { return this.wrap(this.row.BloodID); }
    get NPCSound() { return NPCSoundsRegistry.ref(this, this.row.NPCSoundID); }
    get ParticleColor() { return this.wrap(this.row.ParticleColorID); }
    get CreatureGeosetData() { return this.wrap(this.row.CreatureGeosetData); }
    get ObjectEffectPackage() { return this.wrap(this.row.ObjectEffectPackageID); }

    codify(settings: CodegenSettings & {mod?: string, id?: string})
    {
        const mod = settings.mod || 'mod';
        const id = settings.mod || 'id';
        return GenerateCode(settings,`std.CreatureDisplayInfo.create('${mod}','${id}')`,code=>{
            if(this.Model.get())
            {
                code.begin_block('.Model.modRefCopy(x=>x')
                code.substruct(this.Model.getRef(),settings);
                code.end_block(')')
            }
            code.non_def_num('BoundingRadius',this.BoundingRadius)
            code.non_def_num('CombatReach',this.CombatReach)
            code.non_def_num('Sound',this.Sound);
            code.non_def_num('ExtendedDisplay',this.ExtendedDisplay);
            code.non_def_num('CreatureModelScale',this.CreatureModelScale)
            code.non_def_num('CreatureModelAlpha',this.CreatureModelAlpha)
            code.non_def_num('BloodLevel',this.BloodLevel)
            code.non_def_num('Blood',this.Blood)
            code.non_def_num('NPCSound',this.NPCSound)
            code.non_def_num('ParticleColor',this.ParticleColor)
            code.non_def_num('CreatureGeosetData',this.CreatureGeosetData)
            code.non_def_num('ObjectEffectPackage',this.ObjectEffectPackage)
            for(let i = 0; i < this.TextureVariation.length(); ++i)
            {
                let v = this.TextureVariation.getIndex(i);
                if(v.length > 0)
                {
                    code.line(`.TextureVariation.setIndex(${i},'${v.split('\\').join('\\\\').split('\'').join('\\\'')}')`)
                }
            }

            // texture variations
            // 
        })
    }

    clear(): this {
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

export class CreatureModelRegistryClass
    extends RegistryDynamic<
          CreatureModel
        , CreatureModelDataRow
        , CreatureModelDataQuery
    >
{
    protected Table(): Table<any, CreatureModelDataQuery, CreatureModelDataRow> & { add: (id: number) => CreatureModelDataRow; } {
        return DBC.CreatureModelData
    }
    protected ids(): DynamicIDGenerator {
        return Ids.CreatureModelData
    }

    Clear(entity: CreatureModel): void {
        entity
            .AttachedEffectScale.set(0)
            .Blood.set(0)
            .CollisionHeight.set(0)
            .CollisionWidth.set(0)
            .DeathThudShake.set(0)
            .FoleyMaterial.set(0)
            .FootprintTexture.set(0)
            .FootprintTextureLength.set(0)
            .FootstepShakeSize.set(0)
            .MissileCollisionPush.set(0)
            .MissileCollisionRadius.set(0)
            .MissileCollisionRaise.set(0)
            .ModelName.set('')
            .ModelScale.set(1)
            .MountHeight.set(0)
            .SizeClass.set(0)
            .Sound.set(0)
            .WorldEffectScale.set(1)
    }
    protected FindByID(id: number): CreatureModelDataRow {
        return DBC.CreatureModelData.findById(id);
    }
    protected EmptyQuery(): CreatureModelDataQuery {
        return {}
    }
    ID(e: CreatureModel): number {
        return e.ID
    }
    protected Entity(r: CreatureModelDataRow): CreatureModel {
        return new CreatureModel(r);
    }
}
export const CreatureModelRegistry = new CreatureModelRegistryClass();

export class CreatureDisplayInfoRegistryClass
    extends RegistryStatic<
          CreatureDisplayInfo
        , CreatureDisplayInfoRow
        , CreatureDisplayInfoQuery
        >
{
    protected Table(): Table<any, CreatureDisplayInfoQuery, CreatureDisplayInfoRow> & { add: (id: number) => CreatureDisplayInfoRow; } {
        return DBC.CreatureDisplayInfo
    }
    protected IDs(): StaticIDGenerator {
        return Ids.CreatureDisplayInfo
    }

    protected Clone(mod: string, name: string, entity: CreatureDisplayInfo, parent: CreatureDisplayInfo): void {
        SQL.creature_model_info.query({DisplayID:parent.ID})
            .clone(entity.ID)
    }

    Clear(entity: CreatureDisplayInfo): void {
        entity
            .ExtendedDisplay.set(0)
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

        SQL.creature_model_info.add(entity.ID)
            .BoundingRadius.set(0)
            .CombatReach.set(0)
            .DisplayID_Other_Gender.set(0)
            .Gender.set(0)
    }
    protected FindByID(id: number): CreatureDisplayInfoRow {
        return DBC.CreatureDisplayInfo.findById(id);
    }
    protected EmptyQuery(): CreatureDisplayInfoQuery {
        return {}
    }
    ID(e: CreatureDisplayInfo): number {
        return e.ID
    }
    protected Entity(r: CreatureDisplayInfoRow): CreatureDisplayInfo {
        return new CreatureDisplayInfo(r);
    }
}
export const CreatureDisplayInfoRegistry = new CreatureDisplayInfoRegistryClass();
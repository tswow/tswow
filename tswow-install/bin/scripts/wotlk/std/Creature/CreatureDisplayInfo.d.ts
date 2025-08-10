import { Table } from "../../../data/table/Table";
import { CreatureDisplayInfoQuery, CreatureDisplayInfoRow } from "../../dbc/CreatureDisplayInfo";
import { CreatureModelDataQuery, CreatureModelDataRow } from "../../dbc/CreatureModelData";
import { creature_model_infoRow } from "../../sql/creature_model_info";
import { CodegenSettings } from "../Misc/Codegen";
import { MainEntity } from "../Misc/Entity";
import { GeoBox } from "../Misc/GeoBox";
import { DynamicIDGenerator, StaticIDGenerator } from "../Misc/Ids";
import { RegistryDynamic, RegistryStatic } from "../Refs/Registry";
export declare class CreatureModel extends MainEntity<CreatureModelDataRow> {
    clear(): this;
    get ID(): number;
    get Flags(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ModelName(): import("../../../data/cell/cells/Cell").CellWrapper<string, this>;
    get SizeClass(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ModelScale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Blood(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FootprintTexture(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FootprintTextureLength(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FoleyMaterial(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get FootstepShakeSize(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get DeathThudShake(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Sound(): import("../Refs/Ref").RefDynamic<this, import("./CreatureSoundData").CreatureSoundData>;
    get CollisionWidth(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CollisionHeight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MountHeight(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get WorldEffectScale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get AttachedEffectScale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MissileCollisionRadius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MissileCollisionPush(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get MissileCollisionRaise(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Geobox(): GeoBox<this>;
    codify(settings: CodegenSettings): string;
}
export declare class CreatureDisplayInfo extends MainEntity<CreatureDisplayInfoRow> {
    protected _sql_row: creature_model_infoRow | undefined;
    get sql_row(): creature_model_infoRow;
    hasSql(): true | creature_model_infoRow;
    get ID(): number;
    get Model(): import("../Refs/Ref").RefDynamic<this, CreatureModel>;
    get BoundingRadius(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CombatReach(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Sound(): import("../Refs/Ref").RefDynamic<this, import("./CreatureSoundData").CreatureSoundData>;
    get ExtendedDisplay(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CreatureModelScale(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CreatureModelAlpha(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get TextureVariation(): import("../../../data/cell/cells/CellArray").CellArrayWrapper<string, this>;
    get BloodLevel(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get Blood(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get NPCSound(): import("../Refs/Ref").RefDynamic<this, import("./NPCSounds").NPCSounds>;
    get ParticleColor(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get CreatureGeosetData(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    get ObjectEffectPackage(): import("../../../data/cell/cells/Cell").CellWrapper<number, this>;
    codify(settings: CodegenSettings & {
        mod?: string;
        id?: string;
    }): string;
    clear(): this;
}
export declare class CreatureModelRegistryClass extends RegistryDynamic<CreatureModel, CreatureModelDataRow, CreatureModelDataQuery> {
    protected Table(): Table<any, CreatureModelDataQuery, CreatureModelDataRow> & {
        add: (id: number) => CreatureModelDataRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: CreatureModel): void;
    protected FindByID(id: number): CreatureModelDataRow;
    protected EmptyQuery(): CreatureModelDataQuery;
    ID(e: CreatureModel): number;
    protected Entity(r: CreatureModelDataRow): CreatureModel;
}
export declare const CreatureModelRegistry: CreatureModelRegistryClass;
export declare class CreatureDisplayInfoRegistryClass extends RegistryStatic<CreatureDisplayInfo, CreatureDisplayInfoRow, CreatureDisplayInfoQuery> {
    protected Table(): Table<any, CreatureDisplayInfoQuery, CreatureDisplayInfoRow> & {
        add: (id: number) => CreatureDisplayInfoRow;
    };
    protected IDs(): StaticIDGenerator;
    protected Clone(mod: string, name: string, entity: CreatureDisplayInfo, parent: CreatureDisplayInfo): void;
    Clear(entity: CreatureDisplayInfo): void;
    protected FindByID(id: number): CreatureDisplayInfoRow;
    protected EmptyQuery(): CreatureDisplayInfoQuery;
    ID(e: CreatureDisplayInfo): number;
    protected Entity(r: CreatureDisplayInfoRow): CreatureDisplayInfo;
}
export declare const CreatureDisplayInfoRegistry: CreatureDisplayInfoRegistryClass;

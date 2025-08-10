import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { Table } from "../../../data/table/Table";
import { SpellEffectCameraShakesQuery, SpellEffectCameraShakesRow } from "../../dbc/SpellEffectCameraShakes";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
export declare class SpellEffectCameraShakes extends MainEntity<SpellEffectCameraShakesRow> {
    clear(): this;
    clearIndex(index: number): void;
    get(index: number): import("../Refs/Ref").RefDynamic<undefined, import("./CameraShakes").CameraShakes>;
    add(): import("../Refs/Ref").RefDynamic<undefined, import("./CameraShakes").CameraShakes>;
    protected freeIndex(): number;
    get length(): number;
    objectify(options?: ObjectifyOptions): any[];
    get ID(): number;
}
export declare class SpellEffectCameraShakesRegistryClass extends RegistryDynamic<SpellEffectCameraShakes, SpellEffectCameraShakesRow, SpellEffectCameraShakesQuery> {
    protected Table(): Table<any, SpellEffectCameraShakesQuery, SpellEffectCameraShakesRow> & {
        add: (id: number) => SpellEffectCameraShakesRow;
    };
    protected ids(): DynamicIDGenerator;
    Clear(entity: SpellEffectCameraShakes): void;
    protected FindByID(id: number): SpellEffectCameraShakesRow;
    protected EmptyQuery(): SpellEffectCameraShakesQuery;
    ID(e: SpellEffectCameraShakes): number;
    protected Entity(r: SpellEffectCameraShakesRow): SpellEffectCameraShakes;
}
export declare const SpellEffectCameraShakeRegistry: SpellEffectCameraShakesRegistryClass;

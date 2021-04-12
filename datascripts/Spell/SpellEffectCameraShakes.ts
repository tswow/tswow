import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SpellEffectCameraShakesRow } from "wotlkdata/dbc/types/SpellEffectCameraShakes";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { AutoIdGenerator } from "../Base/Ids";

export class SpellEffectCameraShakes<T extends BaseSystem> extends SharedRef<T, SpellEffectCameraShakesRow> {
    table(): SharedRefTable<SpellEffectCameraShakesRow> {
        throw new Error("Method not implemented.");
    }
    ids(): AutoIdGenerator {
        throw new Error("Method not implemented.");
    }
    clear(): this {
        throw new Error("Method not implemented.");
    }

}
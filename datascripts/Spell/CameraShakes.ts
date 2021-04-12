import { CameraShakesRow } from "wotlkdata/dbc/types/CameraShakes";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { AutoIdGenerator } from "../Base/Ids";

export class CameraShakes<T extends BaseSystem> extends SharedRef<T,CameraShakesRow> {
    table(): SharedRefTable<CameraShakesRow> {
        throw new Error("Method not implemented.");
    }
    ids(): AutoIdGenerator {
        throw new Error("Method not implemented.");
    }
    clear(): this {
        throw new Error("Method not implemented.");
    }

    get ShakeType() { return this.wrap(this.row.ShakeType); }
    get Direction() { return this.wrap(this.row.Direction); }
    get Ampitude() { return this.wrap(this.row.Amplitude); }
    get Frequency() { return this.wrap(this.row.Frequency); }
    get Duration() { return this.wrap(this.row.Duration); }
    get Phase() { return this.wrap(this.row.Phase); }
    get Coefficient() { return this.wrap(this.row.Coefficient); }
}
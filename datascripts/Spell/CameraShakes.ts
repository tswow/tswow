import { CameraShakesRow } from "wotlkdata/dbc/types/CameraShakes";
import { BaseSystem } from "wotlkdata/cell/BaseSystem";
import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { AutoIdGenerator, Ids } from "../Misc/Ids";
import { Enum, EnumField } from "wotlkdata/cell/systems/Enum";
import { DBC } from "wotlkdata/dbc/DBCFiles";

export class CameraShakeType<T> extends Enum<T> {
    @EnumField(0)
    setSine() { return this.set(0); }

    @EnumField(1)
    setDecayedSine() { return this.set(1); }
}

export class CameraShakes<T> extends SharedRef<T,CameraShakesRow> {

    table(): SharedRefTable<CameraShakesRow> {
        return DBC.CameraShakes;
    }

    ids(): AutoIdGenerator {
        return Ids.CameraShakes;
    }

    clear(): this {
        this.ShakeType.set(0);
        this.Direction.set(0);
        this.Ampitude.set(0);
        this.Frequency.set(0);
        this.Duration.set(0);
        this.Phase.set(0);
        this.Coefficient.set(0);
        return this;
    }

    get ShakeType() { return this.wrap(this.row.ShakeType); }
    get Direction() { return this.wrap(this.row.Direction); }
    get Ampitude() { return this.wrap(this.row.Amplitude); }
    get Frequency() { return this.wrap(this.row.Frequency); }
    get Duration() { return this.wrap(this.row.Duration); }
    get Phase() { return this.wrap(this.row.Phase); }
    get Coefficient() { return this.wrap(this.row.Coefficient); }
}
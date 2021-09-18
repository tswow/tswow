import { EnumCell } from "wotlkdata/cell/cells/EnumCell";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { CameraShakesRow } from "wotlkdata/dbc/types/CameraShakes";
import { MainEntity } from "../Misc/Entity";
import { Ids } from "../Misc/Ids";
import { Ref } from "../Refs/RefOld";

export class CameraShakeType<T> extends EnumCell<T> {
    /** Enum Value:                       0 */
    get Sine()        { return this.value(0) }
    /** Enum Value:                       1 */
    get DecayedSine() { return this.value(1) }
}

export class CameraShakes extends MainEntity<CameraShakesRow> {
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
    get ID() { return this.row.ID.get(); }
}

export class CameraShakePointer<T> extends Ref<T,CameraShakes> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): CameraShakes {
        return new CameraShakes(DBC.CameraShakes.add(Ids.CameraShakes.id()))
    }
    protected clone(): CameraShakes {
        return new CameraShakes(this.resolve().row.clone(Ids.CameraShakes.id()));
    }
    protected id(v: CameraShakes): number {
        return v.ID;
    }
    protected resolve(): CameraShakes {
        return new CameraShakes(DBC.CameraShakes.findById(this.cell.get()));
    }
}
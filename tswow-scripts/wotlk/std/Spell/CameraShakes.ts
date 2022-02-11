import { DBC } from "wotlkdata/wotlkdata/dbc/DBCFiles";
import { CameraShakesQuery, CameraShakesRow } from "wotlkdata/wotlkdata/dbc/types/CameraShakes";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";

export enum CameraShakeType {
    SINE         = 0,
    DECAYED_SINE = 1,
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

export class CameraShakeRegistryClass
    extends RegistryDynamic<CameraShakes,CameraShakesRow,CameraShakesQuery>
{
    protected Table(): Table<any, CameraShakesQuery, CameraShakesRow> & { add: (id: number) => CameraShakesRow; } {
        return DBC.CameraShakes
    }
    protected ids(): DynamicIDGenerator {
        return Ids.CameraShakes
    }
    Clear(entity: CameraShakes): void {
        // TODO: need to specify this
    }
    protected FindByID(id: number): CameraShakesRow {
        return DBC.CameraShakes.findById(id)
    }
    protected EmptyQuery(): CameraShakesQuery {
        return {}
    }
    ID(e: CameraShakes): number {
        return e.ID
    }
    protected Entity(r: CameraShakesRow): CameraShakes {
        return new CameraShakes(r);
    }
}

export const CameraShakeRegistry = new CameraShakeRegistryClass();
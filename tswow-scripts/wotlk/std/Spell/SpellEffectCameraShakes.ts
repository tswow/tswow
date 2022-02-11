import { DBC } from "wotlkdata";
import { SpellEffectCameraShakesQuery, SpellEffectCameraShakesRow } from "wotlkdata/wotlkdata/dbc/types/SpellEffectCameraShakes";
import { Table } from "wotlkdata/wotlkdata/table/Table";
import { MainEntity } from "../Misc/Entity";
import { DynamicIDGenerator, Ids } from "../Misc/Ids";
import { RegistryDynamic } from "../Refs/Registry";
import { CameraShakeRegistry } from "./CameraShakes";

export class SpellEffectCameraShakes extends MainEntity<SpellEffectCameraShakesRow> {
    clear(): this {
        this.row.CameraShake.setIndex(0,0);
        this.row.CameraShake.setIndex(1,0);
        this.row.CameraShake.setIndex(2,0);
        return this;
    }

    clearIndex(index: number) {
        this.row.CameraShake.setIndex(index,0);
    }

    get(index: number) {
        return CameraShakeRegistry.ref(this.owner, this.wrapIndex(this.row.CameraShake,index));
    }

    add() {
        return this.get(this.freeIndex());
    }

    protected freeIndex(): number {
        for(let i=0;i<this.length;++i) {
            if(this.row.CameraShake.getIndex(i)===0) return i;
        }
        throw new Error(`Can't add more entries, array is full`);
    }

    get length() { return 3; }

    objectify() {
        const values: any[] = [];
        for (let i = 0; i < this.length; ++i) {
            if(this.row.CameraShake.getIndex(i)===0) {
                values.push('<empty>');
            } else {
                values.push(this.get(i).objectify());
            }
        }
        return values;
    }

    get ID() { return this.row.ID.get(); }
}

export class SpellEffectCameraShakesRegistryClass
    extends RegistryDynamic<
          SpellEffectCameraShakes
        , SpellEffectCameraShakesRow
        , SpellEffectCameraShakesQuery
    >
{
    protected Table(): Table<any, SpellEffectCameraShakesQuery, SpellEffectCameraShakesRow> & { add: (id: number) => SpellEffectCameraShakesRow; } {
        return DBC.SpellEffectCameraShakes
    }
    protected ids(): DynamicIDGenerator {
        return Ids.SpellEffectCameraShakes
    }
    Clear(entity: SpellEffectCameraShakes): void {
        entity.clear();
    }
    protected FindByID(id: number): SpellEffectCameraShakesRow {
        return DBC.SpellEffectCameraShakes.findById(id);
    }
    protected EmptyQuery(): SpellEffectCameraShakesQuery {
        return {}
    }
    ID(e: SpellEffectCameraShakes): number {
        return e.ID
    }
    protected Entity(r: SpellEffectCameraShakesRow): SpellEffectCameraShakes {
        return new SpellEffectCameraShakes(r);
    }
}

export const SpellEffectCameraShakeRegistry
    = new SpellEffectCameraShakesRegistryClass();
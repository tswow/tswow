import { SpellEffectCameraShakesRow } from "wotlkdata/dbc/types/SpellEffectCameraShakes";
import { CameraShakePointer } from "./CameraShakes";
import { MainEntity } from "../Misc/Entity";
import { Ref } from "../Refs/Ref";
import { DBC } from "wotlkdata";
import { Ids } from "../Misc/Ids";

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
        return new CameraShakePointer(this.owner, this.wrapIndex(this.row.CameraShake,index));
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

export class SpellEffectCameraShakePointer<T> extends Ref<T,SpellEffectCameraShakes> {
    exists(): boolean {
        return this.cell.get() > 0;
    }
    protected create(): SpellEffectCameraShakes {
        return new SpellEffectCameraShakes(DBC.SpellEffectCameraShakes.add(Ids.SpellEffectCameraShakes.id()))
    }
    protected clone(): SpellEffectCameraShakes {
        return new SpellEffectCameraShakes(this.resolve().row.clone(Ids.SpellEffectCameraShakes.id()))
    }
    protected id(v: SpellEffectCameraShakes): number {
        return v.ID;
    }
    protected resolve(): SpellEffectCameraShakes {
        return new SpellEffectCameraShakes(DBC.SpellEffectCameraShakes.findById(this.cell.get()))
    }
}
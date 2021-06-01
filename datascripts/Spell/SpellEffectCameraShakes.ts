import { SharedRef, SharedRefTable } from "../Refs/SharedRef";
import { SpellEffectCameraShakesRow } from "wotlkdata/dbc/types/SpellEffectCameraShakes";
import { AutoIdGenerator, Ids } from "../Misc/Ids";
import { DBC } from "wotlkdata/dbc/DBCFiles";
import { CameraShakes } from "./CameraShakes";

export class SpellEffectCameraShakes<T> extends SharedRef<T, SpellEffectCameraShakesRow> {
    table(): SharedRefTable<SpellEffectCameraShakesRow> {
        return DBC.SpellEffectCameraShakes;
    }
    ids(): AutoIdGenerator {
        return Ids.SpellEffectCameraShakes;
    }

    clear(): this {
        this.row.CameraShake.setIndex(0,0);
        this.row.CameraShake.setIndex(1,0);
        this.row.CameraShake.setIndex(2,0);
        return this;
    }

    clearIndex(index: number) {
        this.row.CameraShake.setIndex(0,0);
    }

    get(index: number) {
        return new CameraShakes(this.owner, this.wrapIndex(this.row.CameraShake,index));
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
}
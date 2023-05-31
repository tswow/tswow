/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { Transient } from "../../../data/cell/serialization/Transient";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { creature_templateRow } from "../../sql/creature_template";
import { BoundingBox } from "../Misc/BoundingBox";
import { RefStatic } from "../Refs/Ref";
import { CreatureDisplayInfo, CreatureDisplayInfoRegistry } from "./CreatureDisplayInfo";

function getModel(row: creature_templateRow, index: number) {
    switch(index) {
        case 0: return row.modelid1;
        case 1: return row.modelid2;
        case 2: return row.modelid3;
        case 3: return row.modelid4;
        default: throw new Error(`Invalid creature model index ${index} (valid range is [0,4])`)
    }
}

export class CreatureModels<T> extends CellSystem<T> {
    @Transient
    protected row: creature_templateRow;

    constructor(owner: T, row: creature_templateRow) {
        super(owner);
        this.row = row;
    }

    get length(): number {
        return 4;
    }

    private rows() {
        return [
              this.row.modelid1
            , this.row.modelid2
            , this.row.modelid3
            , this.row.modelid4
        ]
    }

    objectify(options?: ObjectifyOptions) {
        return this.rows().filter(x=>x.get()!=0).map(
            x=>CreatureDisplayInfoRegistry.ref(this.owner,x).objectify(options));
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.get(i).set(0);
        }
        return this.owner;
    }

    get(index: number) {
        return CreatureDisplayInfoRegistry.ref(this.owner,
            this.rows()[index])
    }

    addDefaultBear() { return this.addIds(29419) }

    private findFree() {
        for(let i=0;i<this.length;++i) {
            if(getModel(this.row,i).get() === 0) {
                return this.get(i);
            }
        }
        throw new Error(`Can't add more entries, array is full.`);
    }

    addGet() {
        return this.findFree()
    }

    addMod(callback: (ref: RefStatic<T,CreatureDisplayInfo>) => void) {
        callback(this.addGet());
        return this.owner;
    }

    mod(index: number, callback: (ref: RefStatic<T,CreatureDisplayInfo>)=>void) {
        callback(this.get(index));
        return this.owner;
    }

    addSimple(mod: string, name: string, model: string, geobox: number | BoundingBox) {
        let v = CreatureDisplayInfoRegistry.create(mod,name)
            .Model.modRefCopy((value)=>value
                .ModelName.set(model)
                .Geobox.set(geobox)
            )
        this.addIds(v.ID)
        return this.owner;
    }

    addIds(...modelIds: number[]) {
        for(let i=0;i<this.length && modelIds.length>0;++i) {
            let model = getModel(this.row,i)
            if(model.get()===0) {
                model.set(modelIds[0]);
                modelIds.shift();
            }
        }

        if(modelIds.length>0) {
            throw new Error(
                `Not enough space for more CreatureDisplayInfo ids ` +
                `in creature_template ${this.row.entry.get()}`);
        }

        return this.owner;
    }

    copyFrom(models: CreatureModels<any>) {
        this.row.modelid1.set(models.owner.row.modelid1.get());
        this.row.modelid2.set(models.owner.row.modelid2.get());
        this.row.modelid3.set(models.owner.row.modelid3.get());
        this.row.modelid4.set(models.owner.row.modelid4.get());
    }
}
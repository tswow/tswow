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
import { CreatureTemplate } from "./CreatureTemplate";
import { CellSystem } from "wotlkdata/cell/systems/CellSystem";
import { CreatureVisualPointer } from "./CreatureVisual";

function getModel(template: CreatureTemplate, index: number) {
    switch(index) {
        case 0: return template.row.modelid1;
        case 1: return template.row.modelid2;
        case 2: return template.row.modelid3;
        case 3: return template.row.modelid4;
        default: throw new Error(`Invalid creature model index ${index} (valid range is [0,4])`)
    }
}

export class CreatureModels extends CellSystem<CreatureTemplate> {
    get length(): number {
        return 4;
    }

    private rows() {
        return [
              this.owner.row.modelid1
            , this.owner.row.modelid2
            , this.owner.row.modelid3
            , this.owner.row.modelid4
        ]
    }

    objectify() {
        return this.rows().filter(x=>x.get()!=0).map(x=>new CreatureVisualPointer(this.owner,x).objectify());
    }

    clearAll() {
        for(let i=0;i<this.length;++i) {
            this.get(i).setRefID(0);
        }
        return this.owner;
    }

    get(index: number): CreatureVisualPointer<CreatureTemplate> {
        return new CreatureVisualPointer(this.owner, 
            this.rows()[index])
    }

    addIds(...modelIds: number[]) {
        for(let i=0;i<this.length && modelIds.length>0;++i) {
            let model = getModel(this.owner,i)
            if(model.get()===0) {
                model.set(modelIds[0]);
                modelIds.shift();
            }
        }

        if(modelIds.length>0) {
            throw new Error(
                `Not enough space for more CreatureDisplayInfo ids ` +
                `in creature_template ${this.owner.ID}`);
        }

        return this.owner;
    }

    copyFrom(models: CreatureModels) {
        this.owner.row.modelid1.set(models.owner.row.modelid1.get());
        this.owner.row.modelid2.set(models.owner.row.modelid2.get());
        this.owner.row.modelid3.set(models.owner.row.modelid3.get());
        this.owner.row.modelid4.set(models.owner.row.modelid4.get());
    }
}
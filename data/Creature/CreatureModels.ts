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
import { ArrayEntry, SystemArray } from "wotlkdata/cell/Systems/SystemArray";
import { CreatureTemplate } from "./CreatureTemplate";

function getModel(template: CreatureTemplate, index: number) {
    switch(index) {
        case 0: return template.row.modelid1;
        case 1: return template.row.modelid2;
        case 2: return template.row.modelid3;
        case 3: return template.row.modelid4;
        default: throw new Error(`Invalid creature model index ${index} (valid range is [0,4])`)
    }
}

export class CreatureModel extends ArrayEntry<CreatureTemplate> {
    clear(): CreatureTemplate {
        getModel(this.owner, this.index).set(0);
        return this.owner;
    }

    isClear(): boolean {
        return getModel(this.owner, this.index).get() === 0;
    }

    get() { return getModel(this.owner, this.index).get(); }

    set(model: number) { 
        getModel(this.owner, this.index).set(model); 
        return this.owner;
    }
}

export class CreatureModels extends SystemArray<CreatureModel,CreatureTemplate> {
    get length(): number {
        return 4;
    }

    get(index: number): CreatureModel {
        return new CreatureModel(this.owner, index);
    }

    set(modelIds: number[]) {
        this.clearAll();
        return this.add(modelIds);
    }

    add(modelIds: number[]) {
        for(const model of modelIds) {
            this.getFree().set(model);
        }
        return this.owner;
    }
}
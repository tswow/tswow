import { ObjectifyOptions } from "../../../data/cell/serialization/ObjectIteration";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { creature_templateRow } from "../../sql/creature_template";
import { BoundingBox } from "../Misc/BoundingBox";
import { RefStatic } from "../Refs/Ref";
import { CreatureDisplayInfo } from "./CreatureDisplayInfo";
export declare class CreatureModels<T> extends CellSystem<T> {
    protected row: creature_templateRow;
    constructor(owner: T, row: creature_templateRow);
    get length(): number;
    private rows;
    objectify(options?: ObjectifyOptions): (number | {
        [key: string]: any;
    })[];
    clearAll(): T;
    get(index: number): RefStatic<T, CreatureDisplayInfo>;
    addDefaultBear(): T;
    private findFree;
    addGet(): RefStatic<T, CreatureDisplayInfo>;
    addMod(callback: (ref: RefStatic<T, CreatureDisplayInfo>) => void): T;
    mod(index: number, callback: (ref: RefStatic<T, CreatureDisplayInfo>) => void): T;
    addSimple(mod: string, name: string, model: string, geobox: number | BoundingBox): T;
    addIds(...modelIds: number[]): T;
    copyFrom(models: CreatureModels<any>): void;
}

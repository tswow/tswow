import { Cell, CPrim } from "../../../data/cell/cells/Cell";
import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Light } from "./Light";
import { LightWeather } from "./LightWeather";
export declare class LightParam<T extends CPrim> extends CellSystem<Light> {
    protected cellGetter: (weather: number) => Cell<T, any>;
    constructor(owner: Light, cellGetter: (weather: number) => Cell<T, any>);
    set(callback: (weather: LightWeather) => T): void;
}

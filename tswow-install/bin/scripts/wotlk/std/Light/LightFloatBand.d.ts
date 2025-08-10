import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Light } from "./Light";
import { LightWeather } from "./LightWeather";
export declare class LightFloatBand extends CellSystem<Light> {
    protected rowIndex: number;
    constructor(owner: Light, rowIndex: number);
    set(callback: (weather: LightWeather, time: number, oldValue: number, index: number) => number): Light;
}

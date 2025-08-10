import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { uint32 } from "../../../data/index";
import { Light } from "./Light";
import { LightWeather } from "./LightWeather";
export declare class LightIntBand extends CellSystem<Light> {
    protected rowIndex: number;
    constructor(owner: Light, rowIndex: number);
    set(callback: (weather: LightWeather, time: number, oldValue: number, index: number) => uint32): Light;
}

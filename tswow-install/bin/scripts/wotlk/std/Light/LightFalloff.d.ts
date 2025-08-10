import { CellSystem } from "../../../data/cell/systems/CellSystem";
import { Light } from "./Light";
export declare class LightFalloff extends CellSystem<Light> {
    get Start(): import("../../../data/cell/cells/Cell").CellWrapper<number, Light>;
    get End(): import("../../../data/cell/cells/Cell").CellWrapper<number, Light>;
    set(start: number, end: number): Light;
}

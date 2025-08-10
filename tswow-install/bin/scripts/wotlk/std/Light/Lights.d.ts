import { LightQuery } from "../../dbc/Light";
import { Light } from "./Light";
import { LightPosition } from "./LightPos";
export declare const Lights: {
    load(id: number): Light;
    filter(query: LightQuery): Light[];
    create(pos: LightPosition, parent: number): Light;
};

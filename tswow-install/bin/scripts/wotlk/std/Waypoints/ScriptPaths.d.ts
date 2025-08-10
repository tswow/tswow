import { Position } from "../Misc/Position";
import { ScriptPath } from "./ScriptPath";
export declare const ScriptPaths: {
    load(id: number): ScriptPath;
    create(paths?: Position[]): ScriptPath;
};

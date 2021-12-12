import { Ids } from "../Misc/Ids";
import { Position } from "../Misc/Position";
import { ScriptPath } from "./ScriptPath";

export const ScriptPaths = {
    load(id: number) {
        return new ScriptPath(id);
    },

    create(paths: Position[] = []) {
        return new ScriptPath(Ids.Waypoints.id())
            .add(paths)
    }
}
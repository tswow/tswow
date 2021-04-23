import { Ids } from "../Misc/Ids";
import { ScriptPath } from "./ScriptPath"

export const ScriptPaths = {
    load(id: number) {
        return new ScriptPath(id);
    },

    create() {
        return new ScriptPath(Ids.Waypoints.id());
    }


}
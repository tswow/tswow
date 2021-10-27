import { wfs } from "../util/FileSystem";
import { bpaths, ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";

export namespace ADTCreator {
    export async function create(cmake: string) {
        if(isWindows()) {
            wsys.exec(`${cmake} `
                + ` -S "tools/adt-creator" `
                + ` -B "${bpaths.adtCreator}"`, 'inherit');
            wsys.exec(`${cmake}`
                + ` --build "${bpaths.adtCreator}"`
                + ` --config Release`, 'inherit');
            wfs.copy(bpaths.adtCreatorExe,ipaths.adtCreatorExe)
        } else {
            // TODO: linux
        }
    }
}
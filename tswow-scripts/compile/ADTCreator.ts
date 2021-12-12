import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { bpaths } from "./CompilePaths";

export namespace ADTCreator {
    export async function create(cmake: string) {
        if(isWindows()) {
            wsys.exec(`${cmake} `
                + ` -S "tools/adt-creator" `
                + ` -B "${bpaths.adtcreator.get()}"`, 'inherit');
            wsys.exec(`${cmake}`
                + ` --build "${bpaths.adtcreator.get()}"`
                + ` --config Release`, 'inherit');
            bpaths.adtcreator.Release.adt_creator_exe
                .copy(ipaths.bin.adtcreator.adtcreator_exe)
        } else {
            // TODO: linux
        }
    }
}
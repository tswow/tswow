import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { bpaths, spaths } from "./CompilePaths";

export namespace ClientExtensions {
    export async function create(cmake: string) {
        if (!isWindows()) {
            term.warn('build', `ClientExtensions cannot be built on non-windows platforms`)
            term.warn('build', `Please build it manually if planning to use it`);
            term.warn('build', `Then place it at ${ipaths.bin.ClientExtensions_dll.abs().get()})`)
            return
        }

        wsys.exec(`${cmake} `
        + `-A Win32`
        + ` -S "${spaths.misc.client_extensions.abs().get()}" `
        + ` -B "${bpaths.client_extensions.abs().get()}"`
        + ` -DBOOST_ROOT="${bpaths.boost.boost_1_82_0.abs().get()}"`
        , 'inherit');

        wsys.exec(`${cmake}`
            + ` --build "${bpaths.client_extensions.abs().get()}"`
            + ` --config Release`
            , 'inherit');
        bpaths.client_extensions.dll_path.copy(ipaths.bin.ClientExtensions_dll)
    }
}

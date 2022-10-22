import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { bpaths, spaths } from "./CompilePaths";
import { DownloadFile } from "./Downloader";

export namespace ClientExtensions {
    export async function create(cmake: string) {
        if(isWindows())
        {
            // build locally
            wsys.exec(`${cmake} `
            + `-A Win32`
            + ` -S "${spaths.misc.client_extensions.abs().get()}" `
            + ` -B "${bpaths.client_extensions.abs().get()}"`
            + ` -DBOOST_ROOT="${bpaths.boost.boost_1_74_0.abs().get()}"`
            , 'inherit');

            wsys.exec(`${cmake}`
                + ` --build "${bpaths.client_extensions.abs().get()}"`
                + ` --config Release`
                , 'inherit');
            bpaths.client_extensions.dll_path.copy(ipaths.bin.ClientExtensions_dll)
        }
        else
        {
            // download prebuild
            await DownloadFile(
                'https://github.com/tswow/misc/releases/download/client-extensions-test/ClientExtensions.dll'
                , bpaths.ClientExtensionsDll
            );
            bpaths.ClientExtensionsDll.copy(ipaths.bin.ClientExtensions_dll)
        }
    }
}
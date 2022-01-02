import { ipaths } from "../util/Paths";
import { bpaths } from "./CompilePaths";
import { DownloadFile } from "./Downloader";

export namespace ClientExtensions {
    export async function find() {
        await DownloadFile(
              'https://github.com/tswow/misc/releases/download/client-extensions-test/ClientExtensions.dll'
            , bpaths.ClientExtensionsDll
        );
        bpaths.ClientExtensionsDll.copy(ipaths.bin.ClientExtensions_dll)
    }
}
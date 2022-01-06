import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";
import { wsys } from "../util/System";
import { SOURCE_ADT_URL } from "./BuildConfig";
import { bpaths, spaths } from "./CompilePaths";
import { DownloadFile } from "./Downloader";

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
            bpaths.adtcreator.mkdir();
            const relativeSource = bpaths.adtcreator.relativeFrom(spaths.tools.adtcreator.get())
            await wsys.inDirectory(bpaths.adtcreator.get(),
            ()=>{
                wsys.exec(
                    `${cmake} "${relativeSource}"`
                    ,  'inherit');
                wsys.exec(`make`,'inherit');
            })
        }

        await DownloadFile(
              SOURCE_ADT_URL
            , bpaths.sourceAdt.get()
        )
        wfs.copy(bpaths.sourceAdt,ipaths.bin.sourceAdt);
    }
}
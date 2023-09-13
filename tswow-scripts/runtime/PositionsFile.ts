import clipboard from 'clipboardy';
import { wfs } from "../util/FileSystem";
import { ipaths } from '../util/Paths';
import { NodeConfig } from "./NodeConfig";

export namespace PositionsFile {
    let oldContent = ""
    export function initialize() {
        if(!NodeConfig.WritePosToClipboard) {
            return;
        }

        oldContent = ipaths.coredata.positions_txt.readString('')
        if(!ipaths.coredata.positions_txt.exists()) {
            ipaths.coredata.positions_txt.write('')
        }

        wfs.watch(ipaths.coredata.positions_txt.get(),(evt,filename)=>{
            let value = ipaths.coredata.positions_txt.readString('')
            if(value.length > oldContent.length) {
                clipboard.writeSync(value);
            }
            oldContent = value;
        });
    }
}

import { wfs } from "../util/FileSystem"
import { ipaths } from "../util/Paths"
import * as clipboardy from 'clipboardy'
import { NodeConfig } from "./NodeConfig"

export namespace PositionsFile {
    let oldContent = ""

    export function initialize() {
        if(!NodeConfig.write_pos_to_clipboard) {
            return;
        }

        oldContent = wfs.readOr(ipaths.positionsFile,'')

        if(!wfs.exists(ipaths.positionsFile)) {
            wfs.write(ipaths.positionsFile,'');
        }

        wfs.watch(ipaths.positionsFile,(evt,filename)=>{
            let value = wfs.readOr(ipaths.positionsFile,'');
            if(value.length>oldContent.length) {
                clipboardy.writeSync(value);
            }
            oldContent = value;
        });
    }
}
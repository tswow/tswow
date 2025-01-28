import * as clipboardy from 'clipboardy';
import { wfs } from "../util/FileSystem";
import { ipaths } from '../util/Paths';
import { NodeConfig } from "./NodeConfig";
import { term } from '../util/Terminal';

export namespace PositionsFile {
    let oldContent = ""
    export function initialize() {
        term.debug('misc', `Initializing positions file`)
        if(!NodeConfig.WritePosToClipboard) {
            return;
        }

        oldContent = ipaths.coredata.positions_txt.readString('')
        if(!ipaths.coredata.positions_txt.exists()) {
            ipaths.coredata.positions_txt.write('')
        }

        if (process.argv.includes('nowatch-strict'))
        {
            wfs.watch(ipaths.coredata.positions_txt.get(),(evt,filename)=>{
                let value = ipaths.coredata.positions_txt.readString('')
                if(value.length > oldContent.length) {
                    clipboardy.writeSync(value);
                }
                oldContent = value;
            });
        }
    }
}
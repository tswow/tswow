import { mpath, wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { util } from "../util/Util";
import { commands } from "./Commands";
import { Datasets } from "./Dataset";
import { Modules } from "./Modules";
import { MPQ } from "./MPQ";

export namespace MapCreator {
    export function createMap(
        sourceAdt: string,
        dest: string,
        mapName: string,
        lowX: number,
        lowY: number,
        highX: number,
        highY: number
    ) {
        wsys.exec(
              `${ipaths.adtCreatorExe}`
            + ` ${sourceAdt}`
            + ` ${dest}`
            + ` ${mapName}`
            + ` ${lowX}`
            + ` ${lowY}`
            + ` ${highX}`
            + ` ${highY}`
            ,'inherit')

        wfs.write(mpath(dest,'map.yaml'),`MapName:\n  enGB: ${mapName}`);
    };

    export function Initialize() {
        let map = commands.addCommand('map');
        map.addCommand('create','','',async (args)=>{
            if(args.length < 5) {
                throw new Error(`Invalid arguments: need 5`);
            }
            let sourceAdt = 'test.adt';
            let dataset = Datasets.getDatasetsOrDefault(args)[0];
            let mapName = args[0];
            let dest = mpath(dataset.config.dev_patch,'world','maps',mapName);
            let moduleName = util.stringArgument('--module=','',args);
            if(moduleName.length>0) {
                if(Modules.exists(moduleName)) {
                    throw new Error(`Invalid module name: ${moduleName}`);
                }
                dest = mpath(ipaths.moduleAssets(moduleName),'world','maps',mapName)
            }
            let lowX = parseInt(args[1]);
            let lowY = parseInt(args[2]);
            let highX = parseInt(args[3]);
            let highY = parseInt(args[4]);
            createMap(sourceAdt,dest,mapName,lowX,lowY,highX,highY);
            term.success('Created map successfully, now running datascripts to generate dbc...');
            await MPQ.buildMpqFolder(dataset,dataset.config.dev_patch,false,true,args);
            term.success(`MPQ patches executed, you can now teleport to your map with the command ".tele map:${mapName}"`)
        });
    }
}
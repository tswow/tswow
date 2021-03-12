import { MPQ } from "./MPQ";
import { Datasets } from "./Dataset";
import { Datascripts } from "./Datascripts";
import { commands } from "./Commands";
import { Modules } from "./Modules";
import { ipaths } from "../util/Paths";
import { wfs } from "../util/FileSystem";
import { Addon } from "./Addon";
import { Livescripts } from "./Livescripts";
import { term } from "../util/Terminal";

export namespace Build {

    export const command = commands.addCommand('build');

    export function initialize() {
        Build.command.addCommand('data', 'clientonly? rebuild? package?',
            'Builds data patches and then restarts the affected processes', async(args) => {
            if (args.includes('clientonly') && args.includes('rebuild')) {
                throw new Error(`Can't both rebuild and restart only the client, rebuilding requires restarting the server.`);
            }
            await Promise.all(Datasets.getDatasetsOrDefault(args).map(x=>
                MPQ.buildDevMPQ(x,args.includes('--use-timer'))
            ));
        });

        Build.command.addCommand('check', '', '', async(args) => {
            let ds = Datasets.getDatasetsOrDefault(args);
            await Datascripts.build(ds[0],true,args.includes('--use-timer'));
        });

        Build.command.addCommand('addon','dataset | modules','Builds addons for one, multiple or all moduels against multiple or a single dataset',((args)=>{
            let ds = Datasets.getDatasetsOrDefault(args);
            let modules = Modules.getModulesOrAll(args).filter(x=>wfs.exists(ipaths.moduleAddons(x)));
            let runningClients = ds.filter(x=>x.client.isRunning());
            runningClients.forEach(x=>x.client.kill());
            ds.forEach(x=>modules.forEach(y=>Addon.build(y,x.id)));
            runningClients.forEach(x=>x.client.start());
        }));

        Build.command.addCommand('scripts', 'module? debug?', 'Build and loads the server scripts of a module', async (args) => {
            let isDebug = args.indexOf('debug')!==-1;
            let modules = Modules.getModulesOrAll(args);
            await Promise.all(modules.map(x=>Livescripts.build(x, isDebug ? 'Debug' : 'Release')))
            Datasets.getAll().forEach(x=>{
                Livescripts.writeModuleText(x);
            });
            term.success(`Built scripts`);
        });
    }
}
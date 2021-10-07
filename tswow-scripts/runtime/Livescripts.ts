import { BuildType } from "../util/BuildType";
import { wfs } from "../util/FileSystem";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { Timer } from "../util/Timer";
import { commands } from "./Commands";
import { Datasets } from "./Dataset";
import { Modules } from "./Modules";

export namespace Livescripts {
    /**
     * Builds and reloads the server code for a specific module.
     * @param name - Name of the module to rebuild.
     */
    export async function build(name: string, type: BuildType, trace?: boolean, allowGlobals?: boolean, args: string[] = []) {
        await Modules.refreshModules();
        const scriptsDir = ipaths.moduleScripts(name);

        if(!wfs.exists(scriptsDir)) {
            return false;
        }

        const files = wfs.readDir(scriptsDir, true, 'both');

        // Don't build if the entry point doesn't exist.
        const mainScript = ipaths.moduleMainScriptName(name);
        if (!files.includes(mainScript)) {
            term.warn(`Module ${name} has a livescripts directory, but no valid entrypoint`);
            return false;
        }
        term.log(`Building LiveScripts for ${name} (${type} mode)`);

        const timer = Timer.start();

        try {
            wsys.exec(
                `node -r source-map-support/register`
                + ` ${ipaths.transpilerEntry} ${name} ${type}`
                + ` ${(trace||commands.trace)?'--trace':''}`
                + ` ${(allowGlobals)?'--allow-globals':''}`
                + ` ${args.join(' ')}`
                ,'inherit');
        } catch(err) {
            throw new Error(`Failed to compile LiveScripts`)
        }

        wfs.copy(
              ipaths.moduleScriptsBuiltLibrary(name,type)
            , ipaths.tcModuleScript(type,name))
        if(wfs.exists(ipaths.moduleScriptsBuiltPdb(name,type))) {
            wfs.copy(
                  ipaths.moduleScriptsBuiltPdb(name,type)
                , ipaths.tcModulePdb(type,name));
        }

        // TODO We need to wait for output from trinitycore to continue here
        term.log(`Rebuilt code for ${name} in ${timer.timeSec()}s`);
        return true;
    }

    export function writeModuleText(dataset: Datasets.Dataset) {
        wfs.write(
            ipaths.datasetModuleList(dataset.id),
            dataset.config.modules.join('\n'));
    }
}
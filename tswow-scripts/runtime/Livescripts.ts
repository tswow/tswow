import { isWindows } from "../util/Platform";
import { Modules } from "./Modules";
import { ipaths } from "../util/Paths";
import { wfs } from "../util/FileSystem";
import { Timer } from "../util/Timer";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { Datasets } from "./Dataset";

export namespace Livescripts {
    export function getLibrary(mod: string) {
        mod = `scripts_${mod.split(' ').join('_').split('-').join('_')}_ts`;
        if(isWindows()) {
            return `${mod}.dll`;
        } else {
            return `${mod}.so`;
        }
    }

    /**
     * Builds and reloads the server code for a specific module.
     * @param name - Name of the module to rebuild.
     */
    export async function build(name: string, type: 'Release'|'Debug') {
        term.log(`Building LiveScripts for ${name} (${type} mode)`);

        await Modules.refreshModules();
        const scriptsDir = ipaths.moduleScripts(name);

        const files = wfs.readDir(scriptsDir, true, 'both');

        // Don't build if the entry point doesn't exist or its livescript is just the template.
        const mainScript = ipaths.moduleMainScriptName(name);
        if (!files.includes(mainScript)) { return false; }

        const timer = Timer.start();
        wsys.exec(`node ${ipaths.transpilerEntry} ${name} ${type}`,'inherit');

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
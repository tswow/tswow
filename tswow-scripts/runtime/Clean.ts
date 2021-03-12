/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
import { wfs } from "../util/FileSystem";
import { mysql } from "./MySQL";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { destroyAllWatchers } from "../util/TSWatcher";
import { commands } from "./Commands";
import { Modules } from "./Modules";
import { Datasets } from "./Dataset";
import { Identifiers } from "./Identifiers";

/**
 * Module for cleaning intermediate data.
 */
export namespace Clean {
    export function cleanScriptBin(mod?: string) {
        if(!mod) {
            Modules.getModules().forEach(cleanScriptBin);
            return;
        }

        wfs.remove(ipaths.moduleScriptsBuild(mod));
        ipaths.tcTypes.forEach(x=>{
            wfs.remove(ipaths.tcModuleScript(x,mod));
            wfs.remove(ipaths.tcModulePdb(x,mod));
        });
    }

    export async function cleanMysql() {
        const value = await wsys.userInput('You are about to remove ALL MySQL data with no backup. Please enter "understand" to clean MySQL: ');
        if(value!=='understand') {
            return;
        }

        await mysql.disconnect();
        wfs.remove(ipaths.databaseDir);
        await mysql.startProcess();
    }

    export async function cleanDataBuild(mod?: string) {
        await destroyAllWatchers();
        if(!mod) {
            Modules.getModules().forEach((x)=>{
                wfs.remove(ipaths.moduleDataBuild(x));
                wfs.remove(ipaths.moduleNoEdit(x));        
            });
        } else {
            wfs.remove(ipaths.moduleDataBuild(mod));
            wfs.remove(ipaths.moduleNoEdit(mod));
        }
        await cleanTypescript();
    }

    export async function cleanIds(dataset: string) {
        if(wfs.exists(ipaths.configIds)) {
            wfs.makeBackup(ipaths.configIds);
        }
        wfs.remove(ipaths.datasetIds(dataset));
        wfs.remove(ipaths.configIds);
    }

    export async function cleanAddonBuild(mod?: string) {
        if(!mod) {
            Modules.getModules().forEach((x)=>{
                cleanAddonBuild(x);
            });
        } else {
            wfs.remove(ipaths.addonBuild(mod));
        }
    }

    export async function cleanTypescript() {
        await destroyAllWatchers();
        const modules = Modules.getModules().filter(x=>wfs.exists(ipaths.moduleData(x)))

        let clean : string[] = [];
        let lastErrors = 0;
        let errors = 0;
        let pass = 0;
        while(true) {
            term.log(`TypeScript Cleaning Pass ${pass++} (Expect error messages about not finding modules)`);
            errors = 0;
            for(const mod of modules) {
                if(clean.includes(mod))  {
                    continue;
                }
                try {
                    wsys.execIn(ipaths.moduleData(mod),'tsc','inherit');
                    Modules.linkModule(mod);
                    clean.push(mod);
                    term.log(`Successfully compiled ${mod}`)
                } catch(error) {
                    errors++;
                    term.log(`Failed to compile ${mod}: ${error.message}`)
                }
            }

            if(errors===0) {
                break;
            }

            if(errors===lastErrors) {
                throw new Error(`You have non-dependency-related errors in the following modules: [${modules.filter(x=>!clean.includes(x))}]`);
            }
            lastErrors = errors;
        }

        await Modules.refreshModules();
    }

    export function cleanClientData(dataset: string) {
        wfs.remove(ipaths.clientDbc(dataset));
        wfs.remove(ipaths.clientMaps(dataset));
        wfs.remove(ipaths.clientVmaps(dataset));
        wfs.remove(ipaths.clientBuildings(dataset));
        wfs.remove(ipaths.clientMmaps(dataset));
        
        wfs.remove(ipaths.datasetDBCSource(dataset));
        wfs.remove(ipaths.datasetDBC(dataset));
        wfs.remove(ipaths.datasetMaps(dataset));
        wfs.remove(ipaths.datasetVmaps(dataset));
        wfs.remove(ipaths.datasetMmaps(dataset));
        
        Datasets.get(dataset).installServerData();
    }

    export const command = commands.addCommand('clean')

    export async function initialize() {
        Clean.command.addCommand('livescripts','module?','Removes live script build and binary files', async (args)=>{
            await cleanScriptBin(args[0]);
        });

        Clean.command.addCommand('datascripts','module?','Removes data script build files', async (args)=>{
            await cleanDataBuild(args[0]);
        });

        Clean.command.addCommand('ids','dataset = "default"','Removes all id mappings for a dataset', async(args)=>{
            await Promise.all([Identifiers.assertType('dataset',args)
                .map(x=>cleanIds(x))]);
        });

        Clean.command.addCommand('mysql','','Cleans all MySQL data files', async(args)=>{
            await cleanMysql();
        });

        Clean.command.addCommand('clientdata','dataset','Cleans all client data for a single dataset', async(args)=>{
            await cleanClientData(args[0]);
        });

        Clean.command.addCommand('typescript', '','Cleans all TypeScript data', async(args)=>{
            await cleanTypescript();
        });

        Clean.command.addCommand('all','dataset?','Attempts to clean all intermediate data', async(args)=>{
            let datasets = Identifiers.assertType('dataset',args);
            await cleanScriptBin();
            await cleanDataBuild();
            await cleanIds(args[0]);
            await cleanAddonBuild();
            await cleanMysql();
            await cleanClientData(args[0]);
        });

        Clean.command.addCommand('addon','mod?','Cleans addon build data',async (x)=>{
            cleanAddonBuild(x[0]);
        });
    }
}
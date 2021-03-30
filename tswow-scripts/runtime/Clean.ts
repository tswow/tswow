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
import { wfs, mpath } from "../util/FileSystem";
import { mysql } from "./MySQL";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { term } from "../util/Terminal";
import { destroyAllWatchers } from "../util/TSWatcher";
import { commands } from "./Commands";
import { Modules } from "./Modules";
import { Datasets } from "./Dataset";
import { Identifiers } from "./Identifiers";
import { isWindows } from "../util/Platform";

/**
 * Module for cleaning intermediate data.
 */
export namespace Clean {

    export function removeOldLivescripts() {
        ipaths.tcTypes.forEach(x=>{
            const scripts_dir = ipaths.tcScripts(x);
            wfs.iterate(ipaths.tcScripts(x),(filename)=>{
                const p = wfs.relative(scripts_dir,filename);
                let start = 'scripts_tswow_';
                if(!isWindows()) {
                    start = 'libscripts_tswow_';
                }

                if(!p.startsWith(start)) {
                    return;
                }

                const nom = p.substring(start.length).split('.')[0];
                if(!Modules.exists(nom)) {
                    wfs.remove(filename);
                }
            });
        });
    }

    export function cleanScriptBin(mod?: string) {
        if(!mod) {
            Modules.getModules().forEach(x=>cleanScriptBin(x.id));
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
                wfs.remove(ipaths.moduleDataBuild(x.id));
                wfs.remove(ipaths.moduleNoEdit(x.id));        
            });
        } else {
            wfs.remove(ipaths.moduleDataBuild(mod));
            wfs.remove(ipaths.moduleNoEdit(mod));
        }
        await cleanTypescript();
    }

    export async function cleanIds(dataset: string, useBackups: boolean) {
        term.log(`Cleaning ids for dataset ${dataset} (useBackups=${useBackups})`);
        if(useBackups && wfs.exists(ipaths.messageIds)) {
            wfs.makeBackup(ipaths.messageIds);
        }
        wfs.remove(ipaths.messageIds);

        if(useBackups && wfs.exists(ipaths.datasetIds(dataset))) {
            wfs.makeBackup(ipaths.datasetIds(dataset));
        }

        wfs.remove(ipaths.datasetIds(dataset));
    }

    export async function cleanAddonBuild(mod?: string) {
        if(!mod) {
            Modules.getModules().forEach((x)=>{
                cleanAddonBuild(x.id);
            });
        } else {
            wfs.remove(ipaths.addonBuild(mod));
        }
    }

    export async function cleanTypescript() {
        await destroyAllWatchers();
        const modules = Modules.getModules().filter(x=>wfs.exists(ipaths.moduleData(x.id)))

        let clean : string[] = [];
        let lastErrors = 0;
        let errors = 0;
        let pass = 0;
        while(true) {
            term.log(`TypeScript Cleaning Pass ${pass++} (Expect error messages about not finding modules)`);
            errors = 0;
            for(const mod of modules) {
                if(clean.includes(mod.id))  {
                    continue;
                }
                try {
                    wsys.execIn(ipaths.moduleData(mod.id),'tsc','inherit');
                    mod.linkModule();
                    clean.push(mod.id);
                    term.log(`Successfully compiled ${mod.id}`)
                } catch(error) {
                    errors++;
                    term.log(`Failed to compile ${mod.id}: ${error.message}`)
                }
            }

            if(errors===0) {
                break;
            }

            if(errors===lastErrors) {
                throw new Error(`You have non-dependency-related errors in the following modules: [${modules.filter(x=>!clean.includes(x.id))}]`);
            }
            lastErrors = errors;
        }

        await Modules.refreshModules();
    }

    export function cleanClientData(dataset: string) {
        const ds = Datasets.get(dataset);
        wfs.remove(mpath(ds.client.path,'dbc'));
        wfs.remove(mpath(ds.client.path,'maps'));
        wfs.remove(mpath(ds.client.path,'vmaps'));
        wfs.remove(mpath(ds.client.path,'buildings'));
        wfs.remove(mpath(ds.client.path,'mmaps'));
        
        wfs.remove(ipaths.datasetDBCSource(dataset));
        wfs.remove(ipaths.datasetDBC(dataset));
        wfs.remove(ipaths.datasetMaps(dataset));
        wfs.remove(ipaths.datasetVmaps(dataset));
        wfs.remove(ipaths.datasetMmaps(dataset));
        
        Datasets.get(dataset).installServerData();
    }

    export const command = commands.addCommand('clean')

    export async function initialize() {
        Clean.command.addCommand(
              'livescripts'
            , 'module?'
            , 'Removes live script build and binary files'
            , async (args)=>{
            await cleanScriptBin(args[0]);
            await removeOldLivescripts();
        });

        Clean.command.addCommand(
              'datascripts'
            , 'module?'
            , 'Removes data script build files'
            , async (args)=>{

            await cleanDataBuild(args[0]);
        });

        Clean.command.addCommand(
              'ids'
            , 'dataset = "default" --no-backups'
            , 'Removes all id mappings for a dataset'
            , async(args)=>{
            await Promise.all([Identifiers.getTypes('dataset',args)
                .map(x=>cleanIds(x,!args.includes('--no-backups')))]);
        });

        Clean.command.addCommand(
              'mysql'
            , ''
            , 'Cleans all MySQL data files'
            , async(args)=>{

            await cleanMysql();
        });

        Clean.command.addCommand(
              'clientdata'
            , 'dataset'
            , 'Cleans all client data for a single dataset'
            , async(args)=>{
            await cleanClientData(args[0]);
        });

        Clean.command.addCommand(
              'typescript'
            , ''
            , 'Cleans all TypeScript data'
            , async(args)=>{

            await cleanTypescript();
        });

        Clean.command.addCommand(
              'all'
            , 'dataset?'
            , 'Attempts to clean all intermediate data'
            ,  async(args)=>{
            await cleanScriptBin();
            await cleanDataBuild();
            await cleanIds(args[0],!args.includes('--no-backups'));
            await cleanAddonBuild();
            await cleanMysql();
            await cleanClientData(args[0]);
        });

        Clean.command.addCommand(
              'addon'
            , 'mod?'
            , 'Cleans addon build data'
            , async (x)=>{
            cleanAddonBuild(x[0]);
        });
    }
}
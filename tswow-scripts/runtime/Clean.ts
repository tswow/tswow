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
import { mpath, wfs } from "../util/FileSystem";
import { mysql } from "../util/MySQL";
import { ipaths } from "../util/Paths";
import { wsys } from "../util/System";
import { commands } from "./Commands";
import { MapData } from "./MapData";
import { Modules } from "./Modules";
import { TrinityCore } from "./TrinityCore";

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

        for(const dir of [ipaths.tcReleaseScripts,ipaths.tcDebugScripts]) {
                const scriptFile = mpath(dir,Modules.getBuiltLibraryName(mod));
            wfs.remove(scriptFile);
            wfs.remove(scriptFile.substring(0,scriptFile.length-3)+'pdb');
        }
    }

    export async function cleanMysql() {
        const value = await wsys.userInput('You are about to remove ALL MySQL data with no backup. Please enter "understand" to clean MySQL: ');
        if(value!=='understand') {
            return;
        }

        await mysql.disconnect();
        wfs.remove(ipaths.mysqlData);
        wfs.remove(ipaths.mysqlPlain);
        await mysql.start();
    }

    export async function cleanDataBuild(mod?: string) {
        if(!mod) {
            Modules.getModules().forEach(cleanDataBuild);
            return;
        }
        wfs.remove(ipaths.moduleDataBuild(mod));
        wfs.remove(ipaths.moduleNoEdit(mod));
        await Modules.refreshModules()
    }

    export async function cleanIds() {
        wfs.makeBackup(ipaths.configIds);
        wfs.remove(ipaths.coreIds);
        wfs.remove(ipaths.configIds);
    }

    export async function initialize() {
        const cleanC = commands.addCommand('clean')

        cleanC.addCommand('livescripts','module?','Removes live script build and binary files', async (args)=>{
            await cleanScriptBin(args[0]);
        });

        cleanC.addCommand('buildscripts','module?','Removes data script build files', async (args)=>{
            await cleanDataBuild(args[0]);
        });

        cleanC.addCommand('ids','module?','Removes all id mappings', async(args)=>{
            await cleanIds();
        });

        cleanC.addCommand('mysql','','Cleans all MySQL data files', async(args)=>{
            await cleanMysql();
        });

        cleanC.addCommand('clientdata','','Cleans all client data', async(args)=>{
            await TrinityCore.stop();
            await MapData.rebuild(true);
        });

        cleanC.addCommand('all','keepClient?','Attempts to clean all intermediate data', async(args)=>{
            await cleanScriptBin();
            await cleanDataBuild();
            await cleanIds();
            if(!args.includes('keepClient')) {
                await MapData.rebuild(true);
            }
            await cleanMysql();
        });
    }
}
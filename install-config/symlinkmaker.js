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
const jsyaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

let cpath;

try {
    const yaml = jsyaml.load(fs.readFileSync('./config/tswow.yaml').toString());
    cpath = yaml['client']['directory'];
    if(cpath===undefined) {
        throw new Error(`No client setting`)
    }
} catch(error) {
    throw new Error(`Failed to load tswow.yaml: ${error.message} (are you running this as 'npm run symlink' from the TSWoW root directory?)`);
}

if(!fs.existsSync(cpath)) {
    throw new Error(`Client path does not exist (check your client settings).`);
}

let datapath = path.join(cpath,'Data');

if(!fs.existsSync(datapath)) {
    throw new Error(`Client has no data path (is your client broken?)`)
}

function doSymlink(mod, letter) {
    if(mod===undefined) {
        fs.readdirSync('./modules').forEach(x=>doSymlink(path.basename(x)))
        return;
    }


    const modPath = path.join('modules',mod);
    const assetsPath = path.join(modPath,'assets');
    const statusPath = path.join(modPath,'symlinked');

    const patchPath = (curLetter)=>path.join(datapath,`patch-${curLetter}.MPQ`);

    if(fs.existsSync(statusPath)) {
        // Already symlinked, skip
        return;
    }

    if(!fs.existsSync(assetsPath) || fs.readdirSync(assetsPath).length===0) {
        // No assets so no reason to symlink
        return;
    }

    if(letter===undefined) {
        for(let i=97;i<=122;++i) {
            letter = String.fromCharCode(i);
            if(!fs.existsSync(patchPath(letter))) {
                break;
            }
        }
    }

    if(fs.existsSync(patchPath(letter))) {
        throw new Error(`Can't create patch ${patchPath(letter)}: Already exists. Do you have too many symlinks?`);
    }

    try {
        console.log(assetsPath,patchPath(letter));
        fs.symlinkSync(path.resolve(assetsPath), path.resolve(patchPath(letter)),'junction');
    } catch(error) {
        throw new Error(`Failed to create symlink: ${error.message} (Are you running as administrator?)`)
    }
    fs.writeFileSync(statusPath,letter);
    console.log(`Successfully symlinked ${mod} to patch-${letter}.MPQ!`);
}

doSymlink(process.argv[2],process.argv[3]);
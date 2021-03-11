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
import { FileChanges } from '../util/FileChanges';
import { mpath, wfs } from '../util/FileSystem';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { commands } from './Commands';
import { Modules } from './Modules';
import { ipaths } from '../util/Paths';

/**
 * Contains functions for MPQ building
 */
export namespace Assets {
    const blpconverter = '"bin/BLPConverter/blpconverter.exe"';

    function iter(directory: string|undefined, callback: (file: string) => any) {
        if (directory) {
            wfs.iterate(ipaths.moduleAssets(directory), callback)
        } else {
            Modules.getModules().forEach((x) => {
                wfs.iterate(ipaths.moduleAssets(x), callback);
            });
        }
    }

    export function pngToBlp(force: boolean, mod?: string) {
        iter(mod, (png) => {
            if (!png.endsWith('.png')) {
                return;
            }
            const blp = png.substring(0, png.length - 4) + '.blp';

            if (wfs.exists(blp) && !force) {
                if (!FileChanges.isChanged(png)) {
                    return;
                }
            }

            FileChanges.tagChange(png);

            // Remove so we can check if it's actually written
            wfs.remove(blp);
            wsys.exec(`${blpconverter} ${png}`);
            if (!wfs.exists(blp)) {
                throw new Error(`Failed to create blp file ${blp}`);
            }
        });
    }

    export function blpToPng(mod?: string) {
        iter(mod, (blp) => {
            if (!blp.endsWith('.blp')) {
                return;
            }
            const png = blp.substring(0, blp.length - 4) + '.png';
            if (wfs.exists(png)) {
                return;
            }

            wsys.exec(`${blpconverter} ${blp}`);
            term.success(`Generated png file ${png}`);
            if (wfs.exists(png)) {
            } else {
                throw new Error(`Failed to create png file ${png}`);
            }
        });
    }

    /**
     * Checks for duplicate and raw xml/lua files.
     * @deprecated
     */
    export function check() {
        const filemap: {[key: string]: string} = {};
        // Check and warn for duplicate entries
        Modules.getModules().forEach(modname => {
            Assets.prepare(modname);
            wfs.iterate(ipaths.moduleAssets(modname), (fname) => {
                const mpqname = wfs.relative(ipaths.moduleAssets(modname), fname);
                const old = filemap[mpqname];
                if (mpqname.endsWith('xml') || mpqname.endsWith('lua')) {
                    term.warn(`Mod ${modname} has XML/LUA files as an asset, consider using LUAXML instead (${mpqname})`);
                }

                if (old !== undefined) {
                    term.warn(`Duplicate MPQ entry '${mpqname}', exists in both modules '${old}' and '${modname}'`);
                } else {
                    filemap[mpqname] = modname;
                }
            });
        });
    }

    /**
     * Prepares assets for a specific mod before MPQ build
     */
    export function prepare(mod: string) {
        // Convert new/changed pngs to blps
        pngToBlp(false, mod);
    }

    export const command = commands.addCommand('assets');

    export function initialize() {
        command.addCommand('png', 'mod?', 'Create missing pngs from blp files', (args) => {
            blpToPng(args[0]);
        });

        command.addCommand('blp', 'mod?', 'Converts png files back to blp', (args) => {
            pngToBlp(true, args[0]);
        });

        command.addCommand('check', '', '');
    }
}

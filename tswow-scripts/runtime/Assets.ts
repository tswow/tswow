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
import * as fs from 'fs';
import { term } from '../util/Terminal';
import { Client } from './Client';
import { ModuleEndpoint } from './Modules';

const SYMLINK_FILE = '____symlinked'

export class Assets {
    mod: ModuleEndpoint

    get path() {
        return this.mod.path.assets
    }

    initialize() {
        this.path.mkdir();
        return this;
    }

    constructor(mod: ModuleEndpoint) {
        this.mod = mod;
    }

    exists() {
        return this.path.exists()
    }

    static create(mod: ModuleEndpoint) {
        return new Assets(mod).initialize()
    }

    getSymlink(client: Client) {
        let patches = client.mpqPatches()
            .filter(x=>x.isDirectory())
            .map(x=>x.join(SYMLINK_FILE).toFile())
        patches
            .forEach(x=>{
                x.remove()
            })
        this.path.join(SYMLINK_FILE).toFile().write('')
        patches = patches.filter(x=>{
            if(x.exists()) return true;
        })
        if(patches.length > 1) {
            throw new Error(
                  `asset directory at ${this.path.get()}`
                + ` has multiple symlinks:\n\n${patches.join('\n')}\n`
            )
        }
        patches.forEach(x=>x.remove())
        return patches[0]
    }

    createSymlink(client: Client) {
        if(this.getSymlink(client)) return;
        let patches = client.freePatches()
        if(patches.length === 0) {
            throw new Error(`Client has no free patches: ${client.path}`)
        }
        fs.symlinkSync(patches[0].get(),this.path.get());
        term.success(
            `Created a symlink from ${this.path.get()} to ${patches[0].get()}`
        )
    }
}
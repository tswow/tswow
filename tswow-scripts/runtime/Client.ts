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
import * as crypto from 'crypto';
import * as fs from 'fs';
import { sleep } from 'deasync';
import { Args } from '../util/Args';
import { ClientPatches, EXTENSION_DLL_PATCH_NAME } from '../util/ClientPatches';
import { mpath, wfs } from '../util/FileSystem';
import { WDirectory, WNode } from '../util/FileTree';
import { ClientPath, ipaths } from '../util/Paths';
import { isWindows } from '../util/Platform';
import { Process } from '../util/Process';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { StartCommand } from './CommandActions';
import { Dataset } from './Dataset';
import { Identifier } from './Identifiers';
import { NodeConfig } from './NodeConfig';

export const CLEAN_CLIENT_MD5 = '45892bdedd0ad70aed4ccd22d9fb5984'

const processMap: {[datasetName: string]: Process[]} = {}

/**
 * Absolute path to the dedicated wine prefix tswow uses for the client on
 * Linux/macOS. Keeping the client in its own prefix means we can shut its wine
 * session down (wineserver -k) without affecting any other wine apps.
 */
function winePrefix(): string {
    return ipaths.coredata.join('wine').abs().get();
}

/**
 * Environment for launching the wine client: an isolated prefix, and mono/gecko
 * install prompts disabled so startup is non-interactive.
 */
function wineEnv(): NodeJS.ProcessEnv {
    return {
          WINEPREFIX: winePrefix()
        , WINEDLLOVERRIDES: 'mscoree,mshtml='
        , WINEDEBUG: process.env.WINEDEBUG || '-all'
    };
}

/**
 * Terminates the wine session for tswow's dedicated prefix. This kills the
 * (possibly frozen) Wow.exe and its wine host processes right away, where a
 * plain kill of the launched `wine` process would leave them running.
 */
function killWineSession() {
    try {
        wsys.exec('wineserver -k', 'ignore', { env: { ...process.env, ...wineEnv() } });
    } catch (err) {
        // wineserver may already be gone; nothing to clean up.
    }
}

export class Client {
    readonly dataset: Dataset

    constructor(dataset: Dataset) {
        this.dataset = dataset;
    }

    get path() {
        if(!wfs.exists(this.dataset.config.client_path)) {
            throw new Error(
                `Invalid client: ${this.dataset.config.client_path} does not exist`
            )
        }

        const patchPath = mpath(
            this.dataset.config.client_path,
            'Data',
            `patch-${this.dataset.config.ClientDevPatchLetter.toUpperCase()}.MPQ`
        );

        return ClientPath(
              this.dataset.config.client_path
            , wfs.relative(this.dataset.config.client_path+'/Data',patchPath)
        )
    }

    patchDir() {
        return this.path.Data as WDirectory
    }

    locale() {
        return this.path.Data.locale().basename()
    }

    async kill() {
        term.debug('client', `Killing client`)
        let processes = processMap[this.dataset.fullName];
        let count = 0;
        if(processes !== undefined) {
            count = processes.length;
            // On Linux the client runs under wine: the `wine` launcher we spawn
            // is not the real Wow.exe (that lives under the shared wineserver),
            // so killing the launcher alone leaves the game window frozen. Shut
            // down the whole wine session for our dedicated prefix instead, which
            // terminates Wow.exe and its wine host processes immediately without
            // touching any other wine apps the user may be running.
            if(!isWindows() && count > 0) {
                killWineSession();
            }
            await Promise.all(processes.map(x=>x.stop()));
        }
        delete processMap[this.dataset.fullName];
        return count;
    }

    async cleanFrameXML() {
        await this.kill();
        this.mpqPatches().forEach(x=>{
            x.join('Interface','FrameXML','TSAddons')
        })
    }

    mpqPatches() {
        const nodes: WNode[] = []
        const iter = (dir: WDirectory) => {
            dir.iterate('FLAT','BOTH','FULL',node=>{
                if (
                    node.basename()
                        .toLowerCase()
                        .match(/patch-[a-zA-Z1-9].mpq/)
                ) {
                    nodes.push(node);
                }
            });
        }
        iter(this.path.Data);
        iter(this.path.Data.locale());
        return nodes;
    }

    writeRealmlist() {
        term.debug('client', `Writing realmlist`)
        const realmlist = this.path.Data.locale().realmlist_wtf.readString();
        if(realmlist !== 'set realmlist localhost') {
            wfs.makeBackup(this.path.Data.locale().realmlist_wtf.get())
        }
        this.path.Data.locale().realmlist_wtf.write('set realmlist localhost');
    }

    async start(count: number = 1) {
        if(count === 0) {
            return;
        }

        let processes = processMap[this.dataset.fullName]
            || (processMap[this.dataset.fullName] = []);

        for(let i=0;i<count;++i) {
            term.log('client',`Starting client for dataset ${this.dataset.name}`)
            let process = new Process('client').showOutput(false);
            if(isWindows()) {
                process.start(this.path.wow_exe.get())
            } else {
                // Run in the client directory so WoW resolves Data/ relative to
                // the executable, and use the exe's own basename (case may differ
                // from the lowercase "wow.exe" path on case-sensitive filesystems).
                // A dedicated WINEPREFIX keeps the session isolated so it can be
                // shut down cleanly on exit (see kill()).
                process.startIn(
                      this.dataset.config.client_path
                    , 'wine'
                    , [this.path.wow_exe.get()]
                    , wineEnv()
                )
            }
            processes.push(process);
            sleep(200)
        }
    }

    async startup(count: number = 1, ip: string = '127.0.0.1') {
        await this.kill();
        this.ensureWowExe();
        await this.applyExePatches();
        this.installAddons();
        this.clearCache();
        this.writeRealmlist();
        this.start(count);
    }

    /**
     * On case-sensitive filesystems (Linux/macOS) the client executable is
     * usually shipped as "Wow.exe", but tswow expects a lowercase "wow.exe".
     * If the lowercase file is missing, locate a case-insensitive match in the
     * client directory and create a lowercase copy so the rest of the pipeline
     * (patching + launching) works without the user renaming anything.
     */
    private ensureWowExe() {
        if (isWindows()) { return; }
        const exePath = this.path.wow_exe.get();
        if (fs.existsSync(exePath)) { return; }
        const clientDir = this.dataset.config.client_path;
        let match: string | undefined;
        try {
            match = fs.readdirSync(clientDir).find(f => /^wow\.exe$/i.test(f));
        } catch (err) {
            return;
        }
        if (match && match !== 'wow.exe') {
            fs.copyFileSync(mpath(clientDir, match), exePath);
            term.log('client', `Created lowercase wow.exe from ${match} for case-sensitive filesystem`);
        }
    }

    async exePatches() {
        await this.dataset.worldDest.connect();
        // default roles
        let values = [
            { class: 1, tank: 1, healer: 0, damage: 1, leader: 1},
            { class: 2, tank: 1, healer: 1, damage: 1, leader: 1},
            { class: 3, tank: 0, healer: 0, damage: 1, leader: 1},
            { class: 4, tank: 0, healer: 0, damage: 1, leader: 1},
            { class: 5, tank: 0, healer: 1, damage: 1, leader: 1},
            { class: 6, tank: 1, healer: 0, damage: 1, leader: 1},
            { class: 7, tank: 0, healer: 1, damage: 1, leader: 1},
            { class: 8, tank: 0, healer: 0, damage: 1, leader: 1},
            { class: 9, tank: 0, healer: 0, damage: 1, leader: 1},
            { class: 11, tank: 1, healer: 1, damage: 1, leader: 1},
        ]
        try {
            values = await this.dataset.worldDest.query(
                `SELECT \`class\`,\`tank\`,\`healer\`,\`damage\`,\`leader\``
                + `FROM \`player_class_roles\``
            )
        // table might not exist yet, ignore errors
        } catch(err) {
            term.log('client'
                , `Could not load class roles, using default values.`
                + ` This usually just means you haven't built your`
                + ` database yet.`
            )
        }
        return ClientPatches(
              this.dataset.config.DatasetGameBuild
            , values
            )
    }

    async applyExePatches() {
        term.log('client',`Applying client patches...`)
        this.path.wow_exe.copyOnNoTarget(this.path.wow_exe_clean)

        let wowbin = this.path.wow_exe_clean.read()
        const md5 = (value: Buffer) => crypto
            .createHash('md5')
            .update(value)
            .digest('hex')
        let hash = md5(wowbin)
        if(hash !== CLEAN_CLIENT_MD5) {
            let exebin = this.path.wow_exe.read();
            if(md5(exebin) === CLEAN_CLIENT_MD5) {
                // user placed a new exe that's actually clean
                wowbin = exebin
                hash = CLEAN_CLIENT_MD5
                this.path.wow_exe_clean.writeBuffer(wowbin);
            } else {
                // todo: stupid bugged code
                //term.warn('client',
                //    `Unclean Wow.exe detected. Consider `
                // + `replacing it with a clean 3.3.5a client`)
            }
        }

        if(hash == CLEAN_CLIENT_MD5) {
            term.success('client',`Source wow client hash is ${hash}`);
        } else {
            term.success('client',`Source wow client hash is ${hash}`);
        }

        term.debug('client', `Writing ClientExtensions.dll`)
        if(this.dataset.config.client_patches.includes(EXTENSION_DLL_PATCH_NAME)) {
            if(!ipaths.bin.ClientExtensions_dll.exists()) {
                throw new Error(
                      `Dataset ${this.dataset.name}`
                    + ` has client extensions enabled but this tswow`
                    + ` installation does not have one. Please put a working`
                    + ` dll at ${ipaths.bin.ClientExtensions_dll.get()}`
                )
            }
            wowbin = wowbin.slice(0,0x758c00)
            ipaths.bin.ClientExtensions_dll
                .copy(this.path.ClientExtensions_dll)
        }

        term.debug('client', `Applying client patches`)
        const usedPatchNames = this.dataset.config.client_patches
        const usedPatches = (await this.exePatches())
            .filter(x=>usedPatchNames.includes(x.name));
        usedPatches.forEach(cat=>{
            term.debug('client', `Applying client patch ${cat.name}`)
            cat.patches.forEach(patch=>{
                patch.values.forEach((value,offset)=>{
                    wowbin.writeUInt8(value,patch.address+offset);
                })
            })
        })
        term.debug('client', `Writing patched wow.exe`)
        this.path.wow_exe.writeBuffer(wowbin);
    }

    patchPath(letter: string) {
        return this.path.Data.join(`patch-${letter.toUpperCase()}.MPQ`)
    }

    verify() {
        [this.path,this.path.wow_exe,this.path.Data]
            .forEach(x=>{
                if(x.exists()) {
                    throw new Error(`Missing/broken client: ${x.get()} does not exist`)
                }
            })
    }

    installAddons() {
        term.debug('client', `Installing addons`)
        ipaths.bin.addons.iterate('FLAT','DIRECTORIES','FULL',node=>{
            node.copy(this.path.Interface.AddOns.join(node.basename()));
        })
    }

    clearCache() {
        term.debug('client', `Clearing cache`)
        return this.path.Cache.remove();
    }

    private _patchOrder() {
        const order: string[] = []
        for(let i=4;i<9;++i) order.push(`${i}`)
        for(let i='A'.charCodeAt(0);i<'Z'.charCodeAt(0);++i) {
            order.push(`${String.fromCharCode(i)}`)
        }
        const start = order.indexOf(this.dataset.config.ClientDevPatchLetter.toUpperCase())
        if(start === -1) {
            throw new Error(
                  `Invalid patch letter: ${this.dataset.config.ClientDevPatchLetter}`
                + ` (in dataset ${this.dataset.fullName})`
            )
        }
        return { order, start };
    }

    freePatches() {
        const ids: WNode[] = []
        const { order, start } = this._patchOrder()
        for(let i=start;i<order.length;++i) {
            let path = this.patchPath(order[i]);
            if( !path.exists()
                && path.abs().get() !== this.path.Data.devPatch.abs().get()
            ) {
                ids.push(path)
            }
        }
        return ids;
    }

    freeNonLocalePatches() {
        const ids: WNode[] = []
        const { order, start } = this._patchOrder()
        for(let i=start;i<order.length;++i) {
            let path = this.path.Data.join(`patch-${order[i].toUpperCase()}.MPQ`)
            if(!path.exists()) {
                ids.push(path)
            }
        }
        return ids;
    }

    static initialize() {
        term.debug('client', `Initializing client`)
        if(!process.argv.includes('noclient') && NodeConfig.AutoStartClient > 0) {
            // Never let a client-startup failure take down the whole runtime
            // (an unhandled rejection here escalates to uncaughtException, which
            // kills the managed MySQL/server child processes). Log and continue.
            Identifier.getDataset(NodeConfig.DefaultDataset)
                .client.startup(NodeConfig.AutoStartClient)
                .catch(err => term.error(
                      'client'
                    , `Failed to auto-start client (server keeps running): ${err && err.message ? err.message : err}`
                ))
        }

        StartCommand.addCommand(
              'client'
            , ''
            , ''
            , args => {
                return Promise.all(Identifier.getDatasets(
                      args
                    , 'MATCH_ANY'
                    , NodeConfig.DefaultDataset
                ).map(x=>{
                    return x.client
                        .startup(Args.getNumber('--count',1,args));
                }))
            }
        )
    }
}

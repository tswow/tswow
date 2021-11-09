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
import { FilePath, resfp } from './FileTree';
import { Process } from './Process';
import { wsys } from './System';
import { term, termc } from './Terminal';

// tsc
const tscWatchers: {[key: string]: Process} = {}
export function watchTsc(tscEntry: string, dir: FilePath, name: string) {
    if(tscWatchers[resfp(dir)]) return;
    console.log(`Starting TSC watcher in ${dir}`)
    let watcher = tscWatchers[resfp(dir)] = new Process()
    watcher
        .showOutput(false)
        .onMessage(output=>{
            output
                .split('\r').join('')
                .split('\n')
                // massive hack but tsc outputs bizarre
                // invisible characters that can't be regex'd
                // causing empty lines
                .filter(x=>x.length>10)
                .forEach(x=>{
                    // remove time header, nobody cares
                    if(x.match(/\d+:\d+:\d+ .+? - /)) {
                        x = x.split('- ').slice(1).join('- ')
                    }

                    if(x.includes('Found 0 errors')) {
                        term.log(
                              `${termc.fgmagenta}${name}:`
                            + ` ${termc.fggreen}${x}${termc.reset}`
                        )
                    } else if(x.includes('error')) {
                        term.log(
                            `${termc.fgmagenta}${name}:`
                          + ` ${termc.fgred}${x}${termc.reset}`
                      )
                    } else {
                        term.log(
                            `${termc.fgmagenta}${name}:`
                          + ` ${termc.fgwhite}${x}${termc.reset}`
                      )
                    }
                })
        })
        .startIn(dir,'node',[tscEntry,'--w'])
}

export async function destroyTSWatcher(dir: string) {
    let w = tscWatchers[dir]
    if(w) await w.stop();
}

export function clearTscWatchers() {
    return Promise.all(Object.values(tscWatchers).map(x=>x.stop()))
}

export function compileTsc(dir: string) {
    wsys.execIn(dir,'tsc','inherit');
}
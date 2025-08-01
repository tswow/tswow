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
import { term } from './Terminal';
import { getTerminalCategory, TerminalCategory } from './TerminalCategories';

// tsc
const tscWatchers: {[key: string]: Process} = {}
export function watchTsc(nodeExecutable: string, tscEntry: string, dir: FilePath, name: TerminalCategory) {
    if(tscWatchers[resfp(dir)]) return;
    term.log(name,`Starting TSC watcher in ${dir}`)
    let watcher = tscWatchers[resfp(dir)] = new Process(getTerminalCategory(name))
    let last = "";
    watcher
        .showOutput(false)
        .onMessage(output=>{
            output
                .split('\r').join('')
                .split('\n')
                // massive hack but tsc outputs bizarre
                // invisible characters that can't be regex'd
                // causing empty lines
                .filter(x=>x.length>10 && ! x.includes('File change detected'))
                .forEach(x=>{
                    // remove time header, nobody cares
                    if(x.match(/\d+:\d+:\d+ .+? - /)) {
                        x = x.split('- ').slice(1).join('- ')
                    }

                    if(x == last) return;
                    last = x;

                    if(x.includes('Found 0 errors')) {
                        term.success(name,x)
                    } else if(x.includes('error')) {
                        term.error(name,x)
                    } else {
                        term.log(name,x)
                    }
                })
        })
        .startIn(dir,nodeExecutable,['--enable-source-maps',tscEntry,'--w'])
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

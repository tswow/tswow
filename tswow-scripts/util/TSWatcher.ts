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
import { isWindows } from './Platform';
import { wsys } from './System';
import { term } from './Terminal';

function defaultError(err: Error) {
    term.error(`TSC Error: ${err.name} ${err.message}`);
    return false;
}

export function watchTs(path: string, showOutput: boolean = true, onError: (error: Error) => boolean = defaultError) {
    term.log(`TSC Watching ${path}`);
    const process = wsys.spawnIn(path, isWindows() ? 'tsc.cmd' : 'tsc', ['--w']);

    process.on('error', (error) => {
        term.pipe('red', [error.name, error.message]);
        onError(error);
    });

    process.stdout.on('data', (data) => {
        if (showOutput) {
            term.log(data.toString());
        }
    });

    return process;
}

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
import { wsys } from '../util/System';
import { commands } from './Commands';

export namespace Test {
    export function initialize() {
        commands.addCommand('test', 'regex?', 'Runs unit tests', (args) => {
            if (args.length > 0) {
                wsys.exec(`npm run otest ${args.join(' ')}`, 'inherit');
            } else {
                wsys.exec(`npm run test`, 'inherit');
            }
        });
    }
}

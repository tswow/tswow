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
import { wfs } from '../util/FileSystem';
import { wsys } from '../util/System';

const BOOST_URL = 'https://sourceforge.net/projects/boost/files/boost-binaries/1.72.0/boost_1_72_0-msvc-14.2-64.exe/download';
const BOOST_PATH = `C:\\local\\boost_1_72_0`;
const BOOST_VARIABLE = `C:/local/boost_1_72_0`;

export async function installBoost() {
    while (!wfs.exists(BOOST_PATH)) {
        const str =
            `Boost not found. Please install if from the link below.\n` +
            `You may also have to type the command:` +
            `"setx BOOST_ROOT ${BOOST_VARIABLE}" /M ` +
            `in an elevated command prompt.\n` +
            `${BOOST_URL}\n` +
            `Once done, press enter in this menu.`;
        await wsys.userInput(str);
    }
    wsys.exec(`setx BOOST_ROOT ${BOOST_VARIABLE}`);
    return BOOST_PATH;
}

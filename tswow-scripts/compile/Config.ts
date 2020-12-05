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
import { term } from '../util/Terminal';
import { mpath, wfs } from '../util/FileSystem';
import { install_path } from './BuildConfig';
import { wsys } from '../util/System';

const install_gitignore =
`node_modules
bin
build
coredata
`;

export async function createConfig() {
    term.log('Creating config files');

    // Copy configuration/misc files
    const configDest = install_path('config/tswow.yaml');
    if (!wfs.exists(configDest)) {
        wfs.copy('./tswow.default.yaml', configDest);
    }

    wfs.copy('./package.install.json', install_path('package.json'));

    if (!wfs.exists(install_path('.gitignore'))) {
        wfs.write(install_path('.gitignore'), install_gitignore);
    }

    if (!wfs.exists(install_path('.git'))) {
        wsys.execIn(install_path(), 'git init');
    }

    wfs.copy(mpath('./tswow-scripts', 'sql'), install_path('bin', 'sql'));
}

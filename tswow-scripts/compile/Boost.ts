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
import * as os from 'os';
import * as path from 'path';
import { WDirectory, WFile, WNode } from '../util/FileTree';
import { wsys } from '../util/System';
import { term } from '../util/Terminal';
import { BOOST_LINUX_SHA256, BOOST_LINUX_URL, BOOST_LINUX_VERSION, BOOST_URL, CLEAR_ARCHIVES } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace Boost {
    export async function install() {
        await DownloadFile(BOOST_URL,bpaths.boostArchive.get())

        if(!bpaths.boost.boost_1_82_0.exists())
        {
            await ExtractZip(bpaths.boostArchive.get(),{dir:bpaths.boost.boost_1_82_0.abs().get()});
        }

        // Delete unused libraries
        [
            , "libboost_test_exec_monitor-vc142-mt-gd-x64-1_72.lib"
            , "libboost_test_exec_monitor-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_unit_test_framework-vc142-mt-gd-x64-1_72.lib"
            , "libboost_unit_test_framework-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_wave-vc142-mt-gd-x64-1_72.lib"
            , "libboost_wave-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_wave-vc142-mt-s-x64-1_72.lib"
            , "libboost_wave-vc142-mt-x64-1_72.lib"
            , "libboost_log_setup-vc142-mt-gd-x64-1_72.lib"
            , "libboost_log_setup-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_log-vc142-mt-gd-x64-1_72.lib"
            , "libboost_log-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_math_tr1f-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_math_tr1l-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_math_tr1-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_serialization-vc142-mt-gd-x64-1_72.lib"
            , "libboost_serialization-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_wserialization-vc142-mt-gd-x64-1_72.lib"
            , "libboost_math_tr1-vc142-mt-gd-x64-1_72.lib"
            , "libboost_math_tr1l-vc142-mt-gd-x64-1_72.lib"
            , "libboost_math_tr1f-vc142-mt-gd-x64-1_72.lib"
            , "libboost_log-vc142-mt-s-x64-1_72.lib"
            , "libboost_wserialization-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_locale-vc142-mt-sgd-x64-1_72.lib"
            , "libboost_log_setup-vc142-mt-s-x64-1_72.lib"
            , "libboost_log_setup-vc142-mt-x64-1_72.lib"
            , "libboost_locale-vc142-mt-gd-x64-1_72.lib"
        ].forEach(x=>{
            bpaths.boost.boost_1_82_0.lib64_msvc_14_3.join(x)
                .remove()
        })

        if(CLEAR_ARCHIVES) {
            bpaths.boostArchive.remove();
        }

        return bpaths.boost.boost_1_82_0.abs().get();
    }

    /**
     * Linux.SystemBoost = true in build.conf opts out of the bundled Boost.
     * Other non-Windows platforms keep using the system Boost.
     */
    export function linuxUsesSystemBoost() {
        return process.platform !== 'linux'
            || process.env.TSWOW_LINUX_SYSTEM_BOOST === '1';
    }

    // bpaths is relative to where build.js was started. Resolve it while
    // loading, because later steps (e.g. mpqbuilder) chdir into build dirs.
    const buildDirAbs = path.resolve(bpaths.get());
    const linuxDirAbs = path.join(buildDirAbs, `boost-${BOOST_LINUX_VERSION}`);

    function linuxDir() {
        return new WDirectory(linuxDirAbs);
    }

    function linuxPrefix() {
        return linuxDir().join('install');
    }

    function sha256(file: WNode) {
        return crypto.createHash('sha256')
            .update(fs.readFileSync(file.get()))
            .digest('hex');
    }

    /**
     * Builds the pinned Boost release as static, position-independent
     * libraries (once per build directory). Boost.Locale uses the iconv
     * backend so the result doesn't depend on the distro's ICU either.
     */
    export async function installLinux() {
        if (linuxUsesSystemBoost()) {
            return;
        }

        const dir = linuxDir();
        const prefix = linuxPrefix();
        const stamp = prefix.join('.tswow-installed');
        if (stamp.exists()) {
            return;
        }

        const archive = new WFile(path.join(buildDirAbs, `boost-${BOOST_LINUX_VERSION}-b2-nodocs.tar.gz`));
        if (archive.exists() && sha256(archive) !== BOOST_LINUX_SHA256) {
            archive.remove();
        }
        await DownloadFile(BOOST_LINUX_URL, archive);
        const hash = sha256(archive);
        if (hash !== BOOST_LINUX_SHA256) {
            archive.remove();
            throw new Error(`Checksum mismatch for ${BOOST_LINUX_URL}: expected ${BOOST_LINUX_SHA256}, got ${hash}`);
        }

        term.log('build', `Building Boost ${BOOST_LINUX_VERSION} (only needed once)`);
        dir.remove();
        dir.mkdir();
        wsys.exec(`tar -xzf "${archive.abs().get()}" -C "${dir.abs().get()}"`, 'inherit');
        const src = dir.join(`boost-${BOOST_LINUX_VERSION}`);

        const cxx = process.env.TSWOW_CXX || '/usr/bin/g++';
        const toolset = path.basename(cxx).includes('clang') ? 'clang' : 'gcc';
        const userConfig = dir.join('user-config.jam');
        userConfig.toFile().write(`using ${toolset} : : ${cxx} ;\n`);

        const parsedJobs = Number(process.env.TSWOW_LINUX_MAKE_JOBS || '0');
        const jobs = Number.isFinite(parsedJobs) && parsedJobs > 0
            ? parsedJobs
            : os.cpus().length;

        wsys.execIn(src.get(), `./bootstrap.sh --with-toolset=${toolset}`, 'inherit');
        wsys.execIn(src.get(), `./b2 -d0 -j${jobs}`
            + ` --user-config="${userConfig.abs().get()}"`
            + ` --prefix="${prefix.abs().get()}"`
            + ` --build-dir="${dir.join('build').abs().get()}"`
            + ` --with-filesystem --with-program_options --with-regex --with-locale`
            + ` toolset=${toolset} variant=release link=static runtime-link=shared threading=multi`
            + ` cxxstd=20 cflags=-fPIC cxxflags=-fPIC`
            + ` boost.locale.icu=off boost.locale.iconv=on`
            + ` install`, 'inherit');

        src.remove();
        dir.join('build').remove();
        if (CLEAR_ARCHIVES) {
            archive.remove();
        }
        stamp.toFile().write(BOOST_LINUX_VERSION);
    }

    /**
     * CMake arguments that select the bundled Boost (or the system one).
     */
    export function linuxCMakeArgs() {
        // Forget Boost settings cached by an earlier configure, so switching
        // between bundled and system Boost in an existing build dir works.
        const reset = ` -U Boost_DIR -U "boost_*_DIR" -U Boost_NO_SYSTEM_PATHS -U Boost_USE_STATIC_LIBS`;
        if (linuxUsesSystemBoost()) {
            return reset;
        }
        const prefix = linuxPrefix().abs().get();
        return reset
            + ` -DBoost_DIR="${prefix}/lib/cmake/Boost-${BOOST_LINUX_VERSION}"`
            + ` -DBoost_NO_SYSTEM_PATHS=ON`
            + ` -DBoost_USE_STATIC_LIBS=ON`;
    }
}
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
import { Args } from '../util/Args';
import { isWindows } from '../util/Platform';
import { BOOST_URL_WINDOWS, CLEAR_ARCHIVES } from './BuildConfig';
import { bpaths } from './CompilePaths';
import { DownloadFile } from './Downloader';
import ExtractZip = require('extract-zip')

export namespace Boost {
    export async function install() {
        if(isWindows()) {
            return installWindows();
        } else {
            return installLinux()
        }
    }

    export async function installLinux() {
        let boost = Args.getString('BOOST_ROOT',undefined,process.argv)
        if(!boost) {
            throw new Error('Not implemented')
        } else {
            return boost
        }
    }

    export async function installWindows() {
        await DownloadFile(BOOST_URL_WINDOWS,bpaths.boostZip.get())

        if(!bpaths.boost.boost_1_77_0.exists())
        {
            await ExtractZip(bpaths.boostZip.get(),{dir:bpaths.boost.boost_1_77_0.abs().get()});
        }

        // Delete unused libraries
        [
            , "libboost_test_exec_monitor-vc142-mt-gd-x64-1_77.lib"
            , "libboost_test_exec_monitor-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_unit_test_framework-vc142-mt-gd-x64-1_77.lib"
            , "libboost_unit_test_framework-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_wave-vc142-mt-gd-x64-1_77.lib"
            , "libboost_wave-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_wave-vc142-mt-s-x64-1_77.lib"
            , "libboost_wave-vc142-mt-x64-1_77.lib"
            , "libboost_log_setup-vc142-mt-gd-x64-1_77.lib"
            , "libboost_log_setup-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_log-vc142-mt-gd-x64-1_77.lib"
            , "libboost_log-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_math_tr1f-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_math_tr1l-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_math_tr1-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_serialization-vc142-mt-gd-x64-1_77.lib"
            , "libboost_serialization-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_wserialization-vc142-mt-gd-x64-1_77.lib"
            , "libboost_math_tr1-vc142-mt-gd-x64-1_77.lib"
            , "libboost_math_tr1l-vc142-mt-gd-x64-1_77.lib"
            , "libboost_math_tr1f-vc142-mt-gd-x64-1_77.lib"
            , "libboost_log-vc142-mt-s-x64-1_77.lib"
            , "libboost_wserialization-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_locale-vc142-mt-sgd-x64-1_77.lib"
            , "libboost_log_setup-vc142-mt-s-x64-1_77.lib"
            , "libboost_log_setup-vc142-mt-x64-1_77.lib"
            , "libboost_locale-vc142-mt-gd-x64-1_77.lib"
        ].forEach(x=>{
            bpaths.boost.boost_1_77_0.lib64_msvc_14_2.join(x)
                .remove()
        })

        if(CLEAR_ARCHIVES) {
            bpaths.boostZip.remove();
        }

        return bpaths.boost.boost_1_77_0.abs().get();
    }
}
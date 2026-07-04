/**
 * This file is used to bootstrap the other compiler scripts.
 */
const child_process = require('child_process');
const path = require('path');
const fs = require('fs')

/**
 * On Linux/macOS, verify the system build prerequisites *before* we run any
 * `npm i` (which compiles native modules like deasync and needs a C toolchain
 * and python). This must live in build.js — the plain-JS entry point — because
 * the compiled TypeScript build scripts can't run until `npm i` has succeeded.
 *
 * We never install anything automatically unless the user explicitly opts in
 * with `--install-deps`, since that needs root and is potentially destructive.
 */
function checkLinuxPrerequisites() {
    if (process.platform === 'win32') { return; }

    const has = (cmd) => {
        try {
            child_process.execSync(`command -v ${cmd}`, { stdio: 'ignore' });
            return true;
        } catch (e) { return false; }
    };
    const hasBoost = () =>
           fs.existsSync('/usr/include/boost/version.hpp')
        || fs.existsSync('/usr/local/include/boost/version.hpp');

    const pm =
          has('pacman')  ? 'pacman'
        : has('apt-get') ? 'apt'
        : has('dnf')     ? 'dnf'
        : has('zypper')  ? 'zypper'
        : 'unknown';

    // Each requirement maps to a package name per supported package manager.
    const reqs = [
        { name: 'C/C++ toolchain + make + python (gcc/g++, for TrinityCore and native npm modules)',
          ok: (has('gcc') || has('cc')) && (has('g++') || has('c++') || has('clang++')) && has('make') && (has('python3') || has('python')),
          pkg: { pacman:'base-devel python', apt:'build-essential python3', dnf:'@development-tools python3', zypper:'-t pattern devel_basis python3' } },
        { name: 'CMake', ok: has('cmake'),
          pkg: { pacman:'cmake', apt:'cmake', dnf:'cmake', zypper:'cmake' } },
        { name: 'Git', ok: has('git'),
          pkg: { pacman:'git', apt:'git', dnf:'git', zypper:'git' } },
        { name: 'Boost (headers + libraries)', ok: hasBoost(),
          pkg: { pacman:'boost', apt:'libboost-all-dev', dnf:'boost-devel', zypper:'boost-devel' } },
        { name: 'OpenSSL', ok: has('openssl'),
          pkg: { pacman:'openssl', apt:'libssl-dev', dnf:'openssl-devel', zypper:'libopenssl-devel' } },
        { name: 'MySQL/MariaDB server + client',
          ok: (has('mariadbd') || has('mysqld')) && (has('mariadb') || has('mysql')),
          pkg: { pacman:'mariadb', apt:'mariadb-server default-libmysqlclient-dev', dnf:'mariadb-server mariadb-connector-c-devel', zypper:'mariadb mariadb-client libmariadb-devel' } },
        { name: '7-Zip (extract world database)',
          ok: has('7za') || has('7z') || has('7zr'),
          pkg: { pacman:'p7zip', apt:'p7zip-full', dnf:'p7zip', zypper:'p7zip' } },
    ];
    // Optional: warn only.
    const optional = [
        { name: 'ccache (optional, speeds up rebuilds)', ok: has('ccache'),
          pkg: { pacman:'ccache', apt:'ccache', dnf:'ccache', zypper:'ccache' } },
        { name: 'Wine (optional, to run the game client)', ok: has('wine') || has('wine64'),
          pkg: { pacman:'wine', apt:'wine', dnf:'wine', zypper:'wine' } },
    ];

    for (const o of optional) {
        if (!o.ok) { console.log(`[tswow] Optional dependency missing: ${o.name}`); }
    }

    const missing = reqs.filter(r => !r.ok);
    if (missing.length === 0) { return; }

    const installCmd = (() => {
        const pkgs = missing.map(m => m.pkg[pm]).filter(Boolean).join(' ');
        switch (pm) {
            case 'pacman': return `sudo pacman -S --needed ${pkgs}`;
            case 'apt':    return `sudo apt-get update && sudo apt-get install -y ${pkgs}`;
            case 'dnf':    return `sudo dnf install -y ${pkgs}`;
            case 'zypper': return `sudo zypper install -y ${pkgs}`;
            default:       return null;
        }
    })();

    // Non-interactive variant used only for --install-deps (so the build can run
    // fully unattended). The printed command above stays interactive so users who
    // run it by hand can review what will be installed.
    const installCmdNonInteractive = (() => {
        const pkgs = missing.map(m => m.pkg[pm]).filter(Boolean).join(' ');
        switch (pm) {
            case 'pacman': return `sudo pacman -S --needed --noconfirm ${pkgs}`;
            case 'apt':    return `sudo apt-get update && sudo apt-get install -y ${pkgs}`;
            case 'dnf':    return `sudo dnf install -y ${pkgs}`;
            case 'zypper': return `sudo zypper install -y --no-confirm ${pkgs}`;
            default:       return null;
        }
    })();

    console.error('\n[tswow] Missing required build dependencies:');
    for (const m of missing) { console.error(`  - ${m.name}`); }

    const wantsInstall = process.argv.includes('--install-deps');
    if (wantsInstall && installCmdNonInteractive) {
        console.log(`\n[tswow] Installing missing dependencies:\n    ${installCmdNonInteractive}\n`);
        try {
            child_process.execSync(installCmdNonInteractive, { stdio: 'inherit' });
        } catch (e) {
            console.error(`\n[tswow] Automatic install failed. Please run it manually:\n    ${installCmd}\n`);
            process.exit(1);
        }
        return;
    }

    if (installCmd) {
        console.error(
              `\n[tswow] TSWoW needs some system packages that aren't installed yet.`
            + `\n[tswow] Install them with your package manager:\n`
            + `\n    ${installCmd}\n`
            + `\n[tswow] Then run the build again.`
            + ` (Or re-run with --install-deps to let TSWoW run the command above for you.)\n`
        );
    } else {
        console.error(
              `\n[tswow] TSWoW needs the packages listed above, but your package`
            + ` manager could not be detected. Please install them manually,`
            + ` then run the build again.\n`
        );
    }
    process.exit(1);
}

checkLinuxPrerequisites();

// The TrinityCore core lives in a git submodule. If the user cloned without
// --recursive it will be empty and the build fails cryptically later, so check
// for it here and tell them exactly how to fix it.
function checkSubmodules() {
    const coreCMake = path.join('cores', 'TrinityCore', 'CMakeLists.txt');
    if (!fs.existsSync(coreCMake)) {
        console.error(
              `\n[tswow] The TrinityCore submodule is missing (cores/TrinityCore is empty).`
            + `\n[tswow] Fetch it with:\n`
            + `\n    git submodule update --init --recursive\n`
            + `\n[tswow] Then run the build again.\n`
        );
        process.exit(1);
    }
}
checkSubmodules();

if(!fs.existsSync('./build.conf')) {
    fs.copyFileSync('./build.default.conf','./build.conf');
}

const buildConf = fs.readFileSync('./build.conf','utf-8')

const buildDir = buildConf.match(/^BuildDirectory *= *"(.+?)"/m)[1]
const installDir = buildConf.match(/^InstallDirectory *= *"(.+?)"/m)[1]
const displayNames = (buildConf.match(/^Terminal\.DisplayNames *= *(.+)/m)||['','true'])[1]
const displayTimestamps = (buildConf.match(/^Terminal\.DisplayTimestamps *= *(.+)/m)||['','true'])[1]
const linuxMakeJobsRaw = (buildConf.match(/^Linux\.MakeJobs *= *(.+)/m)||['','8'])[1]
const linuxUseCCacheRaw = (buildConf.match(/^Linux\.UseCCache *= *(.+)/m)||['','true'])[1]

const parsedLinuxMakeJobs = Number(String(linuxMakeJobsRaw).trim().replace(/^"|"$/g,''))
const linuxMakeJobs = Number.isFinite(parsedLinuxMakeJobs) && parsedLinuxMakeJobs > 0
    ? parsedLinuxMakeJobs
    : 8
const linuxUseCCache = ['true','1','yes','on'].includes(
    String(linuxUseCCacheRaw).trim().replace(/^"|"$/g,'').toLowerCase()
)

const shouldDisplayNames = displayNames === 'true'
    || displayNames === '1'
const shouldDisplayTimestamps = displayTimestamps === 'true'
    || displayTimestamps === '1'

const bootstrapDir = path.join(buildDir,'bootstrap')

const buildScripts = () =>
    child_process.execSync(
          `npx swc tswow-scripts -d ${bootstrapDir}`
        , {stdio:'inherit'}
    )
try { buildScripts() }
catch(error) {
    child_process.execSync('npm i')
    try { buildScripts() }
    catch(error) {
        console.error(
              `\n[tswow] Failed to bootstrap the build scripts: ${error}`
            + `\n[tswow] This usually means 'npm i' could not finish. Common causes:`
            + `\n  - Missing C toolchain/python for native modules (run with --install-deps)`
            + `\n  - A broken node_modules; try removing it and re-running.\n`
        );
        process.exit(1)
    }
}
child_process.execSync('npx swc --version', {stdio:'inherit'})

fs.copyFileSync('package-lock.json', path.join(buildDir, 'package-lock.json'))
fs.copyFileSync('package.json',path.join(buildDir,'package.json'))
child_process.execSync('npm i', {cwd:buildDir,stdio:'inherit'});
child_process.execSync('npm i source-map-support --no-save',{stdio:'inherit'})

child_process.execSync(
      `node -r source-map-support/register`
    + ` ${path.join(bootstrapDir,'compile','CompileTsWow.js')}`
    + ` ${process.argv.slice(2).join(' ')}`
    + ` --ignore **/wotlkdata/**`
    + ` --ipaths=${installDir}`
    + ` --bpaths=${buildDir}`
    + ` ${shouldDisplayNames?'--displayNames':''}`
    + ` ${shouldDisplayTimestamps?'--displayTimestamps':''}`
,{stdio:'inherit', env: {
      ...process.env
    , TSWOW_LINUX_MAKE_JOBS: String(linuxMakeJobs)
    , TSWOW_LINUX_USE_CCACHE: linuxUseCCache ? '1' : '0'
}});
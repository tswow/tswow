/**
 * This file is used to bootstrap the other compiler scripts.
 */
const child_process = require('child_process');
const path = require('path');
const fs = require('fs')

// Use modern ConfigFile pattern like node.conf instead of template copying
let config;
try {
    config = require('./build-config.js');
} catch (error) {
    console.error('Failed to load build configuration, using defaults:', error);
    // Fallback to old method if new config fails
    if(!fs.existsSync('./build.conf')) {
        fs.copyFileSync('./build.default.conf','./build.conf');
    }
    const buildConf = fs.readFileSync('./build.conf','utf-8')
    const buildDir = buildConf.match(/^BuildDirectory *= *"(.+?)"/m)[1]
    const installDir = buildConf.match(/^InstallDirectory *= *"(.+?)"/m)[1]
    const displayNames = (buildConf.match(/^Terminal\.DisplayNames *= *(.+)/m)||['','true'])[1]
    const displayTimestamps = (buildConf.match(/^Terminal\.DisplayTimestamps *= *(.+)/m)||['','true'])[1]

    config = {
        buildDir,
        installDir,
        shouldDisplayNames: displayNames === 'true' || displayNames === '1',
        shouldDisplayTimestamps: displayTimestamps === 'true' || displayTimestamps === '1'
    };
}

const buildDir = config.buildDir;
const installDir = config.installDir;
const shouldDisplayNames = config.shouldDisplayNames;
const shouldDisplayTimestamps = config.shouldDisplayTimestamps;

const bootstrapDir = path.join(buildDir,'bootstrap')

const buildScripts = () =>
    child_process.execSync(
          `npx swc tswow-scripts -d ${bootstrapDir} --config-file .swcrc`
        , {stdio:'inherit'}
    )
try { buildScripts() }
catch(error) {
    child_process.execSync('npm i')
    try { buildScripts() }
    catch(error) {
        console.log(`Failed to bootstrap tswow: ${error}`);
        process.exit(0)
    }
}
child_process.execSync('npx swc --version', {stdio:'inherit'})

fs.copyFileSync('package-lock.json', path.join(buildDir, 'package-lock.json'))
fs.copyFileSync('package.json',path.join(buildDir,'package.json'))
child_process.execSync('npm i', {cwd:buildDir,stdio:'inherit'});

child_process.execSync(
      `node --enable-source-maps`
    + ` ${path.join(bootstrapDir,'tswow-scripts','compile','CompileTsWow.js')}`
    + ` ${process.argv.slice(2).join(' ')}`
    + ` --ignore **/wotlkdata/**`
    + ` --ipaths=${installDir}`
    + ` --bpaths=${buildDir}`
    + ` ${shouldDisplayNames?'--displayNames':''}`
    + ` ${shouldDisplayTimestamps?'--displayTimestamps':''}`
,{stdio:'inherit'});

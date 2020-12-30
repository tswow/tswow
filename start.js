/**
 * This file is used to bootstrap tswow
 */

const fs = require('fs');
const child_process = require('child_process')

let rebuild = false;
if(fs.existsSync('./update.7z')) {
    console.log('Applying update...');
    rebuild = true;
    if(fs.existsSync('./tmp')) {
        fs.rmdirSync('./tmp',{recursive:true});
    }

    if(fs.existsSync('./tmp')) {
        console.error(`Unable to patch: Can't remove ./tmp dir`);
        process.exit(-1);
    }

    fs.mkdirSync('./tmp');

    fs.renameSync('./update.7z','./tmp/update.7z');

    process.chdir('./tmp');
    child_process.execSync(`"../bin/7zip/7za" x update.7z`);
    process.chdir('../');
    if(!fs.existsSync('./tmp/bin')) {
        console.error(`Unable to patch: The patch did not contain any "bin" directory`);
        process.exit(-1);
    }

    if(!fs.existsSync('./tmp/node_modules')) {
        console.error(`Unable to patch: The patch did not contain any "node_modules" directory`);
        process.exit(-1);
    }

    if(fs.existsSync('./bin')) {
        fs.rmdirSync('./bin', {recursive: true});
    }

    if(fs.existsSync('./node_modules')) {
        fs.rmdirSync('./node_modules', {recursive: true});
    }

    if(fs.existsSync('./modules/tswow-stdlib')) {
        fs.rmdirSync('./modules/tswow-stdlib',{recursive: true});
    }

    fs.renameSync('./tmp/bin','./bin')
    fs.renameSync('./tmp/node_modules','./node_modules');
    fs.renameSync('./tmp/modules/tswow-stdlib','./modules/tswow-stdlib');

    fs.rmdirSync('./tmp', {recursive: true});
}

require('../bin/scripts/tswow/runtime/TSWoW.js').main(rebuild);
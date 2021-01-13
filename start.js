/**
 * This file is used to bootstrap tswow
 */

const fs = require('fs');
const child_process = require('child_process')

let rebuild = false;
if(fs.existsSync('./update.7z')) {
    console.log('Applying update...');

    console.log('Unlinking wotlkdata')
    try{ child_process.execSync('npm uninstall ./bin/scripts/tswow/wotlkdata')} catch(err) {}
    try{ child_process.execSync('npm unlink ./bin/scripts/tswow/wotlkdata')} catch(err) {}
    console.log('Unlinked wotlkdata')

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

    if(fs.existsSync('./bin')) {
        fs.rmdirSync('./bin', {recursive: true});
    }

    fs.renameSync('./tmp/bin','./bin')

    fs.rmdirSync('./tmp', {recursive: true});

    child_process.execSync('npm i');
}

require('../bin/scripts/tswow/runtime/TSWoW.js').main(rebuild);
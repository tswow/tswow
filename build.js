/**
 * This file is used to bootstrap the other compiler scripts.
 */
const child_process = require('child_process');
const path = require('path');

const buildScripts = ()=>
    child_process.execSync(
          'npx swc tswow-scripts -d build'
        , {stdio:'inherit'}
    )
try { buildScripts() }
catch(error) {
    child_process.execSync('npm i -D @swc/core @swc/cli')
    try { buildScripts() }
    catch(error) {
        console.log(`Failed to bootstrap tswow: ${error}`);
        process.exit(0)
    }
}

child_process.execSync(
      `node -r source-map-support/register`
    + ` ${path.join('build','compile','CompileTsWow.js')}`
    + ` ${process.argv.slice(2).join(' ')}`
    + ` --ignore **/wotlkdata/**`
,{stdio:'inherit'});
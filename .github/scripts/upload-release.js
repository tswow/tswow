const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

//
// CONFIG
//

const MAX_RELEASES = 5

//
// HELPERS
//
const currentCommitShort = child_process
    .execSync('git rev-parse --short HEAD')
    .toString('utf-8')
    .trimRight()
    .trimLeft()

const currentCommitFull = child_process
    .execSync('git rev-parse HEAD')
    .toString('utf-8')

function tag_date(tag) {
    return child_process.execSync(`git log -1 ${tag} --pretty=format:"%ci"`)
}

//
// FETCH BUILD RELEASES
//
const releases = child_process
    .execSync(`gh release list --limit 100`)
    .toString()
    .split('\n')
    .filter(x=>x.length>0)
    .map(line=>line.split('\t'))
    .map(([name,type,tag,date]) => ({name,type,tag,date:new Date(date)}))
    .filter(x=>x.tag.startsWith('build-'))

// exit if we already uploaded it
if(releases.find(x=>x.tag.endsWith(currentCommitShort))) {
    console.log(`Release is already published, not publishing again.`)
    process.exit(0)
}

// make sure to delete the remote tag name (if it bugged up or something)
try {
    child_process.execSync(`git push --delete build-${currentCommitShort}`,{stdio:'ignore'})
} catch(err) {
    // We expect this to break most of the time
}

//
// CREATE NEW RELEASE
//
try {
    child_process
        .execSync(`gh release create build-${currentCommitShort} --title "Repack #${currentCommitShort}" --notes "" C:/tswow-build/release.7z#tswow-repack-${currentCommitShort}.7z`)
        .toString('utf-8')
}
catch(err) {
    console.log('Failed to create release:',err.message);
    process.exit(-1)
}

//
// DELETE OLD RELEASES
//
releases
    .sort((a,b)=>a.date > b.date ? 1 : -1)
    .slice(0,-MAX_RELEASES)
    .forEach((release)=> {
        child_process.execSync(`gh release delete ${release.tag}`)
    })

//
// DELETE OLD TAGS
//
child_process
    .execSync('git tag')
    .toString('utf-8')
    .split('\n')
    .filter(tag=>tag.startsWith('build'))
    .map(tag=>({tag,date:new Date(tag_date(tag))}))
    .sort((a,b) => a.date > b.date ? 1 : -1)
    .slice(0,MAX_RELEASES)
    .forEach(x=>{
        try {
            console.log(`Deleting old build tag ${x.tag}`)
            child_process.execSync(`git push --delete ${x.tag}`,{stdio:'inherit'})
        } catch(err) {
            // error already printed
        }
        child_process.execSync(`git tag -d ${x.tag}`)
    })
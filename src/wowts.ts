import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import { terminal } from './terminal';

function isWindows() {
    return process.platform === 'win32';
}

// The main file to compile wowts.
// process.chdir fucked up if I did it inside the transpiler so I just start it from here instead.

const CONFIG = {
    'compilerOptions': {
    'target': 'es5',
    'module': 'commonjs',
    'outDir': './livescripts/build/cpp',
    'rootDir': './livescripts',
    'strict': true,
    'esModuleInterop': true,
    'skipLibCheck': true,
    'forceConsistentCasingInFileNames': true
},
'include': ['./shared','./livescripts']
};

const startTime = Date.now();

const buildModule = process.argv[2];
if (buildModule === undefined) {
    throw new Error('No build module provided!');
}
const modulePath = `./modules/${buildModule}`;

const buildType = process.argv[3];
if(buildType === undefined) {
    throw new Error('No build type provided!');
}

if (!fs.existsSync(modulePath)) {
    throw new Error(`No module named ${buildModule}`);
}

if (!fs.lstatSync(modulePath).isDirectory()) {
    throw new Error(`Module ${buildModule} is not a directory`);
}

if(!fs.lstatSync(path.join(modulePath,'livescripts')).isDirectory()) {
    throw new Error(`"livescripts" in ${buildModule} is not a directory`);
}

const olddir = process.cwd();
process.chdir(path.join(modulePath));
fs.writeFileSync('./tsconfig.json', JSON.stringify(CONFIG));
try {
    terminal.cyan(`Transpiling TypeScript->C++...`)
    child_process.execSync(
        `node -r source-map-support/register`
        + ` ../../bin/scripts/transpiler/main.js tsconfig.json`
        + (process.argv.includes('--silent')?' --silent':'')
        + (process.argv.includes('--no-globals')?' --no-globals':'')
        , {stdio: 'inherit'}
    );
} catch(error) {
    terminal.error('Transpilation failure, please check the errors above');
    process.exit(-1);
}


let livescriptsDir = path.join(process.cwd(),'livescripts');
function findSourceCpp(curDir: string) {
    let items = fs.readdirSync(curDir);
    items.forEach(x=>{
        let full = path.join(curDir,x);
        let stat = fs.statSync(full);
        if(stat.isDirectory() && x != 'build') {
            findSourceCpp(full);
        }
        if(    x.endsWith('.cpp') 
            || x.endsWith('.hpp') 
            || x.endsWith('.h') 
            || x.endsWith('.c')
        ) {
            let target = path.join(livescriptsDir,'build','cpp','livescripts',path.relative(livescriptsDir, full));
            fs.mkdirSync(path.dirname(target),{recursive:true});
            fs.copyFileSync(full,target);
        }
    });
}
findSourceCpp(livescriptsDir);

fs.unlinkSync('./tsconfig.json');
process.chdir(olddir);

function join(...args: string[]) {
    return args.filter(x => x.length > 0).join('/');
}

function findCpp(rootDir: string, dir: string) {
    const cdir = path.join(rootDir, dir);
    const items = fs.readdirSync(cdir);
    let cpps = items.filter(x => x.endsWith('.cpp')).map(x => join(dir, x));
    const folders = items.filter(x => fs.lstatSync(path.join(cdir, x)).isDirectory());

    for (const folder of folders) {
        cpps = cpps.concat(findCpp(rootDir, join(dir, folder)));
    }

    return cpps;
}

const itms = findCpp(path.join(modulePath, './livescripts/build/cpp'), '');

fs.writeFileSync(path.join(modulePath, 'livescripts/build/cpp/CMakeLists.txt'),
`cmake_minimum_required(VERSION 3.12)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

${!isWindows()?'set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--no-undefined")':''}

project(${buildModule})
include_directories(../../../../../bin/include)

file (GLOB headers "../../../../../bin/include/*.h")

${isWindows()
    ? `file (GLOB libs "../../../../../bin/libraries/${buildType}/*.lib")`
    : `file (GLOB libs "../../../../../bin/libraries/${buildType}/*.so")`
}

add_library(${buildModule} SHARED ${itms.join(' ')})
target_link_libraries(${buildModule} \${libs})

target_precompile_headers(${buildModule}
    PUBLIC
        \${headers}
)

include({CMAKE_CURRENT_SOURCE_DIR}/../../../CMakeLists.txt OPTIONAL)

`
);

const cmake_generate =
    (isWindows()
        ? `"bin/cmake/bin/cmake.exe"`
        : 'cmake')
    + ` -S modules/${buildModule}/livescripts/build/cpp`
    + ` -B modules/${buildModule}/livescripts/build/lib`;
try {
    terminal.cyan(`Generating CMake project...`)
    child_process.execSync(cmake_generate, {stdio: !process.argv.includes('--silent')?'inherit':'ignore'});
} catch(err) {
    terminal.error(`Failed to generate CMake files, please report this error`);
}
const cmake_build =
    (isWindows()
        ? `"bin/cmake/bin/cmake.exe"`
        : `cmake`)
    + ` --build modules/${buildModule}/livescripts/build/lib`
    + ` --config ${buildType}`;

try {
    terminal.cyan(`Compiling C++ binary...`)
    child_process.execSync(cmake_build, 
        {
            stdio: !process.argv.includes('--silent') ? 'inherit' : 'ignore'
        });
} catch (error) {
    terminal.error(`Failed to compile library, please report this error`);
}

const finTime = Date.now() - startTime;
console.log(`Finished compilation in ${(finTime / 1000).toFixed(1)} seconds.`);
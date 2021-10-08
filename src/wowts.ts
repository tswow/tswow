import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
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
        + ' ' + (process.argv.filter(x=>x.startsWith('--')).join(' '))
        , {stdio: 'inherit'}
    );
} catch(error) {
    terminal.error('Transpilation failure, please check the errors above');
    process.exit(-1);
}

const SPECIAL_FILES = ['ModID','PacketCreator','TableCreator']

const tsRoot = path.join(process.cwd(),'livescripts');
const transpiledRoot = path.join(process.cwd(),'livescripts','build','cpp','livescripts');
function removeOldCpp(curDir: string) {
    let items = fs.readdirSync(curDir);
    items.forEach(x=>{
        let full = path.join(curDir,x);
        if(fs.statSync(full).isDirectory()) removeOldCpp(full);
        const relName = path
            .relative(transpiledRoot,full)
            .replace(/\.[^/.]+$/, "")
        if(SPECIAL_FILES.includes(relName)) return;
        const tsName = path.join(tsRoot,relName+'.ts')
        if(!fs.existsSync(tsName)) {
            fs.rmSync(full);
        }
    });
}
if(fs.existsSync(transpiledRoot)) {
    removeOldCpp(transpiledRoot)
}

fs.unlinkSync('./tsconfig.json');
process.chdir(olddir);

fs.writeFileSync(path.join(modulePath, 'livescripts/build/cpp/CMakeLists.txt'),
`cmake_minimum_required(VERSION 3.12)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
${!isWindows()?'set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--no-undefined")':''}

project(${buildModule})

${isWindows()
    ? `file (GLOB libs "../../../../../bin/libraries/${buildType}/*.lib")`
    : `file (GLOB libs "../../../../../bin/libraries/${buildType}/*.so")`
}

# borrowed by tswow from https://stackoverflow.com/a/46003179
function (filter_items aItems aRegEx)
    # For each item in our list
    foreach (item \${\${aItems}})
        # Check if our items matches our regular expression
        if ("\${item}" MATCHES \${aRegEx})
            # Remove current item from our list
            list (REMOVE_ITEM \${aItems} \${item})
        endif ("\${item}" MATCHES \${aRegEx})
    endforeach(item)
    # Provide output parameter
    set(\${aItems} \${\${aItems}} PARENT_SCOPE)
endfunction (filter_items)

file (GLOB_RECURSE transpiler_files
    "livescripts/*.cpp"
    "livescripts/*.h"
)
filter_items(transpiler_files "/../")
file (GLOB_RECURSE source_files
    "../../*.cpp"
    "../../*.c"
    "../../*.h"
    "../../*.hpp"
    "../../*.ipp"
    "../../*.ts"
)
filter_items(source_files "build/cpp/../../build/cpp")
filter_items(source_files "/lib/")

add_library(${buildModule} SHARED \${transpiler_files} \${source_files})
target_link_libraries(${buildModule} \${libs})
set_property(GLOBAL PROPERTY USE_FOLDERS ON)

source_group("Transpiled" FILES \${transpiler_files})
source_group("Source" FILES \${source_files})

# core wrapper headers
target_include_directories(${buildModule} PUBLIC ../../../../../bin/include)
file (GLOB headers "../../../../../bin/include/*.h")

# root livescript headers
target_include_directories(${buildModule} PUBLIC ../../)
file (GLOB headers "../../*.h")

# ts livescript headers
target_include_directories(${buildModule} PUBLIC ./livescripts)
target_precompile_headers(${buildModule} PUBLIC \${headers})

# disable dll warnings, users must build livescripts with same compiler as tc
add_definitions(
    -wd4251
    -wd4275
)

include({CMAKE_CURRENT_SOURCE_DIR}/../../../CMakeLists.txt OPTIONAL)`
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
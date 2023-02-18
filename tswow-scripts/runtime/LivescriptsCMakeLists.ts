import { BuildType } from "../util/BuildType";
import { EmulatorCore } from "../util/EmulatorCore";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";

export function getLivescriptCMakeLists(emu: EmulatorCore, buildType: BuildType, buildModule: string) {
return `cmake_minimum_required(VERSION 3.12)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
${!isWindows()?'set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--no-undefined")':''}

project(${buildModule})

# Core settings
file (GLOB libs "${
    emu === 'trinitycore'
        ? ipaths.bin.libraries.build.pick(buildType).abs('FORWARD')
        : ipaths.bin.libraries_ac.build.pick(buildType).abs('FORWARD')
}/${(isWindows()?'*.lib':'*.so')}")

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
    "shared/*.cpp"
    "shared/*.h"
)
filter_items(transpiler_files "/../")
file (GLOB_RECURSE source_files
    "../../../*.cpp"
    "../../../*.c"
    "../../../*.h"
    "../../../*.hpp"
    "../../../*.ipp"
    "../../../*.ts"
    "../../../../shared/*.ts"
)
filter_items(source_files "build/cpp/../../build/cpp")
filter_items(source_files "/lib/")

add_library(${buildModule} SHARED \${transpiler_files} \${source_files})
target_link_libraries(${buildModule} \${libs})
set_property(GLOBAL PROPERTY USE_FOLDERS ON)
target_compile_definitions(${buildModule} PUBLIC ${
    emu === 'trinitycore'
        ? 'TRINITY=1'
        : 'AZEROTHCORE=1'
    })

source_group("Transpiled" FILES \${transpiler_files})
source_group("Source" FILES \${source_files})

# core wrapper headers
target_include_directories(${buildModule} PUBLIC
    ${ipaths.bin.include.abs('FORWARD')}
    ${ipaths.bin.include.tracy.abs('FORWARD')}
    ${ipaths.bin.include.lua.abs('FORWARD')}
)
file (GLOB headers "${ipaths.bin.include.abs('FORWARD')}/*.h")

# root livescript headers
target_include_directories(${buildModule} PUBLIC ../../../)

# ts livescript headers
target_include_directories(${buildModule} PUBLIC ./livescripts)
target_precompile_headers(${buildModule} PUBLIC \${headers})

# defines
${(()=>{
    switch(emu) {
        case 'azerothcore':
            return `target_compile_definitions(${buildModule} PUBLIC AZEROTHCORE=1)`
        case 'trinitycore':
            return `target_compile_definitions(${buildModule} PUBLIC TRINITY=1)`
        default:
            return ''
    }
})()}

# disable dll warnings, users must build livescripts with same compiler as tc
if (WIN32)
    add_definitions(
        -wd4251
        -wd4275
        -wd4244
        -wd4267
        -wd4305
    )
endif()

# tracy
if(TRACY_ENABLE)
    target_compile_definitions(${buildModule} PUBLIC TRACY_ENABLE=1)
endif()

include({CMAKE_CURRENT_SOURCE_DIR}/../../../../CMakeLists.txt OPTIONAL)`
}
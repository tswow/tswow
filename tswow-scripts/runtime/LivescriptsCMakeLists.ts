import { BuildType } from "../util/BuildType";
import { ipaths } from "../util/Paths";
import { isWindows } from "../util/Platform";

export function getLivescriptCMakeLists(buildType: BuildType, buildModule: string) {
return `cmake_minimum_required(VERSION 3.12)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
${!isWindows()?'set(CMAKE_SHARED_LINKER_FLAGS "-Wl,--no-undefined")':''}

project(${buildModule})

file (GLOB libs "${ipaths.bin.libraries.build.pick(buildType).abs('FORWARD')}/${(isWindows()?'*.lib':'*.so')}")

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

source_group("Transpiled" FILES \${transpiler_files})
source_group("Source" FILES \${source_files})

# core wrapper headers
target_include_directories(${buildModule} PUBLIC ${ipaths.bin.include.abs('FORWARD')})
file (GLOB headers "${ipaths.bin.include.abs('FORWARD')}/*.h")

# root livescript headers
target_include_directories(${buildModule} PUBLIC ../../../)
file (GLOB headers "../../../*.h")

# ts livescript headers
target_include_directories(${buildModule} PUBLIC ./livescripts)
target_precompile_headers(${buildModule} PUBLIC \${headers})

# disable dll warnings, users must build livescripts with same compiler as tc
if (WIN32)
    add_definitions(
        -wd4251
        -wd4275
    )
endif()
include({CMAKE_CURRENT_SOURCE_DIR}/../../../../CMakeLists.txt OPTIONAL)`
}
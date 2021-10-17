# Catch2 (testing library)
FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.0.0-preview3
)
FetchContent_MakeAvailable(Catch2)

# unit tests
FILE(GLOB tests-sources ${CMAKE_CURRENT_SOURCE_DIR}/*)
add_executable(tests ${tests-sources})
target_link_libraries(tests PRIVATE Catch2::Catch2WithMain messages-lua)
target_include_directories(tests PUBLIC
    ${CMAKE_SOURCE_DIR}/lua-5.1/src
    ${CMAKE_SOURCE_DIR}/messages-lua
    ${CMAKE_SOURCE_DIR}/messages
)

add_custom_command(
    TARGET tests POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
    ${CMAKE_SOURCE_DIR}/messages-lua/messages.lua
    ${CMAKE_BINARY_DIR}/messages.lua
)
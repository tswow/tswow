#include "FSRoot.h"

#include <filesystem>

static std::filesystem::path dirname
    = std::filesystem::path(__FILE__).parent_path();

std::string relProjectPath(std::string const& pathIn)
{
    return std::filesystem::relative(pathIn, dirname).string();
}
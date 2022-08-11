#include "TSFileSystem.h"

#include "TSArray.h"

#include <boost/filesystem.hpp>
#include <string>
#include <fstream>

namespace fs = boost::filesystem;

std::string ReadFile(std::string const& file, std::string const& def)
{
    if(!fs::exists(file))
    {
        return def;
    }

    std::ifstream t(file);
    std::string str((std::istreambuf_iterator<char>(t)),
        std::istreambuf_iterator<char>());
    return str;
}

void mkdirs(std::string const& pathstr)
{
    auto path = fs::path(pathstr);
    auto parent_path = path.parent_path();
    if (parent_path.string().size() > 0)
    {
        fs::create_directories(path.parent_path());
    }
}

bool FileExists(std::string const& file)
{
    return fs::exists(file);
}

void WriteFile(std::string const& file, std::string const& value)
{
    mkdirs(file);
    std::ofstream(file) << value;
}

void AppendFile(std::string const& file, std::string const& value)
{
    mkdirs(file);
    std::ofstream outfile;
    outfile.open(file, std::ios_base::app); // append instead of overwrite
    outfile << value;
}

TSArray<std::string> ReadDirectory(std::string const& dir)
{
    TSArray<std::string> arr;
    std::string directory = dir;

    if(directory.size() == 0)
    {
        directory = "./";
    }

    if(!fs::exists(directory))
    {
        return arr;
    }

    boost::filesystem::recursive_directory_iterator end;
    for (boost::filesystem::recursive_directory_iterator dir(directory); dir != end; ++dir)
    {
        if(boost::filesystem::is_regular_file(dir->path()))
        {
            arr.push((dir->path().string()));
        }
    }
    return arr;
}
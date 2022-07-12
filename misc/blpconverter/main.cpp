/*
 * This file is part of tswow (https://github.com/tswow)
 *
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation; either version 2 of the License, or (at your
 * option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */
#include "BlpConvert.h"
#include "Png2Blp.h"

#include "thread_pool.hpp"

#include <string>
#include <iostream>
#include <fstream>
#include <stdexcept>
#include <algorithm>
#include <cctype>

static std::vector<char> read(std::string const& path)
{
    std::ifstream file(path.c_str(), std::ios::binary | std::ios::ate);
    std::vector<char> buffer(file.tellg());
    file.seekg(0, std::ios::beg);
    if (!file.read(buffer.data(), buffer.size()))
    {
        throw std::runtime_error("Error reading file");
    }
    return buffer;
}

static void blp_to_png(std::string const& path_in)
{
    std::vector<char> buffer = read(path_in);
    python_blp::BlpConvert().convert(
          reinterpret_cast<unsigned char*>(buffer.data())
        , buffer.size()
        , path_in.c_str()
        , ""
    );
}

static void png_to_blp(std::string const& path_in)
{
    std::vector<char> buffer = read(path_in);
    Png2Blp png;
    png.load(buffer.data(), buffer.size());
    uint32_t size;
    void* data = png.createBlpDxtInMemory(false, 1, size);
    std::string path_out = path_in.substr(0, path_in.find_last_of(".")) + ".blp";
    std::ofstream file(path_out, std::ios::out | std::ios::binary);
    file.write((char*)data, size);
}

static bool endsWith(std::string str, std::string suffix)
{
    std::transform(str.begin(), str.end(), str.begin(),
        [](unsigned char c){ return std::tolower(c); });

    std::transform(suffix.begin(), suffix.end(), suffix.begin(),
        [](unsigned char c){ return std::tolower(c); });

    return str.size() >= suffix.size() && 0 == str.compare(str.size() - suffix.size(), suffix.size(), suffix);
}
static void convert(std::string const& path_in)
{
    if (endsWith(path_in, ".blp"))
    {
        blp_to_png(path_in);
    }
    else if (endsWith(path_in, ".png"))
    {
        png_to_blp(path_in);
    }
    else {
        throw std::runtime_error("File is not png or blp");
    }
}

int main(int argc, char** argv) {
    if (argc < 2)
    {
        std::cout << "[blpconverter]: Usage: blpconverter imagepath";
        exit(-1);
    }

    thread_pool pool;
    for (int i = 1; i < argc; ++i)
    {
        pool.push_task([=]() {
            try {
                convert(argv[i]);
                std::cout << "[blpconverter]: Converted " << argv[i] << "\n";
            }
            catch (std::runtime_error error)
            {
                std::cout
                    << "[blpconverter]: Failed to convert "
                    << argv[i]
                    << ": "
                    << error.what()
                    << "\n";
            }
        });
    }
    pool.wait_for_tasks();
}
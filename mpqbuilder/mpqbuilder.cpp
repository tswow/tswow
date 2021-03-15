/*
 * This file is part of tswow (https://github.com/tswow)
 * 
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#include <StormLib.h>
#include <boost/filesystem.hpp>
#include <boost/algorithm/string/predicate.hpp>
#include <iostream>
#include <functional>

namespace fs = boost::filesystem;

HANDLE handle = NULL;

void writeDir(fs::path basePath, fs::path curDir)
{
	fs::directory_iterator end;
	for (fs::directory_iterator itr(curDir); itr != end; ++itr)
	{
		if (fs::is_directory(itr->path()))
		{
			writeDir(basePath, itr->path());
		}
		else
		{
			auto relative = itr->path().string().substr(basePath.string().length(), itr->path().string().length());
			if (relative.rfind("/", 0) == 0 || relative.rfind("\\", 0) == 0)
			{
				relative = relative.substr(1, relative.length());
			}
			if (boost::algorithm::ends_with(relative, ".blend"))
			{
				return;
			}
			if (boost::algorithm::ends_with(relative, ".dbc"))
			{
				relative = "DBFilesclient/" + relative;
			}
			SFileAddFile(handle, itr->path().string().c_str(), relative.c_str(), 0);
		}
	}
}

int main(int argc, char **argv)
{
	if (argc < 3)
	{
		std::cout << "Usage: mpqbuilder outputFile inputDir1 (inputDir2...)";
		return -1;
	}

	auto outputFile = fs::path(argv[1]);
	if (!fs::exists((outputFile)))
	{
		if (!fs::remove((outputFile)))
		{
			std::cout << "Failed to remove old mpq file " << outputFile << "\n";
			return -1;
		}
	}

	if (fs::exists(outputFile))
	{
		if (!fs::remove((outputFile)))
		{
			std::cout << "Failed to remove old mpq file " << outputFile << "\n";
			return -1;
		}
	}

	if (!SFileCreateArchive(outputFile.string().c_str(), 0, 1024, &handle))
	{
		std::cout << "Failed to create output mpq file " << outputFile << "\n";
		return -1;
	}

	for (int i = 2; i < argc; ++i)
	{
		fs::path inputDir = fs::path(argv[i]);
		if (!fs::exists(fs::path(inputDir)))
		{
			std::cout << "No such directory " << inputDir << std::endl;
			return -1;
		}

		if (!fs::is_directory(fs::path(inputDir)))
		{
			std::cout << "Not a directory: " << inputDir << std::endl;
			return -1;
		}

		writeDir(inputDir, inputDir);
	}

	SFileFlushArchive(handle);
	return 0;
}
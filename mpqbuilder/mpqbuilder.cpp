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
#include <iostream>
#include <StormLib.h>
#include <functional>
#include "MiniFS.h"

HANDLE handle = NULL;

void writeDir(std::string basePath, std::string curDir) {
	MiniFS::iterateDirectory(curDir,[=](std::string file) mutable{
		if(MiniFS::isDirectory(file)) {
			writeDir(basePath,file);
		} else {
			auto relative = file.substr(basePath.length(),file.length());
			if(relative.rfind("/",0)==0||relative.rfind("\\",0)==0) {
				relative = relative.substr(1,relative.length());
			}	
			if(MiniFS::endsWith(relative,".blend")) return;
			SFileAddFile(handle,file.c_str(),relative.c_str(),0);
		}
	});
}

int main(int argc, char **argv) {
	if (argc < 3) {
		std::cout << "Usage: mpqbuilder outputFile inputDir1 (inputDir2...)";
		return -1;
	}

	std::string outputFile = argv[1];
	if (MiniFS::exists(outputFile)) {
		if (!MiniFS::removeFile(outputFile)) {
			std::cout << "Failed to remove old mpq file " << outputFile << std::endl;
			return -1;
		}
	}

	if(!SFileCreateArchive(outputFile.c_str(), 0, 1024, &handle)) {
		std::cout << "Failed to create output mpq file "<<outputFile<<std::endl;
		return -1;
	}

	for(int i=2;i<argc;++i) {
		std::string inputDir = argv[i];
		if (!MiniFS::exists(inputDir)) {
			std::cout << "No such directory " << inputDir << std::endl;
			return -1;
		}

		if (!MiniFS::isDirectory(inputDir)) {
			std::cout << "Not a directory: " << inputDir << std::endl;
			return -1;
		}

		writeDir(inputDir, inputDir);
	}

	SFileFlushArchive(handle);
	return 0;
}
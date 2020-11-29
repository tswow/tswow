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
#include <algorithm>

HANDLE handle = NULL;

std::string findClientLang(std::string directory) {
	std::vector<std::string> files = MiniFS::getFiles(directory);
	for (auto& k : files) {
		if (MiniFS::isDirectory(k)) {
			return k;
		}
	}
	return "";
}

int counter = 0;
void handleFile(HANDLE hMpq, std::string file,std::string outputDir) {
	if(MiniFS::endsWith(file,".xml")||MiniFS::endsWith(file,".lua")) {
		std::string outfile = outputDir+"\\"+file;
		SFileExtractFile(hMpq,file.c_str(),outfile.c_str(),0);
		MiniFS::mkdir(MiniFS::dirname(outfile.c_str()));
		++counter;
	}
}

int main(int argc, char **argv) {
	if (argc < 2) {
		std::cout << "Usage: luaxmlreader outputDir clientPath inputDir1";
		return -1;
	}

	std::string outputDir = argv[1];
	std::string langdir = findClientLang(argv[2]);

	auto files = MiniFS::getFiles(langdir,true);
	std::string mainfile;

	std::vector<std::string> patches;
	for (auto &str : files) {
		if (str.find("locale-", 0) == 0) {
			mainfile = langdir+pathsep+str;
		}

		if (str.find("patch") == 0) {
			auto fullstr = langdir + pathsep + str;
			if (!MiniFS::isDirectory(fullstr)) {
				patches.push_back(fullstr);
			}
		}
	}

	std::sort(patches.begin(), patches.end(), [](std::string a, std::string b) {
		if (b.length() != a.length()) return b.length() > a.length();
		return b > a;
	});

	std::cout << "Reading main " << mainfile << "\n";

	HANDLE mpq = NULL;
	if (!SFileOpenArchive(mainfile.c_str(), 0, STREAM_FLAG_READ_ONLY, &mpq)) {
		std::cout << "Failed to open main MPQ file with error " << GetLastError() << "\n";
		return GetLastError();
	}

	for (auto& patch : patches) {
		std::cout << "Loading patch " << patch << "\n";
		if (!SFileOpenPatchArchive(mpq, patch.c_str(), NULL, 0)) {
			std::cout << "Failed to apply patch " << patch << " with error " << GetLastError() << "\n";
			return GetLastError();
		}
	}

	HANDLE find_handle = NULL;
	SFILE_FIND_DATA* f = new SFILE_FIND_DATA;
	if ((find_handle = SFileFindFirstFile(mpq, "*", f, 0))) {
		handleFile(mpq, std::string(f->cFileName), outputDir);
	}

	while (SFileFindNextFile(find_handle, f)) {
		handleFile(mpq, std::string(f->cFileName), outputDir);
	}

	SFileFindClose(find_handle);
	SFileCloseArchive(mpq);
	return 0;
}
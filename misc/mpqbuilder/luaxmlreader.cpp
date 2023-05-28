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
#include <boost/filesystem.hpp>
#include <boost/algorithm/string/predicate.hpp>
#include <StormLib.h>
#include <stdexcept>
#include <iostream>
#include <functional>
#include <algorithm>
#include <vector>

std::vector<std::string> special_files = {
	  "interface\\glues\\charactercreate\\ui-charactercreate-classes.blp"
	, "interface\\targetingframe\\ui-classes-circles.blp"
	, "interface\\worldstateframe\\icons-classes.blp"
	, "textures\\minimap\\md5translate.trs"
};

HANDLE handle = NULL;

namespace fs = boost::filesystem;

fs::path findClientLang(fs::path directory) {
	fs::directory_iterator end;
	for(fs::directory_iterator itr(directory); itr != end; ++itr)
	{
		if(fs::is_directory(itr->path()))
		{
			return itr->path();
		}
	}
	throw std::runtime_error("No lang directory found in "+directory.string());
}

int counter = 0;
void handleFile(HANDLE hMpq, std::string const& file,std::string const& outputDir) {
	std::string fileLower = file;
	std::transform(fileLower.begin(), fileLower.end(), fileLower.begin(),
		[](unsigned char c){ return std::tolower(c); });

	if(
		   boost::algorithm::ends_with(file,".xml")
		|| boost::algorithm::ends_with(file,".lua")
		|| boost::algorithm::ends_with(file,".toc")
		|| std::find(special_files.begin(),special_files.end(),fileLower) != special_files.end())
	{
		auto f = file;
		std::replace(f.begin(),f.end(),'\\','/');
		fs::path outfile = outputDir / fs::path(f);
		fs::create_directories(outfile.parent_path());
		SFileExtractFile(hMpq,file.c_str(),outfile.string().c_str(),0);
		++counter;
	}
}

int main(int argc, char **argv) {
	if (argc < 2) {
		std::cout << "Usage: luaxmlreader outputDir clientPath inputDir1";
		return -1;
	}

	std::string outputDir = argv[1];
	fs::path langdir = findClientLang(fs::path(argv[2]));
	fs::path mainfile;
	std::vector<fs::path> patches;

	// todo: hack for md5translate.trs, do this properly!
	fs::directory_iterator end;

	for(fs::directory_iterator itr(langdir); itr != end; ++itr)
	{
		if (itr->path().filename().string().find("locale-", 0) == 0) {
			mainfile = itr->path();
		}

		else if (itr->path().filename().string().find("patch") == 0) {
			auto fullstr = itr->path();
			if(!fs::is_directory(fullstr))
			{
				patches.push_back(fullstr);
			}
		}
	}

	std::sort(patches.begin(), patches.end(), [](fs::path const& a, fs::path const& b) {
		if (b.string().length() != a.string().length()) return b.string().length() > a.string().length();
		return b.string() > a.string();
	});

	// md5translate.trs hack
	patches.push_back(fs::path(argv[2]) / "patch-3.MPQ");

	HANDLE mpq = NULL;
	if (!SFileOpenArchive(mainfile.string().c_str(), 0, STREAM_FLAG_READ_ONLY, &mpq)) {
		std::cout << "Failed to open main MPQ file " << mainfile.string() << " with error " << GetLastError() << "\n";
		return GetLastError();
	}

	for (auto& patch : patches) {
		if (!SFileOpenPatchArchive(mpq, patch.string().c_str(), NULL, 0)) {
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
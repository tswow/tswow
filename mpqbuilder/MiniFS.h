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
#pragma once

#include <string>
#include <vector>
#include <functional>
#if defined(_WIN32)
#include "Windirent.h"
#include <fileapi.h>
#include <direct.h>
bool removeDir(std::string dirname) {
	return RemoveDirectoryA(dirname.c_str());
}
#else
#include <dirent.h>
#include <unistd.h>
bool removeDir(std::string dirname) {
	return rmdir(dirname);
}
#endif
const char pathsep =
#ifdef _WIN32
'\\';
#else
'/';
#endif

namespace MiniFS {
	std::vector<std::string> getFiles(std::string directory, bool local = false) {
		std::vector<std::string> files;
		DIR* dir;
		struct dirent* ent;
		if ((dir = opendir(directory.c_str()))) {
			while ((ent = readdir(dir))) {
				if (std::string(ent->d_name) == ".." || std::string(ent->d_name) == ".") {
					continue;
				}
				if (local) {
					files.push_back(std::string(ent->d_name));
				}
				else {
					files.push_back(directory + pathsep + std::string(ent->d_name));
				}
			}
		}
		closedir(dir);
		return files;
	}

	bool contains(std::string full, std::string contained) {
		return full.find(contained);
	}

	void iterateDirectory(std::string directory, std::function<void(std::string)> function) {
		DIR* dir;
		struct dirent* ent;
		if ((dir = opendir(directory.c_str()))) {
			while ((ent = readdir(dir))) {
				if (std::string(ent->d_name) == ".." || std::string(ent->d_name) == ".") {
					continue;
				}
				function(directory + pathsep + std::string(ent->d_name));
			}
		}
		closedir(dir);
	}

	bool exists(std::string filename)
	{
		DIR* directory = opendir(filename.c_str());
		if (directory) {
			closedir(directory);
			return true;
		}
		if (errno == ENOTDIR) {
			return true;
		}
		return false;
	}

	bool isDirectory(std::string filename) {
		struct stat statbuf;
		if (stat(filename.c_str(), &statbuf) != 0) {
			return false;
		}
		return S_ISDIR(statbuf.st_mode);
	}

	bool isFile(std::string filename) {
		return !isDirectory(filename);
	}

	bool removeFile(std::string filename) {
		return !remove(filename.c_str());
	}

	void removeDirectory(std::string directory) {
		if (!exists(directory)) return;
		iterateDirectory(directory, [](std::string x) {
			if (isDirectory(x)) {
				removeDirectory(x);
			}
			else {
				removeFile(x);
			}
		});
		removeDir(directory);
	}

	bool endsWith(std::string const& fullString, std::string const& ending) {
		if (fullString.length() >= ending.length()) {
			return (0 == fullString.compare(fullString.length() - ending.length(), ending.length(), ending));
		}
		else {
			return false;
		}
	}

	bool isDirExist(const std::string& path)
	{
#if defined(_WIN32)
		struct _stat info;
		if (_stat(path.c_str(), &info) != 0)
		{
			return false;
		}
		return (info.st_mode & _S_IFDIR) != 0;
#else 
		struct stat info;
		if (stat(path.c_str(), &info) != 0)
		{
			return false;
		}
		return (info.st_mode & S_IFDIR) != 0;
#endif
	}

	bool mkdir(const std::string& path)
	{
#if defined(_WIN32)
		int ret = _mkdir(path.c_str());
#else
		mode_t mode = 0755;
		int ret = mkdir(path.c_str(), mode);
#endif
		if (ret == 0)
			return true;

		switch (errno)
		{
		case ENOENT:
			// parent didn't exist, try to create it
		{
			size_t pos = path.find_last_of('/');
			if (pos == std::string::npos)
#if defined(_WIN32)
				pos = path.find_last_of('\\');
			if (pos == std::string::npos)
#endif
				return false;
			if (!mkdir(path.substr(0, pos)))
				return false;
		}
		// now, try to create again
#if defined(_WIN32)
		return 0 == _mkdir(path.c_str());
#else 
		return 0 == mkdir(path.c_str(), mode);
#endif

		case EEXIST:
			// done!
			return isDirExist(path);

		default:
			return false;
		}
	}

	//https://stackoverflow.com/questions/8518743/get-directory-from-file-path-c/14631366
	std::string dirname(std::string fname)
	{
		size_t pos = fname.find_last_of("\\/");
		return (std::string::npos == pos)
			? ""
			: fname.substr(0, pos);
	}
}

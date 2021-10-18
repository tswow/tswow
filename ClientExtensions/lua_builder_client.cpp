#include <iostream>
#include <fstream>
#include <filesystem>
#include <string>
#include <sstream>

namespace fs = std::filesystem;

static bool endsWith(const std::string& str, const std::string& suffix)
{
	return str.size() >= suffix.size() && 0 == str.compare(str.size() - suffix.size(), suffix.size(), suffix);
}

int main()
{
	std::stringstream header_str;
	header_str << "inline std::vector<std::string> LUA_FILES = {";
	for (auto& p : fs::recursive_directory_iterator(fs::current_path()))
	{
		std::string path = p.path().string();
		if (endsWith(path, ".lua"))
		{
			std::ifstream luafile = std::ifstream(path);
			header_str << "\"";
			char byte;
			while (luafile.get(byte))
			{
				if (byte == '\\')
				{
					header_str << "\\\\";
				}
				else if (byte == '"')
				{
					header_str << "\\\"";
				}
				else if (byte == '\n')
				{
					header_str << "\\n";
				}
				else if (byte == '\r')
				{}
				else
				{
					header_str << byte;
				}
			}
			header_str << "\",";
		}
	}
	header_str << "};";
	std::ofstream outfile("luafiles.generated.h");
	outfile << header_str.str();
	return 0;
}
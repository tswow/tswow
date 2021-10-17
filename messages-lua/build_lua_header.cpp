#include <iostream>

#include <fstream>
#include <string>

// Compile-time script to generate messages.lua.h from messages.lua

void main(int argc, char* argv[])
{
	std::ifstream input("messages.lua");
	std::ofstream output("messages.lua.h");
	output << "// auto-generated file, do not edit\n";
	output << "#pragma once\n";
	output << "#define MESSAGES_LUA \\\n";
	for (std::string line; std::getline(input, line); )
	{
		output << "\"" << line << "\\n\" \\\n";
	}
}
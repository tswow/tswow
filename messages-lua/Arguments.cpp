#include "windows.h"
#include <locale>
#include <codecvt>
#include <string>
#include <vector>
#include <stdexcept>

namespace ClientArguments {
	namespace {
		std::vector<std::string> arguments;
	}

	void initialize(std::string const& str)
	{
		arguments.clear();
		std::wstring_convert<std::codecvt_utf8_utf16<wchar_t>> converter;
		std::wstring wide = converter.from_bytes(str);

		int argC;
		LPWSTR* wstr = CommandLineToArgvW(wide.c_str(), &argC);
		for (int i = 0; i < argC; ++i)
		{
			std::string v = converter.to_bytes(wstr[i]);
			arguments.push_back(converter.to_bytes(wstr[i]));
		}
	}

	size_t argIndex(std::string const& arg)
	{
		for (size_t i = 0; i < arguments.size(); ++i)
		{
			if (arguments[i] == arg || arguments[i].find(arg + "=") == 0)
			{
				return i;
			}
		}
		return std::string::npos;
	}

	std::string parseArgument(std::string const& in)
	{
		size_t index = argIndex(in);
		if (index == std::string::npos) throw 0;
		std::string const& v = arguments[index];
		if (v.find("=", in.size()))
		{
			return v.substr(in.size() + 1);
		}
		throw 0;
	}

	std::string GetString(std::string const& name, std::string const& def)
	{
		try {
			return parseArgument(name);
		}
		catch (...) {
			return def;
		}
	}

	float GetFloat(std::string const& name, float def)
	{
		try {
			return std::stof(parseArgument(name));
		}
		catch (...)
		{
			return def;
		}
	}

	double GetDouble(std::string const& name, double def)
	{
		try {
			return std::stod(parseArgument(name));
		}
		catch (...) {
			return def;
		}
	}

	int GetInt(std::string const& name, int def)
	{
		try {
			return std::stoi(parseArgument(name));
		}
		catch (...) {
			return def;
		}
	}

	bool Has(std::string const& arg)
	{
		return argIndex(arg) != std::string::npos;
	}
}

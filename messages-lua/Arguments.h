#pragma once

#include <string>

namespace ClientArguments {
	bool Has(std::string const& name);
	std::string GetString(std::string const& name, std::string const& def);
	float GetFloat(std::string const& name, float def);
	double GetDouble(std::string const& name, double def);
	int GetInt(std::string const& name, int def);
}
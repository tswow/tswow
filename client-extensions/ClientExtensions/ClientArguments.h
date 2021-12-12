#pragma once

#include <string>

class Main;

class ClientArguments
{
    static bool Has(std::string const& name);
    static std::string GetString(std::string const& name, std::string const& def);
    static float GetFloat(std::string const& name, float def);
    static double GetDouble(std::string const& name, double def);
    static int GetInt(std::string const& name, int def);
private:
    static void initialize(std::string const& str);
    friend class Main;
};

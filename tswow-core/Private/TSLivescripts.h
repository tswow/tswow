#pragma once

#include <string>

// logic for loading livescript shared libraries into the running worldserver

class TSLivescripts
{
public:
    static void Load(std::string const& buildType);
};
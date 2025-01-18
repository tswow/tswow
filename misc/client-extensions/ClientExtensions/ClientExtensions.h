#pragma once

#include"Characters/ClientCharacterFixes.h"

class Main;

class ClientExtensions {
private:
    static void initialize();
    friend class Main;
};

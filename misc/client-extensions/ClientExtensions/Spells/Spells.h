#pragma once

#include "SharedDefines.h"

class Spells {
  public:
    static inline bool s_castAtCursor = false;

  private:
    static void Apply();

    friend class ClientExtensions;
};

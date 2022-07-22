#pragma once

#include "TSBase.h"
#include "TSMain.h"
#include "TSEntity.h"

#include <sol/sol.hpp>

struct GameObjectTemplate;

class TC_GAME_API TSGameObjectTemplate : public TSEntityProvider {
public:
    GameObjectTemplate * gt;
    TSGameObjectTemplate(GameObjectTemplate * gt);
    TSGameObjectTemplate * operator->(){ return this; }
    operator bool() const { return gt != nullptr; }
    bool operator==(TSGameObjectTemplate const& rhs) { return gt == rhs.gt; }

    uint32 GetEntry();
    uint32 GetType();
    uint32 GetDisplayID();

    std::string GetName();
    std::string GetIconName();
    std::string GetCastBarCaption();

    uint32 GetGOData(uint32 index);

    TSEntity * GetData();
};

TSGameObjectTemplate TC_GAME_API GetGameObjectTemplate(uint32 id);

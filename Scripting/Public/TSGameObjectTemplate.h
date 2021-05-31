#pragma once

#include "TSBase.h"
#include "TSMain.h"
#include "TSStorage.h"
#include "TSEntity.h"
#include "TSString.h"

struct GameObjectTemplate;

class TC_GAME_API TSGameObjectTemplate {
public:
    GameObjectTemplate * gt;
    TSGameObjectTemplate(GameObjectTemplate * gt);
    TSGameObjectTemplate * operator->(){ return this; }

    uint32 GetEntry();
    uint32 GetType();
    uint32 GetDisplayID();

    TSString GetName();
    TSString GetIconName();
    TSString GetCastBarCaption();

    TSStorage * GetData();
    TS_ENTITY_DATA_DECL(TSGameObjectTemplate)
};

TSGameObjectTemplate TC_GAME_API GetGameObjectTemplate(uint32 id);
#pragma once

#include "TSMain.h"

struct FactionTemplateEntry;

class TC_GAME_API TSFactionTemplate
{
    TS_CLASS_DECLARATION(TSFactionTemplate, FactionTemplateEntry, m_faction)
    uint32 GetID();
    uint32 GetFaction();
    uint32 GetFlags();
    uint32 GetFactionGroup();
    uint32 GetFriendGroup();
    uint32 GetEnemyGroup();
    uint32 GetEnemy(uint32 index);
    uint32 GetFriend(uint32 index);
    bool IsFriendlyTo(TSFactionTemplate const& entry);
    bool IsHostileTo(TSFactionTemplate const& entry);
    bool IsHostileToPlayers();
    bool IsNeutralToAll();
    bool IsContestedGuardFaction();
};

TC_GAME_API TSFactionTemplate GetFactionTemplate(uint32 entry);

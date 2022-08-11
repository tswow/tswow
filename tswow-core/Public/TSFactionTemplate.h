#pragma once

#include "TSMain.h"

struct FactionTemplateEntry;

class TC_GAME_API TSFactionTemplate
{
    TS_CLASS_DECLARATION(TSFactionTemplate, FactionTemplateEntry, m_faction)
    TSNumber<uint32> GetID();
    TSNumber<uint32> GetFaction();
    TSNumber<uint32> GetFlags();
    TSNumber<uint32> GetFactionGroup();
    TSNumber<uint32> GetFriendGroup();
    TSNumber<uint32> GetEnemyGroup();
    TSNumber<uint32> GetEnemy(uint32 index);
    TSNumber<uint32> GetFriend(uint32 index);
    bool IsFriendlyTo(TSFactionTemplate const& entry);
    bool IsHostileTo(TSFactionTemplate const& entry);
    bool IsHostileToPlayers();
    bool IsNeutralToAll();
    bool IsContestedGuardFaction();
};

TC_GAME_API TSFactionTemplate GetFactionTemplate(uint32 entry);

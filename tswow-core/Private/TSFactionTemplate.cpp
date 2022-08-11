#include "TSFactionTemplate.h"

#include "DBCStructure.h"
#include "DBCStores.h"

TS_CLASS_DEFINITION(TSFactionTemplate, FactionTemplateEntry, m_faction)

TSNumber<uint32> TSFactionTemplate::GetID()
{
    return m_faction->ID;
}

TSNumber<uint32> TSFactionTemplate::GetFaction()
{
    return m_faction->Faction;
}

TSNumber<uint32> TSFactionTemplate::GetFlags()
{
    return m_faction->Flags;
}

TSNumber<uint32> TSFactionTemplate::GetFactionGroup()
{
    return m_faction->FactionGroup;
}

TSNumber<uint32> TSFactionTemplate::GetFriendGroup()
{
    return m_faction->FriendGroup;
}

TSNumber<uint32> TSFactionTemplate::GetEnemyGroup()
{
    return m_faction->EnemyGroup;
}

TSNumber<uint32> TSFactionTemplate::GetEnemy(uint32 index)
{
    return m_faction->Enemies[index];
}

TSNumber<uint32> TSFactionTemplate::GetFriend(uint32 index)
{
    return m_faction->Friend[index];
}

bool TSFactionTemplate::IsFriendlyTo(TSFactionTemplate const& entry)
{
    return m_faction->IsFriendlyTo(*entry.m_faction);
}
bool TSFactionTemplate::IsHostileTo(TSFactionTemplate const& entry)
{
    return m_faction->IsHostileTo(*entry.m_faction);
}

bool TSFactionTemplate::IsHostileToPlayers()
{
    return m_faction->IsHostileToPlayers();
}

bool TSFactionTemplate::IsNeutralToAll()
{
    return m_faction->IsNeutralToAll();
}

bool TSFactionTemplate::IsContestedGuardFaction()
{
    return m_faction->IsContestedGuardFaction();
}

TC_GAME_API TSFactionTemplate GetFactionTemplate(uint32 entry)
{
    return TSFactionTemplate(sFactionTemplateStore.LookupEntry(entry));
}

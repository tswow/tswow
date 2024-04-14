#include "TSAchievementTemplate.h"
#include "TSEvents.h"
#include "DBCStructure.h"
#include "DBCStores.h"

#include <vector>

TSAchievementEntry::TSAchievementEntry(AchievementEntry* achievement)
: m_achievement(achievement)
{}

TSAchievementEntry* TSAchievementEntry::operator->()
{
    return this;
}

TSNumber<uint32> TSAchievementEntry::GetEntry()
{
    return m_achievement->ID;
}

TSNumber<int32> TSAchievementEntry::GetFaction()
{
#ifdef TRINITY
    return m_achievement->Faction;
#endif
}

TSNumber<int32> TSAchievementEntry::GetInstanceID()
{
#ifdef TRINITY
    return m_achievement->InstanceID;
#endif
}
TSArray<std::string> TSAchievementEntry::GetTitles()
{
    TSArray<std::string> arr;
#ifdef TRINITY
    for (const char* title : m_achievement->Title)
    {
        arr.push(title);
    }
#endif
    return arr;
}
TSNumber<uint32> TSAchievementEntry::GetCategory()
{
#ifdef TRINITY
    return m_achievement->Category;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetPoints()
{
#ifdef TRINITY
    return m_achievement->Points;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetFlags()
{
#ifdef TRINITY
    return m_achievement->Flags;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetMinimumCriteria()
{
#ifdef TRINITY
    return m_achievement->MinimumCriteria;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetSharesCriteria()
{
#ifdef TRINITY
    return m_achievement->SharesCriteria;
#endif
}

TSAchievementCriteriaEntry::TSAchievementCriteriaEntry(AchievementCriteriaEntry* criteria)
: m_criteria(criteria)
{}
TSAchievementCriteriaEntry* TSAchievementCriteriaEntry::operator->()
{
    return this;
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetEntry()
{
    return m_criteria->ID;
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAchievementEntry()
{
#ifdef TRINITY
    return m_criteria->AchievementID;
#endif
}

TSNumber<uint32> TSAchievementCriteriaEntry::GetType()
{
#ifdef TRINITY
    return m_criteria->Type;
#endif
}

TSNumber<uint32> TSAchievementCriteriaEntry::GetAssetID()
{
#ifdef TRINITY
    return m_criteria->Asset.ID;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetQuantity()
{
#ifdef TRINITY
    return m_criteria->Quantity;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalType1()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[0].Type;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalAsset1()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[0].Asset;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalType2()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[1].Type;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalAsset2()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[1].Asset;
#endif

}
TSNumber<uint32> TSAchievementCriteriaEntry::GetFlags()
{
#ifdef TRINITY
    return m_criteria->Flags;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartEvent()
{
#ifdef TRINITY
    return m_criteria->StartEvent;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartAsset()
{
#ifdef TRINITY
    return m_criteria->StartAsset;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartTimer()
{
#ifdef TRINITY
    return m_criteria->StartTimer;
#endif
}

TSAchievementEntry GetAchievementTemplate(uint32 entry)
{
    return TSAchievementEntry(const_cast<AchievementEntry*>(sAchievementStore.LookupEntry(entry)));
}

TSAchievementCriteriaEntry GetAchievementCriteria(uint32 entry)
{
    return TSAchievementCriteriaEntry(const_cast<AchievementCriteriaEntry*>(sAchievementCriteriaStore.LookupEntry(entry)));
}

std::vector<TSAchievementEvents*> achievementEvents;
void InitializeAchievementEvent(uint32 entry, TSAchievementEvents* events)
{
    while (entry >= achievementEvents.size())
    {
        // makes sure nothing insane happens in either direction
        achievementEvents.resize(achievementEvents.size() + 1000, nullptr);
    }
    achievementEvents[entry] = events;
}

TSAchievementEvents* GetAchievementEvent(uint32 entry)
{
    if (entry >= achievementEvents.size())
    {
        return nullptr;
    }
    return achievementEvents[entry];
}

TSLua::Array<std::string> TSAchievementEntry::LGetTitles()
{
    std::vector<std::string> plain;
    auto titles = GetTitles();
    for (auto const& title : titles)
    {
        plain.push_back(title);
    }
    return sol::as_table(plain);
}

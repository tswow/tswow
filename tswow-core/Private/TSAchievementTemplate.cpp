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
#elif AZEROTHCORE
    return m_achievement->requiredFaction;
#endif
}

TSNumber<int32> TSAchievementEntry::GetInstanceID()
{
#ifdef TRINITY
    return m_achievement->InstanceID;
#elif AZEROTHCORE
    return m_achievement->mapID;
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
#elif AZEROTHCORE
    // TODO: enable getting titles
    TS_LOG_ERROR("tswow.api", "TSAchievementEntry::GetTitles is not implemented for AzerothCore.");
#endif
    return arr;
}
TSNumber<uint32> TSAchievementEntry::GetCategory()
{
#ifdef TRINITY
    return m_achievement->Category;
#elif AZEROTHCORE
    return m_achievement->categoryId;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetPoints()
{
#ifdef TRINITY
    return m_achievement->Points;
#elif AZEROTHCORE
    return m_achievement->points;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetFlags()
{
#ifdef TRINITY
    return m_achievement->Flags;
#elif AZEROTHCORE
    return m_achievement->flags;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetMinimumCriteria()
{
#ifdef TRINITY
    return m_achievement->MinimumCriteria;
#elif AZEROTHCORE
    return m_achievement->count;
#endif
}
TSNumber<uint32> TSAchievementEntry::GetSharesCriteria()
{
#ifdef TRINITY
    return m_achievement->SharesCriteria;
#elif AZEROTHCORE
    return m_achievement->refAchievement;
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
#elif AZEROTHCORE
    return m_criteria->referredAchievement;
#endif
}

TSNumber<uint32> TSAchievementCriteriaEntry::GetType()
{
#ifdef TRINITY
    return m_criteria->Type;
#elif AZEROTHCORE
    return m_criteria->requiredType;
#endif
}

TSNumber<uint32> TSAchievementCriteriaEntry::GetAssetID()
{
#ifdef TRINITY
    return m_criteria->Asset.ID;
#elif AZEROTHCORE
    return m_criteria->raw.field3;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetQuantity()
{
#ifdef TRINITY
    return m_criteria->Quantity;
#elif AZEROTHCORE
    return m_criteria->raw.count;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalType1()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[0].Type;
#elif AZEROTHCORE
    return m_criteria->additionalRequirements[0].additionalRequirement_type;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalAsset1()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[0].Asset;
#elif AZEROTHCORE
    return m_criteria->additionalRequirements[0].additionalRequirement_value;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalType2()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[1].Type;
#elif AZEROTHCORE
    return m_criteria->additionalRequirements[1].additionalRequirement_type;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetAdditionalAsset2()
{
#ifdef TRINITY
    return m_criteria->AdditionalRequirements[1].Asset;
#elif AZEROTHCORE
    return m_criteria->additionalRequirements[1].additionalRequirement_value;
#endif

}
TSNumber<uint32> TSAchievementCriteriaEntry::GetFlags()
{
#ifdef TRINITY
    return m_criteria->Flags;
#elif AZEROTHCORE
    return m_criteria->flags;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartEvent()
{
#ifdef TRINITY
    return m_criteria->StartEvent;
#elif AZEROTHCORE
    return m_criteria->timerStartEvent;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartAsset()
{
#ifdef TRINITY
    return m_criteria->StartAsset;
#elif AZEROTHCORE
    return m_criteria->timerStartEvent;
#endif
}
TSNumber<uint32> TSAchievementCriteriaEntry::GetStartTimer()
{
#ifdef TRINITY
    return m_criteria->StartTimer;
#elif AZEROTHCORE
    return m_criteria->timeLimit;
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

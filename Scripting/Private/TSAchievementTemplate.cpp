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

uint32 TSAchievementEntry::GetEntry()
{
    return m_achievement->ID;
}

int32 TSAchievementEntry::GetFaction()
{
    return m_achievement->Faction;
}

int32 TSAchievementEntry::GetInstanceID()
{
    return m_achievement->InstanceID;
}
TSArray<TSString> TSAchievementEntry::GetTitles()
{
    TSArray<TSString> arr;
    for (const char* title : m_achievement->Title)
    {
        arr.push(TSString(title));
    }
    return arr;
}
uint32 TSAchievementEntry::GetCategory()
{
    return m_achievement->Category;
}
uint32 TSAchievementEntry::GetPoints()
{
    return m_achievement->Points;
}
uint32 TSAchievementEntry::GetFlags()
{
    return m_achievement->Flags;
}
uint32 TSAchievementEntry::GetMinimumCriteria()
{
    return m_achievement->MinimumCriteria;
}
uint32 TSAchievementEntry::GetSharesCriteria()
{
    return m_achievement->SharesCriteria;
}

TSAchievementCriteriaEntry::TSAchievementCriteriaEntry(AchievementCriteriaEntry* criteria)
: m_criteria(criteria)
{}
TSAchievementCriteriaEntry* TSAchievementCriteriaEntry::operator->()
{
    return this;
}
uint32 TSAchievementCriteriaEntry::GetEntry()
{
    return m_criteria->ID;
}
uint32 TSAchievementCriteriaEntry::GetAchievementEntry()
{
    return m_criteria->AchievementID;
}

uint32 TSAchievementCriteriaEntry::GetType()
{
    return m_criteria->Type;
}

uint32 TSAchievementCriteriaEntry::GetAssetID()
{
    return m_criteria->Asset.ID;
}
uint32 TSAchievementCriteriaEntry::GetQuantity()
{
    return m_criteria->Quantity;
}
uint32 TSAchievementCriteriaEntry::GetAdditionalType1()
{
    return m_criteria->AdditionalRequirements[0].Type;
}
uint32 TSAchievementCriteriaEntry::GetAdditionalAsset1()
{
    return m_criteria->AdditionalRequirements[0].Asset;
}
uint32 TSAchievementCriteriaEntry::GetAdditionalType2()
{
    return m_criteria->AdditionalRequirements[1].Type;
}
uint32 TSAchievementCriteriaEntry::GetAdditionalAsset2()
{
    return m_criteria->AdditionalRequirements[1].Asset;
}
uint32 TSAchievementCriteriaEntry::GetFlags()
{
    return m_criteria->Flags;
}
uint32 TSAchievementCriteriaEntry::GetStartEvent()
{
    return m_criteria->StartEvent;
}
uint32 TSAchievementCriteriaEntry::GetStartAsset()
{
    return m_criteria->StartAsset;
}
uint32 TSAchievementCriteriaEntry::GetStartTimer()
{
    return m_criteria->StartTimer;
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

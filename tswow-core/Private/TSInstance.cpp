#include "TSInstance.h"
#include "TSMap.h"

#include "Map.h"
#include "InstanceScript.h"

TSInstance::TSInstance(InstanceScript* script)
    : m_script(script)
{}

bool TSInstance::IsNull()
{
    return m_script == nullptr;
}

TSMap TSInstance::GetMap()
{
    return TSMap(m_script->instance);
}

void TSInstance::SaveToDB()
{
    m_script->SaveToDB();
}

bool TSInstance::IsEncounterInProgress()
{
    return m_script->IsEncounterInProgress();
}

uint64 TSInstance::GetObjectGUID(uint32 type)
{
    return m_script->GetObjectGuid(type).GetRawValue();
}

void TSInstance::DoUseDoorOrButton(uint64 guid, uint32 withRestoreTime, bool useAlternativeState)
{
    return m_script->DoUseDoorOrButton(ObjectGuid(guid), withRestoreTime, useAlternativeState);
}

void TSInstance::DoCloseDoorOrButton(uint64 guid)
{
    m_script->DoCloseDoorOrButton(ObjectGuid(guid));
}

void TSInstance::DoRespawnGameObject(uint64 guid, uint32 seconds)
{
    m_script->DoRespawnGameObject(ObjectGuid(guid), Seconds(seconds));
}

void TSInstance::DoUpdateWorldState(uint32 worldStateId, uint32 worldStateValue)
{
    m_script->DoUpdateWorldState(worldStateId, worldStateValue);
}

void TSInstance::DoSendNotify(TSString message)
{
    m_script->DoSendNotifyToInstance(message.c_str());
}

void TSInstance::DoUpdateAchievementCriteria(uint32 type, uint32 miscValue1 = 0, uint32 miscValue2 = 0, TSUnit unit = TSUnit(nullptr))
{
    m_script->DoUpdateAchievementCriteria(AchievementCriteriaTypes(type), miscValue1, miscValue2, unit.unit);
}

void TSInstance::DoStartTimedAchievement(uint32 type, uint32 entry)
{
    m_script->DoStartTimedAchievement(AchievementCriteriaTimedTypes(type), entry);
}

void TSInstance::DoStopTimedAchievement(uint32 type, uint32 entry)
{
    m_script->DoStopTimedAchievement(AchievementCriteriaTimedTypes(type), entry);
}

void TSInstance::DoRemoveAurasDueToSpellOnPlayers(uint32 spell, bool includePets, bool includeControlled)
{
    m_script->DoRemoveAurasDueToSpellOnPlayers(spell, includePets, includeControlled);
}
void TSInstance::DoCastSpellOnPlayers(uint32 spell, bool includePets, bool includeControlled)
{
    m_script->DoCastSpellOnPlayers(spell, includePets, includeControlled);
}

void TSInstance::SetBossState(uint32 id, uint32 encounterState)
{
    m_script->SetBossState(id, EncounterState(encounterState));
}

uint32 TSInstance::GetBossState(uint32 id)
{
    return m_script->GetBossState(id);
}

void TSInstance::MarkAreaTriggerDone(uint32 id)
{
    m_script->MarkAreaTriggerDone(id);
}

void TSInstance::ResetAreaTriggerDone(uint32 id)
{
    m_script->ResetAreaTriggerDone(id);
}

void TSInstance::BindAllPlayers()
{
    m_script->instance->PermBindAllPlayers();
}

bool TSInstance::HasPermBoundPlayers()
{
    return m_script->instance->HasPermBoundPlayers();
}

uint32 TSInstance::GetMaxPlayers()
{
    return m_script->instance->GetMaxPlayers();
}

uint32 TSInstance::GetMaxResetDelay()
{
    return m_script->instance->GetMaxResetDelay();
}

uint32 TSInstance::GetTeamIDInInstance()
{
    return m_script->instance->GetTeamIdInInstance();
}

uint32 TSInstance::GetFactionInInstance()
{
    return m_script->instance->GetTeamInInstance();
}

uint32 TSInstance::GetEncounterCount()
{
    return m_script->GetEncounterCount();
}

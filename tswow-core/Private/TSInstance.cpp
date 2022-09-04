#include "TSMap.h"

#if TRINITY
#include "AreaBoundary.h"
#endif
#include "Map.h"
#include "InstanceScript.h"
#include "ScriptedCreature.h"

TSInstance::TSInstance(Map* map, InstanceScript* script)
    : TSMap(map),  m_script(script)
{}

bool TSInstance::IsNull()
{
    return m_script == nullptr || map == nullptr;
}

void TSInstance::RemoveFromMap(TSPlayer player, bool deleteFromWorld)
{
    map->RemovePlayerFromMap(player.player, deleteFromWorld);
}

void TSInstance::SaveInstanceToDB()
{
    m_script->SaveToDB();
}

bool TSInstance::IsEncounterInProgress()
{
    return m_script->IsEncounterInProgress();
}

TSNumber<uint64> TSInstance::GetObjectGUID(uint32 type)
{
    return TS_GUID(m_script->GetObjectGuid(type));
}

void TSInstance::DoUseDoorOrButton(uint64 guid, uint32 withRestoreTime, bool useAlternativeState)
{
    return m_script->DoUseDoorOrButton(ObjectGuid(guid), withRestoreTime, useAlternativeState);
}

void TSInstance::DoCloseDoorOrButton(uint64 guid)
{
#if TRINITY
    m_script->DoCloseDoorOrButton(ObjectGuid(guid));
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::DoCloseDoorOrButton not implemented for AzerothCore");
#endif
}

void TSInstance::DoRespawnGameObject(uint64 guid, uint32 seconds)
{
#if TRINITY
    m_script->DoRespawnGameObject(ObjectGuid(guid), Seconds(seconds));
#elif AZEROTHCORE
    m_script->DoRespawnGameObject(ObjectGuid(guid), seconds);
#endif
}

void TSInstance::DoUpdateWorldState(uint32 worldStateId, uint32 worldStateValue)
{
    m_script->DoUpdateWorldState(worldStateId, worldStateValue);
}

void TSInstance::DoSendNotify(std::string const& message)
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
#if TRINITY
    m_script->DoRemoveAurasDueToSpellOnPlayers(spell, includePets, includeControlled);
#elif AZEROTHCORE
    if (includePets || includeControlled)
    {
        TS_LOG_ERROR("tswow.api", "TSInstance::DoRemoveAurasDueToSpellOnPlayers not implemented for AzerothCore with includePets/includeControlled set");
    }
    m_script->DoRemoveAurasDueToSpellOnPlayers(spell);
#endif
}
void TSInstance::DoCastSpellOnPlayers(uint32 spell, bool includePets, bool includeControlled)
{
#if TRINITY
    m_script->DoCastSpellOnPlayers(spell, includePets, includeControlled);
#elif AZEROTHCORE
    if (includePets || includeControlled)
    {
        TS_LOG_ERROR("tswow.api", "TSInstance::DoCastSpellOnPlayers not implemented for AzerothCore with includePets/includeControlled set");
    }
    m_script->DoCastSpellOnPlayers(spell);
#endif
}

void TSInstance::SetBossState(uint32 id, uint32 encounterState)
{
    m_script->SetBossState(id, EncounterState(encounterState));
}

TSNumber<uint32> TSInstance::GetBossState(uint32 id)
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
#if TRINITY
    m_script->instance->PermBindAllPlayers();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::BindAllPlayers not implemented for AzerothCore");
#endif
}

bool TSInstance::HasPermBoundPlayers()
{
#if TRINITY
    return m_script->instance->HasPermBoundPlayers();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::HasPermBoundPlayers not implemented for AzerothCore");
#endif
}

TSNumber<uint32> TSInstance::GetMaxPlayers()
{
#if TRINITY
    return m_script->instance->GetMaxPlayers();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::GetMaxPlayers not implemented for AzerothCore");
#endif
}

TSNumber<uint32> TSInstance::GetMaxResetDelay()
{
#if TRINITY
    return m_script->instance->GetMaxResetDelay();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::GetMaxResetDelay not implemented for AzerothCore");
#endif
}

TSNumber<uint32> TSInstance::GetTeamIDInInstance()
{
#if TRINITY
    return m_script->instance->GetTeamIdInInstance();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::GetTeamIDInInstance not implemented for AzerothCore");
    return 0;
#endif
}

TSNumber<uint32> TSInstance::GetFactionInInstance()
{
#if TRINITY
    return m_script->instance->GetTeamInInstance();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSInstance::GetFactionIDInInstance not implemented for AzerothCore");
    return 0;
#endif
}

TSNumber<uint32> TSInstance::GetEncounterCount()
{
    return m_script->GetEncounterCount();
}

TSBossInfo TSInstance::GetBossInfo(uint32 id)
{
    return TSBossInfo(&m_script->bosses[id]);
}

TSGuidSet::TSGuidSet(std::set<ObjectGuid>* set)
    : m_set(set)
{}

bool TSGuidSet::Contains(uint64 value)
{
    return m_set->find(ObjectGuid(value)) == m_set->end();
}

void TSGuidSet::Add(uint64 value)
{
    m_set->insert(ObjectGuid(value));
}

void TSGuidSet::Remove(uint64 value)
{
    m_set->erase(ObjectGuid(value));
}

TSBossInfo::TSBossInfo(BossInfo* info)
    : m_info(info)
{}

TSNumber<uint32> TSBossInfo::GetBossState()
{
    return m_info->state;
}

TSGuidSet TSBossInfo::GetMinionGUIDs()
{
#if TRINITY
    return TSGuidSet(&m_info->minion);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::GetMinionGUIDs not implemented for AzerothCore");
    return TSGuidSet(nullptr);
#endif
}

TSGuidSet TSBossInfo::GetDoorsClosedDuringEncounter()
{
#if TRINITY
    return TSGuidSet(&m_info->door[DoorType::DOOR_TYPE_ROOM]);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::GetDoorsClosedDuringEncounter not implemented for AzerothCore");
    return TSGuidSet(nullptr);
#endif
}

TSGuidSet TSBossInfo::GetDoorsOpenDuringEncounter()
{
#if TRINITY
    return TSGuidSet(&m_info->door[DoorType::DOOR_TYPE_SPAWN_HOLE]);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::GetDoorsOpenDuringEncounter not implemented for AzerothCore");
    return TSGuidSet(nullptr);
#endif
}

TSGuidSet TSBossInfo::GetDoorsOpenAfterEncounter()
{
#if TRINITY
    return TSGuidSet(&m_info->door[DoorType::DOOR_TYPE_PASSAGE]);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::GetDoorsOpenAfterEncounter not implemented for AzerothCore");
    return TSGuidSet(nullptr);
#endif
}

bool TSBossInfo::IsWithinBoundary(float x, float y, float z)
{
#if TRINITY
    for (auto part : m_info->boundary)
    {
        if (!part->IsWithinBoundary(Position(x, y, z))) return false;
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::IsWithinBoundary not implemented for AzerothCore");
#endif
    return true;
}

bool TSBossInfo::IsWithinBoundary(TSWorldObject obj)
{
#if TRINITY
    for (auto part : m_info->boundary)
    {
        if (!part->IsWithinBoundary(obj.obj))
        {
            return false;
        }
    }
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSBossInfo::IsWithinBoundary not implemented for AzerothCore");
#endif
    return true;
}

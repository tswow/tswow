#include "TSMap.h"

#if TRINITY
#include "AreaBoundary.h"
#endif
#include "Map.h"
#include "InstanceScript.h"
#include "ScriptedCreature.h"
#include "TSGUID.h"

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

TSGUID TSInstance::GetObjectGUID(uint32 type)
{
    return TSGUID(m_script->GetObjectGuid(type));
}

void TSInstance::DoUseDoorOrButton(TSGUID guid, uint32 withRestoreTime, bool useAlternativeState)
{
    return m_script->DoUseDoorOrButton(guid.asGUID(), withRestoreTime, useAlternativeState);
}

void TSInstance::DoCloseDoorOrButton(TSGUID guid)
{
#if TRINITY
    m_script->DoCloseDoorOrButton(guid.asGUID());
#endif
}

void TSInstance::DoRespawnGameObject(TSGUID guid, uint32 seconds)
{
#if TRINITY
    m_script->DoRespawnGameObject(guid.asGUID(), Seconds(seconds));
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
#endif
}
void TSInstance::DoCastSpellOnPlayers(uint32 spell, bool includePets, bool includeControlled)
{
#if TRINITY
    m_script->DoCastSpellOnPlayers(spell, includePets, includeControlled);
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
#endif
}

bool TSInstance::HasPermBoundPlayers()
{
#if TRINITY
    return m_script->instance->HasPermBoundPlayers();
#endif
}

TSNumber<uint32> TSInstance::GetMaxPlayers()
{
#if TRINITY
    return m_script->instance->GetMaxPlayers();
#endif
}

TSNumber<uint32> TSInstance::GetMaxResetDelay()
{
#if TRINITY
    return m_script->instance->GetMaxResetDelay();
#endif
}

TSNumber<uint32> TSInstance::GetTeamIDInInstance()
{
#if TRINITY
    return m_script->instance->GetTeamIdInInstance();
#endif
}

TSNumber<uint32> TSInstance::GetFactionInInstance()
{
#if TRINITY
    return m_script->instance->GetTeamInInstance();
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

void TSInstance::HandleGameObject(uint32 guid, bool open)
{
    if (GameObject* go = map->GetGameObjectBySpawnId(guid)) {
        go->SetGoState(open ? GO_STATE_ACTIVE : GO_STATE_READY);
    }
}

TSGUIDSet::TSGUIDSet(std::set<ObjectGuid>* set)
    : m_set(set)
{}

bool TSGUIDSet::Contains(uint64 value)
{
    return m_set->find(ObjectGuid(value)) == m_set->end();
}

void TSGUIDSet::Add(uint64 value)
{
    m_set->insert(ObjectGuid(value));
}

void TSGUIDSet::Remove(uint64 value)
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

TSGUIDSet TSBossInfo::GetMinionGUIDs()
{
#if TRINITY
    return TSGUIDSet(&m_info->minion);
#endif
}

TSGUIDSet TSBossInfo::GetDoorsClosedDuringEncounter()
{
#if TRINITY
    return TSGUIDSet(&m_info->door[DoorType::DOOR_TYPE_ROOM]);
#endif
}

TSGUIDSet TSBossInfo::GetDoorsOpenDuringEncounter()
{
#if TRINITY
    return TSGUIDSet(&m_info->door[DoorType::DOOR_TYPE_SPAWN_HOLE]);
#endif
}

TSGUIDSet TSBossInfo::GetDoorsOpenAfterEncounter()
{
#if TRINITY
    return TSGUIDSet(&m_info->door[DoorType::DOOR_TYPE_PASSAGE]);
#endif
}

bool TSBossInfo::IsWithinBoundary(float x, float y, float z)
{
#if TRINITY
    for (auto part : m_info->boundary)
    {
        if (!part->IsWithinBoundary(Position(x, y, z))) return false;
    }
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
#endif
    return true;
}

TSNumber<uint32> TSInstance::GetActiveCriteria()
{
    return m_script->GetActiveCriteria();
}

void TSInstance::SetActiveCriteria(uint32 Criteria)
{
    return m_script->SetActiveCriteria(Criteria);
}

void TSInstance::TriggerResetHook()
{
    return m_script->TriggerResetHook();
}

TSNumber<uint32> TSInstance::GetInstanceData(uint32 id)
{
    return m_script->GetData(id);
}

void TSInstance::SetInstanceData(uint32 id, uint32 data)
{
    m_script->SetData(id, data);
}

TSNumber<uint64> TSInstance::GetInstanceData64(uint32 id)
{
    return m_script->GetData64(id);
}

void TSInstance::SetInstanceData64(uint32 id, uint64 data)
{
    m_script->SetData64(id, data);
}

TSGUID TSInstance::GetInstanceGUIDData(uint32 id)
{
    return TSGUID(m_script->GetGuidData(id));
}

void TSInstance::SetInstanceGUIDData(uint32 id, TSGUID data)
{
    m_script->SetGuidData(id, data->asGUID());
}

TSNumber<uint8> TSInstance::GetSpawnLoc()
{
    return m_script->GetSpawnLoc();
}

void TSInstance::SetSpawnLoc(uint8 loc)
{
    m_script->SetSpawnLoc(loc);
}
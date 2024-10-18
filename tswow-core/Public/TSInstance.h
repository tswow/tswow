#pragma once

#include "TSMain.h"
#include "TSBase.h"
#include "TSUnit.h"
#include "TSMap.h"

#include <sol/sol.hpp>

class TSUnit;
class InstanceScript;
class TSGUID;

class ObjectGuid;
class TC_GAME_API TSGUIDSet {
    std::set<ObjectGuid>* m_set;
public:
    TSGUIDSet(std::set<ObjectGuid>* set);
    operator bool() const { return m_set != nullptr; }
    bool operator==(TSGUIDSet const& rhs) { return m_set == rhs.m_set; }

    bool Contains(uint64);
    void Add(uint64);
    void Remove(uint64);
};

struct BossInfo;
class TC_GAME_API TSBossInfo {
    BossInfo* m_info;
public:
    TSBossInfo(BossInfo* info);
    operator bool() const { return m_info != nullptr; }
    bool operator==(TSBossInfo const& rhs) { return m_info == rhs.m_info; }
    TSNumber<uint32> GetBossState();
    TSGUIDSet GetMinionGUIDs();
    TSGUIDSet GetDoorsOpenDuringEncounter();
    TSGUIDSet GetDoorsClosedDuringEncounter();
    TSGUIDSet GetDoorsOpenAfterEncounter();
    bool IsWithinBoundary(float x, float y, float z);
    bool IsWithinBoundary(TSWorldObject obj);
};


class TC_GAME_API TSInstance : public TSMap {
public:
    InstanceScript* m_script;
    TSInstance(Map* map, InstanceScript* script);
    TSInstance* operator->() { return this; }
    operator bool() const { return map != nullptr && m_script != nullptr; }
    bool IsNull();
    void RemoveFromMap(TSPlayer player, bool deleteFromWorld);
    void SaveInstanceToDB();
    bool IsEncounterInProgress();
    TSGUID GetObjectGUID(uint32 type);
    void DoUseDoorOrButton(TSGUID guid, uint32 withRestoreTime = 0, bool useAlternativeState = false);
    void DoCloseDoorOrButton(TSGUID guid);
    void DoRespawnGameObject(TSGUID guid, uint32 seconds);
    void DoUpdateWorldState(uint32 worldStateId, uint32 worldStateValue);
    void DoSendNotify(std::string const& message);
    void DoUpdateAchievementCriteria(uint32 type, uint32 miscValue1, uint32 miscValue2, TSUnit unit);
    void DoStartTimedAchievement(uint32 type, uint32 entry);
    void DoStopTimedAchievement(uint32 type, uint32 entry);
    void DoRemoveAurasDueToSpellOnPlayers(uint32 spell, bool includePets = false, bool includeControlled = false);
    void DoCastSpellOnPlayers(uint32 spell, bool includePets = false, bool includeControlled = false);
    void SetBossState(uint32 id, uint32 encounterState);
    TSNumber<uint32> GetBossState(uint32 id);
    void MarkAreaTriggerDone(uint32 id);
    void ResetAreaTriggerDone(uint32 id);
    TSNumber<uint32> GetEncounterCount();
    void BindAllPlayers();
    bool HasPermBoundPlayers();
    TSNumber<uint32> GetMaxPlayers();
    TSNumber<uint32> GetMaxResetDelay();
    TSNumber<uint32> GetTeamIDInInstance();
    TSNumber<uint32> GetFactionInInstance();
    TSBossInfo GetBossInfo(uint32 id);

    uint32 m_activeCriteria = 0;
    void SetActiveCriteria(uint32 id) {
        m_activeCriteria = id;
    }
    uint32 GetActiveCriteria() {
        return m_activeCriteria;
    }
};

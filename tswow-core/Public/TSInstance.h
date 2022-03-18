#pragma once

#include "TSMain.h"
#include "TSBase.h"
#include "TSString.h"
#include "TSUnit.h"
#include "TSMap.h"

#include <sol/sol.hpp>

class TSUnit;
class InstanceScript;

class ObjectGuid;
class TC_GAME_API TSGuidSet {
    std::set<ObjectGuid>* m_set;
public:
    TSGuidSet(std::set<ObjectGuid>* set);
    operator bool() const { return m_set != nullptr; }
    bool operator==(TSGuidSet const& rhs) { return m_set == rhs.m_set; }

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
    uint32 GetBossState();
    TSGuidSet GetMinionGUIDs();
    TSGuidSet GetDoorsOpenDuringEncounter();
    TSGuidSet GetDoorsClosedDuringEncounter();
    TSGuidSet GetDoorsOpenAfterEncounter();
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
    void SaveInstanceToDB();
    bool IsEncounterInProgress();
    uint64 GetObjectGUID(uint32 type);
    void DoUseDoorOrButton(uint64 guid, uint32 withRestoreTime = 0, bool useAlternativeState = false);
    void DoCloseDoorOrButton(uint64 guid);
    void DoRespawnGameObject(uint64 guid, uint32 seconds);
    void DoUpdateWorldState(uint32 worldStateId, uint32 worldStateValue);
    void DoSendNotify(TSString message);
    void DoUpdateAchievementCriteria(uint32 type, uint32 miscValue1, uint32 miscValue2, TSUnit unit);
    void DoStartTimedAchievement(uint32 type, uint32 entry);
    void DoStopTimedAchievement(uint32 type, uint32 entry);
    void DoRemoveAurasDueToSpellOnPlayers(uint32 spell, bool includePets = false, bool includeControlled = false);
    void DoCastSpellOnPlayers(uint32 spell, bool includePets = false, bool includeControlled = false);
    void SetBossState(uint32 id, uint32 encounterState);
    uint32 GetBossState(uint32 id);
    void MarkAreaTriggerDone(uint32 id);
    void ResetAreaTriggerDone(uint32 id);
    uint32 GetEncounterCount();
    void BindAllPlayers();
    bool HasPermBoundPlayers();
    uint32 GetMaxPlayers();
    uint32 GetMaxResetDelay();
    uint32 GetTeamIDInInstance();
    uint32 GetFactionInInstance();
    TSBossInfo GetBossInfo(uint32 id);
private:
    void LDoUseDoorOrButton0(uint64 guid, uint32 withRestoreTime, bool useAlternativeState);
    void LDoUseDoorOrButton1(uint64 guid, uint32 withRestoreTime);
    void LDoUseDoorOrButton2(uint64 guid);

    void LDoRemoveAurasDueToSpellOnPlayers0(uint32 spell, bool includePets, bool includeControlled);
    void LDoRemoveAurasDueToSpellOnPlayers1(uint32 spell, bool includePets);
    void LDoRemoveAurasDueToSpellOnPlayers2(uint32 spell);

    void LDoCastSpellOnPlayers0(uint32 spell, bool includePets, bool includeControlled);
    void LDoCastSpellOnPlayers1(uint32 spell, bool includePets);
    void LDoCastSpellOnPlayers2(uint32 spell);
    void LDoSendNotify(std::string const& message);
    friend class TSLuaState;
};

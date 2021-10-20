#pragma once

#include "TSMain.h"
#include "TSBase.h"
#include "TSString.h"
#include "TSUnit.h"

class TSUnit;
class TSMap;
class InstanceScript;

class TC_GAME_API TSInstance {
public:
    InstanceScript* m_script;

    TSInstance(InstanceScript* script);
    TSInstance* operator->() { return this; }

    bool IsNull();
    TSMap GetMap();
    void SaveToDB();
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
};

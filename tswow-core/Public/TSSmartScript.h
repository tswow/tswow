#pragma once

#include <functional>
#include <TSBase.h>
#include <TSMain.h>
#include <TSArray.h>
#include <TSUnit.h>
#include <TSSpellInfo.h>
#include <TSGameObject.h>

#include <memory>

#define TSWOW_EVENT_OFFSET 300
#define TSWOW_ACTION_OFFSET 300
#define TSWOW_CONDITION_OFFSET 100

struct Condition;
struct TC_GAME_API TSCondition {
    Condition * m_condition;
    TSCondition(Condition* condition);
    TSCondition* operator->() { return this; }
    operator bool() const { return m_condition != nullptr; }
    bool operator==(TSCondition const& rhs) { return m_condition == rhs.m_condition; }
    uint32 GetSourceType();
    uint32 GetSourceGroup();
    uint32 GetSouceEntry();
    uint32 GetSourceID();
    uint32 GetElseGroup();
    uint32 GetConditionType();
    uint32 GetConditionValue1();
    uint32 GetConditionValue2();
    uint32 GetConditionValue3();
    uint32 GetErrorType();
    uint32 GetErrorTextID();
    uint32 GetReferenceID();
    uint32 GetScriptID();
    uint8 GetConditionTarget();
    bool IsNegativeCondition();
    TSString ToString(bool ext = false);
    bool IsNull();
};

struct ConditionSourceInfo;
struct TC_GAME_API TSConditionSourceInfo
{
    ConditionSourceInfo* m_info;
    TSConditionSourceInfo(ConditionSourceInfo* info);
    TSConditionSourceInfo * operator->() { return this; }
    operator bool() const { return m_info != nullptr; }
    bool operator==(TSConditionSourceInfo const& rhs) {
        return m_info == rhs.m_info;
    }
    TSWorldObject GetTarget(uint32 index);
    TSCondition GetLastFailedCondition();

};

class SmartScript;
class Unit;
class SpellInfo;
struct SmartScriptHolder;
class TC_GAME_API TSSmartScriptValues {
private:
    SmartScriptHolder* m_holder;
    SmartScript * m_script;
    Unit * m_unit;
    uint32 m_var0;
    uint32 m_var1;
    bool m_bvar;
    SpellInfo const* m_spell;
    GameObject* m_gameObject;
    std::vector<WorldObject*>* m_targets;
public:
    TSSmartScriptValues(
          SmartScriptHolder * holder
        , SmartScript* script
        , Unit* unit
        , uint32 var0
        , uint32 var1
        , bool bvar
        , SpellInfo const* spell
        , GameObject* gameObject
        , std::vector<WorldObject*>* targets
    );
    TSSmartScriptValues * operator->() { return this; }

    int32 GetEntryOrGUID();
    uint32 GetSourceType();
    uint32 GetEventID();
    uint32 GetLink();
    uint32 GetEventPhaseMask();
    uint32 GetEventChance();
    uint32 GetEventFlags();

    uint32 GetActionArgument1();
    uint32 GetActionArgument2();
    uint32 GetActionArgument3();
    uint32 GetActionArgument4();
    uint32 GetActionArgument5();
    uint32 GetActionArgument6();

    uint32 GetEventArgument1();
    uint32 GetEventArgument2();
    uint32 GetEventArgument3();
    uint32 GetEventArgument4();
    uint32 GetEventArgument5();

    uint32 GetTargetParam1();
    uint32 GetTargetParam2();
    uint32 GetTargetParam3();
    uint32 GetTargetParam4();

    float GetTargetX();
    float GetTargetY();
    float GetTargetZ();

    uint32 GetTimer();
    uint32 GetPriority();

    TSUnit GetLastInvoker();
    TSArray<TSWorldObject> GetTargets();
    void StoreTargetList(TSArray<TSWorldObject> objects, uint32 id);
    TSArray<TSWorldObject> GetTargetList(uint32 id, TSWorldObject ref);
    void StoreCounter(uint32 id, uint32 value, uint32 reset);
    uint32 GetCounterValue(uint32 id);
    TSUnit GetUnitArg();
    uint32 GetUIntArg1();
    uint32 GetUIntArg2();
    bool GetBoolArg();
    TSSpellInfo GetSpellArg();
    TSGameObject GetGameObjectArg();
    TSWorldObject GetSelf();
};

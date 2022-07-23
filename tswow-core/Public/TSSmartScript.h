#pragma once

#include <functional>
#include <TSBase.h>
#include <TSMain.h>
#include <TSArray.h>

#include <list>
#include <vector>
#include <memory>

#include <sol/sol.hpp>

#define TSWOW_EVENT_OFFSET 300
#define TSWOW_ACTION_OFFSET 300
#define TSWOW_CONDITION_OFFSET 100

class TSUnit;
class TSSpellInfo;
class GameObject;
class TSGameObject;
class WorldObject;

#if TRINITY
typedef std::vector<WorldObject*> TSObjectVector;
#elif AZEROTHCORE
typedef std::list<WorldObject*> TSObjectVector;
#endif

struct Condition;
struct TC_GAME_API TSCondition {
    Condition * m_condition;
    TSCondition(Condition* condition);
    TSCondition* operator->() { return this; }
    operator bool() const { return m_condition != nullptr; }
    bool operator==(TSCondition const& rhs) { return m_condition == rhs.m_condition; }
    TSNumber<uint32> GetSourceType();
    TSNumber<uint32> GetSourceGroup();
    TSNumber<uint32> GetSouceEntry();
    TSNumber<uint32> GetSourceID();
    TSNumber<uint32> GetElseGroup();
    TSNumber<uint32> GetConditionType();
    TSNumber<uint32> GetConditionValue1();
    TSNumber<uint32> GetConditionValue2();
    TSNumber<uint32> GetConditionValue3();
    TSNumber<uint32> GetErrorType();
    TSNumber<uint32> GetErrorTextID();
    TSNumber<uint32> GetReferenceID();
    TSNumber<uint32> GetScriptID();
    TSNumber<uint8> GetConditionTarget();
    bool IsNegativeCondition();
    std::string ToString(bool ext = false);
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
    TSNumber<uint32> m_var0;
    TSNumber<uint32> m_var1;
    bool m_bvar;
    SpellInfo const* m_spell;
    GameObject* m_gameObject;
#if TRINITY
    TSObjectVector* m_targets;
#endif
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
#if TRINITY
        , TSObjectVector* targets
#endif
    );
    TSSmartScriptValues * operator->() { return this; }

    TSNumber<int32> GetEntryOrGUID();
    TSNumber<uint32> GetSourceType();
    TSNumber<uint32> GetEventID();
    TSNumber<uint32> GetLink();
    TSNumber<uint32> GetEventPhaseMask();
    TSNumber<uint32> GetEventChance();
    TSNumber<uint32> GetEventFlags();

    TSNumber<uint32> GetActionArgument1();
    TSNumber<uint32> GetActionArgument2();
    TSNumber<uint32> GetActionArgument3();
    TSNumber<uint32> GetActionArgument4();
    TSNumber<uint32> GetActionArgument5();
    TSNumber<uint32> GetActionArgument6();

    TSNumber<uint32> GetEventArgument1();
    TSNumber<uint32> GetEventArgument2();
    TSNumber<uint32> GetEventArgument3();
    TSNumber<uint32> GetEventArgument4();
    TSNumber<uint32> GetEventArgument5();

    TSNumber<uint32> GetTargetParam1();
    TSNumber<uint32> GetTargetParam2();
    TSNumber<uint32> GetTargetParam3();
    TSNumber<uint32> GetTargetParam4();

    TSNumber<float> GetTargetX();
    TSNumber<float> GetTargetY();
    TSNumber<float> GetTargetZ();

    TSNumber<uint32> GetTimer();
    TSNumber<uint32> GetPriority();

    TSUnit GetLastInvoker();
    TSArray<TSWorldObject> GetTargets();
    void StoreTargetList(TSArray<TSWorldObject> objects, uint32 id);
    TSArray<TSWorldObject> GetTargetList(uint32 id, TSWorldObject ref);
    void StoreCounter(uint32 id, uint32 value, uint32 reset);
    TSNumber<uint32> GetCounterValue(uint32 id);
    TSUnit GetUnitArg();
    TSNumber<uint32> GetUIntArg1();
    TSNumber<uint32> GetUIntArg2();
    bool GetBoolArg();
    TSSpellInfo GetSpellArg();
    TSGameObject GetGameObjectArg();
    TSWorldObject GetSelf();
private:
    TSLua::Array<TSWorldObject> LGetTargets();
    void LStoreTargetList(sol::table objects, uint32 id);
    TSLua::Array<TSWorldObject> LGetTargetList(uint32 id, TSWorldObject ref);
    friend class TSLua;
};

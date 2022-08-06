#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSSmartScript.h"

#include "TSUnit.h"
#include "TSSpellInfo.h"
#include "TSGameObject.h"

void TSLua::load_smartscript_methods(sol::state& state)
{
    auto ts_condition = state.new_usertype<TSCondition>("TSCondition");
    LUA_FIELD(ts_condition, TSCondition, GetSourceType);
    LUA_FIELD(ts_condition, TSCondition, GetSourceGroup);
    LUA_FIELD(ts_condition, TSCondition, GetSouceEntry);
    LUA_FIELD(ts_condition, TSCondition, GetElseGroup);
    LUA_FIELD(ts_condition, TSCondition, GetConditionType);
    LUA_FIELD(ts_condition, TSCondition, GetConditionValue1);
    LUA_FIELD(ts_condition, TSCondition, GetConditionValue2);
    LUA_FIELD(ts_condition, TSCondition, GetConditionValue3);
    LUA_FIELD(ts_condition, TSCondition, GetErrorType);
    LUA_FIELD(ts_condition, TSCondition, GetErrorTextID);
    LUA_FIELD(ts_condition, TSCondition, GetReferenceID);
    LUA_FIELD(ts_condition, TSCondition, GetScriptID);
    LUA_FIELD(ts_condition, TSCondition, GetConditionTarget);
    LUA_FIELD(ts_condition, TSCondition, IsNegativeCondition);
    LUA_FIELD(ts_condition, TSCondition, IsNull);
    LUA_FIELD_OVERLOAD_0_1(ts_condition, TSCondition, ToString, bool);

    auto ts_conditionsourceinfo = state.new_usertype<TSConditionSourceInfo>("TSConditionSourceInfo");
    LUA_FIELD(ts_conditionsourceinfo, TSConditionSourceInfo, GetTarget);
    LUA_FIELD(ts_conditionsourceinfo, TSConditionSourceInfo, GetLastFailedCondition);

    auto ts_smartscriptvalues = state.new_usertype<TSSmartScriptValues>("TSSmartScriptValues");
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEntryOrGUID);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetSourceType);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventID);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetLink);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventPhaseMask);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventChance);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventFlags);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument1);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument2);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument3);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument4);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument5);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetActionArgument6);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument1);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument2);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument3);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument4);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetEventArgument5);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam1);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam2);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetParam3);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetX);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetY);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTargetZ);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetTimer);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetPriority);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetLastInvoker);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, StoreCounter);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetCounterValue);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetUnitArg);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetUIntArg1);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetUIntArg2);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetBoolArg);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetSpellArg);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetGameObjectArg);
    LUA_FIELD(ts_smartscriptvalues, TSSmartScriptValues, GetSelf);
    ts_smartscriptvalues.set_function("GetTargets", &TSSmartScriptValues::LGetTargets);
    ts_smartscriptvalues.set_function("GetTargetList", &TSSmartScriptValues::LGetTargetList);
    ts_smartscriptvalues.set_function("StoreTargetList", &TSSmartScriptValues::LStoreTargetList);
}

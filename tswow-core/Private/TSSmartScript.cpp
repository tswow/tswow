#include "TSSmartScript.h"

#include "ConditionMgr.h"
#include "Unit.h"
#include "GameObject.h"
#include "SpellInfo.h"
#include "SmartScript.h"
#include "SmartScriptMgr.h"
#include "TSUnit.h"
#include "TSSpellInfo.h"
#include "TSGameObject.h"
#include "Object.h"

TSSmartScriptValues::TSSmartScriptValues (
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
)
    : m_holder(holder)
    , m_script(script)
    , m_unit(unit)
    , m_var0(var0)
    , m_var1(var1)
    , m_bvar(bvar)
    , m_spell(spell)
    , m_gameObject(gameObject)
#if TRINITY
    , m_targets(targets)
#endif
{}

TSNumber<int32> TSSmartScriptValues::GetEntryOrGUID()
{
    return m_holder->entryOrGuid;
}
TSNumber<uint32> TSSmartScriptValues::GetSourceType()
{
    return m_holder->source_type;
}
TSNumber<uint32> TSSmartScriptValues::GetEventID()
{
    return m_holder->event_id;
}
TSNumber<uint32> TSSmartScriptValues::GetLink()
{
    return m_holder->link;
}
TSNumber<uint32> TSSmartScriptValues::GetEventPhaseMask()
{
    return m_holder->event.event_phase_mask;
}
TSNumber<uint32> TSSmartScriptValues::GetEventChance()
{
    return m_holder->event.event_chance;
}
TSNumber<uint32> TSSmartScriptValues::GetEventFlags()
{
    return m_holder->event.event_flags;
}
TSNumber<uint32> TSSmartScriptValues::GetActionArgument1()
{
    return m_holder->action.raw.param1;
}

TSNumber<uint32> TSSmartScriptValues::GetActionArgument2()
{
    return m_holder->action.raw.param2;
}

TSNumber<uint32> TSSmartScriptValues::GetActionArgument3()
{
    return m_holder->action.raw.param3;
}

TSNumber<uint32> TSSmartScriptValues::GetActionArgument4()
{
    return m_holder->action.raw.param4;
}

TSNumber<uint32> TSSmartScriptValues::GetActionArgument5()
{
    return m_holder->action.raw.param5;
}

TSNumber<uint32> TSSmartScriptValues::GetActionArgument6()
{
    return m_holder->action.raw.param6;
}

TSNumber<uint32> TSSmartScriptValues::GetEventArgument1()
{
    return m_holder->event.raw.param1;
}

TSNumber<uint32> TSSmartScriptValues::GetEventArgument2()
{
    return m_holder->event.raw.param2;
}

TSNumber<uint32> TSSmartScriptValues::GetEventArgument3()
{
    return m_holder->event.raw.param3;
}

TSNumber<uint32> TSSmartScriptValues::GetEventArgument4()
{
    return m_holder->event.raw.param4;
}

TSNumber<uint32> TSSmartScriptValues::GetEventArgument5()
{
    return m_holder->event.raw.param5;
}

TSNumber<uint32> TSSmartScriptValues::GetTargetParam1()
{
    return m_holder->target.raw.param1;
}

TSNumber<uint32> TSSmartScriptValues::GetTargetParam2()
{
    return m_holder->target.raw.param2;
}

TSNumber<uint32> TSSmartScriptValues::GetTargetParam3()
{
    return m_holder->target.raw.param3;
}
TSNumber<uint32> TSSmartScriptValues::GetTargetParam4()
{
    return m_holder->target.raw.param4;
}

TSNumber<float> TSSmartScriptValues::GetTargetX()
{
    return m_holder->target.x;
}
TSNumber<float> TSSmartScriptValues::GetTargetY()
{
    return m_holder->target.y;
}
TSNumber<float> TSSmartScriptValues::GetTargetZ()
{
    return m_holder->target.z;
}

TSNumber<uint32> TSSmartScriptValues::GetTimer()
{
    return m_holder->timer;
}
TSNumber<uint32> TSSmartScriptValues::GetPriority()
{
#if TRINITY
    return m_holder->priority;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSSmartScriptValues::GetPriority not implemented for AzerothCore");
    return 0;
#endif
}

TSUnit TSSmartScriptValues::GetLastInvoker()
{
    return TSUnit(m_unit);
}

TSArray<TSWorldObject> TSSmartScriptValues::GetTargets()
{
#if TRINITY
    if (!m_targets)
    {
        return TSArray<TSWorldObject>();
    }

    TSArray<TSWorldObject> out(m_targets->size());
    for (size_t i = 0; i < m_targets->size(); ++i)
    {
        out[i] = TSWorldObject((*m_targets)[i]);
    }
    return out;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSSmartScriptValues::GetTargets not implemented for AzerothCore");
    return TSArray<TSWorldObject>();
    /*
    size_t i = 0;
    for (WorldObject const* obj : *m_targets)
    {
        out[i++] = TSWorldObject(const_cast<WorldObject*>(obj));
    }
    */
#endif
}

void TSSmartScriptValues::StoreTargetList(TSArray<TSWorldObject> objects, uint32 id)
{
    TSObjectVector* objectsOut = new TSObjectVector(objects.get_length());
    for (size_t i = 0; i < objects.get_length(); ++i)
    {
        objectsOut->push_back(objects[i].obj);
    }
#if TRINITY
    m_script->StoreTargetList(*objectsOut, id);
#elif AZEROTHCORE
    m_script->StoreTargetList(objectsOut, id);
#endif
}

TSArray<TSWorldObject> TSSmartScriptValues::GetTargetList(uint32 id, TSWorldObject ref)
{
#if TRINITY
    TSObjectVector const* vec = m_script->GetStoredTargetVector(id, *ref.obj);
    TSArray<TSWorldObject> out(vec->size());
    for (int i = 0; i < vec->size(); ++i) {
        out[i] = TSWorldObject((*vec)[i]);
    }
    return out;
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api","TSSmartScriptValues::GetTargetList not implemented for AzerothCore");
    return TSArray<TSWorldObject>();
#endif
}

void TSSmartScriptValues::StoreCounter(uint32 id, uint32 value, uint32 reset)
{
#if TRINITY
    m_script->StoreCounter(id, value, reset);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSSmartScriptValues::StoreCounter not implemented for AzerothCore");
#endif
}

TSNumber<uint32> TSSmartScriptValues::GetCounterValue(uint32 id)
{
    return m_script->GetCounterValue(id);
}

TSUnit TSSmartScriptValues::GetUnitArg()
{
    return TSUnit(m_unit);
}

TSNumber<uint32> TSSmartScriptValues::GetUIntArg1()
{
    return m_var0;
}

TSNumber<uint32> TSSmartScriptValues::GetUIntArg2()
{
    return m_var1;
}

bool TSSmartScriptValues::GetBoolArg()
{
    return m_bvar;
}

TSSpellInfo TSSmartScriptValues::GetSpellArg()
{
    return TSSpellInfo(m_spell);
}

TSGameObject TSSmartScriptValues::GetGameObjectArg()
{
    return TSGameObject(m_gameObject);
}

TSWorldObject TSSmartScriptValues::GetSelf()
{
#if TRINITY
    return TSWorldObject(m_script->GetBaseObjectOrPlayerTrigger());
#elif AZEROTHCORE
    return TSWorldObject(m_script->GetBaseObject());
#endif
}

TSCondition::TSCondition(Condition* condition)
    : m_condition(condition)
{}

TSNumber<uint32> TSCondition::GetSourceType()
{
    return m_condition->SourceType;
}

TSNumber<uint32> TSCondition::GetSourceGroup()
{
    return m_condition->SourceGroup;
}

TSNumber<uint32> TSCondition::GetSouceEntry()
{
    return m_condition->SourceEntry;
}

TSNumber<uint32> TSCondition::GetSourceID()
{
    return m_condition->SourceId;
}

TSNumber<uint32> TSCondition::GetElseGroup()
{
    return m_condition->ElseGroup;
}

TSNumber<uint32> TSCondition::GetConditionType()
{
    return m_condition->ConditionType;
}

TSNumber<uint32> TSCondition::GetConditionValue1()
{
    return m_condition->ConditionValue1;
}

TSNumber<uint32> TSCondition::GetConditionValue2()
{
    return m_condition->ConditionValue2;
}

TSNumber<uint32> TSCondition::GetConditionValue3()
{
    return m_condition->ConditionValue3;
}

TSNumber<uint32> TSCondition::GetErrorType()
{
    return m_condition->ErrorType;
}

TSNumber<uint32> TSCondition::GetErrorTextID()
{
    return m_condition->ErrorTextId;
}

TSNumber<uint32> TSCondition::GetReferenceID()
{
    return m_condition->ReferenceId;
}

TSNumber<uint32> TSCondition::GetScriptID()
{
    return m_condition->ScriptId;
}

TSNumber<uint8> TSCondition::GetConditionTarget()
{
    return m_condition->ConditionTarget;
}

bool TSCondition::IsNegativeCondition()
{
    return m_condition->NegativeCondition;
}

std::string TSCondition::ToString(bool ext)
{
#if TRINITY
    return m_condition->ToString();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSCondition::ToString not implemented for AzerothCore");
    return "";
#endif
}

bool TSCondition::IsNull()
{
    return m_condition == nullptr;
}

TSConditionSourceInfo::TSConditionSourceInfo(ConditionSourceInfo * info)
    : m_info(info)
{}

TSWorldObject TSConditionSourceInfo::GetTarget(uint32 index)
{
    return m_info->mConditionTargets[index];
}

TSCondition TSConditionSourceInfo::GetLastFailedCondition()
{
    return TSCondition(const_cast<Condition*>(m_info->mLastFailedCondition));
}

TSLua::Array<TSWorldObject> TSSmartScriptValues::LGetTargets()
{
    return sol::as_table(*GetTargets().vec);
}
void TSSmartScriptValues::LStoreTargetList(sol::table objects, uint32 id)
{
    TSArray<TSWorldObject> tsobjects;
    for (auto & value : objects)
    {
        tsobjects.push(value.second.as<TSWorldObject>());
    }
    StoreTargetList(tsobjects, id);
}

TSLua::Array<TSWorldObject> TSSmartScriptValues::LGetTargetList(uint32 id, TSWorldObject ref)
{
    return sol::as_table(*GetTargetList(id, ref).vec);
}


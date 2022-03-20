#include "TSLua.h"
#include "TSQuest.h"

void TSLuaState::load_quest_methods(uint32_t modid)
{
    auto ts_quest = new_usertype<TSQuest>("TSQuest");
    LUA_FIELD(ts_quest, TSQuest, HasFlag);
    LUA_FIELD(ts_quest, TSQuest, IsDaily);
    LUA_FIELD(ts_quest, TSQuest, IsRepeatable);
    LUA_FIELD(ts_quest, TSQuest, GetID);
    LUA_FIELD(ts_quest, TSQuest, GetLevel);
    LUA_FIELD(ts_quest, TSQuest, GetMinLevel);
    LUA_FIELD(ts_quest, TSQuest, GetNextQuestID);
    LUA_FIELD(ts_quest, TSQuest, GetPrevQuestID);
    LUA_FIELD(ts_quest, TSQuest, GetNextQuestInChain);
    LUA_FIELD(ts_quest, TSQuest, GetFlags);
    LUA_FIELD(ts_quest, TSQuest, GetType);
}

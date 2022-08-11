#include "TSLua.h"
#include "TSLuaVarargs.h"
#include "TSMainThreadContext.h"

void TSLua::load_main_thread_context_methods(sol::state& state)
{
    auto main_thread_context = state.new_usertype<TSMainThreadContext>("TSMainThreadContext");

    main_thread_context.set_function("GetPlayer", sol::overload(
        [](TSMainThreadContext& ctx, uint64_t guid) { return  ctx.GetPlayer(guid); },
        [](TSMainThreadContext& ctx, std::string const& name) { return  ctx.GetPlayer(name); }
    ));
    
    LUA_FIELD_OVERLOAD_RET_1_1(main_thread_context, TSMainThreadContext, GetMap, uint32_t, uint32_t);
    main_thread_context.set_function("GetAllPlayers", &TSMainThreadContext::LGetAllPlayers);
}

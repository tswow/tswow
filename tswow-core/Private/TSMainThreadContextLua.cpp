#include "TSLua.h"
#include "TSMainThreadContext.h"

void TSLua::load_main_thread_context_methods(sol::state& state)
{
    auto main_thread_context = state.new_usertype<TSMainThreadContext>("TSMainThreadContext");
    main_thread_context.set_function("GetPlayer", sol::overload(
        &TSMainThreadContext::LGetPlayer0,
        &TSMainThreadContext::LGetPlayer1
    ));
    main_thread_context.set_function("GetMap", sol::overload(
        &TSMainThreadContext::LGetMap0,
        &TSMainThreadContext::LGetMap1
    ));
    main_thread_context.set_function("GetAllPlayers", &TSMainThreadContext::LGetAllPlayers);
}

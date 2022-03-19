#pragma once

#include "TSPlayer.h"
#include "TSLua.h"

#include <vector>
#include <map>
#include <sol/sol.hpp>

class TSEventHandle;

// Contains a single callback function
template <class TSCallback>
class TSEventEntry {
public:
		TSEventHandle* handle;
		TSCallback callback;
		sol::protected_function lua_callback;

		TSEventEntry(TSEventHandle* handle, TSCallback callback)
		{
				this->handle = handle;
				this->callback = callback;
		}

		TSEventEntry(TSEventHandle* handle, sol::protected_function lua_callback)
		{
				this->handle = handle;
				this->lua_callback = lua_callback;
				this->callback = nullptr;
		}
};

// Contains all callback functions for a single global event type.
template <class TSCallback>
class TSEvent
{
		std::vector<TSEventEntry<TSCallback>> callbacks;
		size_t size = 0;
public:
		TSEventHandle* Add(TSCallback callback);
		TSEventHandle* Add(sol::protected_function callback);
		void Remove(size_t index);
		size_t GetSize() { return callbacks.size(); }
		TSEventEntry<TSCallback> Get(size_t index) { return callbacks[index]; }
};

// A handle to a TSEvent index that can remove itself
// please for the love of god remove this monstrosity.
class TSEventHandle
{
public:
		size_t index;
		TSEvent<void*>* evt;
		TSEventHandle(TSEvent<void*>* evt, size_t index)
		{
				this->evt = evt;
				this->index = index;
		}

		void Remove()
		{
				this->evt->Remove(this->index);
		}
};

template <class TSCallback>
TSEventHandle* TSEvent<TSCallback>::Add(TSCallback callback)
{
		TSEvent<void*>* vd = (TSEvent<void*>*) this;
		TSEventHandle* handle = new TSEventHandle(vd, callbacks.size());
		callbacks.push_back(TSEventEntry<TSCallback>(handle, callback));
		return handle;
}

template <class TSCallback>
TSEventHandle* TSEvent<TSCallback>::Add(sol::protected_function callback)
{
		TSEvent<void*>* vd = (TSEvent<void*>*) this;
		TSEventHandle* handle = new TSEventHandle(vd, callbacks.size());
		callbacks.push_back(TSEventEntry<TSCallback>(handle, callback));
		return handle;
}

template <class TSCallback>
void TSEvent<TSCallback>::Remove(size_t index)
{
		callbacks.erase(callbacks.begin() + index);
		for (size_t i = index; i < callbacks.size(); ++i)
		{
				callbacks[i].handle->index--;
		}
}

// entity id <-> special container for TSEvents
template <typename T>
class TSEventMap {
		std::map<uint32_t, T> map;
public:
		void Remove(uint32_t key)
		{
				OnRemove(key);
				map.erase(key);
		}

		virtual void OnAdd(uint32_t key, T* value) = 0;
		virtual void OnRemove(uint32_t key) = 0;

		T* Get(uint32_t key)
		{
				typename std::map<uint32_t, T>::iterator it = map.find(key);
				if (it != map.end())
				{
						return &it->second;
				}
				else
				{
						T t = T();
						map[key] = t;
						T* v = &map[key];
						OnAdd(key, v);
						return v;
				}
		}
};

struct TSEventStore;
class EventHandler {
protected:
		std::vector<TSEventHandle*> handles;
		void Add(TSEventHandle* listener) { handles.push_back(listener); }
		TSEventStore* events = nullptr;
public:
		void LoadEvents(TSEventStore* events)
		{
				this->events = events;
		}

		void Unload() {
				for (TSEventHandle* g : handles)
				{
						g->Remove();
						free(g);
				}
				handles.clear();
		}
};

template <typename T>
class MappedEventHandler
{
protected:
		std::vector<TSEventHandle*> handles;
		void Add(TSEventHandle* listener) { handles.push_back(listener); }
		T* eventMap = nullptr;
public:
		void LoadEvents(T* eventMap)
		{
				this->eventMap = eventMap;
		}

		void Unload()
		{
				for (TSEventHandle* g : handles)
				{
						g->Remove();
						free(g);
				}
				handles.clear();
		}
};

TC_GAME_API uint32_t GetReloads(uint32_t modid);

/** Network Messages */
template <typename T>
struct MessageHandle {
		std::function<std::shared_ptr<void>(uint8_t*)> constructor;
		std::vector < void(*)(TSPlayer, std::shared_ptr<T>)> listeners;
		uint8_t size = 0;
		bool enabled = false;

		MessageHandle() {}
		MessageHandle(uint8_t size, std::function<std::shared_ptr<void>(uint8_t*)> constructor)
		{
				this->constructor = constructor;
				this->size = size;
				this->enabled = true;
		}

		void fire(TSPlayer player, uint8_t* data)
		{
				auto g = std::static_pointer_cast<T>(constructor(data));
				for (auto& func : listeners)
				{
						func(player, g);
				}
		}
};

TC_GAME_API void RegisterMessage(uint32_t modid, uint16_t opcode, uint8_t size, std::function<std::shared_ptr<void>(uint8_t*)> constructor);

TC_GAME_API MessageHandle<void>* GetMessage(uint16_t opcode);

TC_GAME_API void AddMessageListener(uint16_t opcode, void(*func)(TSPlayer, std::shared_ptr<void>));

#define EVENT_TYPE(name,...) typedef void (*name##__Type)(__VA_ARGS__);
#define EVENT(name,...) TSEvent<name##__Type> name;

#define EVENT_HANDLE(category,name)\
    void name(category##name##__Type cb)\
    {\
        Add(this->events->category##name.Add(cb));\
    }\
		\
		void name##__lua(sol::protected_function fn)\
		{\
				Add(this->events->category##name.Add(fn));\
		}\

#define EVENT_HANDLE_FN(category,name,fn)\
    void name(category##name##__Type cb)\
    {\
        Add(this->events->category##name.Add(cb));\
        fn(cb,std::numeric_limits<uint32_t>::max());\
    }\
    void name##__lua(category##name##__Type cb)\
    {\
        Add(this->events->category##name.Add(cb));\
    }\

#define MAP_EVENT_HANDLE(category,name)\
    void name(uint32_t id, category##name##__Type cb)\
    {\
        Add(this->eventMap->Get(id)->category##name.Add(cb));\
    }\
    \
    void name(TSArray<uint32_t> ids, category##name##__Type cb)\
    {\
        for(uint32_t id : ids)\
        {\
            name(id,cb);\
        }\
    }\
		\
		void name##__lua(sol::object obj, sol::protected_function cb)\
		{\
				switch(obj.get_type())\
				{\
						case sol::type::number:\
								Add(eventMap->Get(obj.as<uint32_t>())->category##name.Add(cb));\
								break;\
						case sol::type::table:\
								sol::table table = obj.as<sol::table>();\
								for(size_t i = 1; i <= table.size(); ++i)\
								{\
										Add(eventMap->Get((uint32_t)table.get<double>(i))->category##name.Add(cb));\
								}\
								break;\
				}\
		}\

#define MAP_EVENT_HANDLE_FN(category,name,fn)\
    void name(uint32 id, category##name##__Type cb)\
    {\
        Add(this->eventMap->Get(id)->category##name.Add(cb));\
        fn(cb,id);\
    }\
    \
    void name(TSArray<uint32> ids, category##name##__Type cb)\
    {\
        for (uint32 id : ids)\
        {\
            name(id, cb);\
        }\
    }\
		void name##__lua(sol::object obj, sol::protected_function cb)\
		{\
				switch(obj.get_type())\
				{\
						case sol::type::number:\
								Add(eventMap->Get(obj.as<uint32_t>())->category##name.Add(cb));\
								fn##__lua(cb,obj.as<uint32_t>());\
								break;\
						case sol::type::table:\
								sol::table table = obj.as<sol::table>();\
								for(size_t i = 1; i <= table.size(); ++i)\
								{\
										Add(eventMap->Get((uint32_t)table.get<double>(i))->category##name.Add(cb));\
										fn##__lua(cb,uint32_t(table.get<double>(i)));\
								}\
								break;\
				}\
		}\

#define FIRE(name,...)\
    {\
        for(size_t __fire_i=0;__fire_i< GetTSEvents()->name.GetSize(); ++__fire_i)\
        {\
						auto val = GetTSEvents()->name.Get(__fire_i);\
						if(val.callback) \
						{\
								val.callback(__VA_ARGS__);\
						}\
						else\
						{\
								TSLuaState::handle_error(val.lua_callback(__VA_ARGS__));\
						}\
        }\
    }

#define FIRE_SPLIT(name,normal,lua)\
    {\
        for(size_t __fire_i=0;__fire_i< GetTSEvents()->name.GetSize(); ++__fire_i)\
        {\
						auto val = GetTSEvents()->name.Get(__fire_i);\
						if(val.callback) \
						{\
								val.callback##normal;\
						}\
						else\
						{\
								TSLuaState::handle_error(val.lua_callback##lua);\
						}\
        }\
    }

#define FIRE_MAP(obj,name,...)\
    FIRE(name,__VA_ARGS__);\
    if(obj)\
    {\
        for(size_t __fire_i=0;__fire_i< obj->name.GetSize(); ++__fire_i)\
        {\
						auto val = obj->name.Get(__fire_i);\
						if(val.callback) \
						{\
								val.callback(__VA_ARGS__);\
						}\
						else\
						{\
								TSLuaState::handle_error(val.lua_callback(__VA_ARGS__)); \
						}\
        }\
    }\

#define FIRE_MAP_SPLIT(obj,name,normal,lua)\
    FIRE_SPLIT(name,normal,lua);\
    if(obj)\
    {\
        for(size_t __fire_i=0;__fire_i< obj->name.GetSize(); ++__fire_i)\
        {\
						auto val = obj->name.Get(__fire_i);\
						if(val.callback) \
						{\
								val.callback(normal);\
						}\
						else\
						{\
								TSLuaState::handle_error(val.lua_callback(lua)); \
						}\
        }\
    }\

#define const_(a) a

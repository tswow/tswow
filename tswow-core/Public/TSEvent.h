/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020-2022 tswow <https://github.com/tswow/>
 *
 * This program is free software: you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */
#pragma once

#include <vector>

#include "sol/sol.hpp"
#include "TSLua.h"

template <class C>
struct TSEvent;

void ts_clear_events();
void __ts_add_event(TSEvent<void*>* evt);

template <class C>
struct TSEvent
{
		TSEvent()
		{
				__ts_add_event((TSEvent<void*>*)this);
		}

		using cxx_callbacks = std::vector<C>;
		using lua_callbacks = std::vector<sol::protected_function>;
		using cxx_id_callbacks = std::vector<cxx_callbacks>;
		using lua_id_callbacks = std::vector<lua_callbacks>;
		cxx_callbacks m_cxx_callbacks;
		lua_callbacks m_lua_callbacks;
		cxx_id_callbacks m_id_cxx_callbacks;
		lua_id_callbacks m_id_lua_callbacks;

		bool has_non_id_entries()
		{
				return m_cxx_callbacks.size() > 0 || m_lua_callbacks.size() > 0;
		}

		void clear()
		{
				m_cxx_callbacks.clear();
				m_lua_callbacks.clear();
				for (cxx_callbacks& cb : m_id_cxx_callbacks)
				{
						cb.clear();
				}
				for (lua_callbacks& cb : m_id_lua_callbacks)
				{
						cb.clear();
				}
		}
};

class TSMappedEvents
{
protected:
		virtual uint32_t get_registry_id(uint32_t id) = 0;
};

class TSMappedEventsDirect : public TSMappedEvents
{
protected:
		uint32_t get_registry_id(uint32_t id) final override
		{
				return id;
		}
};

struct TSRegistryRef
{
		uint32_t id = UINT32_MAX;
};

class TSMappedEventsRegistry : public TSMappedEvents
{
protected:
		virtual TSRegistryRef& get_registry_ref(uint32_t id) = 0;
		uint32_t get_registry_id(uint32_t id) final override
		{
				TSRegistryRef& ref = get_registry_ref(id);
				if (ref.id == UINT32_MAX)
				{
						ref.id = m_cur_id++;
				}
				return ref.id;
		}
private:
		uint32_t m_cur_id = 0;
};

#define EVENT_ROOT(name,is_fn,fn_cxx,fn_lua,...) \
		typedef void (*name##__type)(__VA_ARGS__);\
		TSEvent<name##__type> name##_callbacks;\
		void name(name##__type cb) {\
				name##_callbacks.m_cxx_callbacks.push_back(cb);\
				if(is_fn) fn_cxx(cb);\
		}\
		void L##name(sol::protected_function cb)\
		{\
				name##_callbacks.m_lua_callbacks.push_back(cb);\
				if(is_fn) fn_lua(cb);\
		}\

#define ID_EVENT_ROOT(name,is_fn,fn_plain_cxx,fn_plain_lua,fn_mapped_cxx,fn_mapped_lua,...)\
		EVENT_ROOT(name,is_fn,fn_plain_cxx,fn_plain_lua,__VA_ARGS__)\
		void name(uint32_t id, name##__type cb)\
		{\
				uint32_t reg_id = get_registry_id(id);\
				auto & cbs = name##_callbacks.m_id_cxx_callbacks;\
				if(reg_id >= cbs.size())\
				{\
						cbs.resize(uint64_t(reg_id) + 1);\
				}\
				cbs[reg_id].push_back(cb);\
				if (is_fn) fn_mapped_cxx(cb,id);\
		}\
		void name(TSArray<uint32_t> ids, name##__type cb) {\
				for(uint32_t id : ids)\
				{\
						name(id, cb);\
				}\
		}\
		void _L##name(uint32_t id, sol::protected_function cb)\
		{\
				uint32_t reg_id = get_registry_id(id);\
				auto& cbs = name##_callbacks.m_id_lua_callbacks;\
				if(reg_id >= cbs.size())\
				{\
						cbs.resize(uint64_t(reg_id) + 1);\
				}\
				cbs[reg_id].push_back(cb);\
				if (is_fn) fn_mapped_lua(cb,id);\
		}\
		void Lid##name(sol::object obj, sol::protected_function cb)\
		{\
				switch(obj.get_type())\
				{\
						case sol::type::number:\
								_L##name(obj.as<uint32_t>(), cb);\
								break;\
						case sol::type::table:\
								sol::table table = obj.as<sol::table>();\
								for(size_t i = 1; i <= table.size(); ++i)\
								{\
										_L##name((uint32_t)table.get<double>(i), cb);\
								}\
								break;\
				}\
		}\

#define EVENT_FN(name,fn,...)\
		EVENT_ROOT(name,true,fn,fn,__VA_ARGS__)

#define ID_EVENT_FN(name,fn,...)\
		ID_EVENT_ROOT(name,true,fn,fn,fn,fn,__VA_ARGS__)

#define EVENT(name,...)\
		EVENT_ROOT(name,false,[](name##__type){},[](sol::protected_function){},__VA_ARGS__)

#define ID_EVENT(name,...)\
		ID_EVENT_ROOT(name,false,[](name##__type){},[](sol::protected_function){},[](name##__type,uint32_t){},[](sol::protected_function,uint32_t){},__VA_ARGS__);

#define FIRE(category,name,...)\
		{\
				for(auto cb : ts_events.category.name##_callbacks.m_cxx_callbacks)\
				{\
						cb(__VA_ARGS__);\
				}\
				\
				for(auto cb : ts_events.category.name##_callbacks.m_lua_callbacks)\
				{\
						TSLua::handle_error(cb(__VA_ARGS__));\
				}\
		}\

#define FIRE_ID(ref,category,name,...)\
		{\
				FIRE(category,name,__VA_ARGS__)\
				auto cxx_cbs = ts_events.category.name##_callbacks.m_id_cxx_callbacks;\
				if(ref < cxx_cbs.size())\
				{\
						for(auto cb: cxx_cbs[ref])\
						{\
								cb(__VA_ARGS__);\
						}\
				}\
				auto lua_cbs = ts_events.category.name##_callbacks.m_id_lua_callbacks;\
				if(ref < lua_cbs.size())\
				{\
						for(auto cb: lua_cbs[ref])\
						{\
								try\
								{\
										TSLua::handle_error(cb(__VA_ARGS__));\
								}\
								catch (std::exception const& e)\
								{\
										std::cerr << e.what() << "\n";\
								}\
								catch (...)\
								{\
										std::cerr << "Unknown Lua error\n";\
								}\
						}\
				}\
		}

#define EVENTS_HEADER(type)\
		type* operator->() { return this; }

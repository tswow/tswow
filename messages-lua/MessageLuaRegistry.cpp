#include "MessageLuaRegistry.h"
#include "MessageStore.h"

#include "messages.lua.h"

#include "MessageWrite.h"
#include "MessageRead.h"

extern "C" {
	#include "lua.h"
	#include "lualib.h"
	#include "lauxlib.h"
}

int MakeWriteMessageL(lua_State* L)
{
	uint32_t size = uint32_t(luaL_checknumber(L, 1));
	lua_pushnumber(L, MakeWriteMessage(size));
	return 1;
}

#define write_num(type,fn)                        \
	GetWriteMessage(size_t(luaL_checknumber(L,1)))  \
		->##fn##(type(luaL_checknumber(L,2)));        \
	return 0

// todo: accept custom default value
#define read_num(type,fn)                         \
	lua_pushnumber(L,lua_Number(                    \
		GetReadMessage(size_t(luaL_checknumber(L,1))) \
			->##fn##())                                 \
	);                                              \
	return 1

extern "C" {
	int DestroyReadMessageL(lua_State* L)
	{
		DestroyReadMessage(size_t(luaL_checknumber(L, 1)));
		return 0;
	}

	int DestroyWriteMessageL(lua_State* L)
	{
		DestroyWriteMessage(size_t(luaL_checknumber(L, 1)));
		return 0;
	}

	int WriteUInt8(lua_State* L) { write_num(uint8_t, WriteUInt8); }
	int WriteInt8(lua_State* L) { write_num(int8_t, WriteInt8); }

	int WriteUInt16(lua_State* L) { write_num(uint16_t, WriteUInt16); }
	int WriteInt16(lua_State* L) { write_num(int16_t, WriteInt16); }

	int WriteUInt32(lua_State* L) { write_num(uint32_t, WriteUInt32); }
	int WriteInt32(lua_State* L) { write_num(int32_t, WriteInt32); }

	int WriteUInt64(lua_State* L) { write_num(uint64_t, WriteUInt64); }
	int WriteInt64(lua_State* L) { write_num(int64_t, WriteInt64); }

	int WriteFloat(lua_State* L) { write_num(float, WriteFloat); }
	int WriteDouble(lua_State* L) { write_num(double, WriteDouble); }

	int WriteString(lua_State* L)
	{
		GetWriteMessage(size_t(luaL_checknumber(L, 1)))
			->WriteString(luaL_checkstring(L, 2));
		return 0;
	}
	int WriteStringNullTerm(lua_State* L)
	{
		GetWriteMessage(size_t(luaL_checknumber(L, 1)))
			->WriteStringNullTerm(luaL_checkstring(L, 2));
		return 0;
	}

	int ReadUInt8(lua_State* L) { read_num(uint8_t, ReadUInt8); }
	int ReadInt8(lua_State* L) { read_num(int8_t, ReadInt8); };

	int ReadUInt16(lua_State* L) { read_num(uint16_t, ReadUInt16); };
	int ReadInt16(lua_State* L) { read_num(int16_t, ReadInt16); };

	int ReadUInt32(lua_State* L) { read_num(uint32_t, ReadUInt32); };
	int ReadInt32(lua_State* L) { read_num(int32_t, ReadInt32); };

	int ReadUInt64(lua_State* L) { read_num(uint64_t, ReadUInt64); };
	int ReadInt64(lua_State* L) { read_num(int64_t, ReadInt64); };

	int ReadFloat(lua_State* L) { read_num(float, ReadFloat); };
	int ReadDouble(lua_State* L) { read_num(double, ReadDouble); };

	int ReadString(lua_State* L)
	{
		std::string str = GetReadMessage(write_msg_ptr(luaL_checknumber(L, 1)))->ReadString();
		lua_pushstring(L, str.c_str());
		return 1;
	}
}

void RegisterMessagePolyfill(std::function<void(const char*)> callback) {
	callback(MESSAGES_LUA);
}

void RegisterMessages(std::function<void(const char*, lua_CFunction)> callback)
{
	callback("MakeWriteMessage", MakeWriteMessageL);
	callback("DestroyWriteMessage", DestroyWriteMessageL);

	callback("WriteUInt8", WriteUInt8);
	callback("WriteInt8", WriteInt8);

	callback("WriteUInt16", WriteUInt16);
	callback("WriteInt16", WriteInt16);

	callback("WriteUInt32", WriteUInt32);
	callback("WriteInt32", WriteInt32);

	callback("WriteUInt64", WriteUInt64);
	callback("WriteInt64", WriteInt64);

	callback("WriteFloat", WriteFloat);
	callback("WriteDouble", WriteDouble);

	callback("WriteString", WriteString);
	callback("WriteStringNullTerm", WriteStringNullTerm);

	callback("ReadUInt8", ReadUInt8);
	callback("ReadInt8", ReadInt8);

	callback("ReadUInt16", ReadUInt16);
	callback("ReadInt16", ReadInt16);

	callback("ReadUInt32", ReadUInt32);
	callback("ReadInt32", ReadInt32);

	callback("ReadUInt64", ReadUInt64);
	callback("ReadInt64", ReadInt64);

	callback("ReadFloat", ReadFloat);
	callback("ReadDouble", ReadDouble);
}

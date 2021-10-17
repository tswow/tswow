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
		GetRead()                                     \
			->##fn##())                                 \
	);                                              \
	return 1

extern "C" {
	int DestroyWriteMessageL(lua_State* L)
	{
		DestroyWriteMessage(size_t(luaL_checknumber(L, 1)));
		return 0;
	}

	int _WriteUInt8(lua_State* L) { write_num(uint8_t, WriteUInt8); }
	int _WriteInt8(lua_State* L) { write_num(int8_t, WriteInt8); }

	int _WriteUInt16(lua_State* L) { write_num(uint16_t, WriteUInt16); }
	int _WriteInt16(lua_State* L) { write_num(int16_t, WriteInt16); }

	int _WriteUInt32(lua_State* L) { write_num(uint32_t, WriteUInt32); }
	int _WriteInt32(lua_State* L) { write_num(int32_t, WriteInt32); }

	int _WriteUInt64(lua_State* L) { write_num(uint64_t, WriteUInt64); }
	int _WriteInt64(lua_State* L) { write_num(int64_t, WriteInt64); }

	int _WriteFloat(lua_State* L) { write_num(float, WriteFloat); }
	int _WriteDouble(lua_State* L) { write_num(double, WriteDouble); }

	int _WriteString(lua_State* L)
	{
		GetWriteMessage(size_t(luaL_checknumber(L, 1)))
			->WriteString(luaL_checkstring(L, 2));
		return 0;
	}
	int _WriteStringNullTerm(lua_State* L)
	{
		GetWriteMessage(size_t(luaL_checknumber(L, 1)))
			->WriteStringNullTerm(luaL_checkstring(L, 2));
		return 0;
	}

	int _ReadUInt8(lua_State* L) { read_num(uint8_t, ReadUInt8); }
	int _ReadInt8(lua_State* L) { read_num(int8_t, ReadInt8); };

	int _ReadUInt16(lua_State* L) { read_num(uint16_t, ReadUInt16); };
	int _ReadInt16(lua_State* L) { read_num(int16_t, ReadInt16); };

	int _ReadUInt32(lua_State* L) { read_num(uint32_t, ReadUInt32); };
	int _ReadInt32(lua_State* L) { read_num(int32_t, ReadInt32); };

	int _ReadUInt64(lua_State* L) { read_num(uint64_t, ReadUInt64); };
	int _ReadInt64(lua_State* L) { read_num(int64_t, ReadInt64); };

	int _ReadFloat(lua_State* L) { read_num(float, ReadFloat); };
	int _ReadDouble(lua_State* L) { read_num(double, ReadDouble); };

	int _ReadString(lua_State* L)
	{
		std::string str = GetRead()->ReadString();
		lua_pushstring(L, str.c_str());
		return 1;
	}
}

void RegisterMessagePolyfill(std::function<void(const char*)> callback)
{
	callback(MESSAGES_LUA);
}

void RegisterMessages(std::function<void(const char*, lua_CFunction)> callback)
{
	callback("MakeWriteMessage", MakeWriteMessageL);
	callback("DestroyWriteMessage", DestroyWriteMessageL);

	callback("_WriteUInt8", _WriteUInt8);
	callback("_WriteInt8", _WriteInt8);

	callback("_WriteUInt16", _WriteUInt16);
	callback("_WriteInt16", _WriteInt16);

	callback("_WriteUInt32", _WriteUInt32);
	callback("_WriteInt32", _WriteInt32);

	callback("_WriteUInt64", _WriteUInt64);
	callback("_WriteInt64", _WriteInt64);

	callback("_WriteFloat", _WriteFloat);
	callback("_WriteDouble", _WriteDouble);

	callback("_WriteString", _WriteString);
	callback("_WriteStringNullTerm", _WriteStringNullTerm);

	callback("_ReadUInt8", _ReadUInt8);
	callback("_ReadInt8", _ReadInt8);

	callback("_ReadUInt16", _ReadUInt16);
	callback("_ReadInt16", _ReadInt16);

	callback("_ReadUInt32", _ReadUInt32);
	callback("_ReadInt32", _ReadInt32);

	callback("_ReadUInt64", _ReadUInt64);
	callback("_ReadInt64", _ReadInt64);

	callback("_ReadFloat", _ReadFloat);
	callback("_ReadDouble", _ReadDouble);
}

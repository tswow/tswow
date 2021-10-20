#include "ClientNetwork.h"

#include "CustomPacketBuffer.h"
#include "Logger.h"
#include "ClientLua.h"

#include "CustomPacketDefines.h"

#include <map>
#include <sstream>

// note: most of the mess here is because I didn't
// figure out how to register userdata yet

class ClientMessageWrite : public CustomPacketWrite
{
public:
	ClientMessageWrite()
		: CustomPacketWrite(0, MAX_FRAGMENT_SIZE,0)
	{}
	ClientMessageWrite(PACKET_OPCODE_TYPE opcode, size_t size)
		: CustomPacketWrite(opcode, MAX_FRAGMENT_SIZE,size)
	{}

	void Send()
	{
		std::stringstream str;
		PrintBytes(str);
		LOG_DEBUG << "Sending message:" << str.str();
		if (!IsPersistent())
		{
			Destroy();
		}
	}
};

template <typename T>
class MessageRegistry {
	// if you store 4 billion messages at once you'll have other problems
	uint32_t m_cur = 0;
public:
	std::map<uint32_t, T> m_map;
	uint32_t freeId()
	{
		while (m_map.find(m_cur) != m_map.end())
		{
			++m_cur;
		}
		return m_cur;
	}

	uint32_t add(T& value, T** ptr)
	{
		*ptr = &(m_map[freeId()] = value);
		return m_cur++;
	}

	T* get(uint32_t id)
	{
		auto itr = m_map.find(id);
		if (itr == m_map.end())
		{
			return nullptr;
		}
		return &itr->second;
	}
};

MessageRegistry<ClientMessageWrite> writes;
MessageRegistry<CustomPacketRead> reads;

class ClientMessageBuffer : public CustomPacketBuffer {
	virtual void OnPacket(CustomPacketRead* value) override final
	{
		uint32_t msg = reads.add(*value,&value);
		ClientLua::DoString(
			  ("__FireMessage(" + std::to_string(msg) + ")").c_str()
			, ClientLua::State()
		);
		if (!value->IsPersistent())
		{
			value->Destroy();
			reads.m_map.erase(msg);
		}
	}

	virtual void OnError(CustomPacketResult error) override final
	{
		LOG_ERROR << "Packet reading error " << uint32_t(error);
	}
};

template <typename T>
int WriteNum(lua_State* L)
{
	uint32_t id = uint32_t(ClientLua::GetNumber(L, 1, 0));
	T val = T(ClientLua::GetNumber(L, 2, 0));

	auto itr = writes.m_map.find(id);
	if (itr == writes.m_map.end())
	{
		// todo: error message
		return 0;
	}
	itr->second.Write(val);
	return 0;
}

// See lua polyfill in messages.lua
extern "C" {
	int _WriteMessage(lua_State* L)
	{
		PACKET_OPCODE_TYPE opcode(ClientLua::GetNumber(L, 1, 0));
		uint32_t size(ClientLua::GetNumber(L, 2, 0));
		uint32_t id = writes.freeId();
		writes.m_map[id] = ClientMessageWrite{opcode, size};
		ClientLua::PushNumber(L, id);
		return 1;
	}

	int _WriteUInt8(lua_State* L) { return WriteNum<uint8_t>(L); }

	int _SendMessage(lua_State* L) {
		uint32_t id( ClientLua::GetNumber(L, 1) );
		LOG_DEBUG << "Message being sent " << id;
		ClientMessageWrite* write = writes.get(id);
		if (write == nullptr)
		{
			// todo error message
			return 0;
		}
		write->Send();
		if (!write->IsPersistent())
		{
			writes.m_map.erase(id);
		}
	}
}

void ClientNetwork::initialize()
{
	ClientLua::AddFunction("_WriteUInt8", _WriteUInt8, __FILE__, __LINE__);
	ClientLua::AddFunction("_WriteMessage", _WriteMessage, __FILE__, __LINE__);
	ClientLua::AddFunction("_SendMessage", _SendMessage, __FILE__, __LINE__);
}

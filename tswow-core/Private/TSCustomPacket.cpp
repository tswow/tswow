#include "TSCustomPacket.h"
#include "TSPlayer.h"
#include "TSEvents.h"
#include "WorldPacket.h"
#include "CustomPacketChunk.h"
#include "Player.h"

#include "TSMap.h"
#include "Map.h"
#include "TSBattleground.h"

TSPacketWrite::TSPacketWrite(CustomPacketWrite* write)
	: write(write)
{}

TSPacketRead::TSPacketRead(CustomPacketRead* read)
	: read(read)
{}

void TSPacketWrite::SendToPlayer(TSPlayer player)
{
	auto & arr = write->buildMessages();
	for (auto & chunk : arr)
	{
		WorldPacket packet(SERVER_TO_CLIENT_OPCODE, chunk.FullSize());
		packet.append((uint8_t*)chunk.Data(), chunk.FullSize());
		player.player->SendDirectMessage(&packet);
	}
	// remove this line if we start sending a raw pointer to worldpacket
	write->Destroy();
}

void TSPacketWrite::BroadcastMap(TSMap map, uint32_t teamOnly)
{
	auto& arr = write->buildMessages();
	for (auto& chunk : arr)
	{
		WorldPacket packet(SERVER_TO_CLIENT_OPCODE, chunk.FullSize());
		packet.append((uint8_t*)chunk.Data(), chunk.FullSize());
		for (auto const& ref : map.map->GetPlayers())
		{
			Player* player = ref.GetSource();
#if TRINITY
			if (teamOnly == 0 || player->GetTeam() == teamOnly)
#elif AZEROTHCORE
			if (teamOnly == 0 || player->GetTeamId() == teamOnly)
#endif
			{
				player->SendDirectMessage(&packet);
			}
		}
	}
	// remove this line if we start sending a raw pointer to worldpacket
	write->Destroy();
}

void TSPacketWrite::BroadcastAround(TSWorldObject obj, float range, bool self)
{
	auto& arr = write->buildMessages();
	for (auto& chunk : arr)
	{
		WorldPacket packet(SERVER_TO_CLIENT_OPCODE, chunk.FullSize());
		packet.append((uint8_t*)chunk.Data(), chunk.FullSize());
		obj.obj->SendMessageToSetInRange(&packet, range, self);
	}
	// remove this line if we start sending a raw pointer to worldpacket
	write->Destroy();
}

TSServerBuffer::TSServerBuffer(TSPlayer player)
	: CustomPacketBuffer(
		  MIN_FRAGMENT_SIZE
		, BUFFER_QUOTA
		, MAX_FRAGMENT_SIZE
	)
	, m_player(player)
{
}

void TSServerBuffer::OnPacket(CustomPacketRead* value)
{
	// Expanded FIRE_ID macro because we need to reset the packet
	// reading head between every invocation.
	// Please do not change this to some auto-resetting macro abuse,
	// it would NOT be guaranteed to work in the long term.

	TSPacketRead read(value);
	opcode_t opcode = value->Opcode();

	auto& cbs = ts_events.CustomPacket.OnReceive_callbacks;
	for (auto const& cb : cbs.m_cxx_callbacks)
	{
			cb(opcode, read, m_player);
	}

	for (auto const& cb : cbs.m_lua_callbacks)
	{
			cb(opcode, read, m_player);
			value->Reset();
	}

	if (opcode < cbs.m_id_cxx_callbacks.size())
	{
			for (auto const& cb : cbs.m_id_cxx_callbacks[opcode])
			{
					cb(opcode, read, m_player);
					value->Reset();
			}
	}

	if (opcode < cbs.m_id_lua_callbacks.size())
	{
			for (auto const& cb : cbs.m_id_lua_callbacks[opcode])
			{
					cb(opcode, read, m_player);
					value->Reset();
			}
	}
}

void TSServerBuffer::OnError(CustomPacketResult error)
{
	m_player.player->GetSession()->KickPlayer("Custom packet error: "+std::to_string(uint32_t(error)));
}

TSPacketWrite CreateCustomPacket(
		opcode_t opcode
	, totalSize_t size
)
{
	// can we avoid heap allocation here?
	CustomPacketWrite* write = new CustomPacketWrite(
			opcode
		, MAX_FRAGMENT_SIZE
		, size
	);
	return TSPacketWrite(write);
}

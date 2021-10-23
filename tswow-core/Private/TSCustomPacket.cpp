#include "TSCustomPacket.h"
#include "TSPlayer.h"
#include "TSEvents.h"
#include "WorldPacket.h"
#include "CustomPacketChunk.h"

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
			if (teamOnly == 0 || player->GetTeam() == teamOnly)
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
	, player(player)
{
}

void TSServerBuffer::OnPacket(CustomPacketRead* value)
{
	// Expanded FIRE_MAP macro because we need to reset the packet
	// reading head between every invocation.
	// Please do not change this to some auto-resetting macro abuse,
	// it would NOT be guaranteed to work in the long term.

	TSPlayer player(player);
	TSPacketRead read(value);
	opcode_t opcode = value->Opcode();

	for (size_t i = 0; i < GetTSEvents()->PacketOnCustom.GetSize(); ++i)
	{
		GetTSEvents()->PacketOnCustom.Get(i)(opcode, read, player);
		value->Reset();
	}

	TSPacketEvents* events = GetPacketEvent(value->Opcode());
	if (!events)
	{
		return;
	}
	for (size_t i = 0; i < events->PacketOnCustom.GetSize(); ++i)
	{
		events->PacketOnCustom.Get(i)(opcode, read, player);
		value->Reset();
	}
}

void TSServerBuffer::OnError(CustomPacketResult error)
{
	player.player->GetSession()->KickPlayer("Custom packet error: "+std::to_string(uint32_t(error)));
}

TSPacketWrite MakeCustomPacket(
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

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
	// remove if we start injecting directly into worldpacket
	Destroy();
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
	// remove if we start injecting directly into worldpacket
	Destroy();
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
	// remove if we start injecting directly into worldpacket
	Destroy();
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
	TSPacketRead read(new CustomPacketRead(*value));
	FIRE_MAP(
			GetPacketEvent(value->Opcode())
		, PacketOnCustom
		, value->Opcode()
		, read
		, player
		);
	// do not destroy, we're pointing directly at a worldpacket!
}

void TSServerBuffer::OnError(CustomPacketResult error)
{

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

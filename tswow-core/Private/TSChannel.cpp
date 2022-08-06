/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2020 tswow <https://github.com/tswow/>
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
#include "TSChannel.h"
#include "TSPlayer.h"
#include "Channel.h"
#include "Player.h"

TSChannel::TSChannel(Channel *channel)
{
    this->channel = channel;
}

TSChannel::TSChannel()
{
    this->channel = nullptr;
}

std::string TSChannel::GetName(uint32 locale)
{
#if TRINITY
    return channel->GetName(LocaleConstant(locale));
#elif AZEROTHCORE
    if (locale)
    {
        TS_LOG_ERROR("tswow.api", "TSChannel::GetName is not implemented for non-default locale for AzerothCore");
    }
    return channel->GetName();
#endif
}

TSNumber<uint32> TSChannel::GetID()
{
    return channel->GetChannelId();
}

bool TSChannel::IsConstant() { return channel->IsConstant(); }
bool TSChannel::IsLFG() { return channel->IsLFG(); }
bool TSChannel::IsAnnounce(){ return channel->IsAnnounce(); }
void TSChannel::SetAnnounce(bool announce) { 
#if TRINITY
    channel->SetAnnounce(announce); 
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSChannel::SetAnnounce not implemented for AzerothCore");
#endif
}
void TSChannel::SetDirty() { 
#if TRINITY
    channel->SetDirty();
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSChannel::SetDirty not implemented for AzerothCore");
#endif
}
void TSChannel::SetPassword(std::string const& password) { channel->SetPassword(password); }
bool TSChannel::CheckPassword(std::string const& password) { 
#if TRINITY
    return channel->CheckPassword(password); 
#elif AZEROTHCORE
    LOG_WARN("tswow.api", "TSChannel::CheckPassword might not be correctly implemented for AzerothCore");
    return channel->GetPassword() == password;
#endif
}
TSNumber<uint32> TSChannel::GetNumPlayers() { return channel->GetNumPlayers(); }
TSNumber<uint8> TSChannel::GetFlags() { return channel->GetFlags(); }
bool TSChannel::HasFlag(uint8 flag) { return channel->HasFlag(flag); }
void TSChannel::JoinChannel(TSPlayer player, std::string const& password)
{
    channel->JoinChannel(player->player, password);
}

void TSChannel::LeaveChannel(TSPlayer player, bool send)
{
    channel->LeaveChannel(player->player,send);
}

void TSChannel::SetInvisible(TSPlayer player, bool on)
{
#if TRINITY
    channel->SetInvisible(player->player,on);
#elif AZEROTHCORE
    TS_LOG_ERROR("tswow.api", "TSChannel::SetInvisible not implemented for AzerothCore.");
#endif
}

void TSChannel::SetOwner(uint64 guid, bool exclaim)
{
    channel->SetOwner(ObjectGuid(guid),exclaim);
}

void TSChannel::Say(uint64 guid, std::string const& what, uint32 lang)
{
    channel->Say(ObjectGuid(guid),what,LocaleConstant(lang));
}

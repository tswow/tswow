/*
 * This file is part of tswow (https://github.com/tswow/).
 * Copyright (C) 2021 tswow <https://github.com/tswow/>
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
#include "TSMessageBuffer.h"
#include "base64.h"
#include "Config.h"
#include "TSPlayer.h"
#include "Player.h"
#include <algorithm>
#include <map>

static const unsigned ENCODED_HEADER_SIZE 
	= unsigned(std::ceil(float(sizeof(TSFragmentHeader)) / 3.0)) * 4;

static const unsigned MESSAGE_MAGIC = 17688;
#define MAX_FRAGMENT_SIZE 250

static unsigned allowedBytes = 0;
static unsigned allowedFragments = 0;
static short encodedMagic = 0;

void InitializeMessages()
{
	allowedBytes = sConfigMgr->GetIntDefault("TSWoW.MessageBufferBytes",10000);
	allowedFragments = allowedBytes/MAX_FRAGMENT_SIZE;
	char * chr = new char[cbase64_calc_encoded_length(sizeof(short))];
	encodeBase64((uint8_t*)&MESSAGE_MAGIC, sizeof(short), (uint8_t*)chr);
	encodedMagic = *((short*) chr);
	delete [] chr;
}

TSMessageBuffer::TSMessageBuffer(TSPlayer player)
	: m_player(player)
{}

TSBufferedMessage::TSBufferedMessage(unsigned char id, unsigned char channel, unsigned short fragments)
	: m_id(id)
	, m_fragment_ctr(std::max(fragments,uint16_t(1)))
{
	m_fragments.resize(m_fragment_ctr);
}

TSFragmentResult TSBufferedMessage::receiveFragment(unsigned short fragmentId, const char * start, const char * end)
{
	if (fragmentId >= m_fragments.size())
	{
		return TSFragmentResult::INCORRECT_FRAGMENT;
	}
	if (m_fragments[fragmentId].size() != 0)
	{
		return TSFragmentResult::DUPLICATE_FRAGMENT;
	}
	m_fragments[fragmentId] = std::string(start,end);
	--m_fragment_ctr;
	curBytes += (end - start);
	return m_fragment_ctr == 0 
			? TSFragmentResult::FINISHED 
			: TSFragmentResult::SUCCESS;
}

bool TSMessageBuffer::receiveFragment(unsigned len, const char * bytes)
{
	if (len < ENCODED_HEADER_SIZE)
	{
		return false;
	}

    if (((short*)bytes)[0] != encodedMagic)
    {
        return false;
    }

	unsigned decodedLen = cbase64_calc_decoded_length(bytes, len);
	char* decoded = new char[decodedLen];
	decodeBase64((uint8_t*)bytes, len, (uint8_t*)decoded);

	auto hdr = (TSFragmentHeader*)decoded;

    // since we the previous compare is only for a whole unsigned, this is unlikely but possible.
	if (hdr->magic != MESSAGE_MAGIC)
	{
		return false;
	}
	
	auto msgRef = m_messages.find(hdr->messageId);
	TSBufferedMessage* msg;
	if (msgRef == m_messages.end())
	{
		msg = &(m_messages[hdr->messageId] = TSBufferedMessage(hdr->channel, hdr->messageId, hdr->totalFragments));
	}
	else
	{
		msg = &msgRef->second;
	}
	auto res = msg->receiveFragment(hdr->fragmentId, decoded+sizeof(TSFragmentHeader),decoded+decodedLen);
	delete [] decoded;

	switch (res)
	{
	case TSFragmentResult::INCORRECT_FRAGMENT:
	case TSFragmentResult::DUPLICATE_FRAGMENT:
		m_messages.erase(hdr->messageId);
		onError(hdr->messageId, res);
		break;
	case TSFragmentResult::FINISHED: {
		m_curBytes -= msg->curBytes;
		unsigned size = 0;
		for (auto& str : msg->m_fragments)
		{
			size += str.size();
		}
		std::string full;
		full.reserve(size);
		for (auto& fragment : msg->m_fragments)
		{
			full += fragment;
		}
		onFinished(msg->m_channel, full);
		m_messages.erase(hdr->messageId);
		break;
	}
	case TSFragmentResult::SUCCESS: {
		m_curBytes += (len - sizeof(TSFragmentHeader));
		auto itr = m_messages.begin();
		while (itr != m_messages.end() && m_curBytes > allowedBytes)
		{
			m_curBytes -= itr->second.curBytes;
			onError(itr->second.m_id, TSFragmentResult::DATA_OVERFLOW);
			itr = m_messages.erase(itr);
		}
		break;
	}
	}
    return true;
}

void TSMessageBuffer::sendMessage(unsigned short channel, std::string const& message)
{
	unsigned fragmentCount = std::ceil(float(message.size()) / float(MAX_FRAGMENT_SIZE));
	unsigned messageId = m_curId++;
	unsigned offset = 0;
	std::vector<std::pair<unsigned,const char*>> fragments;

	for (unsigned i = 0; i < fragmentCount; ++i)
	{
		unsigned fragPayloadSize = std::min(unsigned(MAX_FRAGMENT_SIZE), unsigned(message.size() - offset));
		unsigned fragFullSize = fragPayloadSize + sizeof(TSFragmentHeader);
		char* chunk = new char[fragPayloadSize+fragFullSize];
		TSFragmentHeader* hdr = (TSFragmentHeader*)chunk;
		hdr->magic = MESSAGE_MAGIC;
		hdr->messageId = messageId;
		hdr->fragmentId = i;
        hdr->channel = channel;
		hdr->totalFragments = fragmentCount;
		memcpy(
			  chunk + sizeof(TSFragmentHeader)
			, message.substr(offset, offset + fragPayloadSize).c_str(), fragPayloadSize);
		unsigned encodedSize = cbase64_calc_encoded_length(fragFullSize);
		char* encoded_chunk = new char[encodedSize];
		encodeBase64((uint8_t*)chunk, fragFullSize, (uint8_t*)encoded_chunk);
		sendFragment(encodedSize, encoded_chunk);
		offset += fragPayloadSize;
		delete[] chunk;
		delete[] encoded_chunk;
	}
}

void TSMessageBuffer::onFinished(unsigned short channel, std::string const& str)
{
    FIRE(AddonOnLongMessage,m_player,channel,TSString(str));
}

void TSMessageBuffer::onError(unsigned long id, TSFragmentResult error)
{
    FIRE(AddonOnLongMessageError, m_player, uint8_t(error));
}

void TSMessageBuffer::sendFragment(unsigned len, const char* bytes)
{
    m_player->SendAddonMessage(JSTR(""),TSString(std::string(bytes,bytes+len)),7,m_player);
}

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
#pragma once

#include <map>
#include <set>
#include <vector>
#include <string>

class TSPlayer;

enum class TSFragmentResult {
	FINISHED,
	SUCCESS,
	INCORRECT_FRAGMENT,
	DUPLICATE_FRAGMENT,
	DATA_OVERFLOW,
};

struct TSFragmentHeader {
	unsigned short magic;
	unsigned char messageId;
	unsigned char channel;
	unsigned short fragmentId;
	unsigned short totalFragments;
};

class TSBufferedMessage {
	short m_fragment_ctr;
public:
	unsigned char m_id;
	unsigned short curBytes = 0;
	short m_channel;
	TSBufferedMessage() : m_fragment_ctr(0), m_channel(0), m_id(0) {};
	TSBufferedMessage(unsigned char id, unsigned char channel, unsigned short totalFragments);
	TSFragmentResult receiveFragment(unsigned short fragmentId, const char * start, const char * end);
	std::vector<std::string> m_fragments;
};

class TSMessageBuffer
{
	unsigned m_curBytes = 0;
	unsigned long m_curId = 0;
	std::map<unsigned char,TSBufferedMessage> m_messages;
	TSPlayer m_player;
	void onFinished(unsigned short channel, std::string const& str);
	void onError(unsigned long id, TSFragmentResult error);
	void sendFragment(unsigned len, const char* bytes);

public:
	TSMessageBuffer(TSPlayer player);
	bool receiveFragment(unsigned len, const char * bytes);
	void sendMessage(unsigned short channel, std::string const& message);
};

void InitializeMessages();

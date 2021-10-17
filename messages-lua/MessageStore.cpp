#include "MessageStore.h"

#include "MessageRead.h"
#include "MessageWrite.h"

#include <map>

namespace {
	std::map<write_msg_ptr, MessageWrite> writeMsgs;

	write_msg_ptr curWrite = 0;
	size_t fragmentSize = 0;
	MessageRead curRead;
}

void InitializeMessageStore(size_t fragmentSizeIn)
{
	fragmentSize = fragmentSizeIn;
	curWrite = 0;
	writeMsgs.clear();
}

write_msg_ptr MakeWriteMessage(uint32_t size = 0)
{
	write_msg_ptr ptr = ++curWrite;
	writeMsgs[curWrite] = MessageWrite(fragmentSize,size);
	return ptr;
}

void StageRead(MessageRead read)
{
	curRead = read;
}

MessageRead* GetRead()
{
	return &curRead;
}

void UnstageRead()
{
	curRead.Destroy();
}

MessageWrite* GetLastWrite()
{
	return &writeMsgs[curWrite];
}

void DestroyWriteMessage(write_msg_ptr ptr)
{
	writeMsgs.erase(ptr);
}

MessageWrite* GetWriteMessage(write_msg_ptr ptr)
{
	return &writeMsgs[ptr];
}

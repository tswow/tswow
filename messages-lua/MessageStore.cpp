#include "MessageStore.h"

#include "MessageRead.h"
#include "MessageWrite.h"

#include <map>

namespace {
	std::map<read_msg_ptr, MessageRead> readMsgs;
	std::map<write_msg_ptr, MessageWrite> writeMsgs;

	read_msg_ptr curRead = 0;
	write_msg_ptr curWrite = 0;
}

write_msg_ptr MakeWriteMessage(uint32_t size = 0)
{
	write_msg_ptr ptr = curWrite++;
	writeMsgs[curWrite] = MessageWrite(size);
	return ptr;
}

void DestroyReadMessage(read_msg_ptr ptr)
{
	readMsgs.erase(ptr);
}

void DestroyWriteMessage(write_msg_ptr ptr)
{
	writeMsgs.erase(ptr);
}

MessageWrite* GetWriteMessage(write_msg_ptr ptr)
{
	return &writeMsgs[ptr];
}

MessageRead* GetReadMessage(read_msg_ptr ptr)
{
	return &readMsgs[ptr];
}

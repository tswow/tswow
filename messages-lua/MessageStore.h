#pragma once

#include <cstdint>

class MessageWrite;
class MessageRead;

typedef uint32_t read_msg_ptr;
typedef uint32_t write_msg_ptr;

write_msg_ptr MakeWriteMessage(uint32_t size);

void StageRead(MessageRead read);
MessageRead* GetRead();
void UnstageRead();

void DestroyWriteMessage(write_msg_ptr ptr);

void InitializeMessageStore(size_t fragmentSize);

MessageWrite* GetWriteMessage(write_msg_ptr ptr);

MessageWrite* GetLastWrite();



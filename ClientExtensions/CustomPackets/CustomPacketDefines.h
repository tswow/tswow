// What integer type should be used for the
// custom opcode. A smaller value means
// smaller packets but less possible opcodes.
#define PACKET_OPCODE_TYPE uint16_t

// The maximum size of a single packet fragment.
#define MAX_FRAGMENT_SIZE 8000
#define MIN_FRAGMENT_SIZE 4000

// default: ~8mb
#define BUFFER_QUOTA 8388608

// These are the _base_ opcodes, not to be confused with custom packet opcode.
// I currently use a CMSG packet id for server->client,
// because I couldn't get the client to accept higher message ids.
//
#define SERVER_TO_CLIENT_OPCODE 0x102
#define CLIENT_TO_SERVER_OPCODE 0x51f
#include "ClientDB.h"

void ClientDB::Apply() {
    OverwriteUInt32AtAddress(0x634E30, CalculateAddress(reinterpret_cast<uint32_t>(&RegisterBaseEx), 0x634E34));
}

uint32_t ClientDB::RegisterBaseEx(uint32_t a) {
    uint32_t result = ClientDB__RegisterBase(a);
    return result;
}

SET(CUSTOM_PACKETS_CPP
    CustomPacketBuffer.cpp
    CustomPacketChunk.cpp
    CustomPacketRead.cpp
    CustomPacketWrite.cpp
    CustomPacketBase.cpp
)

SET(CUSTOM_PACKETS_H
    CustomPacketRead.h
    CustomPacketWrite.h
    CustomPacketBase.h
    CustomPacketBuffer.h
    CustomPacketChunk.h
    CustomPacketDefines.h
)

add_library(CustomPackets STATIC
    ${CUSTOM_PACKETS_CPP}
    ${CUSTOM_PACKETS_H}
)
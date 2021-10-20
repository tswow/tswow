SET(MESSAGES_CPP
    MessageBuffer.cpp
    MessageChunk.cpp
    MessageRead.cpp
    MessageWrite.cpp
    MessageBase.cpp
)

SET(MESSAGES_H
    MessageRead.h
    MessageWrite.h
    MessageBase.h
    MessageBuffer.h
    MessageChunk.h
)

add_library(messages STATIC
    ${MESSAGES_CPP}
    ${MESSAGES_H}
)
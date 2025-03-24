#pragma once
#include "SharedDefines.h"
#include "ClientLua.h"
#include <string>
#include "Logger.h"

class CDBC {
public:
    CDBC() {
        isLoaded    = false;
        numRows     = 0;
        minIndex    = 0;
        maxIndex    = 0;
        rows        = 0;
    }
    uint32_t numColumns;
    void* rows;
    uint32_t rowSize;
    uint32_t numRows;
    void* stringTable;
    uint32_t minIndex;
    uint32_t maxIndex;

    CDBC* LoadDB(const char* filename);
    void UnloadDB();
    void GetMinMaxIndices();
    virtual ~CDBC() = default;
private:
    bool isLoaded;
};

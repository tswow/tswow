#pragma once
#include "SharedDefines.h"

class CustomDBC {
public:
    CustomDBC() {
        isLoaded    = false;
        numRows     = 0;
        minIndex    = 0;
        maxIndex    = 0;
        rows        = 0;
    }
    void* stringTable;
    uint32_t numColumns;
    uint32_t rowSize;
    void* rows;
    uint32_t numRows;

    CustomDBC* LoadDB(const char* filename);
    void UnloadDB();
    void GetMinMaxIndices();
    void* GetRow(uint32_t rowNum);
    virtual ~CustomDBC() = default;
private:
    bool isLoaded;
    uint32_t minIndex;
    uint32_t maxIndex;
};

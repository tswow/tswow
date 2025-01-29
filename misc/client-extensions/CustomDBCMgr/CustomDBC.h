#pragma once
#include "CustomDBCDefines.h"

class CustomDBC {
public:
    CustomDBC() {
        isLoaded    = false;
        numRows     = 0;
        minIndex    = 0;
        maxIndex    = 0;
        stringTable = 0;
        rows        = 0;
        numColumns  = 0;
        rowSize     = 0;
    }
    void LoadDB(CustomDBC dbc, const char* filename);
    void UnloadDB(CustomDBC dbc);
    void GetMinMaxIndices(CustomDBC dbc);
    void* GetRow(CustomDBC dbc, uint32_t rowNum);
private:
    bool isLoaded;
    uint32_t numRows;
    uint32_t minIndex;
    uint32_t maxIndex;
    void* stringTable;
    void* rows;
    uint32_t numColumns;
    uint32_t rowSize;
};

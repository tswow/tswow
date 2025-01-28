#pragma once
#include "CustomDBCDefines.h"

class CustomDBC {
public:
    CustomDBC() {
        isLoaded = false;
        numRows = 0;
        minIndex = 0xFFFFFFF;
        maxIndex = 0xFFFFFFFF;
        stringTable = 0;
        firstRow = 0;
        rows = 0;
    }
    void LoadDB(CustomDBC dbc, const char* filename, uint32_t colCount, uint32_t rowSize);

    uint32_t* GetRow(CustomDBC dbc, uint32_t rowNum);
private:
    bool isLoaded;
    uint32_t numRows;
    uint32_t minIndex;
    uint32_t maxIndex;
    uintptr_t* stringTable;
    uintptr_t* firstRow;
    uintptr_t* rows;
};

#include "CustomDBC.h"

void CustomDBC::LoadDB(CustomDBC dbc, const char* filename) {
    uint32_t Buffer = 0;
    void* FileBlock = 0;

    if (dbc.isLoaded) return;

    if (!SFileOpenFileEx(0, filename, 0x20000, &FileBlock))
        SErrPrepareAppFatal(0x85100079, "Unable to open %s", filename);

    if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read signature from %s", filename);

    if (Buffer != 0x43424457) // WDBC but little endian so technically CBDW
        SErrPrepareAppFatal(0x85100079, "Invalid signature 0x%x from %s", Buffer, filename);

    if (!SFileReadFile(FileBlock, &dbc.numRows, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read record count from %s", filename);

    if (!dbc.numRows) {
        SFileCloseFile(FileBlock);
        return;
    }
        
    if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read column count from %s", filename);

    if (Buffer != dbc.numColumns)
        SErrPrepareAppFatal(0x85100079, "%s has wrong number of columns (found %i, expected %i)", filename, Buffer, dbc.numColumns);

    if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read row size from %s", filename);

    if (Buffer != dbc.rowSize)
        SErrPrepareAppFatal(0x85100079, "%s has wrong row size (found %i, expected %i)", filename, Buffer, dbc.rowSize);

    if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read string size from %s", filename);

    dbc.rows = SMemAlloc(dbc.numColumns * dbc.numRows * 4, filename, -2, 0);

    if (!SFileReadFile(FileBlock, dbc.rows, dbc.numColumns * dbc.numRows * 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read row data from %s", filename);

    dbc.stringTable = SMemAlloc(Buffer, filename, -2, 0);

    if (!SFileReadFile(FileBlock, dbc.stringTable, Buffer, 0, 0))
        SErrPrepareAppFatal(0x85100086, "%s: Cannot read string table", filename);

    GetMinMaxIndices(dbc);
    SFileCloseFile(FileBlock);
    dbc.isLoaded = true;
}

void CustomDBC::UnloadDB(CustomDBC dbc) {
    if (dbc.rows)
        SMemFree(dbc.rows, "delete[]", -1, 0);

    if (dbc.stringTable)
        SMemFree(dbc.stringTable, "delete[]", -1, 0);

    dbc.rows = 0;
    dbc.stringTable = 0;
    dbc.numRows = 0;
    dbc.minIndex = 0;
    dbc.maxIndex = 0;
    dbc.isLoaded = false;
};

void CustomDBC::GetMinMaxIndices(CustomDBC dbc) {
    uintptr_t* ptr = reinterpret_cast<uintptr_t*>(dbc.rows);
    for (uint32_t i = 0; i < numRows; i++) {
        if (dbc.minIndex >= *ptr)
            memcpy(&dbc.minIndex, ptr, 4);

        if (dbc.maxIndex <= *ptr)
            memcpy(&dbc.maxIndex, ptr, 4);

        ptr += dbc.rowSize;
    }
};

void* CustomDBC::GetRow(CustomDBC dbc, uint32_t rowNum) {
    if (rowNum < dbc.minIndex || rowNum > dbc.maxIndex)
        return 0;

    uintptr_t* ptr = reinterpret_cast<uintptr_t*>(dbc.rows);

    for (uint32_t i = 0; i < dbc.numRows; i++) {
        if (rowNum == *ptr)
            break;

        ptr += dbc.rowSize;
    }

    return ptr;
}

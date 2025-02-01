#include "CustomDBC.h"
#include "Logger.h"

void CustomDBC::LoadDB(const char* filename) {
    uint32_t Buffer = 0;
    void* FileBlock = 0;
    int v26;
    int v27;
    int len;
    if (this->isLoaded) return;

    if (!SFileOpenFileEx(0, filename, 0x20000, &FileBlock))
        SErrPrepareAppFatal(0x85100079, "Unable to open %s", filename);

    if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read signature from %s", filename);

    if (Buffer != 0x43424457) // WDBC but little endian so technically CBDW
        SErrPrepareAppFatal(0x85100079, "Invalid signature 0x%x from %s", Buffer, filename);

    if (!SFileReadFile(FileBlock, &this->numRows, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read record count from %s", filename);

    if (!this->numRows) {
        SFileCloseFile(FileBlock);
        return;
    }

    if (!SFileReadFile(FileBlock, &v26, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read column count from %s", filename);

    if (v26 != this->numColumns)
        SErrPrepareAppFatal(0x85100079, "%s has wrong number of columns (found %i, expected %i)", filename, v26, this->numColumns);

    if (!SFileReadFile(FileBlock, &v27, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read row size from %s", filename);

    if (v27 != this->rowSize)
        SErrPrepareAppFatal(0x85100079, "%s has wrong row size (found %i, expected %i)", filename, v27, this->rowSize);
    if (!SFileReadFile(FileBlock, &len, 4, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read string size from %s", filename);
    this->rows = SMemAlloc(len, filename, -2, 0);
    if (!SFileReadFile(FileBlock, this->rows, len, 0, 0))
        SErrPrepareAppFatal(0x85100079, "Unable to read row data from %s", filename);
    this->stringTable = SMemAlloc(len, filename, -2, 0);
    if (!SFileReadFile(FileBlock, this->stringTable, len, 0, 0))
        SErrPrepareAppFatal(0x85100086, "%s: Cannot read string table", filename);
    GetMinMaxIndices();
    SFileCloseFile(FileBlock);
    this->isLoaded = true;
}

void CustomDBC::UnloadDB() {
    if (this->rows)
        SMemFree(this->rows, "delete[]", -1, 0);

    if (this->stringTable)
        SMemFree(this->stringTable, "delete[]", -1, 0);

    //TODO: expose the CustomDBC() constructor to wipe here?
    this->rows = 0;
    this->stringTable = 0;
    this->numRows = 0;
    this->minIndex = 0;
    this->maxIndex = 0;
    this->isLoaded = false;
};

void CustomDBC::GetMinMaxIndices() {
    uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);
    for (uint32_t i = 0; i < numRows; i++) {
        if (this->minIndex >= *ptr)
            memcpy(&this->minIndex, ptr, 4);

        if (this->maxIndex <= *ptr)
            memcpy(&this->maxIndex, ptr, 4);

        ptr += this->rowSize;
    }
};

void* CustomDBC::GetRow(uint32_t rowNum) {
    if (rowNum < this->minIndex || rowNum > this->maxIndex)
        return 0;

    uintptr_t* ptr = reinterpret_cast<uintptr_t*>(this->rows);

    for (uint32_t i = 0; i < this->numRows; i++) {
        if (rowNum == *ptr)
            break;

        ptr += this->rowSize;
    }

    return ptr;
}

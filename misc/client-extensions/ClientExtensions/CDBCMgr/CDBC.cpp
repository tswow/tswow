#include "CDBC.h"
#include "Logger.h"

CDBC* CDBC::LoadDB(const char* name) {
    uint32_t Buffer = 0;
    void* FileBlock = 0;
    int v26;
    int v27;
    int len;

    char filePath[512];
    SStr::Printf(filePath, 512, "DBFilesClient\\%s.cdbc", name);

    if (this->isLoaded)
        return this;

    if (!SFile::OpenFileEx(0, filePath, 0x20000, &FileBlock))
        SErr::PrepareAppFatal(0x85100079, "Unable to open %s", filePath);

    if (!SFile::ReadFile(FileBlock, &Buffer, 4, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read signature from %s", filePath);

    if (Buffer != 0x43424457) // WDBC but little endian so technically CBDW
        SErr::PrepareAppFatal(0x85100079, "Invalid signature 0x%x from %s", Buffer, filePath);

    if (!SFile::ReadFile(FileBlock, &this->numRows, 4, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read record count from %s", filePath);

    if (!this->numRows) {
        SFile::CloseFile(FileBlock);
        return this;
    }

    if (!SFile::ReadFile(FileBlock, &v26, 4, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read column count from %s", filePath);

    if (v26 != this->numColumns)
        SErr::PrepareAppFatal(0x85100079, "%s has wrong number of columns (found %i, expected %i)", filePath, v26, this->numColumns);

    if (!SFile::ReadFile(FileBlock, &v27, 4, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read row size from %s", filePath);

    if (v27 != this->rowSize)
        SErr::PrepareAppFatal(0x85100079, "%s has wrong row size (found %i, expected %i)", filePath, v27, this->rowSize);

    if (!SFile::ReadFile(FileBlock, &len, 4, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read string size from %s", filePath);

    this->rows = SMem::Alloc(this->numRows * this->rowSize, filePath, -2, 0);

    if (!SFile::ReadFile(FileBlock, this->rows, this->numRows * this->rowSize, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100079, "Unable to read row data from %s", filePath);

    this->stringTable = SMem::Alloc(len, filePath, -2, 0);

    if (!SFile::ReadFile(FileBlock, this->stringTable, len, 0, 0, 0))
        SErr::PrepareAppFatal(0x85100086, "%s: Cannot read string table", filePath);

    GetMinMaxIndices();
    this->isLoaded = true;
    SFile::CloseFile(FileBlock);
    return this;
}

void CDBC::UnloadDB() {
    if (this->rows)
        SMem::Free(this->rows, "delete[]", -1, 0);

    if (this->stringTable)
        SMem::Free(this->stringTable, "delete[]", -1, 0);

    //TODO: expose the CDBC() constructor to wipe here?
    this->rows = 0;
    this->stringTable = 0;
    this->numRows = 0;
    this->minIndex = 0;
    this->maxIndex = 0;
    this->isLoaded = false;
};

void CDBC::GetMinMaxIndices() {
    uintptr_t* firstRow = reinterpret_cast<uintptr_t*>(this->rows);
    uintptr_t* lastRow = firstRow + ((numRows - 1) * this->numColumns);
    this->minIndex = *firstRow;  // First row is the minimum
    this->maxIndex = *lastRow;   // Last row is the maximum
}

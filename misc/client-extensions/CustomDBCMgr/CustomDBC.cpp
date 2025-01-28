#include "CustomDBC.h"

void CustomDBC::LoadDB(CustomDBC dbc, const char* filename) {
    uint32_t Buffer = 0;
    void* FileBlock = 0;

    // TODO: pointer to first row, values for minIndex and maxIndex

    if (!dbc.isLoaded) {
        if (!SFileOpenFileEx(0, filename, 0x20000, &FileBlock))
            SErrPrepareAppFatal(0x85100079, "Unable to open %s", filename);

        if (!SFileReadFile(FileBlock, &Buffer, 4, 0, 0))
            SErrPrepareAppFatal(0x85100079, "Unable to read signature from %s", filename);

        if (Buffer != 0x43424457) // WDBC but little endian so technically CBDW
            SErrPrepareAppFatal(0x85100079, "Invalid signature 0x%x from %s", Buffer, filename);

        if (!SFileReadFile(FileBlock, &dbc.numRows, 4, 0, 0))
            SErrPrepareAppFatal(0x85100079, "Unable to read record count from %s", filename);

        if (dbc.numRows) {
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

            dbc.stringTable = SMemAlloc(Buffer, 0, 0, 0);
            dbc.minIndex = 0;
            dbc.maxIndex = 0;

            if (!SFileReadFile(FileBlock, dbc.stringTable, Buffer, 0, 0))
                SErrPrepareAppFatal(0x85100086, "Unable to read string size from %s", filename);

            SFileCloseFile(FileBlock);
            dbc.isLoaded = true;
        }
        else
            SFileCloseFile(FileBlock);
    }
}

uint32_t* CustomDBC::GetRow(CustomDBC dbc, uint32_t rowNum) {
    if (rowNum < dbc.minIndex || rowNum > dbc.maxIndex)
        return 0;
    else
        return (dbc.rows + 4 * (rowNum - dbc.minIndex));
}

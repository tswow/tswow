#include "CustomDBC.h"

void CustomDBC::LoadDB(CustomDBC dbc, const char* filename, uint32_t colCount, uint32_t rowSize) {
    uint32_t sig;
    uint32_t something;

    if (!dbc.isLoaded) {
        if (!SFileOpenFileEx(0, filename, 0x20000, something)) // TODO: 4th argument
            SErrPrepareAppFatal(0x85100079, "Unable to open %s", filename);

        if (!SFileReadFile(something, sig, 4, 0, 0, 0)) // TODO: 1st argument
            SErrPrepareAppFatal(0x85100079, "Unable to read signature from %s", filename);

        if (sig != 0x43424457)
            SErrPrepareAppFatal(0x85100079, "Invalid signature 0x%x from %s", sig, filename);

        if (!SFileReadFile(something, dbc.numRows, 4, 0, 0, 0)) // TODO: 1st argument
            SErrPrepareAppFatal(0x85100079, "Unable to read record count from %s", filename);

        if (dbc.numRows) {
            if (!SFileReadFile(something, sig, 4, 0, 0, 0)) // TODO: 1st argument
                SErrPrepareAppFatal(0x85100079, "Unable to read column count from %s", filename);

            if (sig != 4)
                SErrPrepareAppFatal(0x85100079, "%s has wrong number of columns (found %i, expected %i)", filename, sig, colCount);

            if (!SFileReadFile(something, sig, 4, 0, 0, 0)) // TODO: 1st argument
                SErrPrepareAppFatal(0x85100079, "Unable to read row size from %s", filename);

            if (sig != 16)
                SErrPrepareAppFatal(0x85100079, "%s has wrong row size (found %i, expected %i)", filename, sig, rowSize);

            if (!SFileReadFile(something, sig, 4, 0, 0, 0)) // TODO: 1st argument
                SErrPrepareAppFatal(0x85100079, "Unable to read string size from %s", filename);

            // here should be some more code

            SFileCloseFile(&something);
            dbc.isLoaded = true;
        }
        else {
            SFileCloseFile(&something);
        }
    }
}

uint32_t* CustomDBC::GetRow(CustomDBC dbc, uint32_t rowNum) {
    if (rowNum < dbc.minIndex || rowNum > dbc.maxIndex)
        return 0;
    else
        return (dbc.rows + 4 * (rowNum - dbc.minIndex));
}

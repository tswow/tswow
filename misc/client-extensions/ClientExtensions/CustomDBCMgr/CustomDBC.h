#pragma once
#include "SharedDefines.h"
#include "ClientLua.h"
#include <string>
#include "Logger.h"

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
    virtual int handleLuaRow(lua_State* L, void* rowPtr) {LOG_DEBUG << "something wrong"; return 0;};
    //virtual DataRow getRow(int index) override {return 0;}
    virtual ~CustomDBC() = default;
private:
    bool isLoaded;
    uint32_t minIndex;
    uint32_t maxIndex;
};

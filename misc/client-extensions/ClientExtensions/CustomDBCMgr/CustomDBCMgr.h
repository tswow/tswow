#pragma once

#include "ClientLua.h"
#include <functional>
#include <unordered_map>
#include <string>
#include <any>

class CustomDBCMgr {
    using CustomDBC = std::unordered_map<int, std::any>;
public:
    std::unordered_map<std::string, CustomDBC> allCustomDBCs;
    static void CustomDBCMgr::Load();
    void addDBC(std::string dbcName);
    static void CustomDBCMgr::addDBCLuaHandler(std::string dbcName,  std::function<int(lua_State*,int)> func);
    static int CustomDBCMgr::handleLua(lua_State* L, std::string dbcName, int row);
    //these stay in .h because haha template
    template <typename T>
    void addRow(std::string dbcName, int rowIndex, T row) {allCustomDBCs[dbcName][rowIndex] = row;}
    template <typename T>
    T* getRow(std::string dbcName, int rowIndex) {
        auto it = allCustomDBCs.find(dbcName);
        if (it != allCustomDBCs.end()) {
            auto objIt = it->second.find(rowIndex);
            if (objIt != it->second.end()) {
                return std::any_cast<T>(&objIt->second);
            }
        }
        return nullptr;
    }
};

extern CustomDBCMgr GlobalDBCMap;


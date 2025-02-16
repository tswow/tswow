#pragma once

#include "ClientLua.h"
#include <functional>
#include <unordered_map>
#include <string>
#include <any>

class CDBCMgr {
    using CDBC = std::unordered_map<int, std::any>;
public:
    std::unordered_map<std::string, CDBC> allCDBCs;
    static void CDBCMgr::Load();
    void addDBC(std::string dbcName);
    static void CDBCMgr::addDBCLuaHandler(std::string dbcName,  std::function<int(lua_State*,int)> func);
    static int CDBCMgr::handleLua(lua_State* L, std::string dbcName, int row);
    //these stay in .h because haha template
    template <typename T>
    void addRow(std::string dbcName, int rowIndex, T row) {allCDBCs[dbcName][rowIndex] = row;}
    template <typename T>
    T* getRow(std::string dbcName, int rowIndex) {
        auto it = allCDBCs.find(dbcName);
        if (it != allCDBCs.end()) {
            auto objIt = it->second.find(rowIndex);
            if (objIt != it->second.end()) {
                return std::any_cast<T>(&objIt->second);
            }
        }
        return nullptr;
    }
};

extern CDBCMgr GlobalDBCMap;


#pragma once

#include "ClientLua.h"
#include <functional>
#include <unordered_map>
#include <string>
#include <any>
#include <limits>

class CDBCMgr {
    using CDBC = std::unordered_map<int, std::any>;
public:
    std::unordered_map<std::string, CDBC> allCDBCs; // {cdbcName -> [rowData]}
    std::unordered_map<std::string, std::pair<int, int>> cdbcIndexRanges; // {cdbcName -> (minIndex, maxIndex)}
    static void CDBCMgr::Load();
    void addCDBC(std::string cdbcName);
    static void CDBCMgr::addCDBCLuaHandler(std::string cdbcName,  std::function<int(lua_State*,int)> func);
    static int CDBCMgr::handleLua(lua_State* L, std::string cdbcName, int row);
    CDBC getCDBC(std::string cdbcName);
    //these stay in .h because haha template
    template <typename T>
    void addRow(std::string cdbcName, int rowIndex, T row) { allCDBCs[cdbcName][rowIndex] = row; }
    template <typename T>
    T* getRow(std::string cdbcName, int rowIndex) {
        auto it = allCDBCs.find(cdbcName);
        if (it != allCDBCs.end()) {
            auto objIt = it->second.find(rowIndex);
            if (objIt != it->second.end()) {
                return std::any_cast<T>(&objIt->second);
            }
        }
        return nullptr;
    }

    std::pair<int, int> getIndexRange(std::string cdbcName) {
        auto it = cdbcIndexRanges.find(cdbcName);
        if (it != cdbcIndexRanges.end()) {
            return it->second;
        }
        return {0, 0};
    }

    void setIndexRange(std::string cdbcName, uint32_t minIndex, uint32_t maxIndex) {
        auto it = cdbcIndexRanges.find(cdbcName);
        if (it != cdbcIndexRanges.end()) {
            it->second = { minIndex, maxIndex };
        }else{
            it->second = { 0, 0 };
        }
    }
};

extern CDBCMgr GlobalCDBCMap;

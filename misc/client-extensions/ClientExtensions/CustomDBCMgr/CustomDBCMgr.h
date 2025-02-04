#pragma once

#include <unordered_map>
#include <string>
#include <any>

class MapContainer {
    using CustomDBC = std::unordered_map<int, std::any>;
public:
    std::unordered_map<std::string, CustomDBC> allCustomDBCs;
    void addDBC(std::string key);
    template <typename T>
    void addRow(std::string key, int subKey, T row) {allCustomDBCs[key][subKey] = row;}
    template <typename T>
    T* getRow(std::string key, int id) {
        auto it = allCustomDBCs.find(key);
        if (it != allCustomDBCs.end()) {
            auto objIt = it->second.find(id);
            if (objIt != it->second.end()) {
                return std::any_cast<T>(&objIt->second);
            }
        }
        return nullptr;
    }
};

extern MapContainer GlobalMapContainer;


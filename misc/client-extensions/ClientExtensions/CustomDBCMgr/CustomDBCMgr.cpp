#include "CustomDBCMgr.h"

MapContainer GlobalMapContainer;

void MapContainer::addDBC(std::string key) {
    allCustomDBCs[key] = CustomDBC();
}

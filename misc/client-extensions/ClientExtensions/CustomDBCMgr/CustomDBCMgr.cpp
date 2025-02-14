#include "CustomDBCMgr.h"
#include "DBCDefs/SpellCustomAttributes.h"

CustomDBCMgr GlobalDBCMap;

void CustomDBCMgr::addDBC(std::string dbcName)
{
    allCustomDBCs[dbcName] = CustomDBC();
}

void CustomDBCMgr::Load()
{
    SpellCustomAttributes().LoadDB();
}

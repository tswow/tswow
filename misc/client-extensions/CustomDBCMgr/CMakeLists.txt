SET(CUSTOM_DBC_MGR_CPP
    CustomDBC.cpp
)

SET(CUSTOM_DBC_MGR_H
    CustomDBC.h
    CustomDBCDefines.h
)

add_library(CustomDBCMgr STATIC
    ${CUSTOM_DBC_MGR_CPP}
    ${CUSTOM_DBC_MGR_H}
)
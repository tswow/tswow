# The fallback claims to satisfy any requested version; we are only loaded
# when the real boost_system config is missing on the system, and Boost is
# already resolved by Boost::headers at this point.
if(DEFINED PACKAGE_FIND_VERSION AND NOT "${PACKAGE_FIND_VERSION}" STREQUAL "")
  set(PACKAGE_VERSION "${PACKAGE_FIND_VERSION}")
else()
  set(PACKAGE_VERSION "1.87.0")
endif()
set(PACKAGE_VERSION_COMPATIBLE TRUE)
set(PACKAGE_VERSION_EXACT TRUE)
set(PACKAGE_VERSION_UNSUITABLE FALSE)

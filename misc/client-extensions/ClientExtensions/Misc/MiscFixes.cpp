#include "MiscFixes.h"
#include "Logger.h"

void MiscFixes::Apply() {
    UpdateObjectVtable();
}

void MiscFixes::UpdateObjectVtable() {
    Util::OverwriteUInt32AtAddress(0x9F3B54, reinterpret_cast<uint32_t>(&ShouldObjectFadeIn));
}

bool MiscFixes::ShouldObjectFadeIn(CGObject* _this, uint32_t unused) {
    uint32_t type = _this->ObjectData->OBJECT_FIELD_TYPE;

    if (type == TYPEMASK_UNIT)
        return CGUnit_C::ShouldFadeIn(reinterpret_cast<CGUnit*>(_this));
    else
        return 1;
}

#include "ClientLua.h"
#include "ClientDetours.h"

enum CVarFlags : uint32_t {
    CVarFlags_ReadOnly = 0x4,
    CVarFlags_CheckTaint = 0x8,
    CVarFlags_HideFromUser = 0x40,
    CVarFlags_ReadOnlyForUser = 0x100,

};

struct CVar {
    using Handler_t = int(*)(CVar* cvar, const char* prevVal, const char* newVal, void* userData);

    uint32_t hash;
    uint32_t gap4[4];
    const char* name;
    uint32_t field18;
    CVarFlags flags;
    uint32_t field20;
    uint32_t field24;
    const char* vStr;
    uint32_t field2C[5];
    uint32_t vBool;
    uint32_t gap44[9];
    Handler_t handler;
    void* userData;
};
inline CVar* GetCVar(const char* name) { return ((decltype(&GetCVar))0x00767460)(name); }
inline CVar* FindCVar(const char* name) { return ((decltype(&FindCVar))0x00767440)(name); }